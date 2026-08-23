/**
 * AudioManager - Robust Web Audio API Procedural Synthesizer & Mobile-Hardened Music Engine
 * Farh SprachArena - High-Performance Audio Engine
 * 
 * Features:
 * - Precise Web Audio Lookahead Hardware Clock Scheduler (W3C Standard)
 * - Immune to mobile backgrounding / timer throttling (No catch-up bursts or rapid repetitions)
 * - Strict Audio State Machine (IDLE, PLAYING, PAUSED, STOPPED)
 * - Strict Exact ONE Music Instance Rule across all game transitions
 * - Page Visibility API & Mobile Screen-Lock Resilience
 * - Duplicate SFX Debouncing
 * - Clean Oscillator Node Lifecycle with Zero Lingering Audio Leaks
 */

export type SoundEffectType =
  | 'countdown'
  | 'questionStart'
  | 'correct'
  | 'incorrect'
  | 'timeout'
  | 'streak'
  | 'streakMajor'
  | 'gameStart'
  | 'gameEnd'
  | 'teamScore'
  | 'victory'
  | 'warning'
  | 'tick'
  | 'click';

export type MusicState = 'LOBBY' | 'GAME' | 'FINAL_RESULT' | 'NONE';
export type InternalAudioState = 'IDLE' | 'PLAYING' | 'PAUSED' | 'STOPPED';

export interface AudioSettings {
  musicEnabled: boolean;
  soundEnabled: boolean;
  musicVolume: number; // 0.0 to 1.0 (default: 0.22)
  soundVolume: number; // 0.0 to 1.0 (default: 0.70)
}

const STORAGE_KEY = 'farh_spracharena_audio_settings';
const SFX_DEBOUNCE_MS = 60; // Minimum interval between duplicate SFX triggers
const LOOKAHEAD_INTERVAL_MS = 50; // Lookahead timer frequency
const SCHEDULE_AHEAD_TIME_SEC = 0.25; // How far ahead to schedule on the audio clock

class AudioManager {
  private static instance: AudioManager;
  private ctx: AudioContext | null = null;
  private musicMasterGain: GainNode | null = null;
  private sfxMasterGain: GainNode | null = null;

  private settings: AudioSettings = {
    musicEnabled: true,
    soundEnabled: true,
    musicVolume: 0.22,
    soundVolume: 0.70,
  };

  private audioState: InternalAudioState = 'IDLE';
  private currentMusicState: MusicState = 'NONE';

  // Hardware clock lookahead scheduler
  private schedulerTimer: any = null;
  private nextChordTime: number = 0;
  private chordStep: number = 0;
  private activeMusicOscillators: { osc: OscillatorNode; gain: GainNode }[] = [];

  private lastSoundTimes: Map<SoundEffectType, number> = new Map();
  private listeners: Set<(settings: AudioSettings) => void> = new Set();
  private isVisibilityListenerAttached = false;
  private isAutoUnlockAttached = false;

  private constructor() {
    this.loadSettings();
    this.setupVisibilityListener();
    this.setupAutoUnlockListener();
  }

  public static getInstance(): AudioManager {
    if (!this.instance) {
      this.instance = new AudioManager();
    }
    return this.instance;
  }

  /**
   * Initializes AudioContext upon user interaction
   */
  public initContext(): AudioContext | null {
    try {
      if (!this.ctx) {
        const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtxClass) {
          this.ctx = new AudioCtxClass();
        }
      }

      if (this.ctx) {
        if (!this.musicMasterGain) {
          this.musicMasterGain = this.ctx.createGain();
          this.musicMasterGain.gain.setValueAtTime(
            this.settings.musicEnabled ? this.settings.musicVolume : 0.0001,
            this.ctx.currentTime
          );
          this.musicMasterGain.connect(this.ctx.destination);
        }

        if (!this.sfxMasterGain) {
          this.sfxMasterGain = this.ctx.createGain();
          this.sfxMasterGain.gain.setValueAtTime(
            this.settings.soundEnabled ? this.settings.soundVolume : 0.0001,
            this.ctx.currentTime
          );
          this.sfxMasterGain.connect(this.ctx.destination);
        }

        if (this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }
      }
    } catch (err) {
      console.warn('[AudioManager] Failed to initialize AudioContext:', err);
    }
    return this.ctx;
  }

  /**
   * Automatic user gesture unlock listener for mobile phones
   */
  private setupAutoUnlockListener(): void {
    if (typeof window === 'undefined' || this.isAutoUnlockAttached) return;
    this.isAutoUnlockAttached = true;

    const unlockHandler = () => {
      this.unblockAudio().then((unlocked) => {
        if (unlocked) {
          window.removeEventListener('pointerdown', unlockHandler);
          window.removeEventListener('touchstart', unlockHandler);
          window.removeEventListener('click', unlockHandler);
        }
      });
    };

    window.addEventListener('pointerdown', unlockHandler, { once: false, passive: true });
    window.addEventListener('touchstart', unlockHandler, { once: false, passive: true });
    window.addEventListener('click', unlockHandler, { once: false, passive: true });
  }

  /**
   * Handles mobile tab visibility / screen lock to prevent audio catch-up bursts
   */
  private setupVisibilityListener(): void {
    if (typeof document === 'undefined' || this.isVisibilityListenerAttached) return;
    this.isVisibilityListenerAttached = true;

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        // App went to background - pause scheduling & ramp gain down softly
        if (this.musicMasterGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.musicMasterGain.gain.cancelScheduledValues(now);
          this.musicMasterGain.gain.linearRampToValueAtTime(0.0001, now + 0.1);
        }
      } else {
        // App returned to foreground
        if (this.ctx && this.ctx.state === 'suspended') {
          this.ctx.resume().catch(() => {});
        }

        // Critical: Reset nextChordTime to CURRENT audio time to avoid burst catch-up
        if (this.ctx) {
          this.nextChordTime = this.ctx.currentTime + 0.08;
        }

        if (this.audioState === 'PLAYING' && this.settings.musicEnabled && this.musicMasterGain && this.ctx) {
          const now = this.ctx.currentTime;
          this.musicMasterGain.gain.cancelScheduledValues(now);
          this.musicMasterGain.gain.setValueAtTime(0.0001, now);
          this.musicMasterGain.gain.linearRampToValueAtTime(this.settings.musicVolume, now + 0.4);
        }
      }
    });
  }

  /**
   * Checks if browser is currently blocking AudioContext autoplay
   */
  public isAudioBlocked(): boolean {
    return !this.ctx || this.ctx.state === 'suspended';
  }

  /**
   * Explicitly unblock audio after a user gesture
   */
  public async unblockAudio(): Promise<boolean> {
    try {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      if (this.settings.musicEnabled && this.currentMusicState !== 'NONE' && this.audioState === 'PLAYING') {
        if (this.ctx) {
          this.nextChordTime = this.ctx.currentTime + 0.05;
        }
      }
      return this.ctx?.state === 'running';
    } catch {
      return false;
    }
  }

  /**
   * Subscribes a listener callback to audio settings updates
   */
  public subscribe(listener: (settings: AudioSettings) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners(): void {
    const settingsCopy = this.getSettings();
    this.listeners.forEach((listener) => {
      try {
        listener(settingsCopy);
      } catch (err) {
        console.error('[AudioManager] Error in settings listener:', err);
      }
    });
  }

  /**
   * Plays a procedural sound effect with duplicate trigger debouncing
   */
  public playSound(effect: SoundEffectType): void {
    if (!this.settings.soundEnabled) return;

    // Rapid duplicate sound trigger protection
    const nowMs = Date.now();
    const lastTime = this.lastSoundTimes.get(effect) || 0;
    if (nowMs - lastTime < SFX_DEBOUNCE_MS) {
      return;
    }
    this.lastSoundTimes.set(effect, nowMs);

    try {
      this.initContext();
      if (!this.ctx || !this.sfxMasterGain) return;

      const now = this.ctx.currentTime;
      const vol = this.settings.soundVolume;

      switch (effect) {
        case 'click':
          this.playClick(now, vol);
          break;
        case 'countdown':
          this.playCountdownTone(now, vol);
          break;
        case 'questionStart':
          this.playQuestionStartFanfare(now, vol);
          break;
        case 'correct':
          this.playCorrectChime(now, vol);
          break;
        case 'incorrect':
          this.playIncorrectBuzzer(now, vol);
          break;
        case 'timeout':
          this.playTimeoutChime(now, vol);
          break;
        case 'streak':
          this.playStreakSound(now, vol, false);
          break;
        case 'streakMajor':
          this.playStreakSound(now, vol, true);
          break;
        case 'teamScore':
          this.playTeamScoreSound(now, vol);
          break;
        case 'victory':
          this.playVictoryCelebration(now, vol);
          break;
        case 'warning':
          this.playWarningBeep(now, vol);
          break;
        case 'tick':
          this.playTimerTick(now, vol);
          break;
        default:
          break;
      }
    } catch (err) {
      console.warn(`[AudioManager] Error playing SFX "${effect}":`, err);
    }
  }

  // ==========================================
  // HARDENED PROCEDURAL BACKGROUND MUSIC ENGINE
  // ==========================================

  /**
   * Starts or transitions background music for the given state.
   * Guaranteed idempotent single instance: if already playing in the requested state, it continues seamlessly.
   */
  public playMusic(state: MusicState = 'GAME'): void {
    if (!this.settings.musicEnabled || state === 'NONE') {
      this.stopMusic();
      return;
    }

    this.initContext();
    if (!this.ctx || !this.musicMasterGain) return;

    // Idempotent guard: already playing the exact same state smoothly
    if (this.audioState === 'PLAYING' && this.currentMusicState === state) {
      const now = this.ctx.currentTime;
      this.musicMasterGain.gain.cancelScheduledValues(now);
      this.musicMasterGain.gain.linearRampToValueAtTime(this.settings.musicVolume, now + 0.3);
      return;
    }

    this.currentMusicState = state;
    this.audioState = 'PLAYING';
    this.startLookaheadScheduler(state);
  }

  /**
   * Smoothly fades in background music over durationMs
   */
  public fadeIn(durationMs = 1500, targetState: MusicState = 'GAME'): void {
    if (!this.settings.musicEnabled || targetState === 'NONE') return;
    this.initContext();
    if (!this.ctx || !this.musicMasterGain) return;

    const now = this.ctx.currentTime;
    const currentGain = this.musicMasterGain.gain.value;

    if (Math.abs(currentGain - this.settings.musicVolume) > 0.02 || this.audioState !== 'PLAYING') {
      this.musicMasterGain.gain.cancelScheduledValues(now);
      this.musicMasterGain.gain.setValueAtTime(Math.max(0.0001, currentGain), now);
      this.musicMasterGain.gain.linearRampToValueAtTime(
        this.settings.musicVolume,
        now + durationMs / 1000
      );
    }

    this.playMusic(targetState);
  }

  /**
   * Smoothly fades out background music over durationMs
   */
  public fadeOut(durationMs = 1500): void {
    if (this.audioState !== 'PLAYING' || !this.ctx || !this.musicMasterGain) return;

    const now = this.ctx.currentTime;
    this.musicMasterGain.gain.cancelScheduledValues(now);
    this.musicMasterGain.gain.setValueAtTime(this.musicMasterGain.gain.value, now);
    this.musicMasterGain.gain.linearRampToValueAtTime(0.0001, now + durationMs / 1000);

    setTimeout(() => {
      this.stopMusic();
    }, durationMs);
  }

  public stopMusic(): void {
    this.audioState = 'STOPPED';
    this.currentMusicState = 'NONE';
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.stopAllMusicOscillators(0.05);
  }

  public pauseMusic(): void {
    this.audioState = 'PAUSED';
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  public resumeMusic(): void {
    if (this.currentMusicState !== 'NONE' && this.settings.musicEnabled) {
      this.audioState = 'PLAYING';
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      if (this.ctx) {
        this.nextChordTime = this.ctx.currentTime + 0.05;
      }
    }
  }

  /**
   * Starts the Web Audio lookahead scheduler on the hardware audio clock
   */
  private startLookaheadScheduler(state: MusicState): void {
    if (this.schedulerTimer) {
      clearInterval(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.stopAllMusicOscillators(0.1);

    if (!this.ctx) return;
    this.nextChordTime = this.ctx.currentTime + 0.05;
    this.chordStep = 0;

    // Run lookahead scheduler step frequently
    this.schedulerTimer = setInterval(() => {
      this.schedulerStep(state);
    }, LOOKAHEAD_INTERVAL_MS);
  }

  /**
   * Lookahead scheduler step: schedules notes precisely on the hardware timeline
   */
  private schedulerStep(state: MusicState): void {
    if (
      this.audioState !== 'PLAYING' ||
      !this.ctx ||
      this.ctx.state !== 'running' ||
      !this.settings.musicEnabled ||
      !this.musicMasterGain ||
      document.hidden
    ) {
      return;
    }

    const gameProgression = [
      [261.63, 329.63, 392.0, 493.88], // Cmaj7
      [220.0, 261.63, 329.63, 392.0],  // Am7
      [174.61, 220.0, 261.63, 329.63], // Fmaj7
      [196.0, 246.94, 293.66, 349.23], // G7
    ];

    const lobbyProgression = [
      [261.63, 329.63, 392.0, 523.25], // C
      [174.61, 220.0, 261.63, 349.23], // F
      [220.0, 261.63, 329.63, 440.0],  // Am
      [196.0, 246.94, 293.66, 392.0],  // G
    ];

    const progression = state === 'LOBBY' ? lobbyProgression : gameProgression;
    const chordDuration = state === 'LOBBY' ? 1.8 : 1.4;

    // If nextChordTime drifted behind current audio time (e.g. from backgrounding/throttle), fast-forward cleanly
    if (this.nextChordTime < this.ctx.currentTime) {
      this.nextChordTime = this.ctx.currentTime + 0.05;
    }

    // Schedule chords that fall within the lookahead window
    while (this.nextChordTime < this.ctx.currentTime + SCHEDULE_AHEAD_TIME_SEC) {
      const chord = progression[this.chordStep % progression.length];
      this.scheduleChord(chord, this.nextChordTime, chordDuration);
      this.nextChordTime += chordDuration;
      this.chordStep++;
    }

    // Clean up finished oscillator references
    const now = this.ctx.currentTime;
    this.activeMusicOscillators = this.activeMusicOscillators.filter((entry) => {
      // Keep nodes that might still be active
      return (entry as any).endTime > now;
    });
  }

  /**
   * Schedules a single chord onto the Web Audio hardware clock
   */
  private scheduleChord(frequencies: number[], startTime: number, duration: number): void {
    if (!this.ctx || !this.musicMasterGain) return;

    frequencies.forEach((freq, idx) => {
      if (!this.ctx || !this.musicMasterGain) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime + idx * 0.02);

      // Smooth envelope attack, sustain, decay
      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.09, startTime + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.95);

      osc.connect(gain);
      gain.connect(this.musicMasterGain);

      const endTime = startTime + duration + 0.05;
      osc.start(startTime);
      osc.stop(endTime);

      const nodeEntry = { osc, gain };
      (nodeEntry as any).endTime = endTime;
      this.activeMusicOscillators.push(nodeEntry);
    });
  }

  /**
   * Safely stops and disconnects active music oscillators
   */
  private stopAllMusicOscillators(fadeTimeSec = 0.1): void {
    if (!this.ctx) {
      this.activeMusicOscillators = [];
      return;
    }

    const now = this.ctx.currentTime;
    const toStop = [...this.activeMusicOscillators];
    this.activeMusicOscillators = [];

    toStop.forEach(({ osc, gain }) => {
      try {
        gain.gain.cancelScheduledValues(now);
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.linearRampToValueAtTime(0.0001, now + fadeTimeSec);
        osc.stop(now + fadeTimeSec + 0.02);
      } catch {
        // Safe disposal
      }
    });
  }

  // ==========================================
  // PROCEDURAL SOUND EFFECT SYNTHESIZERS
  // ==========================================

  private playClick(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.035);

    gain.gain.setValueAtTime(vol * 0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  private playCountdownTone(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(vol * 0.40, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.36);
  }

  private playQuestionStartFanfare(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      const noteStart = now + idx * 0.04;
      gain.gain.setValueAtTime(0.0001, noteStart);
      gain.gain.linearRampToValueAtTime(vol * 0.30, noteStart + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(noteStart);
      osc.stop(noteStart + 0.46);
    });
  }

  private playCorrectChime(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [587.33, 880.0, 1174.66]; // D5, A5, D6
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.06);

      const start = now + idx * 0.06;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol * 0.35, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(start);
      osc.stop(start + 0.56);
    });
  }

  private playIncorrectBuzzer(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(130, now + 0.25);

    gain.gain.setValueAtTime(vol * 0.30, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.26);
  }

  private playTimeoutChime(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.linearRampToValueAtTime(330, now + 0.3);

    gain.gain.setValueAtTime(vol * 0.30, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.31);
  }

  private playStreakSound(now: number, vol: number, isMajor: boolean): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = isMajor
      ? [523.25, 659.25, 783.99, 1046.5, 1318.51] // C5, E5, G5, C6, E6
      : [523.25, 659.25, 783.99, 1046.5];        // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = isMajor ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      const start = now + idx * 0.05;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol * 0.35, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.6);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(start);
      osc.stop(start + 0.61);
    });
  }

  private playTeamScoreSound(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [440.0, 554.37, 659.25]; // A4, C#5, E5
    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.04);

      const start = now + idx * 0.04;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol * 0.30, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(start);
      osc.stop(start + 0.41);
    });
  }

  private playVictoryCelebration(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const fanfareNotes = [
      { freq: 523.25, time: 0.00, dur: 0.15 },
      { freq: 523.25, time: 0.15, dur: 0.15 },
      { freq: 523.25, time: 0.30, dur: 0.15 },
      { freq: 659.25, time: 0.45, dur: 0.40 },
      { freq: 587.33, time: 0.85, dur: 0.20 },
      { freq: 659.25, time: 1.05, dur: 0.20 },
      { freq: 783.99, time: 1.25, dur: 0.80 },
    ];

    fanfareNotes.forEach((n) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.freq, now + n.time);

      const start = now + n.time;
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(vol * 0.35, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + n.dur);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(start);
      osc.stop(start + n.dur + 0.02);
    });
  }

  private playWarningBeep(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.setValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(vol * 0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.21);
  }

  private playTimerTick(now: number, vol: number): void {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(vol * 0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.025);
  }

  // ==========================================
  // SETTINGS & LOCALSTORAGE PERSISTENCE
  // ==========================================

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public updateSettings(partial: Partial<AudioSettings>): void {
    this.settings = { ...this.settings, ...partial };
    this.saveSettings();

    if (this.ctx) {
      const now = this.ctx.currentTime;
      if (this.musicMasterGain) {
        this.musicMasterGain.gain.cancelScheduledValues(now);
        this.musicMasterGain.gain.linearRampToValueAtTime(
          this.settings.musicEnabled ? this.settings.musicVolume : 0.0001,
          now + 0.1
        );
      }
      if (this.sfxMasterGain) {
        this.sfxMasterGain.gain.cancelScheduledValues(now);
        this.sfxMasterGain.gain.linearRampToValueAtTime(
          this.settings.soundEnabled ? this.settings.soundVolume : 0.0001,
          now + 0.1
        );
      }
    }

    if (!this.settings.musicEnabled && this.audioState === 'PLAYING') {
      this.stopMusic();
    }

    this.notifyListeners();
  }

  public toggleMusic(): boolean {
    const next = !this.settings.musicEnabled;
    this.updateSettings({ musicEnabled: next });
    if (next) {
      this.playMusic(this.currentMusicState === 'NONE' ? 'GAME' : this.currentMusicState);
    } else {
      this.stopMusic();
    }
    return next;
  }

  public toggleSound(): boolean {
    const next = !this.settings.soundEnabled;
    this.updateSettings({ soundEnabled: next });
    return next;
  }

  public setMusicVolume(vol: number): void {
    this.updateSettings({ musicVolume: Math.max(0, Math.min(1, vol)) });
  }

  public setSoundVolume(vol: number): void {
    this.updateSettings({ soundVolume: Math.max(0, Math.min(1, vol)) });
  }

  private loadSettings(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          this.settings = {
            musicEnabled: parsed.musicEnabled ?? true,
            soundEnabled: parsed.soundEnabled ?? true,
            musicVolume: typeof parsed.musicVolume === 'number' ? parsed.musicVolume : 0.22,
            soundVolume: typeof parsed.soundVolume === 'number' ? parsed.soundVolume : 0.70,
          };
        }
      }
    } catch {
      // Safe fallback
    }
  }

  private saveSettings(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
      }
    } catch {
      // Safe fallback
    }
  }
}

export const audioManager = AudioManager.getInstance();

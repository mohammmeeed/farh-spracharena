/**
 * AudioManager - Centralized Web Audio API Procedural Synthesizer & Music Player
 * Farh SprachArena - Audio & UX System
 * 
 * Provides zero-latency, royalty-free audio effects and ambient classroom music
 * with smooth volume transitions, fade in/out, autoplay unblock handling, and localStorage persistence.
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

export interface AudioSettings {
  musicEnabled: boolean;
  soundEnabled: boolean;
  musicVolume: number; // 0.0 to 1.0 (recommended: 0.20 - 0.30)
  soundVolume: number; // 0.0 to 1.0 (recommended: 0.70)
}

const STORAGE_KEY = 'farh_spracharena_audio_settings';

class AudioManager {
  private static instance: AudioManager;
  private ctx: AudioContext | null = null;
  private musicMasterGain: GainNode | null = null;
  private sfxMasterGain: GainNode | null = null;

  private settings: AudioSettings = {
    musicEnabled: true, // Enabled by default; starts upon user interaction / start game
    soundEnabled: true,
    musicVolume: 0.25, // 25% background music volume
    soundVolume: 0.70, // 70% sound effects volume
  };

  private musicInterval: any = null;
  private isMusicPlaying = false;
  private currentMusicState: MusicState = 'NONE';

  private constructor() {
    this.loadSettings();
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
          this.musicMasterGain.gain.setValueAtTime(this.settings.musicVolume, this.ctx.currentTime);
          this.musicMasterGain.connect(this.ctx.destination);
        }

        if (!this.sfxMasterGain) {
          this.sfxMasterGain = this.ctx.createGain();
          this.sfxMasterGain.gain.setValueAtTime(this.settings.soundVolume, this.ctx.currentTime);
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
   * Checks if browser is currently blocking AudioContext autoplay
   */
  public isAudioBlocked(): boolean {
    return !this.ctx || this.ctx.state === 'suspended';
  }

  /**
   * Explicitly unblock audio after a user gesture (e.g. click "Start Game" or "Musik aktivieren")
   */
  public async unblockAudio(): Promise<boolean> {
    try {
      this.initContext();
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      if (this.settings.musicEnabled && this.currentMusicState !== 'NONE' && !this.isMusicPlaying) {
        this.playMusic(this.currentMusicState);
      }
      return this.ctx?.state === 'running';
    } catch {
      return false;
    }
  }

  /**
   * Plays a procedural sound effect
   */
  public playSound(effect: SoundEffectType): void {
    if (!this.settings.soundEnabled) return;

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
        case 'tick':
          this.playTick(now, vol);
          break;
        case 'warning':
          this.playWarningPulse(now, vol);
          break;
        case 'questionStart':
          this.playQuestionStart(now, vol);
          break;
        case 'correct':
          this.playCorrectArpeggio(now, vol);
          break;
        case 'incorrect':
          this.playIncorrectBuzzer(now, vol);
          break;
        case 'timeout':
          this.playTimeoutSiren(now, vol);
          break;
        case 'streak':
          this.playStreakWhoosh(now, vol, false);
          break;
        case 'streakMajor':
          this.playStreakWhoosh(now, vol, true);
          break;
        case 'gameStart':
          this.playGameStartFanfare(now, vol);
          break;
        case 'gameEnd':
          this.playGameEndChime(now, vol);
          break;
        case 'teamScore':
          this.playTeamScoreChord(now, vol);
          break;
        case 'victory':
          this.playVictoryCelebration(now, vol);
          break;
      }
    } catch (err) {
      // Audio safety: never throw or break game logic
      console.warn(`[AudioManager] Error playing sound ${effect}:`, err);
    }
  }

  // =========================================================================
  // Procedural Sound Synthesizers
  // =========================================================================

  private playClick(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.05);

    gain.gain.setValueAtTime(0.3 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  private playCountdownTone(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    osc.frequency.exponentialRampToValueAtTime(554.37, now + 0.12);

    gain.gain.setValueAtTime(0.4 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  private playTick(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(987.77, now);

    gain.gain.setValueAtTime(0.35 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  private playWarningPulse(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.exponentialRampToValueAtTime(392.0, now + 0.2);

    gain.gain.setValueAtTime(0.4 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  private playQuestionStart(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.04);

      gain.gain.setValueAtTime(0.25 * vol, now + i * 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.18);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now + i * 0.04);
      osc.stop(now + i * 0.04 + 0.18);
    });
  }

  private playCorrectArpeggio(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.06);

      gain.gain.setValueAtTime(0.35 * vol, now + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.25);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 0.25);
    });
  }

  private playIncorrectBuzzer(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.25);

    gain.gain.setValueAtTime(0.25 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.25);
  }

  private playTimeoutSiren(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(160, now + 0.35);

    gain.gain.setValueAtTime(0.25 * vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxMasterGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  private playStreakWhoosh(now: number, vol: number, isMajor: boolean) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = isMajor
      ? [440, 554.37, 659.25, 880, 1108.73]
      : [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.05);

      gain.gain.setValueAtTime((isMajor ? 0.4 : 0.3) * vol, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.3);
    });
  }

  private playGameStartFanfare(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const chords = [
      { notes: [392.0, 493.88, 587.33], duration: 0.15 },
      { notes: [440.0, 554.37, 659.25], duration: 0.15 },
      { notes: [523.25, 659.25, 783.99, 1046.5], duration: 0.4 },
    ];

    let t = now;
    chords.forEach((chord) => {
      chord.notes.forEach((freq) => {
        if (!this.ctx || !this.sfxMasterGain) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.25 * vol, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + chord.duration);

        osc.connect(gain);
        gain.connect(this.sfxMasterGain);
        osc.start(t);
        osc.stop(t + chord.duration);
      });
      t += chord.duration * 0.8;
    });
  }

  private playGameEndChime(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [659.25, 783.99, 987.77, 1318.51];
    notes.forEach((freq, i) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.3 * vol, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }

  private playTeamScoreChord(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25 * vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now);
      osc.stop(now + 0.35);
    });
  }

  private playVictoryCelebration(now: number, vol: number) {
    if (!this.ctx || !this.sfxMasterGain) return;
    const sequence = [
      { freq: 523.25, time: 0.0 },
      { freq: 659.25, time: 0.12 },
      { freq: 783.99, time: 0.24 },
      { freq: 1046.5, time: 0.36 },
      { freq: 1318.51, time: 0.55 },
      { freq: 1567.98, time: 0.75 },
    ];

    sequence.forEach((item) => {
      if (!this.ctx || !this.sfxMasterGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.freq, now + item.time);

      gain.gain.setValueAtTime(0.35 * vol, now + item.time);
      gain.gain.exponentialRampToValueAtTime(0.001, now + item.time + 0.45);

      osc.connect(gain);
      gain.connect(this.sfxMasterGain);
      osc.start(now + item.time);
      osc.stop(now + item.time + 0.45);
    });
  }

  // =========================================================================
  // Ambient Classroom Background Music Loop (Continuous During Gameplay)
  // =========================================================================

  /**
   * Starts or transitions background music for the given state.
   * If already playing in the same state (e.g. GAME), it continues seamlessly without restarting.
   */
  public playMusic(state: MusicState = 'GAME'): void {
    if (!this.settings.musicEnabled) return;

    this.initContext();
    if (!this.ctx || !this.musicMasterGain) return;

    if (this.isMusicPlaying && this.currentMusicState === state) {
      // Already running smoothly, DO NOT restart or interrupt playback
      return;
    }

    this.currentMusicState = state;
    this.isMusicPlaying = true;
    this.startMusicLoop(state);
  }

  /**
   * Smoothly fades in background music over durationMs
   */
  public fadeIn(durationMs = 1500, targetState: MusicState = 'GAME'): void {
    if (!this.settings.musicEnabled) return;
    this.initContext();
    if (!this.ctx || !this.musicMasterGain) return;

    const now = this.ctx.currentTime;
    this.musicMasterGain.gain.cancelScheduledValues(now);
    this.musicMasterGain.gain.setValueAtTime(0.001, now);
    this.musicMasterGain.gain.linearRampToValueAtTime(this.settings.musicVolume, now + durationMs / 1000);

    this.playMusic(targetState);
  }

  /**
   * Smoothly fades out background music over durationMs
   */
  public fadeOut(durationMs = 1500): void {
    if (!this.isMusicPlaying || !this.ctx || !this.musicMasterGain) return;

    const now = this.ctx.currentTime;
    this.musicMasterGain.gain.cancelScheduledValues(now);
    this.musicMasterGain.gain.setValueAtTime(this.musicMasterGain.gain.value, now);
    this.musicMasterGain.gain.linearRampToValueAtTime(0.001, now + durationMs / 1000);

    setTimeout(() => {
      this.stopMusic();
    }, durationMs);
  }

  public stopMusic(): void {
    this.isMusicPlaying = false;
    this.currentMusicState = 'NONE';
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }
  }

  public pauseMusic(): void {
    if (this.ctx && this.ctx.state === 'running') {
      this.ctx.suspend().catch(() => {});
    }
  }

  public resumeMusic(): void {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private startMusicLoop(state: MusicState): void {
    if (this.musicInterval) {
      clearInterval(this.musicInterval);
    }

    // Dynamic chord progression depending on classroom state
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
    const intervalMs = state === 'LOBBY' ? 1600 : 1200;

    let step = 0;
    const playChord = () => {
      if (!this.isMusicPlaying || !this.ctx || !this.settings.musicEnabled || !this.musicMasterGain) {
        return;
      }

      try {
        const now = this.ctx.currentTime;
        const chord = progression[step % progression.length];

        chord.forEach((freq, idx) => {
          if (!this.ctx || !this.musicMasterGain) return;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.02);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.12, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

          osc.connect(gain);
          gain.connect(this.musicMasterGain);
          osc.start(now);
          osc.stop(now + 1.2);
        });

        step++;
      } catch (err) {
        console.warn('[AudioManager] Error playing chord in music loop:', err);
      }
    };

    playChord();
    this.musicInterval = setInterval(playChord, intervalMs);
  }

  // =========================================================================
  // Settings & Local Storage
  // =========================================================================

  public toggleMusic(): boolean {
    this.settings.musicEnabled = !this.settings.musicEnabled;
    this.saveSettings();
    if (this.settings.musicEnabled) {
      this.playMusic(this.currentMusicState === 'NONE' ? 'GAME' : this.currentMusicState);
    } else {
      this.stopMusic();
    }
    return this.settings.musicEnabled;
  }

  public toggleSound(): boolean {
    this.settings.soundEnabled = !this.settings.soundEnabled;
    this.saveSettings();
    if (this.settings.soundEnabled) {
      this.playSound('click');
    }
    return this.settings.soundEnabled;
  }

  public setMusicVolume(vol: number): void {
    this.settings.musicVolume = Math.max(0, Math.min(1, vol));
    if (this.musicMasterGain && this.ctx) {
      this.musicMasterGain.gain.setValueAtTime(this.settings.musicVolume, this.ctx.currentTime);
    }
    this.saveSettings();
  }

  public setSoundVolume(vol: number): void {
    this.settings.soundVolume = Math.max(0, Math.min(1, vol));
    if (this.sfxMasterGain && this.ctx) {
      this.sfxMasterGain.gain.setValueAtTime(this.settings.soundVolume, this.ctx.currentTime);
    }
    this.saveSettings();
  }

  public getSettings(): AudioSettings {
    return { ...this.settings };
  }

  public getCurrentMusicState(): MusicState {
    return this.currentMusicState;
  }

  private saveSettings(): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // Local storage might be unavailable
    }
  }

  private loadSettings(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.settings = {
          ...this.settings,
          ...parsed,
          musicVolume: typeof parsed.musicVolume === 'number' ? parsed.musicVolume : 0.25,
          soundVolume: typeof parsed.soundVolume === 'number' ? parsed.soundVolume : 0.70,
        };
      }
    } catch {
      // Default settings fallback
    }
  }
}

export const audioManager = AudioManager.getInstance();

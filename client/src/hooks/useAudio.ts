import { useState, useEffect, useCallback } from 'react';
import {
  audioManager,
  SoundEffectType,
  AudioSettings,
  MusicState,
} from '../services/audio/AudioManager';

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(audioManager.getSettings());
  const [isBlocked, setIsBlocked] = useState<boolean>(audioManager.isAudioBlocked());

  useEffect(() => {
    setSettings(audioManager.getSettings());
    setIsBlocked(audioManager.isAudioBlocked());
  }, []);

  const playSound = useCallback((effect: SoundEffectType) => {
    audioManager.playSound(effect);
  }, []);

  const playMusic = useCallback((state: MusicState = 'GAME') => {
    audioManager.playMusic(state);
    setIsBlocked(audioManager.isAudioBlocked());
  }, []);

  const stopMusic = useCallback(() => {
    audioManager.stopMusic();
  }, []);

  const pauseMusic = useCallback(() => {
    audioManager.pauseMusic();
  }, []);

  const resumeMusic = useCallback(() => {
    audioManager.resumeMusic();
  }, []);

  const fadeIn = useCallback((durationMs = 1500, targetState: MusicState = 'GAME') => {
    audioManager.fadeIn(durationMs, targetState);
    setIsBlocked(audioManager.isAudioBlocked());
  }, []);

  const fadeOut = useCallback((durationMs = 1500) => {
    audioManager.fadeOut(durationMs);
  }, []);

  const toggleMusic = useCallback(() => {
    audioManager.toggleMusic();
    setSettings(audioManager.getSettings());
    setIsBlocked(audioManager.isAudioBlocked());
  }, []);

  const toggleSound = useCallback(() => {
    audioManager.toggleSound();
    setSettings(audioManager.getSettings());
  }, []);

  const setMusicVolume = useCallback((vol: number) => {
    audioManager.setMusicVolume(vol);
    setSettings(audioManager.getSettings());
  }, []);

  const setSoundVolume = useCallback((vol: number) => {
    audioManager.setSoundVolume(vol);
    setSettings(audioManager.getSettings());
  }, []);

  const initAudio = useCallback(() => {
    audioManager.initContext();
    setIsBlocked(audioManager.isAudioBlocked());
  }, []);

  const unblockAudio = useCallback(async () => {
    const unblocked = await audioManager.unblockAudio();
    setIsBlocked(!unblocked);
    return unblocked;
  }, []);

  return {
    settings,
    playSound,
    playMusic,
    stopMusic,
    pauseMusic,
    resumeMusic,
    fadeIn,
    fadeOut,
    toggleMusic,
    toggleSound,
    setMusicVolume,
    setSoundVolume,
    initAudio,
    unblockAudio,
    isAudioBlocked: isBlocked,
    isMusicEnabled: settings.musicEnabled,
    isSoundEnabled: settings.soundEnabled,
  };
}

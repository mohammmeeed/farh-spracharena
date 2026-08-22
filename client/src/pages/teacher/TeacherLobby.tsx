import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { TeacherLayout } from '../../components/teacher/TeacherLayout';
import {
  Users,
  Copy,
  Check,
  Layers,
  XCircle,
  AlertTriangle,
  Play,
  QrCode,
  Eye,
  EyeOff,
  Sliders,
  Trophy,
  BarChart3,
  Flame,
  Volume2,
  Tv,
} from 'lucide-react';

import { GameRoom, Player, LeaderboardEntry, Team } from '../../types/game.types';
import { GAME_TYPES } from '../../utils/constants';
import { socketService } from '../../socket/socket.service';
import { GameArena } from '../../components/game/GameArena';
import { useAudio } from '../../hooks/useAudio';
import { AudioSettingsModal } from '../../components/common/AudioSettingsModal';

type ActiveTab = 'GAME' | 'STUDENTS' | 'STATS' | 'LEADERBOARD' | 'SETTINGS';

export const TeacherLobby: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { playSound, fadeIn, stopMusic, unblockAudio } = useAudio();

  // State
  const initialRoom = (location.state as { room?: GameRoom })?.room || null;
  const [room, setRoom] = useState<GameRoom | null>(initialRoom);
  const [players, setPlayers] = useState<Player[]>(
    initialRoom?.players ? Object.values(initialRoom.players) : []
  );
  const [copiedPin, setCopiedPin] = useState<boolean>(false);
  const [showQrCode, setShowQrCode] = useState<boolean>(false);
  const [showExitModal, setShowExitModal] = useState<boolean>(false);
  const [showAudioModal, setShowAudioModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(!initialRoom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('GAME');

  const [isGameActive, setIsGameActive] = useState<boolean>(
    initialRoom ? initialRoom.status !== 'WAITING' : false
  );

  // Live Answer and Class Performance statistics for teacher
  const [liveLeaderboard, setLiveLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [liveTeams, setLiveTeams] = useState<Record<string, Team> | undefined>(initialRoom?.teams);
  const [latestStats, setLatestStats] = useState<{
    questionId?: string;
    correctAnswer?: string | string[];
    correctCount: number;
    incorrectCount: number;
    unansweredCount: number;
    totalPlayers: number;
    optionDistribution?: Record<string, number>;
    averageResponseTimeMs?: number;
    fastestResponseTimeMs?: number;
    fastestPlayerName?: string;
    accuracyPercentage?: number;
  }>({
    correctCount: 0,
    incorrectCount: 0,
    unansweredCount: 0,
    totalPlayers: 0,
  });

  // Calculate public join URL for QR code and students
  const appBaseUrl =
    import.meta.env.VITE_APP_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '');
  const joinUrl = `${appBaseUrl}/join?pin=${room?.pin || ''}`;


  // Stable refs for audio and navigation in socket listener
  const fadeInRef = React.useRef(fadeIn);
  fadeInRef.current = fadeIn;

  const stopMusicRef = React.useRef(stopMusic);
  stopMusicRef.current = stopMusic;

  const navigateRef = React.useRef(navigate);
  navigateRef.current = navigate;

  // Sync room state and listen to live player & game events
  useEffect(() => {
    if (!roomId) return;
    const socket = socketService.getSocket();

    const handleRoomJoined = ({ room: syncedRoom }: { room: GameRoom }) => {
      setRoom(syncedRoom);
      if (syncedRoom.players) {
        setPlayers(Object.values(syncedRoom.players));
      }
      if (syncedRoom.teams) {
        setLiveTeams(syncedRoom.teams);
      }
      setIsGameActive(syncedRoom.status !== 'WAITING');
      setLoading(false);
      setErrorMessage(null);
    };

    const handlePlayersUpdated = ({
      players: updatedPlayers,
    }: {
      players: Player[];
      totalPlayers: number;
    }) => {
      setPlayers(updatedPlayers);
    };

    const handleCountdown = () => {
      setIsGameActive(true);
      fadeInRef.current(1200, 'GAME');
    };

    const handleLeaderboardUpdated = ({
      leaderboard,
      teams,
    }: {
      leaderboard: LeaderboardEntry[];
      teams?: Record<string, Team>;
    }) => {
      setLiveLeaderboard(leaderboard);
      if (teams) setLiveTeams(teams);
    };

    const handleQuestionResult = (data: any) => {
      if (data.stats) {
        setLatestStats(data.stats);
      }
      if (data.leaderboard) {
        setLiveLeaderboard(data.leaderboard);
      }
      if (data.teams) {
        setLiveTeams(data.teams);
      }
    };

    const handleRoomError = ({ message }: { message: string }) => {
      setLoading(false);
      setErrorMessage(message || 'Raum konnte nicht geladen werden.');
    };

    const handleRoomClosed = () => {
      stopMusicRef.current();
      navigateRef.current('/teacher');
    };

    socket.on('server:roomJoined', handleRoomJoined);
    socket.on('room:playersUpdated', handlePlayersUpdated);
    socket.on('game:countdown', handleCountdown);
    socket.on('game:leaderboardUpdated', handleLeaderboardUpdated);
    socket.on('game:questionResult', handleQuestionResult);
    socket.on('server:roomError', handleRoomError);
    socket.on('server:roomClosed', handleRoomClosed);

    if (socket.connected) {
      socket.emit('teacher:joinRoom', { roomId });
    } else {
      socket.once('connect', () => {
        socket.emit('teacher:joinRoom', { roomId });
      });
    }

    return () => {
      socket.off('server:roomJoined', handleRoomJoined);
      socket.off('room:playersUpdated', handlePlayersUpdated);
      socket.off('game:countdown', handleCountdown);
      socket.off('game:leaderboardUpdated', handleLeaderboardUpdated);
      socket.off('game:questionResult', handleQuestionResult);
      socket.off('server:roomError', handleRoomError);
      socket.off('server:roomClosed', handleRoomClosed);
    };
  }, [roomId]);

  const handleCopyPin = () => {
    if (!room?.pin) return;
    navigator.clipboard.writeText(room.pin);
    setCopiedPin(true);
    playSound('click');
    setTimeout(() => setCopiedPin(false), 2000);
  };

  const handleCloseRoom = () => {
    if (!roomId) return;
    stopMusic();
    const socket = socketService.getSocket();
    socket.emit('teacher:closeRoom', { roomId });
    navigate('/teacher');
  };

  const handleStartGame = async () => {
    if (!roomId) return;
    if (players.length === 0) {
      setErrorMessage('Mindestens ein Schüler muss beigetreten sein, bevor das Spiel starten kann.');
      return;
    }

    setErrorMessage(null);
    await unblockAudio();
    fadeIn(1200, 'GAME');
    setIsGameActive(true);
    playSound('gameStart');
    socketService.startGame(roomId);
  };

  if (loading) {
    return (
      <TeacherLayout>
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-semibold text-slate-300">Lade Spielraum...</p>
        </div>
      </TeacherLayout>
    );
  }

  if (errorMessage && !room) {
    return (
      <TeacherLayout showBackToHome>
        <div className="max-w-md mx-auto py-16 text-center space-y-5">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-3xl">
            ⚠️
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Spielraum nicht gefunden</h2>
            <p className="text-xs text-slate-400 mt-1">
              {errorMessage || 'Der angeforderte Spielraum existiert nicht oder wurde beendet.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/teacher/new-game')}
            className="px-6 py-3 rounded-xl bg-amber-500 text-slate-950 font-bold text-sm shadow-glow-gold hover:bg-amber-400 transition-colors cursor-pointer"
          >
            Neue Spielrunde starten
          </button>
        </div>
      </TeacherLayout>
    );
  }

  if (!room) return null;

  // Render Active Session Cockpit Tabs (Pure Read-Only UI overlays)
  const renderStudentsTab = () => (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-400" />
            <span>Teilnehmerliste ({players.length})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Live-Verbindungsstatus aller angemeldeten Schüler
          </p>
        </div>
        <button
          onClick={handleCopyPin}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5"
        >
          <span>PIN: #{room.pin}</span>
          {copiedPin ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {players.map((p, idx) => (
          <div
            key={p.playerId}
            className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold flex items-center justify-center text-sm">
                {idx + 1}
              </div>
              <div>
                <p className="font-bold text-white text-sm flex items-center gap-1.5">
                  <span>{p.name}</span>
                  {p.isReady && (
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      Bereit
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-slate-400 font-mono">
                  {p.score.toLocaleString('de-DE')} Punkte
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                  p.connected ? 'text-emerald-400' : 'text-rose-400'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    p.connected ? 'bg-emerald-400' : 'bg-rose-400'
                  }`}
                />
                <span>{p.connected ? 'Verbunden' : 'Getrennt'}</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderStatsTab = () => (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <span>Live-Klassenstatistik</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Echtzeit-Verständnis und Antwortverteilung der aktuellen Frage
        </p>
      </div>

      {/* Performance Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 block">Klassen-Genauigkeit</span>
          <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
            {latestStats.accuracyPercentage || 0}%
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 block">Richtig beantwortet</span>
          <span className="text-2xl sm:text-3xl font-black text-white font-mono">
            {latestStats.correctCount} / {latestStats.totalPlayers}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 block">Ø Antwortzeit</span>
          <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">
            {latestStats.averageResponseTimeMs
              ? `${(latestStats.averageResponseTimeMs / 1000).toFixed(1)}s`
              : '–'}
          </span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400 block">Schnellste Antwort</span>
          <span className="text-xl sm:text-2xl font-black text-amber-400 font-mono truncate block">
            {latestStats.fastestPlayerName
              ? `${latestStats.fastestPlayerName} (${(
                  (latestStats.fastestResponseTimeMs || 0) / 1000
                ).toFixed(1)}s)`
              : '–'}
          </span>
        </div>
      </div>

      {/* Option Distribution */}
      {latestStats.optionDistribution &&
        Object.keys(latestStats.optionDistribution).length > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <h4 className="text-sm font-bold text-white">Antwortverteilung der Klasse:</h4>
            <div className="space-y-2">
              {Object.entries(latestStats.optionDistribution).map(([option, count]) => {
                const percent =
                  latestStats.totalPlayers > 0
                    ? Math.round((count / latestStats.totalPlayers) * 100)
                    : 0;
                return (
                  <div key={option} className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold">
                      <span className="text-slate-200">{option}</span>
                      <span className="text-amber-400 font-mono">
                        {count} Schüler ({percent}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-amber-500 transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      {/* Team Battle Live Comparison */}
      {liveTeams && (
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <span>⚔️</span>
            <span>Team Battle Live-Auswertung</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-blue-950/40 border border-blue-500/40 space-y-1">
              <span className="text-xs font-bold text-blue-400">🔵 Team Blau</span>
              <p className="text-xl font-black text-white font-mono">
                {liveTeams.TEAM_BLAU?.score.toLocaleString('de-DE') || 0} Punkte
              </p>
              <span className="text-xs text-slate-400">
                {liveTeams.TEAM_BLAU?.playerIds.length || 0} Spieler
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/40 space-y-1">
              <span className="text-xs font-bold text-rose-400">🔴 Team Rot</span>
              <p className="text-xl font-black text-white font-mono">
                {liveTeams.TEAM_ROT?.score.toLocaleString('de-DE') || 0} Punkte
              </p>
              <span className="text-xs text-slate-400">
                {liveTeams.TEAM_ROT?.playerIds.length || 0} Spieler
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderLeaderboardTab = () => (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span>Vollständige Klassen-Rangliste</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Punkte und Serien aller {players.length} Schüler
        </p>
      </div>

      <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
        {(liveLeaderboard.length > 0
          ? liveLeaderboard
          : players.sort((a, b) => b.score - a.score)
        ).map((entry, idx) => (
          <div
            key={entry.playerId}
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              idx === 0
                ? 'bg-amber-500/15 border-amber-500/40 shadow-glow-gold'
                : idx === 1
                ? 'bg-slate-300/10 border-slate-400/30'
                : idx === 2
                ? 'bg-amber-700/15 border-amber-700/30'
                : 'bg-slate-900/80 border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-slate-950 text-amber-400 font-mono font-black text-sm flex items-center justify-center">
                {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
              </span>
              <div>
                <p className="font-bold text-white text-sm">{entry.name}</p>
                {entry.streak >= 2 && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400">
                    <Flame className="w-3 h-3" />
                    <span>{entry.streak}er Serie</span>
                  </span>
                )}
              </div>
            </div>

            <span className="text-lg font-black font-mono text-white">
              {entry.score.toLocaleString('de-DE')}{' '}
              <span className="text-xs text-slate-400 font-normal">Pkt</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6 animate-in fade-in max-w-xl mx-auto">
      <div className="border-b border-slate-800 pb-4">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-400" />
          <span>Lehrer-Optionen & Einstellungen</span>
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          Präsentation, Audio und Raumsteuerung (Spiel läuft unterbrechungsfrei)
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 flex items-center gap-2.5">
          <Check className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Das Spiel und die Schüler-Synchronisation laufen im Hintergrund weiter.</span>
        </div>

        <button
          onClick={() => setShowAudioModal(true)}
          className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-left flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 text-amber-400" />
            <div>
              <span className="font-bold text-white text-sm block">
                Audio & Lautstärke
              </span>
              <span className="text-xs text-slate-400">
                Hintergrundmusik & Soundeffekte anpassen
              </span>
            </div>
          </div>
          <span className="text-xs text-amber-400 font-bold">Öffnen →</span>
        </button>

        <button
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-left flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <Tv className="w-5 h-5 text-cyan-400" />
            <div>
              <span className="font-bold text-white text-sm block">
                Vollbildmodus (⛶)
              </span>
              <span className="text-xs text-slate-400">
                Für Smartboards und Klassen-Beamer umschalten
              </span>
            </div>
          </div>
          <span className="text-xs text-cyan-400 font-bold">Umschalten</span>
        </button>
      </div>
    </div>
  );

  // Active Game Mode View
  if (isGameActive) {
    return (
      <TeacherLayout>
        <div className="space-y-6">
          {/* Active Navigation Subheader */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            {/* Tab navigation */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-2xl bg-slate-900 border border-slate-800">
              <button
                type="button"
                onClick={() => setActiveTab('GAME')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'GAME'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Play className="w-3.5 h-3.5" />
                <span>Aktuelles Spiel</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('STUDENTS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'STUDENTS'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Teilnehmer ({players.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('STATS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'STATS'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Live-Statistik</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('LEADERBOARD')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'LEADERBOARD'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Rangliste</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('SETTINGS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === 'SETTINGS'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Optionen</span>
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPin}
                className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-amber-400 text-xs font-mono font-bold flex items-center gap-1.5"
                title="PIN kopieren"
              >
                <span>PIN: #{room.pin}</span>
                {copiedPin ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </button>

              <button
                onClick={() => setShowExitModal(true)}
                className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-bold text-xs hover:bg-rose-500/25 transition-colors cursor-pointer"
              >
                ⛔ Spiel beenden
              </button>
            </div>
          </div>

          {/* Persistent GameArena Container - ALWAYS MOUNTED to keep socket listeners, active question & timer 100% active */}
          <div className={activeTab === 'GAME' ? 'block' : 'hidden'}>
            <GameArena
              room={room}
              isTeacher={true}
              onExit={() => setShowExitModal(true)}
            />
          </div>

          {/* Teacher UI Panels */}
          {activeTab === 'STUDENTS' && renderStudentsTab()}
          {activeTab === 'STATS' && renderStatsTab()}
          {activeTab === 'LEADERBOARD' && renderLeaderboardTab()}
          {activeTab === 'SETTINGS' && renderSettingsTab()}

          {/* Audio Modal */}
          <AudioSettingsModal
            isOpen={showAudioModal}
            onClose={() => setShowAudioModal(false)}
          />

          {/* Confirmation Exit Modal */}
          {showExitModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
              <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-rose-500/30 text-center space-y-5">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-2xl">
                  <AlertTriangle className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Spielrunde wirklich beenden?</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Alle aktuellen Punkte und Schülerverbindungen dieser Sitzung werden
                    zurückgesetzt.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <button
                    onClick={() => setShowExitModal(false)}
                    className="py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={handleCloseRoom}
                    className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
                  >
                    Ja, Spiel beenden
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </TeacherLayout>
    );
  }

  // Waiting Lobby View
  return (
    <TeacherLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Error Notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-rose-500/15 border border-rose-500/40 text-rose-300 flex items-start gap-3 animate-in fade-in">
            <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            <div className="text-sm font-semibold">{errorMessage}</div>
          </div>
        )}

        {/* Header Status Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Spielraum bereit!</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Farh <span className="gradient-text-gold">SprachArena</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Wartebereich für deine Schülerinnen und Schüler
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowExitModal(true)}
              className="px-4 py-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-rose-400" />
              <span>Raum schließen</span>
            </button>
          </div>
        </div>

        {/* Big PIN Display & QR Code Card (Classroom Projection Focus) */}
        <div className="relative glass-card rounded-3xl p-8 sm:p-12 border-2 border-amber-500/40 text-center overflow-hidden shadow-2xl bg-gradient-to-b from-[#131B2E] via-[#0E1526] to-[#0B0F19]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 space-y-6 max-w-xl mx-auto">
            <div className="space-y-1">
              <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-amber-400/90 font-mono">
                SPIEL-PIN ZUM BEITRETEN
              </span>
              <p className="text-xs text-slate-400">
                Schüler rufen die Plattform auf und geben diesen 6-stelligen PIN ein:
              </p>
            </div>

            {/* 6-Digit PIN Box */}
            <div
              onClick={handleCopyPin}
              className="group cursor-pointer inline-flex items-center justify-center gap-4 px-8 py-5 rounded-3xl bg-slate-950/90 border-2 border-amber-400 text-amber-400 shadow-glow-gold hover:border-amber-300 hover:scale-[1.02] active:scale-[0.98] transition-all"
              title="Klicken zum Kopieren"
            >
              <span className="text-5xl sm:text-7xl font-black font-mono tracking-widest selection:bg-transparent">
                {room.pin.slice(0, 3)} {room.pin.slice(3)}
              </span>
              <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 group-hover:bg-amber-500/25 transition-colors">
                {copiedPin ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </div>
            </div>

            {/* QR Code Toggle Button & Container */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowQrCode((prev) => !prev)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700 text-xs font-bold text-slate-200 hover:border-amber-400 transition-colors"
              >
                <QrCode className="w-4 h-4 text-amber-400" />
                <span>{showQrCode ? 'QR-Code ausblenden' : 'QR-Code für Schüler anzeigen'}</span>
                {showQrCode ? <EyeOff className="w-3.5 h-3.5 text-slate-400" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
              </button>

              {showQrCode && (
                <div className="mt-4 p-5 rounded-2xl bg-white text-slate-950 w-fit mx-auto shadow-2xl space-y-2 animate-in zoom-in-95 duration-200">
                  <QRCodeSVG value={joinUrl} size={180} />
                  <p className="text-[11px] font-bold text-slate-800 text-center font-mono">
                    Scannen zum Beitreten
                  </p>
                </div>
              )}
            </div>

            {/* Metadata Badges */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">Niveau:</span>
                <span className="text-sm font-black text-amber-400">{room.level}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">Spiele:</span>
                <span className="text-sm font-black text-cyan-400">{room.games.length}</span>
              </div>
              <div className="px-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-2">
                <span className="text-xs text-slate-400">Fragen:</span>
                <span className="text-sm font-black text-emerald-400">{room.totalQuestions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Columns: Games Schedule & Live Waiting Students Area */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Games Sequence (5 cols) */}
          <div className="md:col-span-5 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Geplante Spielreihenfolge</span>
              </h3>
              <span className="text-xs text-slate-400">{room.totalQuestions} Fragen</span>
            </div>

            <div className="space-y-2.5">
              {room.games.map((g, idx) => {
                const gameInfo = GAME_TYPES.find((item) => item.type === g.gameType);
                return (
                  <div
                    key={g.gameType}
                    className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                        {idx + 1}
                      </span>
                      <span className="text-2xl">{gameInfo?.icon || '🎮'}</span>
                      <div>
                        <p className="text-sm font-bold text-white">
                          {gameInfo?.title || g.gameType}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {gameInfo?.description || ''}
                        </p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-slate-800 border border-slate-700 text-amber-400 font-mono">
                      {g.questionCount} F
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: Live Joined Students Box & Start Button (7 cols) */}
          <div className="md:col-span-7 glass-card rounded-2xl p-6 border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-sm text-white">Angemeldete Schüler</h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400">
                {players.length} Schüler bereit
              </span>
            </div>

            {players.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 text-slate-500 flex items-center justify-center mx-auto text-xl">
                  ⏳
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-300">
                    Warte auf Schüler...
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Schüler treten mit dem PIN <span className="font-mono text-amber-400 font-bold">#{room.pin}</span> bei.
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                {players.map((p) => (
                  <div
                    key={p.playerId}
                    className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                      <span className="text-xs font-bold text-slate-200 truncate">
                        {p.name}
                      </span>
                    </div>
                    {p.isReady && (
                      <span className="text-[10px] text-emerald-400 font-bold shrink-0">
                        ✓
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Start Classroom Session Button */}
            <button
              onClick={handleStartGame}
              disabled={players.length === 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-lg flex items-center justify-center gap-3 shadow-lg shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Play className="w-6 h-6 fill-slate-950" />
              <span>🚀 Spiel starten ({players.length} Schüler)</span>
            </button>
          </div>
        </div>

        {/* Confirmation Exit Modal */}
        {showExitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
            <div className="glass-card w-full max-w-md rounded-3xl p-6 border border-rose-500/30 text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center mx-auto text-2xl">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Spielraum schließen?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Alle Schüler werden aus dem Warteraum abgemeldet.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => setShowExitModal(false)}
                  className="py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleCloseRoom}
                  className="py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors cursor-pointer shadow-lg shadow-rose-600/30"
                >
                  Ja, schließen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </TeacherLayout>
  );
};

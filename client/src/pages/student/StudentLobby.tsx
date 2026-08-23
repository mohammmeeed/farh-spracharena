import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import {
  Users,
  Clock,
  LogOut,
  AlertTriangle,
  CheckCircle2,
} from 'lucide-react';

import { GameRoom, Player, Team } from '../../types/game.types';
import { socketService } from '../../socket/socket.service';
import { useSocket } from '../../hooks/useSocket';
import { GameArena } from '../../components/game/GameArena';

export const StudentLobby: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isConnected, latency } = useSocket();

  // Navigation State / Room Data
  const initialRoom = (location.state as { room?: GameRoom })?.room || null;
  const initialPlayer = (location.state as { player?: Player })?.player || null;

  const [room, setRoom] = useState<GameRoom | null>(initialRoom);
  const [player, setPlayer] = useState<Player | null>(initialPlayer);
  const [players, setPlayers] = useState<Player[]>(
    initialRoom?.players ? Object.values(initialRoom.players) : []
  );
  const [liveTeams, setLiveTeams] = useState<Record<string, Team> | undefined>(initialRoom?.teams);
  const [teacherConnected, setTeacherConnected] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(!initialRoom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isGameActive, setIsGameActive] = useState<boolean>(
    initialRoom ? initialRoom.status !== 'WAITING' : false
  );

  const playerRef = React.useRef(player);
  playerRef.current = player;

  const navigateRef = React.useRef(navigate);
  navigateRef.current = navigate;

  useEffect(() => {
    if (!roomId) return;
    const socket = socketService.getSocket();

    // 1. Handshake / Sync
    const handleJoinedRoom = ({
      room: syncedRoom,
      player: syncedPlayer,
    }: {
      room: GameRoom;
      player: Player;
    }) => {
      setRoom(syncedRoom);
      if (syncedPlayer) setPlayer(syncedPlayer);
      if (syncedRoom.players) {
        setPlayers(Object.values(syncedRoom.players));
      }
      if (syncedRoom.teams) {
        setLiveTeams(syncedRoom.teams);
      }
      setTeacherConnected(syncedRoom.teacherConnected);
      if (syncedRoom.status !== 'WAITING') {
        setIsGameActive(true);
      }
      setLoading(false);
      setErrorMessage(null);
    };

    // Full state snapshot sync
    const handleStateSnapshot = (snapshot: any) => {
      if (snapshot.status && snapshot.status !== 'WAITING') {
        setIsGameActive(true);
      }
    };

    // 2. Real-time player list update
    const handlePlayersUpdated = ({
      players: updatedPlayers,
    }: {
      players: Player[];
      totalPlayers: number;
    }) => {
      setPlayers(updatedPlayers);
      const currentPlayer = playerRef.current;
      if (currentPlayer) {
        const me = updatedPlayers.find((p) => p.playerId === currentPlayer.playerId);
        if (me) setPlayer(me);
      }
    };

    // 3. Real-time teams update
    const handleTeamsUpdated = ({
      teams,
      players: updatedPlayers,
    }: {
      teams: Record<string, Team>;
      players: Player[];
    }) => {
      setLiveTeams(teams);
      if (updatedPlayers) {
        setPlayers(updatedPlayers);
        const currentPlayer = playerRef.current;
        if (currentPlayer) {
          const me = updatedPlayers.find((p) => p.playerId === currentPlayer.playerId);
          if (me) setPlayer(me);
        }
      }
    };

    const handleTeamAssignment = ({
      teams,
      myTeamId,
    }: {
      teams: Record<string, Team>;
      myTeamId?: 'TEAM_BLAU' | 'TEAM_ROT';
    }) => {
      setLiveTeams(teams);
      if (myTeamId) {
        setPlayer((prev) => (prev ? { ...prev, teamId: myTeamId } : prev));
      }
    };

    // 4. Countdown or Question started -> Switch to GameArena
    const handleGameActive = () => {
      setIsGameActive(true);
    };

    // 5. Teacher status change (Grace Period)
    const handleTeacherStatusChanged = ({
      teacherConnected: isTeacherOnline,
    }: {
      teacherConnected: boolean;
    }) => {
      setTeacherConnected(isTeacherOnline);
    };

    // 6. Room closed by teacher / timeout
    const handleRoomClosed = ({ reason }: { roomId: string; reason?: string }) => {
      alert(reason || 'Der Spielraum wurde beendet.');
      navigateRef.current('/join');
    };

    // 7. Error
    const handleJoinError = ({ message }: { message: string }) => {
      setLoading(false);
      setErrorMessage(message || 'Fehler beim Laden des Spielraums.');
    };

    // 8. Kicked by teacher
    const handleStudentKicked = ({ reason }: { reason?: string }) => {
      alert(reason || 'Du wurdest vom Lehrer aus dem Spielraum entfernt.');
      navigateRef.current('/join');
    };

    socket.on('student:joinedRoom', handleJoinedRoom);
    socket.on('game:stateSnapshot', handleStateSnapshot);
    socket.on('room:playersUpdated', handlePlayersUpdated);
    socket.on('room:teamsUpdated', handleTeamsUpdated);
    socket.on('game:teamAssignment', handleTeamAssignment);
    socket.on('game:countdown', handleGameActive);
    socket.on('game:questionStarted', handleGameActive);
    socket.on('teacher:statusChanged', handleTeacherStatusChanged);
    socket.on('server:roomClosed', handleRoomClosed);
    socket.on('student:joinError', handleJoinError);
    socket.on('student:kicked', handleStudentKicked);

    // Initial sync
    if (socket.connected) {
      socket.emit('student:syncLobby', {
        roomId,
        playerId: initialPlayer?.playerId,
      });
    } else {
      socket.once('connect', () => {
        socket.emit('student:syncLobby', {
          roomId,
          playerId: initialPlayer?.playerId,
        });
      });
    }

    return () => {
      socket.off('student:joinedRoom', handleJoinedRoom);
      socket.off('game:stateSnapshot', handleStateSnapshot);
      socket.off('room:playersUpdated', handlePlayersUpdated);
      socket.off('room:teamsUpdated', handleTeamsUpdated);
      socket.off('game:teamAssignment', handleTeamAssignment);
      socket.off('game:countdown', handleGameActive);
      socket.off('game:questionStarted', handleGameActive);
      socket.off('teacher:statusChanged', handleTeacherStatusChanged);
      socket.off('server:roomClosed', handleRoomClosed);
      socket.off('student:joinError', handleJoinError);
      socket.off('student:kicked', handleStudentKicked);
    };
  }, [roomId, initialPlayer]);

  const handleLeaveRoom = () => {
    if (!roomId) return;
    const socket = socketService.getSocket();
    socket.emit('student:leaveRoom', {
      roomId,
      playerId: player?.playerId,
    });
    navigate('/join');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm font-semibold text-slate-300 mt-4">Verbinde mit Farh SprachArena...</p>
      </div>
    );
  }

  if (errorMessage || !room) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-sm glass-card rounded-3xl p-8 border border-rose-500/30 text-center space-y-5 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto text-3xl">
            ⚠️
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Beitritt fehlgeschlagen</h2>
            <p className="text-xs text-slate-400 mt-1">
              {errorMessage || 'Der Spielraum existiert nicht mehr.'}
            </p>
          </div>
          <button
            onClick={() => navigate('/join')}
            className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm transition-colors cursor-pointer"
          >
            Zurück zur PIN-Eingabe
          </button>
        </div>
      </div>
    );
  }

  // Active Game Mode View for Students
  if (isGameActive) {
    return (
      <div className="min-h-screen bg-[#070B14] text-slate-100 flex flex-col p-4 sm:p-6 selection:bg-amber-500 selection:text-slate-950">
        <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center">
          <GameArena
            room={room}
            player={player}
            isTeacher={false}
            onExit={() => navigate('/join')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Mobile-Ready Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-xl px-4 sm:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center">
              <span className="text-sm font-black text-cyan-400">F</span>
            </div>
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white">
              Farh <span className="text-cyan-400">SprachArena</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Connection status indicator */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px]">
            {isConnected ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-emerald-400 font-medium">Verbunden</span>
                {latency !== null && (
                  <span className="text-slate-500 font-mono text-[10px] hidden sm:inline">
                    {latency}ms
                  </span>
                )}
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                <span className="text-rose-400 font-medium">Verbindung verloren</span>
              </>
            )}
          </div>

          <button
            onClick={handleLeaveRoom}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-300 hover:border-rose-500/40 transition-colors"
            title="Raum verlassen"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Student Waiting Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Teacher Disconnected Alert Banner (Grace Period) */}
        {!teacherConnected && (
          <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs sm:text-sm flex items-start gap-3 shadow-lg animate-pulse">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Lehrer-Verbindung unterbrochen</p>
              <p className="text-xs text-amber-200/90 mt-0.5">
                Der Lehrer ist momentan nicht verbunden. Bitte kurz warten, der Raum bleibt für
                kurze Zeit erhalten...
              </p>
            </div>
          </div>
        )}

        {/* Hero Card: "Du bist dabei! 🎉" */}
        <div className="relative glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/40 overflow-hidden shadow-2xl text-center bg-gradient-to-b from-[#0E1B33] via-[#0D1629] to-[#0B0F19]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

          <div className="relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Erfolgreich beigetreten</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Du bist dabei! 🎉
            </h1>

            {/* Student Persona Badge & Ready Toggle */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-950/80 border-2 border-cyan-400/60 shadow-glow-cyan">
                <span className="text-2xl">🎓</span>
                <div className="text-left">
                  <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Dein Spielername
                  </p>
                  <p className="text-base sm:text-lg font-black text-cyan-300">
                    {player?.name || 'Du'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!roomId) return;
                  socketService.getSocket().emit('student:toggleReady', { roomId });
                }}
                className={`px-6 py-3 rounded-2xl border-2 font-black text-sm transition-all flex items-center gap-2 ${
                  players.find((p) => p.playerId === player?.playerId)?.isReady
                    ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-glow-gold scale-105'
                    : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-emerald-400 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {players.find((p) => p.playerId === player?.playerId)?.isReady
                    ? 'Bereit! ✓'
                    : 'Ich bin bereit!'}
                </span>
              </button>
            </div>

            {/* Student's Assigned Team Identity (Rot / Blau) */}
            {player?.teamId && liveTeams && (
              <div
                className={`p-4 rounded-2xl border-2 flex items-center justify-between gap-4 text-left shadow-lg transition-all ${
                  player.teamId === 'TEAM_ROT'
                    ? 'bg-rose-950/60 border-rose-500/50 shadow-rose-950/40 text-rose-200'
                    : 'bg-blue-950/60 border-blue-500/50 shadow-blue-950/40 text-blue-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">
                    {player.teamId === 'TEAM_ROT' ? '🔴' : '🔵'}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider block text-slate-400">
                      Dein zugewiesenes Team
                    </span>
                    <span className="text-base sm:text-lg font-black text-white">
                      {player.teamId === 'TEAM_ROT' ? 'ROTES TEAM' : 'BLAUES TEAM'}
                    </span>
                  </div>
                </div>

                <span
                  className={`text-xs font-mono font-bold px-3 py-1 rounded-xl shrink-0 ${
                    player.teamId === 'TEAM_ROT'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                  }`}
                >
                  {
                    players.filter(
                      (p) =>
                        p.teamId === player.teamId ||
                        (player.teamId && liveTeams[player.teamId]?.playerIds.includes(p.playerId))
                    ).length
                  }{' '}
                  Mitspieler
                </span>
              </div>
            )}

            {/* Session Metadata Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-1.5">
                <span className="text-slate-400">Spiel-PIN:</span>
                <span className="font-mono font-bold text-amber-400">{room.pin}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-1.5">
                <span className="text-slate-400">Niveau:</span>
                <span className="font-bold text-cyan-400">{room.level}</span>
              </div>
              <div className="px-3.5 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs flex items-center gap-1.5">
                <span className="text-slate-400">Spiele:</span>
                <span className="font-bold text-emerald-400">{room.games.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Players In Room List */}
        <div className="glass-card rounded-2xl p-5 sm:p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm sm:text-base font-bold text-white">Spieler im Raum</h2>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
              {players.length} bereit
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
            {players.map((p) => {
              const isSelf = p.playerId === player?.playerId;
              return (
                <div
                  key={p.playerId}
                  className={`p-3 rounded-xl border flex items-center gap-2 transition-all ${
                    isSelf
                      ? 'bg-cyan-500/15 border-cyan-400/60 text-white font-bold shadow-glow-cyan'
                      : 'bg-slate-900/70 border-slate-800 text-slate-300 font-medium'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
                  <span className="truncate text-xs sm:text-sm">
                    {p.name} {isSelf && '(Du)'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Waiting Status Footer Card */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-amber-400 font-bold text-sm sm:text-base">
            <Clock className="w-4 h-4 animate-spin" />
            <span>⏳ Warte auf Farh...</span>
          </div>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Lehrer Farh startet das Spiel zentral von seinem Bildschirm aus. Bleib bitte auf dieser
            Seite.
          </p>
        </div>
      </main>
    </div>
  );
};

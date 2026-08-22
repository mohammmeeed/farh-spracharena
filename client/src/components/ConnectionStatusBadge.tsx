import React from 'react';
import { Wifi, WifiOff, Activity, RefreshCw } from 'lucide-react';

interface ConnectionStatusBadgeProps {
  isConnected: boolean;
  socketId: string | null;
  latency: number | null;
  isReconnecting?: boolean;
  compact?: boolean;
}

export const ConnectionStatusBadge: React.FC<ConnectionStatusBadgeProps> = ({
  isConnected,
  socketId,
  latency,
  isReconnecting = false,
  compact = false,
}) => {
  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border backdrop-blur-md transition-all ${
          isConnected
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
            : isReconnecting
            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 animate-pulse'
            : 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse'
        }`}
        title={
          isConnected
            ? `Verbunden (Socket: ${socketId})`
            : isReconnecting
            ? 'Verbindung wird wiederhergestellt...'
            : 'Keine Verbindung zum Server'
        }
      >
        <span className="relative flex h-2 w-2">
          {isConnected && (
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          )}
          <span
            className={`relative inline-flex rounded-full h-2 w-2 ${
              isConnected ? 'bg-emerald-500' : isReconnecting ? 'bg-amber-500' : 'bg-rose-500'
            }`}
          ></span>
        </span>
        <span>
          {isConnected
            ? '🟢 Verbunden'
            : isReconnecting
            ? '🟡 Wiederherstellung...'
            : '🔴 Getrennt'}
        </span>
        {isConnected && latency !== null && (
          <span className="text-slate-400 text-[10px] ml-0.5">{latency}ms</span>
        )}
      </div>
    );
  }

  return (
    <div
      className={`glass-card rounded-xl p-4 border transition-all ${
        isConnected
          ? 'border-emerald-500/30 bg-emerald-950/10'
          : isReconnecting
          ? 'border-amber-500/30 bg-amber-950/10'
          : 'border-rose-500/30 bg-rose-950/10'
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-lg border ${
              isConnected
                ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : isReconnecting
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
            }`}
          >
            {isConnected ? (
              <Wifi className="w-5 h-5" />
            ) : isReconnecting ? (
              <RefreshCw className="w-5 h-5 animate-spin" />
            ) : (
              <WifiOff className="w-5 h-5" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-slate-100">
                Farh SprachArena Echtzeit-Verbindung
              </span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  isConnected
                    ? 'bg-emerald-500/20 text-emerald-400'
                    : isReconnecting
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {isConnected
                  ? 'Verbunden'
                  : isReconnecting
                  ? 'Verbindung wird wiederhergestellt...'
                  : 'Verbindung verloren'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">
              {isConnected && socketId
                ? `Socket-ID: ${socketId}`
                : isReconnecting
                ? 'Versuche erneute Verbindung mit dem Server...'
                : 'Warte auf Server-Verbindung (Port 3001)...'}
            </p>
          </div>
        </div>

        {isConnected && latency !== null && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-xs text-slate-300">
            <Activity className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>{latency} ms Latenz</span>
          </div>
        )}
      </div>
    </div>
  );
};

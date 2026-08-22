# Farh SprachArena 🇩🇪
> **Interaktive Deutsch-Lernplattform für den Unterricht**  
> Konzipiert für den professionellen Deutschunterricht mit Lehrer Farh.

---

## 🎯 Projektübersicht

**Farh SprachArena** ist eine moderne, server-autoritative Echtzeit-Plattform für multiplayer-gestütztes Deutschlernen im Klassenraum.
- **Lehrer Farh**: Steuert Unterrichts-Spielsitzungen, wählt Sprachniveaus (A1–B2), kombiniert Spielmodi, überwacht Live-Verständnisstatistiken und projiziert den Beamer-Modus.
- **Schüler**: Treten temporär per 6-stelligem PIN oder QR-Code bei – ohne zeitraubende Registrierung oder persistente Schülerkonten.

---

## 🎮 Die Fünf Multiplayer-Spiele

1. ⚡ **Schnellantwort**: Rasantes Multiple-Choice Speed-Quiz gegen die Klassenraum-Uhr mit Streak-Multiplikatoren.
2. 🧩 **Satz-Rennen**: Wortbausteine interaktiv in die grammatikalisch korrekte Satzstellung ordnen (Haupt- und Nebensätze).
3. 🧠 **Wortschatz-Duell**: Vokabeln, Synonyme, Gegenteile und idiomatische Redewendungen zuordnen.
4. 🕵️ **Was bin ich?**: Schrittweise aufgedeckte Hinweise entschlüsseln – je schneller die richtige Antwort, desto höher die Punktzahl.
5. ⚔️ **Team Battle**: Automatische Aufteilung der Klasse in **Team Blau vs. Team Rot** mit Live-Punktebalken und Team-Wertung.

---

## 🏗️ System-Architektur

```
Farh SprachArena (Monorepo)
├── client/                     # Frontend (React 18 + TypeScript + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         # Reusable UI & Game Components
│   │   │   ├── common/         # Timer, Leaderboard, Badges, Overlays, Confetti, Modals
│   │   │   ├── game/           # Schnellantwort, SatzRennen, WortschatzDuell, WasBinIch, TeamBattle
│   │   │   └── teacher/        # TeacherLayout & Cockpit Controls
│   │   ├── context/            # ToastContext & Global Providers
│   │   ├── hooks/              # useSocket, useAudio
│   │   ├── pages/              # LandingPage, StudentJoin, TeacherDashboard, Configurator, Lobby
│   │   ├── services/audio/     # AudioManager (Web Audio Synthesizer)
│   │   ├── socket/             # Socket.IO Client Service
│   │   └── types/              # Typed Event & Data Contracts
│   └── dist/                   # Production Build
│
├── server/                     # Backend (Node.js + Express + TypeScript + Socket.IO)
│   ├── src/
│   │   ├── games/              # Server-Authoritative GameEngine, ScoreService, TeamManager
│   │   ├── questions/          # QuestionRepository (112 Questions across A1-B2) & Validator
│   │   ├── rooms/              # In-Memory RoomManager (Zero DB footprint)
│   │   ├── socket/             # Socket Handlers with Rate-Limiter & Role Guards
│   │   ├── utils/              # Logger, TimerService, RateLimiter
│   │   └── server.ts           # Express + Socket.IO Server & Health Endpoints
│   └── dist/                   # Production Server Bundle
```

---

## ⚡ Schnellstart & Installation

### 1. Voraussetzungen
- Node.js $\ge 18$
- npm $\ge 9$

### 2. Abhängigkeiten installieren
```bash
# Server-Abhängigkeiten
cd server
npm install

# Client-Abhängigkeiten
cd ../client
npm install
```

---

## 🚀 Entwicklungsserver starten

```bash
# Terminal 1: Backend Server (Port 3001)
cd server
npm run dev

# Terminal 2: Frontend Client (Port 5173)
cd client
npm run dev
```

---

## 🧪 Tests & Qualitätssicherung

```bash
# 1. Fragedatenbank-Validierung (CLI)
cd server
npm run validate:questions

# 2. Phase 6 Question Bank Tests
npx tsx src/test-phase6.ts

# 3. Phase 8 Teacher Dashboard Tests
npx tsx src/test-phase8.ts

# 4. Phase 9 Security, Performance & E2E Tests
npx tsx src/test-phase9.ts
```

---

## 📦 Produktions-Build

```bash
# Client Bundle erstellen
cd client
npm run build

# Server TypeScript kompilieren
cd ../server
npm run build
```

---

## 🔒 Sicherheit & Zuverlässigkeit (Phase 9)

- **Server-Autorität**: Punkte, Timer, richtige Antworten und Spielphasen werden ausschließlich auf dem Server validiert.
- **In-Memory Rate Limiting**: Schutz vor Event-Spamming und Flooding bei Antwortabgaben und Raumbeitritten.
- **XSS-Schutz & Eingabebereinigung**: Automatische Bereinigung aller Schülernamen (maximal 30 Zeichen).
- **Grace Period & Pause**: Bei Lehrer-Verbindungsabbruch pausiert das Spiel für 30 Sekunden und wird bei Reconnect nahtlos fortgesetzt.
- **Health-Check Endpunkte**: `GET /health` und `GET /api/health` für Monitoring.
- **Zero-Database**: Alle Spielräume und Teilnehmerdaten existieren nur im Arbeitsspeicher und werden nach Sitzungsende vollständig bereinigt.

---

## 👨‍🏫 Ablauf im Unterricht (Klassenraum-Flow)

1. **Lehrer Farh** öffnet das Lehrer-Dashboard (`/teacher`) und klickt auf **„Neue Spielrunde“**.
2. Er wählt das GER-Niveau (**A1, A2, B1 oder B2**) und ordnet die gewünschten Spiele an.
3. Der Raum wird erstellt und ein **6-stelliger PIN** sowie ein **QR-Code** erscheinen auf dem Beamer.
4. Schüler öffnen die Seite auf ihren Smartphones/Tablets, geben den PIN und ihren Namen ein.
5. Schüler können optional auf **„Ich bin bereit!“** tippen.
6. Lehrer Farh startet das Spiel mit **„🚀 Spiel starten“**.
7. Die Spiele laufen mit synchronem Countdown, Soundeffekten, Live-Klassenstatistiken und Ranglisten ab.
8. Nach Abschluss aller Spiele erscheint die große **Siegerehrung mit Podest und Konfetti**.

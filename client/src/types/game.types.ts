/**
 * Shared Type Definitions for Farh SprachArena Client
 * Phase 1 & Phase 2 Foundation
 */

export type GameLevel = 'A1' | 'A2' | 'B1' | 'B2';

export type GameType =
  | 'SCHNELLANTWORT'
  | 'SATZ_RENNEN'
  | 'WORTSCHATZ_DUELL'
  | 'WAS_BIN_ICH'
  | 'TEAM_BATTLE';

export type RoomStatus =
  | 'WAITING'
  | 'COUNTDOWN'
  | 'QUESTION'
  | 'QUESTION_RESULT'
  | 'NEXT_GAME'
  | 'FINISHED';

export type QuestionFormat =
  | 'MULTIPLE_CHOICE'
  | 'SENTENCE_ORDER'
  | 'VOCABULARY_TRANSLATION'
  | 'VOCABULARY_REVERSE'
  | 'CLUE_GUESS';

export interface Team {
  teamId: 'TEAM_BLAU' | 'TEAM_ROT';
  name: string;
  teamName?: string;
  color: string;
  score: number;
  playerIds: string[];
}


export interface GameSessionConfig {
  gameType: GameType;
  questionCount: number;
  order: number;
}

export interface Player {
  id: string;
  playerId: string;
  socketId: string;
  name: string;
  score: number;
  currentStreak: number;
  highestStreak: number;
  streak: number;
  teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  answeredCurrentQuestion: boolean;
  isReady?: boolean;
  lastAnswer?: string | string[];
  lastAnswerTime?: number;
  lastAnswerCorrect?: boolean;
  lastPointsEarned?: number;
  answeredAt?: number;
  connected: boolean;
  isConnected: boolean;
  avatar?: string;
  joinedAt: number;
}

export interface Question {
  id: string;
  level: GameLevel;
  gameType: GameType;
  format?: QuestionFormat;
  category: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  text: string;
  prompt?: string;
  options?: string[];
  correctAnswer?: string | string[];
  timeLimit: number;
  timeLimitSeconds?: number;
  explanation?: string;
  mediaUrl?: string;
  words?: string[];
  clues?: string[];
  focusWord?: string;
  translation?: string;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  name: string;
  score: number;
  streak: number;
  teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  answeredCurrentQuestion: boolean;
  lastAnswerCorrect?: boolean;
  lastPointsEarned?: number;
  connected: boolean;
}

export interface GameState {
  status: RoomStatus;
  currentGameIndex: number;
  currentQuestionIndex: number;
  currentQuestion?: Question;
  currentQuestionStartedAt?: number;
  currentQuestionEndsAt?: number;
  countdownValue?: number;
  questionsForCurrentGame: Question[];
  answeredCount: number;
  totalPlayers: number;
  teams?: Record<string, Team>;
  revealedClueIndex?: number;
  isPaused?: boolean;
  pauseRemainingMs?: number;
}

export interface GameRoom {
  roomId: string;
  pin: string;
  level: GameLevel;
  games: GameSessionConfig[];
  teacherSocketId: string;
  teacherConnected: boolean;
  status: RoomStatus;
  totalQuestions: number;
  createdAt: number;
  players: Record<string, Player>;
  teams?: Record<string, Team>;
  teamsLocked?: boolean;
  currentGameIndex: number;
  currentQuestionIndex: number;
  usedQuestionIds?: Set<string>;
  difficulty?: 'AUTO' | 'EASY' | 'MEDIUM' | 'HARD';
  category?: string;
  gameState?: GameState;
  sessionQuestionHistory?: QuestionHistoryItem[];
}

export interface QuestionResponseRecord {
  playerId: string;
  playerName: string;
  teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  answer: string | string[];
  isCorrect: boolean;
  pointsEarned: number;
  responseTimeMs?: number;
}

export interface QuestionHistoryItem {
  questionNumber: number;
  totalQuestions: number;
  gameType: GameType;
  questionId: string;
  questionText: string;
  category?: string;
  difficulty?: string;
  correctAnswer: string | string[];
  explanation?: string;
  stats: {
    correctCount: number;
    incorrectCount: number;
    unansweredCount: number;
    totalPlayers: number;
    accuracyPercentage: number;
    averageResponseTimeMs?: number;
  };
  studentResponses: QuestionResponseRecord[];
}

export interface SessionStatistics {
  totalQuestions: number;
  totalGames: number;
  totalPlayers: number;
  averageAccuracy: number;
  totalPointsAwarded: number;
  hardestQuestions: QuestionHistoryItem[];
  topPerformers: LeaderboardEntry[];
  highestStreakPlayer?: { name: string; streak: number };
  fastestPlayer?: { name: string; avgTimeMs: number };
  teamStats?: {
    rot: { name: string; score: number; accuracy: number; membersCount: number };
    blau: { name: string; score: number; accuracy: number; membersCount: number };
  };
}

export interface GameStateSnapshot {
  roomId: string;
  roomPin: string;
  level: GameLevel;
  status: RoomStatus;
  phaseSequence: number;
  currentGameIndex: number;
  totalGames: number;
  currentGameType: GameType;
  currentQuestionIndex: number;
  totalQuestionsInGame: number;
  currentQuestion?: {
    questionId: string;
    text: string;
    format?: QuestionFormat;
    options?: string[];
    words?: string[];
    clues?: string[];
    focusWord?: string;
    translation?: string;
    explanation?: string;
    timeLimit: number;
    startedAt: number;
    endsAt: number;
    questionNumber: number;
    totalQuestions: number;
    gameType: GameType;
    gameNumber: number;
    totalGames: number;
    category?: string;
    difficulty?: string;
  };
  countdownValue?: number;
  countdownEndsAt?: number;
  countdownStartedAt?: number;
  countdownDurationMs?: number;
  resultEndsAt?: number;
  nextGameEndsAt?: number;
  lastQuestionResult?: any;
  nextGameData?: any;
  isPaused: boolean;
  pauseReason?: string;
  pauseExplanation?: string;
  teams?: Record<string, Team>;
  players: Player[];
  serverTime: number;
}

export interface CreateRoomPayload {
  level: GameLevel;
  games: {
    gameType: GameType;
    questionCount: number;
  }[];
  difficulty?: 'AUTO' | 'EASY' | 'MEDIUM' | 'HARD';
  category?: string;
}

/**
 * Socket.IO Typed Events
 */
export interface ServerToClientEvents {
  'server:pong': (data: { timestamp: number }) => void;
  'connection:ack': (data: { socketId: string; serverTime: number }) => void;
  'time:pong': (data: { clientTimestamp: number; serverTimestamp: number }) => void;
  'server:roomCreated': (data: { room: GameRoom }) => void;
  'server:roomJoined': (data: { room: GameRoom }) => void;
  'server:roomClosed': (data: { roomId: string; reason?: string }) => void;
  'server:roomError': (data: { message: string }) => void;
  'teacher:statusChanged': (data: { teacherConnected: boolean }) => void;
  'student:joinedRoom': (data: { room: GameRoom; player: Player }) => void;
  'student:joinError': (data: { message: string }) => void;
  'room:playersUpdated': (data: { players: Player[]; totalPlayers: number }) => void;

  // Full state snapshot for seamless reconnection & sync
  'game:stateSnapshot': (data: GameStateSnapshot) => void;

  // Phase 4 & 5 Game Engine Events
  'game:countdown': (data: {
    value: number;
    gameType: GameType;
    questionNumber: number;
    totalQuestions: number;
    countdownEndsAt?: number;
    startedAt?: number;
    durationMs?: number;
    phaseSequence?: number;
  }) => void;
  'game:questionStarted': (data: {
    questionId: string;
    text: string;
    format?: QuestionFormat;
    options?: string[];
    words?: string[];
    clues?: string[];
    focusWord?: string;
    translation?: string;
    timeLimit: number;
    startedAt: number;
    endsAt: number;
    questionNumber: number;
    totalQuestions: number;
    gameType: GameType;
    gameNumber: number;
    totalGames: number;
    category?: string;
    difficulty?: string;
    phaseSequence?: number;
  }) => void;
  'game:clueRevealed': (data: {
    clueIndex: number;
    totalClues: number;
    clueText: string;
    revealedAt: number;
  }) => void;
  'game:teamAssignment': (data: {
    teams: Record<string, Team>;
    myTeamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  }) => void;
  'game:teamScoreUpdated': (data: {
    teams: Record<string, Team>;
  }) => void;
  'game:answerAccepted': (data: {
    playerId: string;
    questionId: string;
    answeredAt: number;
  }) => void;
  'game:scoreUpdated': (data: {
    playerId: string;
    pointsEarned: number;
    totalScore: number;
    currentStreak: number;
    isCorrect: boolean;
    teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
  }) => void;
  'game:leaderboardUpdated': (data: {
    leaderboard: LeaderboardEntry[];
    topPlayer?: LeaderboardEntry;
    teams?: Record<string, Team>;
  }) => void;
  'game:questionResult': (data: {
    questionId: string;
    correctAnswer: string | string[];
    stats: {
      correctCount: number;
      incorrectCount: number;
      unansweredCount: number;
      totalPlayers: number;
      optionDistribution?: Record<string, number>;
      averageResponseTimeMs?: number;
      fastestResponseTimeMs?: number;
      fastestPlayerName?: string;
      accuracyPercentage?: number;
    };
    leaderboard: LeaderboardEntry[];
    teams?: Record<string, Team>;
    playerResults?: Record<
      string,
      {
        isCorrect: boolean;
        pointsEarned: number;
        totalScore: number;
        currentStreak: number;
        teamId?: 'TEAM_BLAU' | 'TEAM_ROT';
      }
    >;
    phaseSequence?: number;
  }) => void;
  'game:nextGame': (data: {
    previousGameType: GameType;
    nextGameType: GameType;
    gameNumber: number;
    totalGames: number;
    nextGameQuestionCount: number;
    phaseSequence?: number;
  }) => void;
  'game:gameResult': (data: {
    gameType: GameType;
    gameNumber: number;
    totalGames: number;
    leaderboard: LeaderboardEntry[];
    teams?: Record<string, Team>;
    winner?: LeaderboardEntry | Team;
    phaseSequence?: number;
  }) => void;
  'game:sessionFinished': (data: {
    finalLeaderboard: LeaderboardEntry[];
    totalGames: number;
    totalQuestions: number;
    teams?: Record<string, Team>;
    winner?: LeaderboardEntry | Team;
    questionHistory?: QuestionHistoryItem[];
    sessionStats?: SessionStatistics;
    phaseSequence?: number;
  }) => void;
  'game:gamePaused': (data: {
    reason: string;
    explanation?: string;
    questionText?: string;
    phaseSequence?: number;
  }) => void;
  'game:gameResumed': (data: {
    remainingSeconds: number;
    phaseSequence?: number;
  }) => void;
  'student:kicked': (data: { reason?: string }) => void;
  'room:teamsUpdated': (data: { teams: Record<string, Team>; players: Player[] }) => void;
  'game:teamIntro': (data: { teams: Record<string, Team>; players: Player[]; durationMs: number }) => void;
  'game:error': (data: { message: string }) => void;

  // Backward compatibility
  'room:created': (data: { pin: string; room: GameRoom }) => void;
  'room:joined': (data: { pin: string; player: Player }) => void;
  'room:error': (data: { message: string }) => void;
  'player:list_updated': (data: { players: Player[] }) => void;
}

export interface ClientToServerEvents {
  'client:ping': (data: { timestamp: number }) => void;
  'time:ping': (data: { clientTimestamp: number }) => void;
  'game:requestStateSnapshot': (data: { roomId: string; playerId?: string }) => void;
  'teacher:createRoom': (data: CreateRoomPayload) => void;
  'teacher:joinRoom': (data: { roomId: string }) => void;
  'teacher:closeRoom': (data: { roomId: string }) => void;
  'teacher:reconnect': (data: { roomId: string }) => void;
  'teacher:startGame': (data: { roomId: string }) => void;
  'teacher:endGame': (data: { roomId: string }) => void;
  'teacher:pauseGame': (data: { roomId: string; reason?: string }) => void;
  'teacher:resumeGame': (data: { roomId: string }) => void;
  'teacher:kickStudent': (data: { roomId: string; playerId: string }) => void;
  'teacher:assignPlayerTeam': (data: {
    roomId: string;
    playerId: string;
    targetTeamId: 'TEAM_BLAU' | 'TEAM_ROT';
  }) => void;
  'teacher:autoBalanceTeams': (data: { roomId: string }) => void;
  'student:joinRoom': (data: { pin: string; name: string }) => void;
  'student:leaveRoom': (data: { roomId: string; playerId?: string }) => void;
  'student:syncLobby': (data: { roomId: string; playerId?: string }) => void;
  'student:toggleReady': (data: { roomId: string }) => void;
  'student:submitAnswer': (data: {
    roomId: string;
    questionId: string;
    answer: string | string[];
  }) => void;

  // Backward compatibility
  'room:create': (data: { level: GameLevel; gameType: GameType }) => void;
  'room:join': (data: { pin: string; playerName: string }) => void;
  'room:leave': (data: { pin: string }) => void;
}




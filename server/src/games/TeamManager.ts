import { Player, Team } from '../types/game.types.js';

/**
 * TeamManager - Handles professional red vs blue team management for Team Battle
 * Phase 5 Multiplayer Games
 */
export class TeamManager {
  /**
   * Creates or initializes the two official teams: TEAM_BLAU and TEAM_ROT
   */
  public static createDefaultTeams(): Record<string, Team> {
    return {
      TEAM_BLAU: {
        teamId: 'TEAM_BLAU',
        name: 'Blaues Team',
        color: '#3B82F6',
        score: 0,
        playerIds: [],
      },
      TEAM_ROT: {
        teamId: 'TEAM_ROT',
        name: 'Rotes Team',
        color: '#EF4444',
        score: 0,
        playerIds: [],
      },
    };
  }

  /**
   * Automatically partitions players into 2 balanced teams (Team Blau vs Team Rot)
   * Size difference is guaranteed to be <= 1.
   */
  public static createTeams(players: Record<string, Player>): Record<string, Team> {
    const teams = this.createDefaultTeams();
    const playerList = Object.values(players);

    // Shuffle players before assignment
    const shuffled = [...playerList].sort(() => Math.random() - 0.5);

    shuffled.forEach((player, index) => {
      if (index % 2 === 0) {
        teams.TEAM_BLAU.playerIds.push(player.playerId);
        player.teamId = 'TEAM_BLAU';
      } else {
        teams.TEAM_ROT.playerIds.push(player.playerId);
        player.teamId = 'TEAM_ROT';
      }
    });

    return teams;
  }

  /**
   * Manually assigns a player to a specific team (Team Rot or Team Blau)
   */
  public static assignPlayerToTeam(
    players: Record<string, Player>,
    teams: Record<string, Team>,
    playerId: string,
    targetTeamId: 'TEAM_BLAU' | 'TEAM_ROT'
  ): boolean {
    const player = players[playerId];
    if (!player || !teams || !teams[targetTeamId]) return false;

    // Remove player from both teams first to prevent duplicate entries
    teams.TEAM_BLAU.playerIds = teams.TEAM_BLAU.playerIds.filter((id) => id !== playerId);
    teams.TEAM_ROT.playerIds = teams.TEAM_ROT.playerIds.filter((id) => id !== playerId);

    // Add to target team
    teams[targetTeamId].playerIds.push(playerId);
    player.teamId = targetTeamId;

    return true;
  }

  /**
   * Automatically re-balances all currently connected players evenly across both teams
   */
  public static autoBalanceTeams(
    players: Record<string, Player>,
    teams: Record<string, Team>
  ): Record<string, Team> {
    if (!teams.TEAM_BLAU || !teams.TEAM_ROT) {
      teams = this.createDefaultTeams();
    }

    // Reset player assignment lists
    teams.TEAM_BLAU.playerIds = [];
    teams.TEAM_ROT.playerIds = [];

    const playerList = Object.values(players);
    // Alternate assignment
    playerList.forEach((player, index) => {
      if (index % 2 === 0) {
        teams.TEAM_ROT.playerIds.push(player.playerId);
        player.teamId = 'TEAM_ROT';
      } else {
        teams.TEAM_BLAU.playerIds.push(player.playerId);
        player.teamId = 'TEAM_BLAU';
      }
    });

    return teams;
  }

  /**
   * Ensures that a joining or reconnecting player has a team assigned.
   * If already assigned, preserves the team.
   * If not assigned, adds to the smaller team.
   */
  public static ensurePlayerTeam(
    player: Player,
    teams: Record<string, Team>
  ): 'TEAM_BLAU' | 'TEAM_ROT' {
    if (!teams.TEAM_BLAU || !teams.TEAM_ROT) {
      Object.assign(teams, this.createDefaultTeams());
    }

    if (player.teamId === 'TEAM_ROT') {
      if (!teams.TEAM_ROT.playerIds.includes(player.playerId)) {
        teams.TEAM_ROT.playerIds.push(player.playerId);
      }
      return 'TEAM_ROT';
    }

    if (player.teamId === 'TEAM_BLAU') {
      if (!teams.TEAM_BLAU.playerIds.includes(player.playerId)) {
        teams.TEAM_BLAU.playerIds.push(player.playerId);
      }
      return 'TEAM_BLAU';
    }

    // Auto-place in smaller team
    const blueCount = teams.TEAM_BLAU.playerIds.length;
    const redCount = teams.TEAM_ROT.playerIds.length;

    const assignedTeam: 'TEAM_BLAU' | 'TEAM_ROT' =
      redCount <= blueCount ? 'TEAM_ROT' : 'TEAM_BLAU';

    teams[assignedTeam].playerIds.push(player.playerId);
    player.teamId = assignedTeam;

    return assignedTeam;
  }

  /**
   * Adds points to a team's score
   */
  public static addPointsToTeam(
    teams: Record<string, Team>,
    teamId: 'TEAM_BLAU' | 'TEAM_ROT',
    points: number
  ): void {
    if (teams && teams[teamId]) {
      teams[teamId].score += points;
    }
  }

  /**
   * Determine winning team
   */
  public static getWinningTeam(teams: Record<string, Team>): Team | undefined {
    if (!teams || !teams.TEAM_BLAU || !teams.TEAM_ROT) return undefined;
    if (teams.TEAM_ROT.score > teams.TEAM_BLAU.score) {
      return teams.TEAM_ROT;
    }
    if (teams.TEAM_BLAU.score > teams.TEAM_ROT.score) {
      return teams.TEAM_BLAU;
    }
    // In case of tie, return red or blue with tied scores
    return teams.TEAM_BLAU;
  }
}

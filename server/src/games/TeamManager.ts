import { Player, Team } from '../types/game.types.js';

/**
 * TeamManager - Handles automatic balanced team partitioning for Team Battle (Game 5)
 * Phase 5 Multiplayer Games
 */
export class TeamManager {
  /**
   * Automatically partitions players into 2 balanced teams (Team Blau vs Team Rot)
   * Size difference is guaranteed to be <= 1
   */
  public static createTeams(players: Record<string, Player>): Record<string, Team> {
    const playerList = Object.values(players);

    // Shuffle players before assignment
    const shuffled = [...playerList].sort(() => Math.random() - 0.5);

    const teamBlau: Team = {
      teamId: 'TEAM_BLAU',
      name: 'Team Blau',
      color: '#3B82F6',
      score: 0,
      playerIds: [],
    };

    const teamRot: Team = {
      teamId: 'TEAM_ROT',
      name: 'Team Rot',
      color: '#EF4444',
      score: 0,
      playerIds: [],
    };

    shuffled.forEach((player, index) => {
      if (index % 2 === 0) {
        teamBlau.playerIds.push(player.playerId);
        player.teamId = 'TEAM_BLAU';
      } else {
        teamRot.playerIds.push(player.playerId);
        player.teamId = 'TEAM_ROT';
      }
    });

    return {
      TEAM_BLAU: teamBlau,
      TEAM_ROT: teamRot,
    };
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
    if (teams.TEAM_BLAU.score >= teams.TEAM_ROT.score) {
      return teams.TEAM_BLAU;
    }
    return teams.TEAM_ROT;
  }
}

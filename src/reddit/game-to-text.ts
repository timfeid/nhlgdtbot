import { Game } from "src/nhl/game";

export class GameToText {
  protected game : Game
  constructor (game: Game) {
    this.game = game
  }

  public linescore() {
    const linescore = this.game.linescore()

    return `| | 1st | 2nd | 3rd ${linescore.periods[3] ? '| OT' : ''} | Total |
|-|-|-|-|-|-|
| ${this.game.teams().home.triCode} | ${linescore.periods[0] ? linescore.periods[0].home.goals : 0} | ${linescore.periods[1] ? linescore.periods[1].home.goals : '-'} | ${linescore.periods[2] ? linescore.periods[2].home.goals : '-'} ${linescore.periods[3] ? '| ' + linescore.periods[3].home.goals : ''} | ${this.game.boxscore().teams.home.teamStats.teamSkaterStats.goals} |
| ${this.game.teams().away.triCode} | ${linescore.periods[0] ? linescore.periods[0].away.goals : 0} | ${linescore.periods[1] ? linescore.periods[1].away.goals : '-'} | ${linescore.periods[2] ? linescore.periods[2].away.goals : '-'} ${linescore.periods[3] ? '| ' + linescore.periods[3].away.goals : ''} | ${this.game.boxscore().teams.away.teamStats.teamSkaterStats.goals} |`
  }

  public boxscore() {
    const boxscore = this.game.boxscore()

    return `| | ${this.game.teams().home.triCode} | ${this.game.teams().away.triCode} |
|-|-|-|
| Goals | ${boxscore.teams.home.teamStats.teamSkaterStats.goals} | ${boxscore.teams.away.teamStats.teamSkaterStats.goals} |
| PIM | ${boxscore.teams.home.teamStats.teamSkaterStats.pim} | ${boxscore.teams.away.teamStats.teamSkaterStats.pim} |
| Shots | ${boxscore.teams.home.teamStats.teamSkaterStats.shots} | ${boxscore.teams.away.teamStats.teamSkaterStats.shots} |
| PP | ${boxscore.teams.home.teamStats.teamSkaterStats.powerPlayGoals} / ${boxscore.teams.home.teamStats.teamSkaterStats.powerPlayOpportunities} | ${boxscore.teams.away.teamStats.teamSkaterStats.powerPlayGoals} / ${boxscore.teams.away.teamStats.teamSkaterStats.powerPlayOpportunities} |
| Blocked Shots | ${boxscore.teams.home.teamStats.teamSkaterStats.blocked} | ${boxscore.teams.away.teamStats.teamSkaterStats.blocked} |
| Takeaways | ${boxscore.teams.home.teamStats.teamSkaterStats.takeaways} | ${boxscore.teams.away.teamStats.teamSkaterStats.takeaways} |
| Giveaways | ${boxscore.teams.home.teamStats.teamSkaterStats.giveaways} | ${boxscore.teams.away.teamStats.teamSkaterStats.giveaways} |
| Hits | ${boxscore.teams.home.teamStats.teamSkaterStats.hits} | ${boxscore.teams.away.teamStats.teamSkaterStats.hits} |`
  }

  protected player (player: any) {
    // console.log(player)
    return `${player.person.fullName}|${player.stats.skaterStats.timeOnIce}|${player.stats.skaterStats.goals}|${player.stats.skaterStats.assists}|${player.stats.skaterStats.shots}|${player.stats.skaterStats.faceoffTaken ? (player.stats.skaterStats.faceOffWins / player.stats.skaterStats.faceoffTaken * 100).toFixed(2) : 0}% (${player.stats.skaterStats.faceOffWins}/${player.stats.skaterStats.faceoffTaken})|${player.stats.skaterStats.takeaways}/${player.stats.skaterStats.giveaways}|${player.stats.skaterStats.hits}`
  }

  public players () {
    const homePlayers = Object.values(this.game.boxscore().teams.home.players).filter((player: any) => player.position.code != 'G' && player.position.code != 'N/A')
    const awayPlayers = Object.values(this.game.boxscore().teams.away.players).filter((player: any) => player.position.code != 'G' && player.position.code != 'N/A')
    const highestCount = homePlayers.length > awayPlayers.length ? homePlayers.length : awayPlayers.length
    let string = `|${this.game.teams().home.triCode}|TOI|G|A|S|F|T/G|H|${this.game.teams().away.triCode}|TOI|G|A|S|F|T/G|H|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|
`
    for (let i = 0;i < highestCount; i++) {
      string += `|${this.player(homePlayers[i])}|${this.player(awayPlayers[i])}|\n`
    }

    return string
  }
}
import axios from 'axios';

export class Game {
  protected response: any;
  protected constructor(response: any) {
    this.response = response
  }

  public static async get(gameId: number) {
    const response = await axios.get(`https://statsapi.web.nhl.com/api/v1/game/${gameId}/feed/live`)

    return new Game(response.data)
  }

  public teams () {
    return {
      home: this.response.gameData.teams.home,
      away: this.response.gameData.teams.away,
    }
  }

  public hasShootout () {
    return this.response.liveData.plays.playsByPeriod.length === 5
  }

  public score () {
    let home = 0
    let away = 0
    const homeId = this.teams().home.id

    this.scoringPlays().forEach((play: any) => {
      if (play.team.id === homeId) {
        home++
      } else {
        away++
      }
    })

    return {
      home,
      away,
    }
  }

  public scoringPlays(): any[] {
    const scoringPlays: any[] = []

    this.response.liveData.plays.scoringPlays.forEach((play: any) => {
      scoringPlays.push(this.response.liveData.plays.allPlays[play])
    })

    return scoringPlays
  }

  public shootoutPlays(): any[] {
    const plays: any[] = []

    if (this.hasShootout()) {
      this.response.liveData.plays.playsByPeriod[4].plays.forEach((play: any) => {
        plays.push(this.response.liveData.plays.allPlays[play])
      })
    }

    return plays
  }

  public shootoutRelevantPlays () {
    return this.shootoutPlays().filter(play => {
      return [
        'PERIOD_READY',
        'PERIOD_START',
        'SHOOTOUT_COMPLETE',
        'PERIOD_END',
        'PERIOD_OFFICIAL',
        'GAME_END'
      ].indexOf(play.result.eventTypeId) === -1
    })
  }

  public shootoutPlayers(): { home: any[], away: any[], firstShot: 'home' | 'away' } {
    const homeId = this.teams().home.id
    const players: { home: any[], away: any[], firstShot: 'home' | 'away' } = {
      home: [],
      away: [],
      firstShot: null,
    }
    this.shootoutRelevantPlays().forEach(play => {
      const team = play.team.id === homeId ? 'home' : 'away'

      if (players.firstShot === null) {
        players.firstShot = team
      }

      players[team].push({
        player: this.shootoutPlayer(play.players),
        result: play.result,
      })
    })

    return players
  }

  protected shootoutPlayer (players: any[]) {
    return players.filter((player: any) => ['Shooter', 'Scorer'].indexOf(player.playerType) !== -1)[0].player
  }

  public linescore() {
    const homeId = this.teams().home.id
    const periods = [...Array(this.response.liveData.plays.playsByPeriod.length)].map(() => {return {home: 0, away: 0, period: null}})

    for (const i in periods) {
      periods[i].period = this.response.liveData.plays.allPlays[this.response.liveData.plays.playsByPeriod[i].plays[0]].about.ordinalNum
    }

    this.scoringPlays().forEach((play: any) => {
      const team = play.team.id === homeId ? 'home' : 'away'
      periods[play.about.period - 1][team]++
    })

    return periods
  }

}
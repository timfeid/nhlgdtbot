import { EventEmitter } from "events";

let axios = require('axios')

const STATUS_CODE_FINAL = 7

export class Pbp extends EventEmitter {
  protected gameId: number
  protected timecode: number
  protected response: any
  protected timeout: NodeJS.Timeout
  protected broadcasted: CallableFunction[]
  protected timestamp: number

  constructor(gameId: number) {
    super()
    this.gameId = gameId
    this.timecode = null
    this.response = null
    this.timeout = null
    this.broadcasted = []
  }

  async start() {
    try {
      const data = await axios.get('http://statsapi.web.nhl.com/api/v1/game/' + this.gameId + '/feed/live', {
        params: {
          startTimecode: this.timecode,
          site: 'en_nhl',
        },
      })
      this.receivedData(data)
    } catch (e) {
      this.failed.bind(this)
    }
  }

  receivedData(response: any) {
    this.response = response.data
    this.sendBroadcasts()
    this.setTimeout()
  }

  setTimeout() {
    // Abstract equals because NHL uses strings?
    if (this.response.gameData.status.statusCode == STATUS_CODE_FINAL) {
      return;
    }
    this.timestamp = this.response.metaData.timeStamp
    this.timeout = setTimeout(this.start.bind(this), this.response.metaData.wait * 1000)
  }

  sendBroadcasts() {
    for (let play of this.response.liveData.plays.allPlays) {
      this.emit(play.result.eventTypeId.toLowerCase(), play)
    }
  }

  failed(response: any) {
    console.warn("FAILED.", response)
  }
}

import Reddit from 'snoowrap';
import config from './config';
import { Pbp } from './nhl/pbp';

console.log(config.reddit)
const reddit = new Reddit(config.reddit)

// Replace 2017020642 with a specific game
let playByPlay = new Pbp(2017020642)

playByPlay.on('period_ready', play => {
  console.log(play)
})

playByPlay.on('goal', play => {
  console.log(play.result)
})

// playByPlay.on(...)

playByPlay.start()
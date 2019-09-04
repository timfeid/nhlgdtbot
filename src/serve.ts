import Reddit from 'snoowrap';
import config from './config';
import { Game } from './nhl/game';
import { GameToText } from './reddit/game-to-text';

console.log(config.reddit)
const reddit = new Reddit(config.reddit)

const wat = async () => {
  const gameWithShootout = new GameToText(await Game.get(2017020642))

  reddit.submitSelfpost({
    subredditName: 'NHLGDTBot',
    title: 'hello world',
    text: `# LINESCORE + BOXSCORE\n${gameWithShootout.linescore()}
${gameWithShootout.shootout()}
# PLAYERS\n${gameWithShootout.players()}
# GOALIES\n${gameWithShootout.goalies()}`
  })
}

wat()
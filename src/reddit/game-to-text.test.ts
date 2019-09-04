import chai, { expect } from 'chai';
import { Game } from "../nhl/game";
import { GameToText } from './game-to-text';

var chaiSubset = require('chai-subset');
chai.use(chaiSubset);


describe('Game to text', function () {
  this.timeout(10000)
  let gameWithShootout: GameToText
  let gameWithoutShootout: GameToText

  before(async () => {
    gameWithShootout = new GameToText(await Game.get(2017020642))
    gameWithoutShootout = new GameToText(await Game.get(2018020020))
  })

  it('gets correct linescore text', () => {
    expect(gameWithShootout.linescore()).to.eq(`| | 1st | 2nd | 3rd | OT | Total | | NYI | NJD |
|-|-|-|-|-|-|-|-|-|
| **NYI** | 1 | 1 | 2 | 0 | 4 | **Goals** | 4 | 4 |
| **NJD** | 0 | 2 | 2 | 0 | 4 | **PIM** | 10 | 6 |
||||||| **Shots** | 38 | 46 |
||||||| **PP** | 1 / 3 | 0 / 5 |
||||||| **Blocked Shots** | 14 | 22 |
||||||| **Takeaways** | 7 | 12 |
||||||| **Giveaways** | 19 | 11 |
||||||| **Hits** | 25 | 14 |`)

  })
  it('gets correct boxscore text', () => {
    expect(gameWithShootout.boxscore()).to.eq(`| | NYI | NJD |
|-|-|-|
| Goals | 4 | 4 |
| PIM | 10 | 6 |
| Shots | 38 | 46 |
| PP | 1 / 3 | 0 / 5 |
| Blocked Shots | 14 | 22 |
| Takeaways | 7 | 12 |
| Giveaways | 19 | 11 |
| Hits | 25 | 14 |`)
  })

  it('gets correct players text', () => {
    expect(gameWithShootout.players()).to.eq(`|NYI|TOI|G|A|S|F|T/G|H|NJD|TOI|G|A|S|F|T/G|H|
|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|:-|
|[Pelech](https://www.nhl.com/player/8476917)|23:06|0|0|1|0% (0/0)|0/0|2|[Boyle](https://www.nhl.com/player/8470619)|14:43|0|0|3|41.67% (5/12)|0/2|0|
|[Pulock](https://www.nhl.com/player/8477506)|13:51|0|1|2|0% (0/0)|2/1|1|[Severson](https://www.nhl.com/player/8476923)|14:43|0|0|1|0% (0/0)|1/0|1|
|[Chimera](https://www.nhl.com/player/8466251)|10:58|0|0|0|0% (0/0)|0/0|0|[Zajac](https://www.nhl.com/player/8471233)|20:56|2|0|2|33.33% (7/21)|1/0|1|
|[Mayfield](https://www.nhl.com/player/8476429)|22:26|0|0|0|0% (0/0)|0/1|1|[Bratt](https://www.nhl.com/player/8479407)|18:14|0|0|1|0% (0/0)|1/0|0|
|[Quine](https://www.nhl.com/player/8476409)|14:06|0|0|1|0% (0/0)|1/1|3|[Lovejoy](https://www.nhl.com/player/8473933)|13:56|0|0|0|0% (0/0)|1/1|1|
|[Clutterbuck](https://www.nhl.com/player/8473504)|15:05|1|0|3|0% (0/0)|0/1|2|[Wood](https://www.nhl.com/player/8477425)|12:20|1|1|5|0% (0/0)|1/2|1|
|[Lee](https://www.nhl.com/player/8475314)|17:54|1|0|5|0% (0/0)|0/0|2|[Johansson](https://www.nhl.com/player/8475149)|23:32|0|1|1|66.67% (2/3)|2/1|0|
|[Nelson](https://www.nhl.com/player/8475754)|15:13|0|1|5|50.00% (4/8)|0/1|0|[Gibbons](https://www.nhl.com/player/8476207)|16:18|0|1|4|50.00% (1/2)|0/0|0|
|[Barzal](https://www.nhl.com/player/8478445)|20:02|0|2|4|25.00% (3/12)|1/4|0|[Greene](https://www.nhl.com/player/8472382)|21:04|0|0|4|0% (0/0)|1/0|1|
|[Tavares](https://www.nhl.com/player/8475166)|23:47|0|1|5|72.00% (18/25)|0/1|0|[Zacha](https://www.nhl.com/player/8478401)|12:37|0|0|0|50.00% (5/10)|0/0|1|
|[Fritz](https://www.nhl.com/player/8479206)|8:35|0|0|0|50.00% (1/2)|0/0|3|[Butcher](https://www.nhl.com/player/8477355)|13:29|0|1|5|0% (0/0)|0/0|0|
|[Eberle](https://www.nhl.com/player/8474586)|18:30|0|1|0|0% (0/0)|1/1|1|[Coleman](https://www.nhl.com/player/8476399)|11:58|0|0|0|50.00% (1/2)|1/1|4|
|[Beauvillier](https://www.nhl.com/player/8478463)|14:00|1|0|2|0% (0/0)|1/0|2|[Vatanen](https://www.nhl.com/player/8475222)|18:28|0|1|3|0% (0/0)|0/0|0|
|[Prince](https://www.nhl.com/player/8476386)|8:29|0|0|1|0% (0/0)|0/0|0|[Palmieri](https://www.nhl.com/player/8475151)|23:31|0|0|3|40.00% (2/5)|0/0|0|
|[Hickey](https://www.nhl.com/player/8474066)|17:09|0|1|1|0% (0/0)|0/3|0|[Moore](https://www.nhl.com/player/8475186)|17:26|0|1|2|0% (0/0)|0/1|2|
|[Cizikas](https://www.nhl.com/player/8475231)|17:18|0|0|2|52.38% (11/21)|0/0|6|[Hall](https://www.nhl.com/player/8475791)|23:53|1|1|8|66.67% (2/3)|1/1|1|
|[Leddy](https://www.nhl.com/player/8475181)|27:15|0|0|2|0% (0/0)|0/3|2|[Santini](https://www.nhl.com/player/8477463)|18:35|0|0|2|0% (0/0)|1/0|0|
|[Aho](https://www.nhl.com/player/8480222)|19:46|1|1|4|0% (0/0)|1/1|0|[Hischier](https://www.nhl.com/player/8480002)|16:17|0|0|2|60.00% (6/10)|1/0|1|
`)
  })

  it('gets correct goalies text', () => {
    expect(gameWithShootout.goalies()).to.eq(`||EVENSTRENGTH|POWERPLAY|SHORTHANDED|SAVES-SHOTS|SAVE %|PIM|TOI|
|:-|:-|:-|:-|:-|:-|:-|:-|
|[Halak](https://www.nhl.com/player/8470860)|29-32|11-11|2-3|42-46|0.913|0|65:00|
|[Schneider](https://www.nhl.com/player/8471239)|31-34|3-4|0-0|34-38|0.895|0|64:38|
`)
  })

  it('gets correct shootout text', () => {
    expect(gameWithShootout.shootout()).to.eq(`# SHOOTOUT\n|#|TEAM|RESULT|PLAYER|
|:-|:-|:-|:-|
|1|NYI|MISS|Jordan Eberle|
|2|NJD|MISS|Taylor Hall|
|3|NYI|MISS|John Tavares|
|4|NJD|MISS|Jesper Bratt|
|5|NYI|MISS|Mathew Barzal|
|6|NJD|MISS|Kyle Palmieri|
|7|NYI|MISS|Anders Lee|
|8|NJD|MISS|Brian Boyle|
|9|NYI|GOAL|Brock Nelson|
|10|NJD|MISS|Brian Gibbons|
`)
  })

})
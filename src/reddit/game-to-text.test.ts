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
    expect(gameWithShootout.linescore()).to.eq(`| | 1st | 2nd | 3rd | OT | Total |
|-|-|-|-|-|-|
| NYI | 1 | 1 | 2 | 0 | 4 |
| NJD | 0 | 2 | 2 | 0 | 4 |`)

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
|Adam Pelech|23:06|0|0|1|0% (0/0)|0/0|2|Brian Boyle|14:43|0|0|3|41.67% (5/12)|0/2|0|
|Ryan Pulock|13:51|0|1|2|0% (0/0)|2/1|1|Damon Severson|14:43|0|0|1|0% (0/0)|1/0|1|
|Jason Chimera|10:58|0|0|0|0% (0/0)|0/0|0|Travis Zajac|20:56|2|0|2|33.33% (7/21)|1/0|1|
|Scott Mayfield|22:26|0|0|0|0% (0/0)|0/1|1|Jesper Bratt|18:14|0|0|1|0% (0/0)|1/0|0|
|Alan Quine|14:06|0|0|1|0% (0/0)|1/1|3|Ben Lovejoy|13:56|0|0|0|0% (0/0)|1/1|1|
|Cal Clutterbuck|15:05|1|0|3|0% (0/0)|0/1|2|Miles Wood|12:20|1|1|5|0% (0/0)|1/2|1|
|Anders Lee|17:54|1|0|5|0% (0/0)|0/0|2|Marcus Johansson|23:32|0|1|1|66.67% (2/3)|2/1|0|
|Brock Nelson|15:13|0|1|5|50.00% (4/8)|0/1|0|Brian Gibbons|16:18|0|1|4|50.00% (1/2)|0/0|0|
|Mathew Barzal|20:02|0|2|4|25.00% (3/12)|1/4|0|Andy Greene|21:04|0|0|4|0% (0/0)|1/0|1|
|John Tavares|23:47|0|1|5|72.00% (18/25)|0/1|0|Pavel Zacha|12:37|0|0|0|50.00% (5/10)|0/0|1|
|Tanner Fritz|8:35|0|0|0|50.00% (1/2)|0/0|3|Will Butcher|13:29|0|1|5|0% (0/0)|0/0|0|
|Jordan Eberle|18:30|0|1|0|0% (0/0)|1/1|1|Blake Coleman|11:58|0|0|0|50.00% (1/2)|1/1|4|
|Anthony Beauvillier|14:00|1|0|2|0% (0/0)|1/0|2|Sami Vatanen|18:28|0|1|3|0% (0/0)|0/0|0|
|Shane Prince|8:29|0|0|1|0% (0/0)|0/0|0|Kyle Palmieri|23:31|0|0|3|40.00% (2/5)|0/0|0|
|Thomas Hickey|17:09|0|1|1|0% (0/0)|0/3|0|John Moore|17:26|0|1|2|0% (0/0)|0/1|2|
|Casey Cizikas|17:18|0|0|2|52.38% (11/21)|0/0|6|Taylor Hall|23:53|1|1|8|66.67% (2/3)|1/1|1|
|Nick Leddy|27:15|0|0|2|0% (0/0)|0/3|2|Steven Santini|18:35|0|0|2|0% (0/0)|1/0|0|
|Sebastian Aho|19:46|1|1|4|0% (0/0)|1/1|0|Nico Hischier|16:17|0|0|2|60.00% (6/10)|1/0|1|
`)
  })

})
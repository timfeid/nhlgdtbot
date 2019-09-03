import chai, { expect } from 'chai';
import { Game } from "./game";

var chaiSubset = require('chai-subset');
chai.use(chaiSubset);


describe('Game', function () {
  this.timeout(10000)
  let gameWithShootout: Game
  let gameWithoutShootout: Game

  before(async () => {
    gameWithShootout = await Game.get(2017020642)
    gameWithoutShootout = await Game.get(2018020020)
  })

  it('gets correct teams', () => {
    expect(gameWithShootout.teams()).to.containSubset({
      home: {
        id: 2,
      },
      away: {
        id: 1,
      },
    })

    expect(gameWithoutShootout.teams()).to.containSubset({
      home: {
        id: 1,
      },
      away: {
        id: 22,
      },
    })
  })

  it('gets boxscore', () => {
    expect(gameWithShootout.boxscore()).to.containSubset({
      teams: {
        away: {
          teamStats: {
            teamSkaterStats: {
              goals: 4,
            },
          },
        },
        home: {
          teamStats: {
            teamSkaterStats: {
              goals: 4,
            },
          }
        }
      }
    })

    expect(gameWithoutShootout.boxscore()).to.containSubset({
      teams: {
        away: {
          teamStats: {
            teamSkaterStats: {
              goals: 2,
            },
          },
        },
        home: {
          teamStats: {
            teamSkaterStats: {
              goals: 5,
            },
          }
        }
      }
    })
  })

  it('gets linescore', () => {
    expect(gameWithShootout.linescore()).to.containSubset({
      periods: [
        { home: {goals: 1 }, away: { goals: 0 }, ordinalNum: '1st' },
        { home: {goals: 1 }, away: { goals: 2 }, ordinalNum: '2nd' },
        { home: {goals: 2 }, away: { goals: 2 }, ordinalNum: '3rd' },
        { home: {goals: 0 }, away: { goals: 0 }, ordinalNum: 'OT' },
      ],
      shootoutInfo: {
        away: {
          scores: 0,
          attempts: 5
        },
        home: {
          scores: 1,
          attempts: 5
        },
      }
    })

    expect(gameWithoutShootout.linescore()).to.containSubset({
      periods: [
        { home: {goals: 1 }, away: { goals: 1 }, ordinalNum: '1st' },
        { home: {goals: 2 }, away: { goals: 0 }, ordinalNum: '2nd' },
        { home: {goals: 2 }, away: { goals: 1 }, ordinalNum: '3rd' },
      ]
    })
  })

  it ('checks if shootout exists correctly', () => {
    expect(gameWithShootout.hasShootout()).to.eq(true)
    expect(gameWithoutShootout.hasShootout()).to.eq(false)
  })

  it('gets final score correctly', () => {
    expect(gameWithShootout.score()).to.containSubset({
      home: 5,
      away: 4,
    })


    expect(gameWithoutShootout.score()).to.containSubset({
      home: 5,
      away: 2,
    })
  })

  it('gets shootout plays successfully', () => {
    expect(gameWithShootout.shootoutPlays()).to.be.lengthOf(16)


    expect(gameWithoutShootout.shootoutPlays()).to.be.length(0)
  })

  it('gets shootout players successfully', () => {
    expect(gameWithShootout.shootoutPlayers()).to.containSubset({
      firstShot: 'home',
      home: [
        { player: { id: 8474586 } },
        { player: { id: 8475166 } },
        { player: { id: 8478445 } },
        { player: { id: 8475314 } },
        { player: { id: 8475754 } },
      ],
      away: [
        { player: { id: 8475791 } },
        { player: { id: 8479407 } },
        { player: { id: 8475151 } },
        { player: { id: 8470619 } },
        { player: { id: 8476207 } },
      ],
    })

    expect(gameWithoutShootout.shootoutPlayers()).to.containSubset({
      firstShot: null,
    })
  })
})
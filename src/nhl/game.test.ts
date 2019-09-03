import chai, { expect } from 'chai';
import { Game } from "./game";

var chaiSubset = require('chai-subset');
chai.use(chaiSubset);


describe('Game', function () {
  this.timeout(5000)
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

  it('gets linescore', () => {
    expect(gameWithShootout.linescore()).to.containSubset([
      { home: 1, away: 0, period: '1st' },
      { home: 1, away: 2, period: '2nd' },
      { home: 2, away: 2, period: '3rd' },
      { home: 0, away: 0, period: 'OT' },
      { home: 1, away: 0, period: 'SO' },
    ])

    expect(gameWithoutShootout.linescore()).to.containSubset([
      { home: 1, away: 1, period: '1st' },
      { home: 2, away: 0, period: '2nd' },
      { home: 2, away: 1, period: '3rd' },
    ])
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
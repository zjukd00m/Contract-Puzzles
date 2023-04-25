const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const signers = await ethers.getSigners();

    return { game, signers };
  }
  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);

    const [owner, addr1] = signers;

    // nested mappings are rough :}
    await game.connect(owner).write(addr1.address);

    await game.connect(addr1).win(owner.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

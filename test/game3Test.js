const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    const signers = await ethers.getSigners();

    return { game, signers };
  }

  it('should be a winner', async function () {
    const { game, signers } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
    await game.connect(signers[0]).buy({ value: ethers.utils.parseEther('1') });
    await game.connect(signers[1]).buy({ value: ethers.utils.parseEther("2") });
    await game.connect(signers[2]).buy({ value: ethers.utils.parseEther("0.5") });

    // TODO: win expects three arguments
    await game.win(signers[0].address, signers[1].address, signers[2].address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});

const truffleAssert = require('truffle-assertions');

const SimpleContract = artifacts.require('erc20_tutorial');

contract('SimpleContract', (accounts) => {
  let instance;
  before('should setup the contract instance', async () => {
    instance = await SimpleContract.deployed();
  });

  it('should return the name', async () => {
    const value = await instance.getName();

    assert.equal(value, 'my name');
  });

  it('should return change the name', async () => {
    await instance.changeName('your name');
    const value = await instance.getName();

    assert.equal(value, 'your name');
  });

  it('should check the type of the event', async () => {
    const result = await instance.changeName('hello event');
    truffleAssert.eventEmitted(result, 'NameEvent');
  });
  it('should emit with correct paremeters', async () => {
    const result = await instance.changeName('hello event');
    truffleAssert.eventEmitted(result, 'NameEvent', (event) => {
      return event.evPram == 'hello event';
    });
  });
  it('should print the event paremeters', async () => {
    let result = await instance.changeName('hello event');
    truffleAssert.prettyPrintEmittedEvents(result);
  });
});
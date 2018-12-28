const { expect, expectFail } = require('./setup')

const Peg = artifacts.require('Peg')

const difference = (numberOne, numberTwo) => {
  const bigNumberOne = new web3.utils.BN(numberOne)
  const bigNumberTwo = new web3.utils.BN(numberTwo)

  return bigNumberOne.gte(bigNumberTwo) ?
    bigNumberOne.sub(bigNumberTwo).toNumber() :
    bigNumberTwo.sub(bigNumberOne).toNumber()
}

contract('Peg', ([_, relayer, user]) => {
  const amount = 1000

  before(async () => {
    this.peg = await Peg.new(relayer)
  })

  it('should accept deposit', async () => {
    const userBalanceBefore = await web3.eth.getBalance(user)

    const transaction = await this.peg.sendTransaction({ from: user, value: amount })

    const userBalanceAfter = await web3.eth.getBalance(user)

    const event = transaction.logs.find(item => item.event == 'Deposit')

    const balance = await this.peg.getBalance(user)

    expect(difference(userBalanceBefore, userBalanceAfter)).to.be.above(amount)
    expect(balance.toNumber()).to.be.equal(amount)
    expect(event.args.user).to.be.equal(user)
    expect(event.args.amount.toNumber()).to.be.equal(amount)
  })

  it('should release deposit', async () => {
    const userBalanceBefore = await web3.eth.getBalance(user)

    const transaction = await this.peg.release( user, amount, { from: relayer })

    const userBalanceAfter = await web3.eth.getBalance(user)

    const event = transaction.logs.find(item => item.event == 'Release')

    const balance = await this.peg.getBalance(user)

    expect(difference(userBalanceBefore, userBalanceAfter)).to.be.equal(amount)
    expect(balance.toNumber()).to.be.equal(0)
    expect(event.args.user).to.be.equal(user)
    expect(event.args.amount.toNumber()).to.be.equal(amount)
  })
})

import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import React, { Component } from 'react';
import Token from '../abis/Token.json'

import dbank from '../dbank.png';
import Web3 from 'web3';
import './App.css';


class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if (typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      //load balance
      if (typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0])
        this.setState({ account: accounts[0], balance: balance, web3: web3 })
      } else {
        window.alert('Please login with MetaMask')
      }
      try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
        const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
        const dBankAddress = dBank.networks[netId].address
 
        const tokenAddress = Token.networks[netId].address

        this.setState({ token: token,tokenAddress:tokenAddress, dbank: dbank, dBankAddress: dBankAddress })
  const ethPrice=  this.state.web3.utils.fromWei(this.state.tokenPrice,"ether")
this.setState({ethPrice:ethPrice})
    //       console.log((web3.utils.toWei(
    //     web3.utils.toBN(tokenSale.methods.tokenPrice()), // converts Number to BN, which is accepted by `toWei()`
    //     'ether'
    // )));
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
    }
    else {
      window.alert('Please install MetaMask')
    }
  }

  async deposit(amount) {
    if (this.state.dbank !== 'undefined') {
      try {
        await this.state.dbank.methods.deposit().send({ value: amount.toString(), from: this.state.account })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }
  async buy(count) {
    if (this.state.dbank !== 'undefined') {
      try {
        await this.state.tokenSale.methods.buyTokens(count).send({ value: (count * this.state.tokenPrice).toString(), from: this.state.account , gas:500000 })
      } catch (e) {
        console.log('Error, deposit: ', e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if (this.state.dbank !== 'undefined') {
      try {
        await this.state.dbank.methods.withdraw().send({ from: this.state.account })
      } catch (e) {
        console.log('Error, withdraw: ', e)
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      token: null,
      dbank: null,
   tokenAddress:null,
      balance: 0,
      dBankAddress: null,
      tokenPrice: "1000000000000000",
      ethPrice:null,
    }
  }

  render() {
    return (
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={dbank} className="App-logo" alt="logo" height="32" />
            <b>INT BANK</b>
          </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
          <br></br>
          <h1>Welcome to INT BANK</h1>
          <br/>
          <h2>Introducing "Interest Token" (INT)!</h2>
          <br/><br/>
          <h4>Your Token Address<br/> {this.state.tokenAddress}</h4>
      <p> Please import this token address to your Metamask Wallet to see your balance.</p>
          <br/><br/>
          <h4>Token price is {this.state.ethPrice}  Ether </h4>
          <br></br>
          <h6>Depost your Ether and take your interest in the form of Interest Token</h6>
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                  <Tab eventKey="deposit" title="Deposit">
                    <div>
                      <br></br>
                      How much do you want to deposit?
                      <br></br>
                      (min. amount is 0.01 ETH)
                      <br></br>
                      (1 deposit is possible at the time)
                      <br></br>
                      <form onSubmit={(e) => {
                        e.preventDefault()
                        let amount = this.depositAmount.value
                        amount = amount * 10 ** 18
                        this.deposit(amount)
                      }}>
                        <div className='form-group mr-sm-2'>
                          <br></br>
                          <input
                            id='depositAmount'
                            step="0.01"
                            type='number'
                            ref={(input) => { this.depositAmount = input }}
                            className="form-control form-control-md"
                            placeholder='amount...'
                            required />
                        </div>
                        <button type='submit' className='btn btn-primary' onClick={(e) => this.deposit(e)}>DEPOSIT</button>
                      </form>

                    </div>
                  </Tab>
                  <Tab eventKey="withdraw" title="Withdraw">
                    <br></br>
                    Do you want to withdraw + take interest?
                    <br></br>
                    <br></br>
                    <div>
                      <button type='submit' className='btn btn-primary' onClick={(e) => this.withdraw(e)}>WITHDRAW</button>
                    </div>
                  </Tab>
                 

                </Tabs>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
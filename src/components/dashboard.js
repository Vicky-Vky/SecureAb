import { Tabs, Tab } from 'react-bootstrap'
import dBank from '../abis/dBank.json'
import  { useEffect, useState } from "react";
import React, { Component } from 'react';
import Token from '../abis/Token.json'
import dbank from '../defibank.png';
import gitlogo from '../githublogo.png';
import withdraw from '../withdraw.png';
import deposit from '../deposit.png';
import loanpng from '../loan.png';
import Web3 from 'web3';
import './Dashboard.css';
import Button from "react-bootstrap/Button";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Dashboard extends Component {
  async Loanpush(user_name,amount) {
    
    
      console.log(user_name, amount);
      await axios
        .post("http://localhost:8000/dashboard", {
          user_name,
          amount,
        }).then((res) => {
          if (res.data) {
            console.log(res.data);
          } 
        })
      }
  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)
  }

  async loadBlockchainData(dispatch) {
    if(typeof window.ethereum !== 'undefined') {
      const web3 = new Web3(window.ethereum)
      const netId = await web3.eth.net.getId()
      const accounts = await web3.eth.getAccounts()

      if(typeof accounts[0] !== 'undefined') {
        const balance = await web3.eth.getBalance(accounts[0])
        const ethBalance   = web3.utils.fromWei(balance, 'ether')
        this.setState({ account: accounts[0] , balance, ethBalance, web3 })
      } else {  
        window.alert('Please login to Metamask !')
      }
    
      //load contracts
      try {
        const token = new web3.eth.Contract(Token.abi, Token.networks[netId].address)
        const dbank = new web3.eth.Contract(dBank.abi, dBank.networks[netId].address)
        const dBankAddress = dBank.networks[netId].address
        const tokenBalance = await web3.utils.fromWei(await token.methods.balanceOf(this.state.account).call(), 'ether')
        const depositETHbalance  = await web3.utils.fromWei(await dbank.methods.getEtherBalance(this.state.account).call(), 'ether')
        this.setState({ token, dbank, dBankAddress, tokenBalance, depositETHbalance })
      } catch (e) {
        console.log("Error", e);
        window.alert('Warning! Contracts not deployed to selected network!')
      }

    } else {
    window.alert('Please install Metamask from metamask.io and login!')
    }
  }

  async deposit(amount) {
    if(this.state.dbank!=='undefined') { 
      try{
        await this.state.dbank.methods.deposit().send({from: this.state.account, value: amount.toString()})

      } catch(e) {
        console.log('Error occured in deposit: ', e)
      }
    }
  }

  async withdraw(e) {
    e.preventDefault()
    if(this.state.dbank!=='undefined'){
      try{
        await this.state.dbank.methods.withdraw().send({from: this.state.account})
      } catch(e) {
        console.log('Error occured in withdrawal: ', e)
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
      balance: 0,
      ethBalance: 0,
      depositETHbalance: 0,
      tokenBalance: 0,
      dBankAddress: null,
      user_name:null,
      amount:null
    }
  }


  render() {
    return (  
      <div className='text-monospace'>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://localhost:3000/"
            target="_blank"
            rel="noopener noreferrer"
          >
          <img src={dbank} className="App-logo" alt="logo" height="32"/>

          <b> SeureAB</b>
          </a>

          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="https://github.com/Vky-201/SecureAb"
            target="_blank"
            rel="noopener noreferrer"
          >
          <b>GitHub  </b>
          <img src={gitlogo} className="App-logo" alt="gitlogo" height="32"/>
          </a>
        </nav>
        <div className="container-fluid mt-5 text-center">
        <br></br>
          <h1>Welcome to SecureAB! </h1>
          <h2>Your Wallet Address : </h2>
          <h3 id='add_box'>{this.state.account}</h3>
          
          <br></br>
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
              <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
                <Tab eventKey="deposit" title="Deposit">
                  <div>
                    <br></br>
                    <img src={deposit} className="App-logo" alt="withlogo" height = "150vh"/>
                    <h5>Current Ether balance: {this.state.ethBalance} ETH</h5> 
                    <h5> Account balance: {this.state.depositETHbalance} ETH</h5>                   
                    <br></br>
                    <h5>How much do you want to deposit?</h5>
                    <br></br>
                    <h6>Note: Min. deposit is <b>0.01</b> ETH; Only <b>1</b> deposit is possible currently</h6>
                    <br></br>
                    <form onSubmit={(e) => {
                      e.preventDefault()
                      let amount = this.depositAmount.value
                      amount = amount * 10**18 // amount to WEI
                      this.deposit(amount)
                    }}>
                      <div className='form-group mr-sm-2'>
                      <br></br>
                        <input
                          id='depositAmount'
                          step='0.01'
                          type='number'
                          placeholder='ETH amount...'
                          className = "form-control form-control-md"
                          required
                          ref={(input) => { this.depositAmount = input }}
                        /> 
                      </div>
                      <button type='submit' className='btn btn-dark'>DEPOSIT!</button>
                    </form>
                  </div>
                </Tab>

                <Tab eventKey="withdraw" title="Withdraw" >
                    <br></br>
                    <img src={withdraw} className="App-logo" alt="withlogo" height = "150vh"/>
                    <h5><b>Do you want to withdraw + take interest? </b></h5>
                    <br></br>
                    
                    <h5> Deposit balance: {this.state.depositETHbalance} ETH</h5>
                    <br></br>
                  <div>
                    
                    <button type='submit' className='btn btn-dark' onClick={(e) => this.withdraw(e)}>WITHDRAW!</button>
                  </div>
                </Tab>
                <Tab eventKey="interest" title="Interest">
                    <br></br>                           
                    <h5> Accrued Interest (tokens): {this.state.tokenBalance}</h5>
                    <img id='loanPng' src={loanpng} className="App-logo" alt="gitlogo"  />
                </Tab>                  
                <Tab eventKey="borrow" title="Borrow" >
                <br></br>
                <form action="POST" className="inside_con1" onSubmit={ (e) => {
    e.preventDefault();

    //console.log(user_name,amount);
    // if (emailRegex.test(Login_data) == false)
    //   return setError("please enter a valid email");

    // if (passwordRegex.test(password) == false)
    //   return setError("please enter valid password");
                  let amount = this.amount.value;
                  let user_name = this.user_name.value;
                  this.Loanpush(amount,user_name);
  }}>
        
         
          <label htmlFor="name">Name*</label>
         
          <input
                          id='user_name'
                        
                          type='text'
                          placeholder='Enter Your Name'
                          className = "form-control form-control-md"
                          required
                          ref={(input) => { this.user_name = input }}
                        />
          <br />
          <label htmlFor="password">Amount *</label>
          <input
                          id='depositAmount'
                          
                          type='amount'
                          placeholder='Enter amount...'
                          className = "form-control form-control-md"
                          required
                          ref={(input) => { this.amount = input }}
                        />
          <br />
          
          <Button className="smt_btn" type="submit" >
            Submit
          </Button>
        </form>
                </Tab>
                <Tab eventKey="payoff" title="Payoff" disabled>
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

export default Dashboard; 
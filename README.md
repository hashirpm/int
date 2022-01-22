
![](https://drive.google.com/uc?export=view&id=1xPOcC7uWsR0ZK9OAl34bGQLolhKJjys4)
# INT
```EARN INTEREST ON YOUR ETHEREUM HOLDINGS```

## Problem Statement
Launch a token with a chain of your choice with a fixed supply and a notional value. 

## Inspiration
In this current scenario, when the attention has shifted away from the energy-intensive bitcoin blockchain to the ethereum blockchain, allowing traders to lend their ETH holdings and earn interest on the same will be welcoming.
 
##Important Values
Total Token Supply: **1000000000**

Value of Token: **0.001 ETH**

InterestPerSecond = 31668017 * (Ether Deposited / 1e16)

## What it does
Our project allows traders to lend their ethereum holdings and earn interest on the same.
Deposits are made in the form of Ether.
The interest is given in the form of INT interest token, based on the formula:
**interestPerSecond = 31668017 * (Ether Deposited / 1e16)**

## 📥 Installing and Executing locally

	
1. Clone the repository.
```
git clone https://github.com/hashirpm/int.git
```

2. Go to the cloned directory (e.g. `cd int`).

3. Run ```npm install``` to install all the dependencies.

5. Open Ganache in your local machine.

6. Run ```truffle migrate``` to deploy the smart contracts.

7. Login in to your MetaMask and add Ganache to your Metamask networks. 

8. Import your first account in Ganache to your MetaMask wallet by copying your Private Key from Ganache.

9. Inner the folder of the cloned project, start the application : 
```
npm run start
```
10. After that, the command will start a local server instance (http://localhost:3000/) in your browser. 

11. Connect MetaMask to your localhost.

12. Depost ETH and earn you INT token. 

## How we built it
Using Solidity, Web3.js, React.js, Truffle, Ganache


## Contributors
	
SR No | Author  
--- | ---
1 | [Muhammed Hashir](https://github.com/hashirpm)
2 | [Rosemary Benny](https://github.com/Rosemary-benny)



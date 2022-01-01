import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider || new Web3.providers.WebsocketProvider('wss://rinkeby.infura.io/ws/v3/7f5d21952f814f3d9201088b800e57f9'));

export default web3

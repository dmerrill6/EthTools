import Web3 from 'web3';
/*eslint no-undef: 0*/

const metamaskLoader = () => {
  let web3js = null;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);
  } else {
    console.log('No web3? You should consider trying MetaMask!')
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
  }
  return web3js;
}
/*eslint no-undef: 0*/

export default metamaskLoader;
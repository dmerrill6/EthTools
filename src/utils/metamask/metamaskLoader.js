import Web3 from 'web3';
/*eslint no-undef: 0*/

const metamaskLoader = (callback) => {
  let web3js = null;
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    // Use Mist/MetaMask's provider
    web3js = new Web3(web3.currentProvider);

    web3js.eth.getAccounts((err, accounts) => {
      if (err) {
        callback({
          error: 'An error occurred when connecting to Metamask. Please try again later.',
          errorType: 'metamaskError'
        });

      } else if (accounts.length === 0) { // We require that the user is logged in and has an account.
        callback({
          error: 'Metamask detected! Please Log In to Metamask and then reload this page.',
          errorType: 'notLoggedIn'
        });
      } else {
        // Connected and logged in successfully.
        callback(web3js);
      }
    })
  } else {
    callback({
      error: 'Please download Metamask from your browser extension store.',
      errorType: 'noMetamask'
    });
  }
}
/*eslint no-undef: 0*/

export default metamaskLoader;
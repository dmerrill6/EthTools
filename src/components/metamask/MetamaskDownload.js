import React from 'react';
import Notice from '../visual/Notice';


const MetamaskDownload = (props) => (
  <Notice type='danger' active>
    <p>
      You must download MetaMask to be able to connect to Web3 and the Ethereum Blockchain. <a target='_blank' rel="noopener" href='https://metamask.io'>Click here to download MetaMask.</a>
    </p>

  </Notice>
)

export default MetamaskDownload;
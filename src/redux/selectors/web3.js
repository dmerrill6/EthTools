import { createSelector } from 'reselect';

export const web3Selector = (state) => state.web3.lib;

export const currentAccountSelector = (state) => state.web3.account;

export const currentNetworkSelector = (state) => state.web3.network;

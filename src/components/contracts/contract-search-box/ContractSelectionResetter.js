import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { setContractAddress } from '../../../redux/actions/contracts';
import { contractAddressSelector } from '../../../redux/selectors/contracts';

class ContractSelectionResetter extends Component {
  render() {
    const {selectedContractAddress, resetAddress} = this.props;
    return (
      <div>
        <h3>Selected contract:</h3>
        <p>{selectedContractAddress}</p>
        <div>
          <FlatButton
            label="Select another contract"
            primary={true}
            onClick={resetAddress}
          />
        </div>
      </div>
    );
  }
}

ContractSelectionResetter.propTypes = {
  selectedContractAddress: PropTypes.string,
  resetAddress: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
    selectedContractAddress: contractAddressSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    resetAddress: () => dispatch(setContractAddress(null))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContractSelectionResetter);
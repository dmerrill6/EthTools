import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import Notice from '../visual/Notice';
import {loadMetamask} from '../../redux/actions/web3';
import {web3Selector} from '../../redux/selectors/web3';


class MetamaskLoader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      showSnackbar: false
    }
  }
  componentDidMount() {
    // We set a timeout so that metamask loading dialog can be read.
    setTimeout(() => {
      this.props.loadMetamask();
    }, 2000);
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.web3 && !this.props.web3 && !nextProps.web3.hasOwnProperty('error')) { // Web3 Loaded
      this.setState({showSnackbar: true})
    }
  };


  handleSnackbarClose () {
    this.setState({showSnackbar: false})
  }

  render() {
    return (
      <React.Fragment>
        <Notice active={!this.props.web3} type='warning'>
          <CircularProgress />
          <span style={{marginLeft: 10}}>Connecting to the Blockchain</span>
        </Notice>
        <Snackbar
          open={this.state.showSnackbar}
          message='Connected to Web3 through Metamask'
          autoHideDuration={2500}
          onRequestClose={this.handleSnackbarClose.bind(this)}
        />
      </React.Fragment>
    );
  }
}

MetamaskLoader.propTypes = {
  loadMetamask: PropTypes.func,
  web3: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    web3: web3Selector(state)
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMetamask: () => dispatch(loadMetamask())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MetamaskLoader);
import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';

const functionParamsAsString = (inputs) => {
  const paramsText = inputs.reduce((prev, input, i) => {
    return `${prev}${i === 0 ? '' : ', '}${input.name}:${input.type}`
  }, '');
  return `(${paramsText})`;
}

class Function extends React.Component {
  constructor () {
    super();
    this.state = {
      inputValues: {}
    };
  }
  render () {
    const { name = '', inputs = [], onFunctionCall = () => {} } = this.props;
    let secondaryText = '0 Parameters';
    if (inputs.length > 0) {
      secondaryText = functionParamsAsString(inputs);
    }
    const inputValuesAsArr = Object.keys(this.state.inputValues)
                                   .map(key => this.state.inputValues[key]);

    return (
      <ListItem
        primaryText={name}
        secondaryText={secondaryText}
        primaryTogglesNestedList
        leftAvatar={<Avatar>{name[0]}</Avatar>}
        nestedItems={[...inputs.map((input) => (
          <div>
            {input.name}
          </div>
        )), (
          <FlatButton 
            label={`Execute ${name}${functionParamsAsString(inputValuesAsArr)}`}
            onClick={() => onFunctionCall(this.state.inputValues)} />
        )]}
      />
    )
  }

}

export default Function;
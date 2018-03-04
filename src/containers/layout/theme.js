import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import colors from '../../utils/variables/colors';

const getTheme = () => {
  let overwrites = {
    "palette": colors
  };
  return getMuiTheme(baseTheme, overwrites);
}

export default getTheme;
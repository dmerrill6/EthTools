import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

const getTheme = () => {
  let overwrites = {
    "palette": {
      "primary1Color": "#5B2333",
      "primary2Color": "#1446A0",
      "primary3Color": "#1B2432",
      "accent1Color": "#F24333",
      "canvasColor": "#F7F4F3",
      "pickerHeaderColor": "#F24333"
    }
  };
  return getMuiTheme(baseTheme, overwrites);
}

export default getTheme;
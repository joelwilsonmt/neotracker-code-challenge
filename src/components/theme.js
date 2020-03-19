import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#673ab7',
        },
        secondary: {
            main: '#689f38',
        },
        error: {
            main: "#ff6f00",
        },
        background: {
            default: '#fff',
        },
    },
});

export default theme;

// const getTheme = () => {
//   let overwrites = {
//     "palette": {
//         "primary1Color": "#673ab7",
//         "primary2Color": "#ff6f00",
//         "accent1Color": "#689f38",
//         "pickerHeaderColor": "#673ab7"
//     }
// };
//   return getMuiTheme(baseTheme, overwrites);
// }
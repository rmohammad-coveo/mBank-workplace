import {createTheme} from '@mui/material/styles';
import {red} from '@mui/material/colors';

export const Theme = {
  primaryText : '#181d3a',
  secondaryText: '#4a4a4a',
  sidePanelNav: '#777777',
  primary : '#ae0000',
  secondary: '#004990',
  selection : '#6b6bbd',
  link: '#1372EC',
  navbar: '#FFFFFF',
  background: '#E5E5E5',
  button : '#6b6bbd',
  footer: '#262646',
  resultLink: '#181d3a',
  excerpt : '#626971',
  headerIconColor : "#023f88"
}

const theme = createTheme({
  palette: {
    mode: 'light',
    text :{
      primary : Theme.primaryText
    },
    primary: {
      main: Theme.primary,
    },
    secondary: {
      main: Theme.secondary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    fontFamily: 'canada-type-gibson, Montserrat, Tetra, Tetra-Bold, Gibson,Noto Sans, Avenir, Helvetica, Arial, sans-serif',
    // Material-UI uses rem units for the font size. This will change the base size for the entire search page
    // More info at https://material-ui.com/customization/typography/#font-size
    fontSize: 13,
    fontWeightRegular : '300',
    fontWeightMedium : '400'
  },
});

export default theme;

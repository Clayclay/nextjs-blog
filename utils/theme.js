import { createTheme } from '@mui/material/styles';



// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#0052cc',
    },
    secondary: {
      main: '#edf2ff',
    },
  },


  components: {
    // the component name defined in the `name` parameter
    // of the `styled` API
    MuiStat: {
      styleOverrides: {
        // the slot name defined in the `slot` and `overridesResolver` parameters
        // of the `styled` API
        root: {
          backgroundColor: '#FFD000',
        },
        value: {
          color: '#fff',
        },
        unit: {
          color: '#888',
        },
      },
    },
  },
});
export default theme;
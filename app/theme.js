import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';
// Create a theme instance.
const theme = createTheme({
    components: {
        // the component name defined in the `name` parameter
        // of the `styled` API
        MuiStat: {
          styleOverrides: {
            // the slot name defined in the `slot` and `overridesResolver` parameters
            // of the `styled` API
            root: {
              backgroundColor: '#121212',
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
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";

type ThemeProp = {
    children: JSX.Element;
}

export enum themeSizes {
  FSbuttonSmall = 25,
  FSbutton = 35,
  FSbuttonLarge = 40,
  FStext = 18,
}

export enum themePalette {
    BG = "#A6C1D3",
    CELESTECORE = "#A6C1D3",
    CELESTECORELIGTH = "#B7CDDB",
    CELESTECOREDARK = "#748793",
    NARANJACORE = "#F97A00",
    NARANJACORELIGTH = "#FA9433",
    NARANJACOREDARK = "#AE5500",
    WHITECORE = "#F0F0F0",
    GRISCORE = "#9B999F",
    BLACKCORE = "#000000",
    FONT_GLOBAL = "'Montserrat-Medium', monospace",
}

const theme = createTheme ({
    
    palette: {
        mode: 'light',
        background: {
            default: themePalette.BG,
        },
        secondary: {
            light:themePalette.CELESTECORELIGTH,
            main: themePalette.CELESTECORE,
            dark: themePalette.CELESTECOREDARK,
            contrastText: themePalette.BLACKCORE,
        },
        primary: {
            light:themePalette.NARANJACORELIGTH,
            main: themePalette.NARANJACORE,
            dark: themePalette.NARANJACOREDARK, 
            contrastText: themePalette.WHITECORE,
        },
        info:{
            main: themePalette.WHITECORE,
            contrastText: '#000',
        },
        neutral:{
            main: themePalette.BLACKCORE,
            contrastText: '#fff',
        },
        warning:{
          main: themePalette.NARANJACORELIGTH,
          contrastText: '#000',
        }
    },
    typography: {
        fontFamily: themePalette.FONT_GLOBAL,
        fontSize: themeSizes.FStext,
    },
    components: {
      MuiButton:{
        styleOverrides: {
          root: {
            fontWeigth: 'bold',
            '&:hover':{
              backgroundColor: '#000',
              color: '#fff',
            },
            '& .MuiSvgIcon-root': {
              fontSize: themeSizes.FSbutton,
            },
          }
        }
      },
      MuiSvgIcon:{
        styleOverrides: {
          root: {
            fontSize: themeSizes.FSbutton,
          }
        }
      }
    }
});

declare module '@mui/material/styles' {
    interface Palette {
      neutral: Palette['primary'];
    }
  
    // allow configuration using `createTheme`
    interface PaletteOptions {
      neutral?: PaletteOptions['primary'];
    }
  }
  
  // Update the Button's color prop options
  declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/TextField' {
    interface TextFieldPropsColorOverrides {
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/FormControl' {
    interface FormControlPropsColorOverrides{
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/Checkbox'{
    interface CheckboxPropsColorOverrides {
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/InputLabel'{
    interface InputLabelPropsColorOverrides{
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/IconButton'{
    interface IconButtonPropsColorOverrides{
      neutral: true;
      info: true;
    }
  }

  declare module '@mui/material/AppBar'{
    interface AppBarPropsColorOverrides{
      neutral: true;
      info: true;
    }
  }

  // const theme = createMuiTheme({
  //   overrides: {
  //     MuiButton: {
  //       disabled: {
  //         backgroundColor: 'red',
  //         color: 'white',
  //       },
  //     },
  //   },
  // });
  // declare module '@mui/icons-material/DocumentScanner'{
  //   interface IconPropsSizeOverrides {
  //     neutral: ;
  //   }
  // }

export const ThemeConfig: React.FunctionComponent<ThemeProp> = ({ children }) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
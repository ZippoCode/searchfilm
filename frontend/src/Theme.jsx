import { createMuiTheme } from '@material-ui/core/styles';

const rawTheme = createMuiTheme({
    palette: {
        primary: {
            main: '#EA4C4C',
        },
        secondary: {
            main: '#0E2431',
        },
        text: {
            primary: '#45969b',
            secondary: '#FAF4D0'
        }
    },
    typography: {
        fontFamily: "Pontano Sans, sans-serif",
    }
})

/*
BACKGROUND #F5E4C3
#FAF4D0
#FAF4D0
#EA4C4C
TEXT #C14545 
*/

export const theme = createMuiTheme({
    ...rawTheme,
});

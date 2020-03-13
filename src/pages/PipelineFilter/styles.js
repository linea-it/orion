import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';


export const styles = makeStyles((theme) => ({
    margin: {
        margin: '0 15px 0 0',
    },
    bootstrapFormLabel: {
        color: '#fff',
        top: '50%',
        margin: '-10px 0 0',
        fontSize: '23px',
    },
}));

export const bootstrapInput = withStyles(theme => ({
    root: {
        'label + &': {
            marginLeft: theme.spacing.unit * 10.5,
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        width: '120px',
        padding: '5px 25px 5px 5px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            backgroundColor: theme.palette.background.paper,
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.1rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);
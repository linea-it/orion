import { makeStyles } from '@material-ui/core/styles';

const style = {
    comment: {
        fontFamily: "Open Sans, Helvetica Neue, sans-serif",
        fontSize: "14px",
        borderBottom: '1px solid #ccc',
        marginBottom: '10px',
        paddingBottom: '10px',
        width: '100%',
    },
    card: {
        zIndex: '99',
        position: 'relative',
    },
};

const classe = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export {style, classe};
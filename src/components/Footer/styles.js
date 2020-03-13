import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: '99',
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    versionLink: {
        color: '#d2cf00',
        textDecoration: 'none',
        fontSize: '0.9rem',
        cursor: 'pointer',
    },
}));

export default styles;
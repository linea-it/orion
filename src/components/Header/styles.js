import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        minHeight: '53px'
    },
        menuButton: {
        marginLeft: -13,
        marginRight: 10,
    },
        AppBar: {
        boxShadow: 'none',
        zIndex: '99',
    },
    separatorToolBar: {
        flexGrow: 1,
    },
}));

export default styles;
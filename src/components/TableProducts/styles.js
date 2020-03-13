import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    wrapPaper: {
        position: 'relative',
    },
    gridRow: {
        display: 'grid',
        gridTemplateColumns: '50% 50%',
        height: 'calc(100vh - 176px)',
    },
    gridCol: {
        textAlign: 'center',
        border: 'solid 1px #ccc',
        overflowY: 'auto',
        marginTop: 10,
    },
}));

export default styles;
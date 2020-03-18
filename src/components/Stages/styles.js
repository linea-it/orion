import { makeStyles } from '@material-ui/core/styles';

const style = {
  button: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '2em',
    display: 'block',
    margin: '0 auto',
    fontSize: '1em',
  },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
  },
  btnFailure: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnRunning: {
    backgroundColor: '#ffba01',
    color: '#000',
  },
  btnRuns: {
    minWidth: '2em',
    background: '#fff',
  },
  stageTitle: {
    margin: '0',
    fontSize: '1.3em',
    textAlign: 'left',
  },
  pipelineColumn: {
    textAlign: 'left',
  },
};

const buttonStyles = makeStyles(() => ({
  button: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '2em',
    display: 'block',
    margin: '0 auto',
    fontSize: '1em',
  },
}));

export { style, buttonStyles };

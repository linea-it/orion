import React, { useState, useEffect } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Centaurus from '../../api';

const useStyles = makeStyles({
  margin: {
    margin: '0 15px 0 0',
  },
  bootstrapFormLabel: {
    color: '#fff',
    top: '50%',
    margin: '-10px 0 0',
    fontSize: '23px',
  },
});

const BootstrapInput = withStyles(theme => ({
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

function PipelineFilter() {
  const classes = useStyles();
  const [selectedPipeline, setSelectedPipeline] = useState(1);
  const [stages, setStages] = useState([]);

  const handleChangePipelines = e => setSelectedPipeline(e.target.value);

  useEffect(() => {
    Centaurus.getAllPipelineStageList()
      .then(res =>
        setStages(res.pipelineStageList.edges.map(row => ({ ...row.node })))
      )
      .catch(err => console.error(err));
  }, []);

  // useEffect(() => {}, [stages]);

  return (
    <form>
      <FormControl className={classes.margin}>
        <InputLabel
          shrink
          htmlFor="age-customized-native-simple"
          className={classes.bootstrapFormLabel}
          focused={false}
        >
          Pipelines:
        </InputLabel>
        <NativeSelect
          value={selectedPipeline}
          onChange={handleChangePipelines}
          input={
            <BootstrapInput name="pipeline" id="age-customized-native-simple" />
          }
        >
          <option value={0}>All</option>
          <option value={1}>Executed</option>
          <option value={2}>Not Executed</option>
          <option value={3}>Deleted</option>
          <option value={4}>Saved</option>
        </NativeSelect>
      </FormControl>
    </form>
  );
}

export default PipelineFilter;

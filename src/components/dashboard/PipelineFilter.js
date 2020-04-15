import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
  bootstrapFormLabelStatus: {
    color: '#fff',
    top: '50%',
    margin: '-10px 20px 0',
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

function PipelineFilter({
  pipelinesFilterList,
  handleChangePipelines,
  pipelineFilterSelectedId,
  pipelinesStatusFilterList,
  handleChangePipelinesStatus,
  pipelineStatusFilterSelectedId,
}) {
  const classes = useStyles();

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
          value={pipelineFilterSelectedId}
          onChange={handleChangePipelines}
          input={
            <BootstrapInput name="pipeline" id="age-customized-native-simple" />
          }
        >
          {pipelinesFilterList.map(filter => (
            <option key={filter.id} value={filter.id}>
              {filter.displayName}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel
          shrink
          htmlFor="age-customized-native-simple"
          className={classes.bootstrapFormLabelStatus}
          focused={false}
        >
          Status:
        </InputLabel>
        <NativeSelect
          className={classes.statusSelect}
          value={pipelineStatusFilterSelectedId}
          onChange={handleChangePipelinesStatus}
          input={
            <BootstrapInput name="pipeline" id="age-customized-native-simple" />
          }
        >
          {pipelinesStatusFilterList.map(filter => (
            <option key={filter.id} value={filter.id}>
              {filter.displayName}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </form>
  );
}

PipelineFilter.propTypes = {
  pipelinesFilterList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangePipelines: PropTypes.func.isRequired,
  pipelineFilterSelectedId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  pipelinesStatusFilterList: PropTypes.arrayOf(PropTypes.object).isRequired,
  handleChangePipelinesStatus: PropTypes.func.isRequired,
  pipelineStatusFilterSelectedId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
};

export default PipelineFilter;

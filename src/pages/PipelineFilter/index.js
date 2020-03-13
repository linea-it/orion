import React from 'react';
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {styles, bootstrapInput} from './styles';


function PipelineFilter({
  pipelinesFilterList,
  handleChangePipelines,
  pipelineFilterSelectedId,
}) {
  
  const classes = styles();
  const BootstrapInput = bootstrapInput;

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
};

export default PipelineFilter;

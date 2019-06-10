import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import CircularProgress from '@material-ui/core/CircularProgress';

import Centaurus from '../../api';
import moment from 'moment';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginLeft: theme.spacing.unit * 9,
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

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: '0 15px 0 0',
  },
  bootstrapFormLabel: {
    color: '#fff',
    top: '50%',
    margin: '-10px 0 0',
    fontSize: '23px',
  },
  filter: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
    marginTop: '53px',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: '9',
  },
  loading: {
    position: 'absolute',
    top: '50vh',
    left: '50vw',
    margin: '-50px 0 0 -20px',
    zIndex: '99',
  },
});

class ReleaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      optsRelease: [],
      optsFields: [],
      pipelineStages: [],
      selectRelease: '',
      selectField: '',
    };
  }

  static propTypes = {
    classes: PropTypes.object,
    saveStage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.loadReleases();
  }

  handleChangeReleases = evt => {
    this.setState({ selectRelease: evt.target.value });
    if (evt.target.value !== '') {
      this.loadFields(evt.target.value);
      this.props.saveStage([]);
    } else {
      this.props.saveStage([]);
      this.clearFields();
    }
  };

  handleChangeFields = evt => {
    this.setState({ selectField: evt.target.value });
    if (evt.target.value !== '') {
      this.loadStage(evt.target.value);
    } else {
      this.props.saveStage([]);
    }
  };

  clearFields = () => {
    this.setState({ optsFields: [], selectField: '' });
  };

  /* Valid field */
  isValid = () => {
    return this.state.optsFields.length !== 0;
  };

  loadStart = () => {
    this.setState({ loading: true });
  };

  loadEnd = () => {
    this.setState({ loading: false });
  };

  loadReleases = async () => {
    const releaseTag = await Centaurus.getAllReleaseTag();

    if (
      releaseTag &&
      releaseTag.releaseTagList &&
      releaseTag.releaseTagList.edges
    ) {
      const optsReleaseLocal = releaseTag.releaseTagList.edges.map(e => {
        return {
          id: e.node.id,
          releaseDisplayName: e.node.releaseDisplayName,
          tagId: e.node.tagId,
        };
      });
      this.setState({
        optsRelease: optsReleaseLocal,
      });
    } else {
      return null;
    }
  };

  loadFields = async dataField => {
    const fieldsTag = await Centaurus.getAllFieldsTag(dataField);

    if (fieldsTag && fieldsTag.fieldsByTagId) {
      const optsFieldsLocal = fieldsTag.fieldsByTagId.map(e => {
        return {
          id: e.id,
          displayName: e.displayName,
          fieldId: e.fieldId,
        };
      });
      this.setState({
        optsFields: optsFieldsLocal,
      });
    } else {
      this.clearFields();
    }
  };

  loadStage = async dataStage => {
    const pipelineStage = await Centaurus.getAllPipelineStageList(dataStage);

    if (
      pipelineStage &&
      pipelineStage.pipelineStageList &&
      pipelineStage.pipelineStageList.edges
    ) {
      const pipelineStages = pipelineStage.pipelineStageList.edges.map(e => {
        return {
          name: e.node.displayName,
          id: e.node.pipelineStageId,
          level: e.node.level,
        };
      });
      this.loadTableStages(pipelineStages);
      this.loadStart();
    } else {
      return null;
    }
  };

  loadTableStages = async pipelineStages => {
    // eslint-disable-next-line
    const tableStage = await Promise.all(
      pipelineStages.map(async stage => {
        const rows = await Centaurus.getAllPipelinesByFieldIdAndStageId(
          this.state.selectField,
          stage.id
        );

        return {
          tableLevel: stage.level,
          tableName: stage.name,
          rows: {
            pipelinesByFieldIdAndStageId: rows.pipelinesByFieldIdAndStageId.map(
              row => {
                const startTime = moment(row.process.startTime);
                const endTime = moment(row.process.endTime);
                const diff = endTime.diff(startTime);
                const duration = moment.utc(diff).format('HH:mm:ss');
                return {
                  pipeline: row.displayName,
                  pipelineId: row.pipelineId,
                  fieldId: this.state.selectField,
                  start: row.process.startTime,
                  duration:
                    row.process.startTime && row.process.endTime !== null
                      ? duration
                      : '-',
                  runs: row.process.processCount,
                  status: row.process.status,
                };
              }
            ),
          },
        };
      })
    );
    this.props.saveStage(tableStage);
    this.loadEnd();
  };

  renderLoading = () => {
    const { classes } = this.props;

    if (!this.state.loading) return null;

    if (
      this.state.optsRelease.length !== 0 &&
      this.state.optsFields.length !== 0
    ) {
      return <CircularProgress className={classes.loading} />;
    }
  };

  renderFilter = () => {
    const { classes } = this.props;
    return (
      <form>
        <FormControl className={classes.margin}>
          <InputLabel
            shrink
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            focused={false}
          >
            Release:
          </InputLabel>
          <NativeSelect
            value={this.state.selectRelease}
            onChange={this.handleChangeReleases}
            input={
              <BootstrapInput
                name="release"
                id="age-customized-native-simple"
              />
            }
          >
            <option value="" />
            {/* <option value="all">All</option> */}
            {this.state.optsRelease.map(opt => {
              return (
                <option key={opt.id} value={opt.tagId}>
                  {opt.releaseDisplayName}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin}>
          <InputLabel
            shrink
            htmlFor="age-customized-native-simple"
            className={classes.bootstrapFormLabel}
            focused={false}
          >
            Dataset:
          </InputLabel>
          <NativeSelect
            value={this.state.selectField}
            onChange={this.handleChangeFields}
            disabled={!this.isValid()}
            input={
              <BootstrapInput
                name="dataset"
                id="age-customized-native-simple"
              />
            }
          >
            <option value="" />
            {/* <option value="all">All</option> */}
            {this.state.optsFields.map(opt => {
              return (
                <option key={opt.id} value={opt.fieldId}>
                  {opt.displayName}
                </option>
              );
            })}
          </NativeSelect>
        </FormControl>
      </form>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" color="default" className={classes.filter}>
        <Toolbar variant="dense" style={{ position: 'relative' }}>
          {this.renderFilter()}
          {this.renderLoading()}
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(ReleaseFilter);

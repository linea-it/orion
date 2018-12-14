import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FadeLoader } from 'halogenium';

import Centaurus from '../api';

const styles = {
  fadeLoaderFull: {
    position: 'absolute',
    paddingLeft: 'calc((100vw - 40px) / 2)',
    paddingTop: 'calc(25vh)',
  },
  fadeLoader: {
    position: 'absolute',
    paddingLeft: 'calc((100vw - 13px) / 2)',
    paddingTop: 'calc(35vh)',
    zIndex: '999',
  },
};

class ReleaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      optsRelease: [],
      optsFields: [],
      pipelineStages: [],
      selectRelease: '',
      selectFild: '',
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
    const opts = this.state.optsRelease;
    opts['selectRelease'] = evt.target.value;

    this.setState(opts);
    this.loadFields(evt.target.value);
    this.props.saveStage([]);
  };

  handleChangeFields = evt => {
    this.setState({ SelectFild: evt.target.value });
    this.loadStage(evt.target.value);
  };

  clearFields = () => {
    this.setState({ optsFields: [] });
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
      const optsRelease = releaseTag.releaseTagList.edges.map(e => {
        return {
          id: e.node.id,
          releaseDisplayName: e.node.releaseDisplayName,
          tagId: e.node.tagId,
        };
      });
      this.setState({
        optsRelease,
      });
    } else {
      return null;
    }
  };

  loadFields = async dataField => {
    const fieldsTag = await Centaurus.getAllFieldsTag(dataField);

    if (fieldsTag && fieldsTag.fieldsByTagId) {
      const optsFields = fieldsTag.fieldsByTagId.map(e => {
        return {
          id: e.id,
          displayName: e.displayName,
          releaseTagId: e.releaseTagId,
        };
      });
      this.setState({
        optsFields,
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
        const rows = await Centaurus.getAllPipelinesByStageId(stage.id);

        return {
          tableLevel: stage.level,
          tableName: stage.name,
          rows: rows,
        };
      })
    );
    this.props.saveStage(tableStage);
    this.loadEnd();
  };

  renderLoading = () => {
    const { classes } = this.props;

    if (!this.state.loading) return null;
    const showControls = this.state.optsRelease || this.state.optsFields;
    const classLoading = showControls
      ? styles.fadeLoader
      : styles.fadeLoaderFull;

    if (
      this.state.optsRelease.length !== 0 &&
      this.state.optsFields.length !== 0
    ) {
      return (
        <div className={classes.loading}>
          <FadeLoader
            style={classLoading}
            color="#424242"
            size="16px"
            margin="4px"
          />
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <form className="form-inline">
          <label className="sr-only" htmlFor="inlineFormInput">
            Release:
          </label>
          <select
            className="form-control form-control-sm sel"
            onChange={this.handleChangeReleases}
            value={this.state.selectRelease}
          >
            <option value="" />
            <option value="all">All</option>
            {this.state.optsRelease.map(opt => {
              return (
                <option key={opt.id} value={opt.tagId}>
                  {opt.releaseDisplayName}
                </option>
              );
            })}
          </select>

          <label className="sr-only" htmlFor="inlineFormInputGroup">
            Dataset:
          </label>
          <select
            className="form-control form-control-sm sel"
            onChange={this.handleChangeFields}
            value={this.state.selectField}
            disabled={!this.isValid()}
          >
            <option value="" />
            <option value="all">All</option>
            {this.state.optsFields.map(opt => {
              return (
                <option key={opt.id} value={opt.releaseTagId}>
                  {opt.displayName}
                </option>
              );
            })}
          </select>
        </form>
        {this.renderLoading()}
      </div>
    );
  }
}

export default withStyles(styles)(ReleaseFilter);

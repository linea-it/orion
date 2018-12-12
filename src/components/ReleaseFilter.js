import React, { Component } from 'react';
import Proptypes from 'prop-types';

import Centaurus from '../api';

export default class ReleaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      optsRelease: [],
      optsFields: [],
      pipelineStages: [],
    };
  }

  static propTypes = {
    saveStage: Proptypes.func.isRequired,
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadReleases();
  }

  handleChangeReleases = evt => {
    this.loadFields(evt.target.value);
  };

  handleChangeFields = evt => {
    this.loadStage(evt.target.value);
  };

  /* Valid field */
  isValid = () => {
    return this.state.optsFields.length !== 0;
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
        loading: false,
      });
    } else {
      this.setState({ loading: false });
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
        loading: false,
      });
    } else {
      this.setState({ loading: false, optsFields: [] });
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
    } else {
      this.setState({ loading: false });
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
  };

  render() {
    return (
      <form className="form-inline">
        <label className="sr-only" htmlFor="inlineFormInput">
          Release:
        </label>
        <select
          className="form-control form-control-sm sel"
          onChange={this.handleChangeReleases}
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
    );
  }
}

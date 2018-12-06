import React, { Component } from 'react';
import Proptypes from 'prop-types';

import Centaurus from '../api';

export default class ReleaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optsRelease: [],
      optsFields: [],
      pipelineStages: [],
      loading: false,
      selectRelease: '',
      selectFields: '',
      selectPipelineStage: '',
    };
  }

  static propTypes = {
    saveStage: Proptypes.func.isRequired,
  };

  handleChangeReleases = evt => {
    this.setState({ selectRelease: evt.target.value });
    this.loadFields(evt.target.value);
  };

  handleChangeFields = evt => {
    this.setState({ selectFields: evt.target.value });
    this.loadStage(evt.target.value);
  };

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadReleases();
  }

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
      this.setState({ loading: false });
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
          id: e.node.id,
          displayName: e.node.displayName,
          pipelineStageId: e.node.pipelineStageId,
          level: e.node.level,
        };
      });
      this.loadTableStages(pipelineStages);
    } else {
      this.setState({ loading: false });
    }
  };

  loadTableStages = async pipelineStages => {
    const stages = pipelineStages.map(data => {
      return {
        id: data.pipelineStageId,
        name: data.displayName,
        level: data.level,
      };
    });

    const tableStage = await Promise.all(
      stages.map(async stage => {
        const rows = await Centaurus.getAllPipelinesByStageId(stage.id);

        // DADOS FIXOS PARA TESTES
        // let rows = await Centaurus.getAllPipelinesByStageId(stage.id);
        // rows = {
        //   pipelinesByStageId: [
        //     {
        //       displayName: 'Install',
        //       start: '2015-11-03 11:39:36',
        //       duration: '00:00:54',
        //       runs: '5',
        //       status: 'success',
        //     },
        //     {
        //       displayName: 'Catalog',
        //       start: '2018-6-10 13:58:23',
        //       duration: '02:21:12',
        //       runs: '8',
        //       status: 'invalid',
        //     },
        //     {
        //       displayName: 'Zeropoint',
        //       start: '2017-10-08 05:23:45',
        //       duration: '10:07:05',
        //       runs: '2',
        //       status: 'failure',
        //     },
        //   ],
        // };

        return {
          tableLevel: stage.level,
          tableName: stage.name,
          rows: rows,
        };
      })
    );
    this.props.saveStage(tableStage);
    // this.setState({ loading: false });
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

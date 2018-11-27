import React, { Component } from 'react';

import ReleaseFilter from '../components/ReleaseFilter';
import TableDataInstalation from '../components/dashboard/TableDataInstalation';
import TableDataPreparation from '../components/dashboard/TableDataPreparation';
import TableScienceReadyCatalogs from '../components/dashboard/TableScienceReadyCatalogs';
import TableSpecialSamples from '../components/dashboard/TableSpecialSamples';
import TableScienceWorkflows from '../components/dashboard/TableScienceWorkflows';
import TableUtilities from '../components/dashboard/TableUtilities';
import Stages from '../components/dashboard/Stages';

import '../assets/css/dashboard.css';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
    };
  }

  saveStage = pipelineStages => {
    this.setState({ rows: pipelineStages });
  };

  render() {
    return (
      <div className="dashboard">
        <p className="h6 text-center headerTitle">
          DES Science Portal Dashboard
        </p>
        <div className="row">
          <div className="filter">
            <ReleaseFilter saveStage={this.saveStage} />
          </div>
        </div>
        <div className="a01 row">
          <div className="a01-1 col-sm-12 col-md-6 px-0">
            <Stages rows={this.state.rows} />
            <TableDataInstalation />
            <TableDataPreparation />
            <TableScienceReadyCatalogs />
          </div>
          <div className="a01-2 col-sm-12 col-md-6 px-0">
            <TableSpecialSamples />
            <TableScienceWorkflows />
            <TableUtilities />
          </div>
        </div>
      </div>
    );
  }
}

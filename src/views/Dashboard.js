import React, { Component } from 'react';

import ReleaseFilter from '../components/ReleaseFilter';
// import TableDataInstalation from '../components/dashboard/TableDataInstalation';
// import TableDataPreparation from '../components/dashboard/TableDataPreparation';
// import TableScienceReadyCatalogs from '../components/dashboard/TableScienceReadyCatalogs';
// import TableSpecialSamples from '../components/dashboard/TableSpecialSamples';
// import TableScienceWorkflows from '../components/dashboard/TableScienceWorkflows';
// import TableUtilities from '../components/dashboard/TableUtilities';
import Stages from '../components/dashboard/Stages';

import '../assets/css/dashboard.css';

const styles = {
  // odd: {},
  // even: {},
  grid: {
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridGap: '10px',
    // grid: 'auto auto',
  },
  wrapper: {
    border: 'solid 1px #ccc',
  },
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
    };
  }

  saveStage = tableStages => {
    this.setState({ tables: tableStages });
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
        <div className="row" style={styles.wrapper}>
          <div style={styles.grid}>
            {this.state.tables.map((table, index) => {
              // const style = index % 2 == 0 ? styles.even : styles.odd;
              return (
                <Stages
                  key={index}
                  rows={table.rows.pipelinesByStageId}
                  title={table.tableName}
                />
              );
            })}
          </div>
        </div>
        {/* <div className="a01 row">
          <div className="a01-1 col-sm-12 col-md-6 px-0">
            <p>Teste</p>
          </div>
          <div className="a01-2 col-sm-12 col-md-6 px-0">
            <p>Teste</p>
          </div>
        </div> */}
      </div>
    );
  }
}

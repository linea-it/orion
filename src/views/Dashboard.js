import React, { Component } from 'react';

import ReleaseFilter from '../components/ReleaseFilter';
import Stages from '../components/dashboard/Stages';

import '../assets/css/dashboard.css';

// const styles = {
//   // odd: {},
//   // even: {},
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'auto auto',
//     gridGap: '10px',
//     // grid: 'auto auto',
//     border: 'solid 1px #ccc',
//     height: 'calc(100vh - 195px)',
//     width: '100%',
//   },
// };

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
        {/* <div className="row">
          <div style={styles.grid}>
            {this.state.tables.map((table, index) => {
              // const style = index % 2 == 0 ? styles.even : styles.odd;
              if (table.tableLevel <= 3) {
                return (
                  <Stages
                    key={index}
                    title={table.tableName}
                    rows={table.rows.pipelinesByStageId}
                    level={table.tableLevel}
                  />
                );
              }
              return null;
            })}
          </div>
        </div> */}
        <div className="a01 row">
          <div className="a01-1 col-sm-12 col-md-6 px-0">
            {this.state.tables.map((table, index) => {
              if (table.tableLevel <= 3) {
                return (
                  <Stages
                    key={index}
                    title={table.tableName}
                    rows={table.rows.pipelinesByStageId}
                    // level={table.tableLevel}
                  />
                );
              }
              return null;
            })}
          </div>
          <div className="a01-2 col-sm-12 col-md-6 px-0">
            {this.state.tables.map((table, index) => {
              if (table.tableLevel > 3) {
                return (
                  <Stages
                    key={index}
                    title={table.tableName}
                    rows={table.rows.pipelinesByStageId}
                    // level={table.tableLevel}
                  />
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
    );
  }
}

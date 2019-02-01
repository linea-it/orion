import React, { Component } from 'react';

import ReleaseFilter from '../components/ReleaseFilter';
import Stages from '../components/dashboard/Stages';

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
        <div className="row">
          <div className="filter">
            <ReleaseFilter saveStage={this.saveStage} />
          </div>
        </div>
        <div className="a01 row">
          <div className="a01-1 col-sm-12 col-md-6 px-0">
            {this.state.tables.map((table, index) => {
              if (table.tableLevel <= 3) {
                return (
                  <Stages
                    key={index}
                    title={table.tableName}
                    rows={table.rows.pipelinesByFieldIdAndStageId}
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
                    rows={table.rows.pipelinesByFieldIdAndStageId}
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

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Paper from '@material-ui/core/Paper';
import ReleaseFilter from '../dashboard/ReleaseFilter';
import Stages from '../dashboard/Stages';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  wrapPaper: {
    position: 'relative',
  },
  gridRow: {
    display: 'grid',
    gridTemplateColumns: '50% 50%',
    height: 'calc(100vh - 186px)',
  },
  gridCol: {
    textAlign: 'center',
    border: 'solid 1px #ccc',
    overflowY: 'auto',
  },
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tables: [],
    };
  }

  static propTypes = {
    classes: PropTypes.object.isRequired,
  };

  saveStage = tableStages => {
    /* 
      ORDER OF RIGHT SIDE TABLES:
        4. Special Samples
        5. Simulations,
        6. Science Analysis
        7. Utilities
    */
    const orderedTables = tableStages
      .map(table => {
        let tableLevel = 0;
        if (table.tableLevel === 4) {
          tableLevel = 5;
        } else if (table.tableLevel === 5) {
          tableLevel = 7;
        } else if (table.tableLevel === 7) {
          tableLevel = 4;
        } else {
          tableLevel = table.tableLevel;
        }
        return {
          tableLevel: tableLevel,
          tableName: table.tableName,
          rows: table.rows,
        };
      })
      .sort((a, b) => {
        if (a.tableLevel !== b.tableLevel) {
          return a.tableLevel - b.tableLevel;
        }
      });

    this.setState({ tables: orderedTables });
  };

  renderContent = () => {
    const { classes } = this.props;
    return (
      <div className={classes.gridRow}>
        <div className={classes.gridCol} style={{ marginRight: '5px' }}>
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
        <div className={classes.gridCol} style={{ marginLeft: '5px' }}>
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
    );
  };

  renderDashboard = () => {
    return (
      <div>
        <ReleaseFilter saveStage={this.saveStage} />
        {this.renderContent()}
      </div>
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper elevation={0} className={classes.wrapPaper}>
        {this.renderDashboard()}
      </Paper>
    );
  }
}

export default withStyles(styles)(Dashboard);

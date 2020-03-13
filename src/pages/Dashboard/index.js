import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import ReleaseFilter from '../ReleaseFilter/';
import Stages from '../../components/Stages/';
import styles from './styles';



function Dashboard() {

  const classes = styles();
  const [state, setState] = useState({tables: []});

  const saveStage = tableStages => {
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

    setState({ tables: orderedTables });
  };

  const renderContent = () => {
    const classes = styles();

    return (
      <div className={classes.gridRow}>
        <div className={classes.gridCol} style={{ marginRight: '5px' }}>
          {state.tables.map((table, index) => {
            if (table.tableLevel <= 3) {
              return (
                <Stages
                  key={index}
                  title={table.tableName}
                  rows={table.rows.pipelinesByFieldIdAndStageId.sort((a, b) =>
                    `${a.startTime}T${a.start}` > `${b.startTime}T${b.start}`
                      ? 1
                      : -1
                  )}
                />
              );
            }
            return null;
          })}
        </div>
        <div className={classes.gridCol} style={{ marginLeft: '5px' }}>
          {state.tables.map((table, index) => {
            if (table.tableLevel > 3) {
              return (
                <Stages
                  key={index}
                  title={table.tableName}
                  rows={table.rows.pipelinesByFieldIdAndStageId.sort((a, b) =>
                    `${a.startTime}T${a.start}` > `${b.startTime}T${b.start}`
                      ? 1
                      : -1
                  )}
                />
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div>
        <ReleaseFilter saveStage={saveStage} />
        {renderContent()}
      </div>
    );
  };

  return (
    <Paper elevation={0} className={classes.wrapPaper}>
      {renderDashboard()}
    </Paper>
  );
}

export default (Dashboard);

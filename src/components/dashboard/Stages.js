import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Centaurus from '../../api';
import moment from 'moment';

import TableProcess from './TableProcess';

const styles = {
  button: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '2em',
    display: 'block',
    margin: '0 auto',
  },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
  },
  btnFailure: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnRuns: {
    minWidth: '2em',
    background: '#fff',
  },
  stageTitle: {
    margin: '0',
    fontSize: '1.3em',
    textAlign: 'left',
  },
};

class Stages extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'pipeline',
        header: 'Pipeline',
      },
      {
        field: 'start',
        header: 'Start',
      },
      {
        field: 'duration',
        header: 'Duration',
      },
      {
        field: 'runs',
        header: 'Runs',
        body: this.actionRuns,
      },
      {
        field: 'status',
        header: 'Status',
        body: this.actionStatus,
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
      visible: false,
      pipelineProcesses: [],
    };
  }

  static propTypes = {
    title: PropTypes.string,
    rows: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  onShowRuns = rowData => {
    this.onClickModal(rowData);
    this.loadTableProcesses(rowData);
  };

  onShowStatus = rowData => {
    console.log('onShowStatus: ', rowData);
  };

  onClickModal = () => {
    this.setState({ visible: true });
  };

  onHideModal = () => {
    this.setState({ visible: false });
  };

  actionRuns = rowData => {
    const { classes } = this.props;
    if (rowData.runs !== 0) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnRuns}
          title={rowData.runs}
          onClick={() => this.onShowRuns(rowData)}
        >
          {rowData.runs}
        </Button>
      );
    } else {
      return null;
    }
  };

  actionStatus = rowData => {
    const { classes } = this.props;
    if (rowData.status === 'failure') {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnFailure}
          title="Failure"
          onClick={() => this.onShowStatus(rowData)}
        >
          Failure
        </Button>
      );
    } else if (rowData.status === 'running') {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={styles.btnInvalid}
          title="Running"
          onClick={() => this.onShowStatus(rowData)}
        >
          Running
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnSuccess}
          title="Success"
          onClick={() => this.onShowStatus(rowData)}
        >
          Success
        </Button>
      );
    }
  };

  renderProcessModal = () => {
    if (this.state.currentProcess) {
      const title =
        'Processes: ' +
        this.state.currentProcess.pipeline +
        ' (' +
        this.state.currentProcess.runs +
        ')';
      return (
        <Dialog
          header={title}
          visible={this.state.visible}
          width="90%"
          onHide={this.onHideModal}
          maximizable={true}
          modal={true}
          contentStyle={{ padding: '0', marginBottom: '-10px', zIndex: '99' }}
        >
          <TableProcess pipelineProcesses={this.state.pipelineProcesses} />
        </Dialog>
      );
    } else {
      return null;
    }
  };

  loadTableProcesses = async currentProcess => {
    const pipelineProcesse = await Centaurus.getAllProcessesByFieldIdAndPipelineId(
      currentProcess.fieldId,
      currentProcess.pipelineId
    );

    if (pipelineProcesse && pipelineProcesse.processesByFieldIdAndPipelineId) {
      const pipelineProcessesLocal = pipelineProcesse.processesByFieldIdAndPipelineId.map(
        row => {
          const startTime = moment(row.startTime);
          const endTime = moment(row.endTime);
          return {
            release: row.fields.edges
              .map(edge => {
                return edge.node.releaseTag.releaseDisplayName;
              })
              .join(', '),
            dataset: row.fields.edges
              .map(edge => {
                return edge.node.displayName;
              })
              .join(', '),
            process: row.processId,
            start: row.startTime,
            end: row.endTime,
            duration: moment(endTime.diff(startTime)).format('hh:mm:ss'),
            owner: row.session.user.displayName,
            status: row.processStatus.name,
            saved: row.flagPublished,
            published: row.flagPublished,
            comments: row.comments,
            product: row ? row.productLog : null,
          };
        }
      );
      this.setState({
        pipelineProcesses: pipelineProcessesLocal,
        currentProcess: currentProcess,
      });
    } else {
      return null;
    }
  };

  render() {
    const header = (
      <div>
        <p style={styles.stageTitle}>{this.props.title}</p>
      </div>
    );

    const columns = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          sortable={true}
          body={col.body}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        />
      );
    });

    return (
      <div>
        <DataTable
          header={header}
          value={this.props.rows}
          resizableColumns={true}
          columnResizeMode="expand"
          reorderableColumns={true}
          reorderableRows={true}
          responsive={true}
          selectionMode="single"
          selection={this.state.selectedCar1}
          onSelectionChange={e => this.setState({ selectedCar1: e.data })}
          scrollable={true}
          scrollHeight="200px"
          loading={this.state.loading}
        >
          {columns}
        </DataTable>
        {this.renderProcessModal()}
      </div>
    );
  }
}

export default withStyles(styles)(Stages);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Centaurus from '../../api';
import moment from 'moment';

import TableProcess from '../TableProcess/';

const styles = {
  button: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '2em',
    display: 'block',
    margin: '0 auto',
    fontSize: '1em',
  },
  btnStatus: {
    textTransform: 'none',
    padding: '1px 5px',
    width: '5em',
    minHeight: '1em',
    display: 'block',
    margin: '0 auto',
    textAlign: 'center',
    lineHeight: '2',
    boxShadow:
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
  },
  btnFailure: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnRunning: {
    backgroundColor: '#ffba01',
    color: '#000',
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
  pipelineColumn: {
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
        body: this.renderPipeline,
        align: 'left',
        padding: '0.25em 20px 0.857em',
      },
      {
        field: 'processId',
        header: 'Process ID',
        body: this.renderProcess,
        align: 'left',
        padding: '0.25em 20px 0.857em',
        width: '140px',
      },
      // {
      //   field: 'name',
      //   header: 'Name',
      //   body: this.renderName,
      //   align: 'left',
      //   padding: '0.25em 20px 0.857em',
      // },
      // {
      //   field: 'startTime',
      //   header: 'Start Time',
      //   body: this.renderStartTime,
      //   width: '140px',
      // },
      {
        field: 'start',
        header: 'Start',
        body: this.renderStart,
        width: '220px',
      },
      {
        field: 'duration',
        header: 'Duration',
        body: this.renderDuration,
        width: '140px',
      },
      // {
      //   field: 'status',
      //   header: 'Status',
      //   body: this.renderStatus,
      // },
      {
        field: 'runs',
        header: 'Runs',
        body: this.actionRuns,
        width: '140px',
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
    this.loadTableProcesses(rowData);
    // this.onClickModal(rowData);
  };

  // onShowStatus = rowData => {
  //   console.log('onShowStatus: ', rowData);
  // };

  onClickModal = () => {
    this.setState({ visible: true });
  };

  onHideModal = () => {
    this.setState({ visible: false, loading: false });
  };

  renderProcess = rowData => {
    return <span title={rowData.processId}>{rowData.processId}</span>;
  };

  renderPipeline = rowData => {
    return (
      <span title={rowData.pipeline} style={styles.pipelineColumn}>
        {rowData.pipeline}
      </span>
    );
  };

  renderName = rowData => {
    return <span title={rowData.name}>{rowData.name}</span>;
  };

  renderStartTime = rowData => {
    if (rowData.startTime)
      return <span title={rowData.startTime}>{rowData.startTime}</span>;
    return '-';
  };

  renderStart = rowData => {
    if (rowData.start)
      return (
        <span title={rowData.start}>
          {rowData.startTime} {rowData.start}
        </span>
      );
    return '-';
  };

  renderDuration = rowData => {
    return <span title={rowData.duration}>{rowData.duration}</span>;
  };

  renderStatus = rowData => {
    const { classes } = this.props;
    if (rowData.status === 'failure') {
      return (
        <span
          title={rowData.status}
          className={classes.btnStatus}
          style={styles.btnFailure}
        >
          Failure
        </span>
      );
    } else if (rowData.status === 'running') {
      return (
        <span
          title={rowData.status}
          className={classes.btnStatus}
          style={styles.btnRunning}
        >
          Running
        </span>
      );
    } else {
      return (
        <span
          title={rowData.status}
          className={classes.btnStatus}
          style={styles.btnSuccess}
        >
          Success
        </span>
      );
    }
  };

  actionRuns = rowData => {
    const { classes } = this.props;
    if (rowData.runs !== 0) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          // style={styles.btnRuns}
          style={
            rowData.status === 'failure'
              ? styles.btnFailure
              : rowData.status === 'running'
              ? styles.btnRunning
              : styles.btnSuccess
          }
          title={rowData.runs}
          onClick={() => this.onShowRuns(rowData)}
        >
          {rowData.runs}
        </Button>
      );
    }
    return '-';
  };

  renderProcessModal = () => {
    if (this.state.currentProcess) {
      const title =
        'Processes: ' +
        this.state.currentProcess.pipeline +
        ' (' +
        this.state.currentProcess.runs +
        ')';
      const header = (
        <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{title}</span>
      );
      return (
        <Dialog
          header={header}
          visible={this.state.visible}
          width="90%"
          onHide={this.onHideModal}
          maximizable={true}
          modal={true}
          style={{ zIndex: '999' }}
          contentStyle={{
            padding: '0',
            position: 'relative',
            zIndex: '10000',
          }}
        >
          <TableProcess pipelineProcesses={this.state.pipelineProcesses} />
        </Dialog>
      );
    } else {
      return null;
    }
  };

  loadTableProcesses = async currentProcess => {
    this.setState({ loading: true });
    const pipelineProcesses = await Centaurus.getAllProcessesByFieldIdAndPipelineId(
      currentProcess.tagId,
      currentProcess.fieldId,
      currentProcess.pipelineId
    );
    if (
      pipelineProcesses &&
      pipelineProcesses.processesByTagIdAndFieldIdAndPipelineId
    ) {
      const pipelineProcessesLocal = pipelineProcesses.processesByTagIdAndFieldIdAndPipelineId.map(
        row => {
          const startDateSplit = row.startTime
            ? row.startTime.split('T')[0]
            : null;
          const startTimeSplit = row.startTime
            ? row.startTime.split('T')[1]
            : null;
          const startTime = moment(row.startTime);
          const endTime = moment(row.endTime);
          const diff = endTime.diff(startTime);
          const duration = moment.utc(diff).format('HH:mm:ss');
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
            start: startDateSplit,
            end: row.endTime,
            time: startTimeSplit,
            duration: row.startTime && row.endTime !== null ? duration : '-',
            owner: row.session.user.displayName,
            status: row.processStatus.name,
            removed: row.flagRemoved,
            saved: row.savedProcesses,
            published: row.publishedDate,
            comments: row.comments,
            product: row.productLog,
            totalProducts: row.products.totalCount,
            uriExport: 'url',
          };
        }
      );
      this.setState({
        pipelineProcesses: pipelineProcessesLocal,
        currentProcess: currentProcess,
      });
      this.setState({ visible: true, loading: false });
      this;
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
          // header={
          //   <span
          //     style={{
          //       textAlign: 'center',
          //       float: 'left',
          //       width: '100%',
          //     }}
          //   >
          //     {col.header}
          //   </span>
          // }
          // sortable={true}
          header={col.header}
          body={col.body}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: col.padding ? col.padding : '0.25em 0.857em',
            textAlign: col.align ? col.align : 'auto',
            width: col.width || 'auto',
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
          // scrollHeight="200px"
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

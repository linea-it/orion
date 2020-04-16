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
    fontSize: '1em',
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

    // console.log(props);

    this.state = {
      cols: [],
      loading: false,
      visible: false,
      pipelineProcesses: [],
      mean: 0,
      median: 0,
      standardDeviation: 0,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    rows: PropTypes.array,
    classes: PropTypes.object.isRequired,
    selectedRelease: PropTypes.string.isRequired,
    selectedField: PropTypes.string.isRequired,
    processesStats: PropTypes.object.isRequired,
  };

  updateColumns = () => {
    if (
      this.props.selectedRelease !== '0' &&
      this.props.selectedField !== '0'
    ) {
      this.setState({
        cols: [
          {
            field: 'pipeline',
            header: 'Pipeline',
            body: this.renderPipeline,
            align: 'left',
            padding: '0.25em 20px 0.857em',
          },
          {
            field: 'mean',
            header: 'Mean',
            body: this.renderMean,
          },
          {
            field: 'median',
            header: 'Median',
            body: this.renderMedian,
          },
          {
            field: 'std',
            header: 'Standard Deviation',
            body: this.renderStd,
          },
          {
            field: 'runs',
            header: 'Runs',
            body: this.actionRuns,
          },
        ],
      });
    } else {
      this.setState({
        cols: [
          {
            field: 'pipeline',
            header: 'Pipeline',
            body: this.renderPipeline,
            align: 'left',
            padding: '0.25em 20px 0.857em',
          },
          {
            field: 'name',
            header: 'Name',
            body: this.renderName,
            align: 'left',
            padding: '0.25em 20px 0.857em',
          },
          {
            field: 'runs',
            header: 'Runs',
            body: this.actionRuns,
          },
        ],
      });
    }
  };

  componentDidMount() {
    this.updateColumns();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedRelease !== this.props.selectedRelease ||
      prevProps.selectedField !== this.props.selectedField ||
      prevProps.processesStats !== this.props.processesStats
    ) {
      this.updateColumns();
    }
  }

  onShowRuns = rowData => {
    this.onClickModal(rowData);
    this.loadTableProcesses(rowData);
  };

  onClickModal = () => {
    this.setState({ visible: true });
  };

  onHideModal = () => {
    this.setState({ visible: false });
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

  renderStart = rowData => {
    if (rowData.start)
      return <span title={rowData.start}>{rowData.startTime}</span>;
    return '-';
  };

  renderDuration = rowData => {
    return <span title={rowData.duration}>{rowData.duration}</span>;
  };

  renderMean = rowData => {
    try {
      if (this.props.processesStats[rowData.pipelineId]) {
        const meanFormat = moment
          .utc(this.props.processesStats[rowData.pipelineId].mean)
          .format('HH:mm:ss');

        return <span title={meanFormat}>{meanFormat}</span>;
      }
    } catch (error) {
      return '-';
    }
  };

  renderMedian = rowData => {
    try {
      if (this.props.processesStats[rowData.pipelineId]) {
        const medianFormat = moment
          .utc(this.props.processesStats[rowData.pipelineId].median)
          .format('HH:mm:ss');

        return <span title={medianFormat}>{medianFormat}</span>;
      }
    } catch (error) {
      return '-';
    }
  };

  renderStd = rowData => {
    try {
      if (this.props.processesStats[rowData.pipelineId]) {
        const stdFormat = moment
          .utc(this.props.processesStats[rowData.pipelineId].std)
          .format('HH:mm:ss');

        return <span title={stdFormat}>{stdFormat}</span>;
      }
    } catch (error) {
      return '-';
    }
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
    const pipelineProcesses = await Centaurus.getAllProcessesByFieldIdAndPipelineId(
      currentProcess.tagId,
      currentProcess.fieldId,
      currentProcess.pipelineId
    );

    if (
      pipelineProcesses &&
      pipelineProcesses.processesByTagIdAndFieldIdAndPipelineId
    ) {
      const pipelineProcessesLocal = pipelineProcesses.processesByTagIdAndFieldIdAndPipelineId
        .sort((a, b) => (a.startTime > b.startTIme ? 1 : -1))
        .map(row => {
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
            diff: row.startTime && row.endTime !== null ? diff : 0,
            owner: row.session.user.displayName,
            status: row.processStatus.name,
            removed: row.flagRemoved,
            saved: row.savedProcesses,
            published: row.publishedDate,
            comments: row.comments,
            product: row.productLog,
          };
        });

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
          header={col.header}
          sortable={true}
          body={col.body}
          style={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            padding: col.padding ? col.padding : '0.25em 0.857em',
            textAlign: col.align ? col.align : 'auto',
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

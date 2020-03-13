import React, { useState } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import Button from '@material-ui/core/Button';

import Centaurus from '../../services/api';
import moment from 'moment';

import styles from './styles';
import TableProcess from '../TableProcess/';


function Stages(props) {
  
  const makeStyle = styles;

  const columns = [
    {
      field: 'pipeline',
      header: 'Pipeline',
      body: renderPipeline,
      align: 'left',
      padding: '0.25em 20px 0.857em',
    },
    {
      field: 'name',
      header: 'Name',
      body: renderName,
      align: 'left',
      padding: '0.25em 20px 0.857em',
    },
    {
      field: 'start',
      header: 'Start',
      body: renderStart,
    },
    {
      field: 'duration',
      header: 'Duration',
      body: renderDuration,
    },
    {
      field: 'runs',
      header: 'Runs',
      body: actionRuns,
    },
    // {
    //   field: 'status',
    //   header: 'Status',
    //   body: actionStatus,
    // },
  ];

  const [state, setState] = useState({
    cols: columns,
    loading: false,
    visible: false,
    pipelineProcesses: [],
  });


  const onShowRuns = rowData => {
    onClickModal(rowData);
    loadTableProcesses(rowData);
  };

  const onClickModal = () => {
    setState({ visible: true });
  };

  const onHideModal = () => {
    setState({ visible: false });
  };

  const renderPipeline = rowData => {
    return (
      <span title={rowData.pipeline} style={makeStyle.pipelineColumn}>
        {rowData.pipeline}
      </span>
    );
  };

  const renderName = rowData => {
    return <span title={rowData.name}>{rowData.name}</span>;
  };

  const renderStart = rowData => {
    if (rowData.start)
      return <span title={rowData.start}>{rowData.startTime}</span>;
    return '-';
  };

  const renderDuration = rowData => {
    return <span title={rowData.duration}>{rowData.duration}</span>;
  };

  const actionRuns = rowData => {
    const { classes } = props;
    if (rowData.runs !== 0) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={makeStyle.btnRuns}
          title={rowData.runs}
          onClick={() => onShowRuns(rowData)}
        >
          {rowData.runs}
        </Button>
      );
    }
    return (
      <Button
        variant="contained"
        className={classes.button}
        style={makeStyle.btnRuns}
        title={rowData.runs}
      >
        {rowData.runs}
      </Button>
    );
  };

  // actionStatus = rowData => {
  //   const { classes } = props;
  //   if (rowData.status === 'failure') {
  //     return (
  //       <Button
  //         variant="contained"
  //         className={classes.button}
  //         style={makeStyle.btnFailure}
  //         title="Failure"
  //         onClick={() => onShowStatus(rowData)}
  //       >
  //         Failure
  //       </Button>
  //     );
  //   } else if (rowData.status === 'running') {
  //     return (
  //       <Button
  //         variant="contained"
  //         className={classes.button}
  //         style={makeStyle.btnRunning}
  //         title="Running"
  //         onClick={() => onShowStatus(rowData)}
  //       >
  //         Running
  //       </Button>
  //     );
  //   } else {
  //     return (
  //       <Button
  //         variant="contained"
  //         className={classes.button}
  //         style={makeStyle.btnSuccess}
  //         title="Success"
  //         onClick={() => onShowStatus(rowData)}
  //       >
  //         Success
  //       </Button>
  //     );
  //   }
  // };

  const renderProcessModal = () => {
    if (state.currentProcess) {
      const title =
        'Processes: ' +
        state.currentProcess.pipeline +
        ' (' +
        state.currentProcess.runs +
        ')';
      const header = (
        <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{title}</span>
      );
      return (
        <Dialog
          header={header}
          visible={state.visible}
          width="90%"
          onHide={onHideModal}
          maximizable={true}
          modal={true}
          style={{ zIndex: '999' }}
          contentStyle={{
            padding: '0',
            position: 'relative',
            zIndex: '10000',
          }}
        >
          <TableProcess pipelineProcesses={state.pipelineProcesses} />
        </Dialog>
      );
    } else {
      return null;
    }
  };

  const loadTableProcesses = async currentProcess => {
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
            owner: row.session.user.displayName,
            status: row.processStatus.name,
            removed: row.flagRemoved,
            saved: row.savedProcesses,
            published: row.publishedDate,
            comments: row.comments,
            product: row.productLog,
          };
        });
      setState({
        pipelineProcesses: pipelineProcessesLocal,
        currentProcess: currentProcess,
      });
    } else {
      return null;
    }
  };

  const header = (
    <div>
      <p style={makeStyle.stageTitle}>{props.title}</p>
    </div>
  );

  const columnsList = state.cols.map((col, i) => {
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
        // sortable={true}
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
        value={props.rows}
        resizableColumns={true}
        columnResizeMode="expand"
        reorderableColumns={true}
        reorderableRows={true}
        responsive={true}
        selectionMode="single"
        selection={state.selectedCar1}
        onSelectionChange={e => setState({ selectedCar1: e.data })}
        scrollable={true}
        // scrollHeight="200px"
        loading={state.loading}
      >
        {columnsList}
      </DataTable>
      {renderProcessModal()}
    </div>
  );
}

export default (Stages);

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { Dialog } from 'primereact/dialog';
import Comments from './comments';
import TableProducts from './TableProducts';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
//import Provenance from './provenance';
import moment from 'moment';

import Centaurus from '../../api';

function TableProvenance({ process }) {
  const styles = {
    btnIco: {
      padding: '0',
      minWidth: '30px',
      minHeight: '30px',
      display: 'block',
      lineHeight: '.5',
    },
    mark: {
      padding: '0px',
      minWidth: '30px',
      minHeight: '30px',
      display: 'block',
      margin: '0px auto',
      lineHeight: '2',
    },
  };

  const handleClickProductLog = rowData => {
    window.open(rowData, 'Product Log');
  };
  const renderButtonProduct = rowData => {
    if (rowData !== null) {
      return (
        <Button
          style={styles.btnIco}
          title={rowData}
          onClick={() => handleClickProductLog(rowData)}
        >
          <Icon>link</Icon>
        </Button>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  const onClickModal = (rowData, modalType) => {
    setDataModal({
      visible: true,
      modalType: modalType,
      rowData: rowData,
    });
  };

  const onHideModal = () => {
    setState(prevState => ({
      ...prevState,
      visible: false,
    }));
  };

  const loadComments = async currentComments => {
    const commentsProcess = await Centaurus.getAllCommentsByProcessId(
      currentComments
    );

    if (commentsProcess && commentsProcess.commentsByProcessId) {
      const commentsProcessLocal = commentsProcess.commentsByProcessId.map(
        row => {
          return {
            date: moment(row.date).format('DD/MM/YYYY hh:mm:ss'),
            user: row.user.displayName,
            comments: row.comments,
          };
        }
      );
      setState(prevState => ({
        ...prevState,
        commentsProcess: commentsProcessLocal,
      }));
    } else {
      return null;
    }
  };

  const handleClickComments = rowData => {
    onClickModal(rowData, 'Comments');
    loadComments(rowData.process);
  };

  const renderContentModal = () => {
    if (dataModal.modalType === 'Products') {
      return <TableProducts productsProcess={dataModal.productsProcess} />;
    } else if (dataModal.modalType === 'Comments') {
      return <Comments commentsProcess={dataModal.commentsProcess} />;
    }
  };

  const renderButtonComments = rowData => {
    if (rowData && rowData.length > 0) {
      return (
        <Button
          style={styles.btnIco}
          title={rowData}
          onClick={() => handleClickComments(rowData)}
        >
          <Icon>comment</Icon>
        </Button>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  const getRowId = row => {
    return row.id;
  };

  const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

  const tableContainerComponent = ({ ...restProps }) => (
    <Table.Container
      {...restProps}
      style={{
        maxHeight: '500px',
        overflow: 'auto',
      }}
    />
  );

  const Cell = ({ ...restProps }) => (
    <Table.Cell
      {...restProps}
      style={{
        fontSize: '1em',
      }}
    />
  );

  const tableHeaderRowCell = ({ ...restProps }) => (
    <TableHeaderRow.Cell
      {...restProps}
      style={{
        color: '#555555',
        fontSize: '1em',
      }}
    />
  );

  const tableTreeColumnCell = ({ ...restProps }) => (
    <TableTreeColumn.Cell
      {...restProps}
      style={{
        fontSize: '1em',
      }}
    />
  );

  const [dataModal, setDataModal] = useState({
    loading: false,
    visible: false,
    productsProcess: [],
    rowsDatasetProcess: {},
    versionProcess: [],
    commentsProcess: [],
    processByProcessId: [],
  });

  const [state, setState] = useState({
    visible: false,
    columns: [
      { name: 'name', title: 'Name' },
      { name: 'process', title: 'Process ID' },
      { name: 'comments', title: 'Comments' },
      { name: 'productLog', title: 'Product Log' },
    ],
    tableColumnExtensions: [{ columnName: 'name', width: 300 }],
    expandedRowIds: [],
    load: false,
    loading: false,
    data: [],
  });

  useEffect(() => {
    if (!state.load) {
      loadData();
    }
  });

  // const isFirstRun = useRef(true);
  // useEffect(() => {
  //   if (isFirstRun.current) {
  //     isFirstRun.current = false;
  //     return;
  //   }
  //   loadData();
  // });

  const renderModal = () => {
    const title =
      dataModal.modalType == 'Version'
        ? dataModal.titleVersion
        : dataModal.modalType;
    const header = (
      <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{title}</span>
    );
    return (
      <Dialog
        header={header}
        visible={dataModal.visible}
        width="50%"
        onHide={onHideModal}
        maximizable={true}
        modal={false}
        contentStyle={{ padding: '0', marginBottom: '-10px' }}
      >
        <div
          style={{
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'rgba(102, 102, 102, 0.5)',
            top: '0',
            left: '0',
            zIndex: '-1',
          }}
        />
        {renderContentModal()}
      </Dialog>
    );
  };

  // const findProduct = async processId => {
  //   const data = state.data;
  //   setState(prevState => ({
  //     ...prevState,
  //     true: true,
  //   }));
  //   // eslint-disable-next-line
  //   const newData = await Promise.all(
  //     data.map(async p => {
  //       await p.findProvenance(processId);
  //       return p;
  //     })
  //   );
  //   setState(prevState => ({
  //     ...prevState,
  //     data: newData,
  //     true: true,
  //   }));
  // };

  const changeExpandedRowIds = expandedRowIds => {
    // const added = expandedRowIds.filter(e => !state.expandedRowIds.includes(e));
    // if (added.length > 0) findProduct(added[0]);
    setState(prevState => ({
      ...prevState,
      expandedRowIds,
    }));
  };

  const clearData = () => {
    setState(prevState => ({
      ...prevState,
      data: [],
      load: true,
    }));
  };

  const rowsTreeResultChildren = (result, children) => {
    children.id = children.processId;
    children.process = children.processId;

    children.productLog = renderButtonProduct(children.productLog);
    children.comments = renderButtonComments(children.comments);

    children.items = undefined;
    result.items.push(children);

    if (children && children.inputs && children.inputs.edges) {
      if (children.inputs.edges.length > 0) {
        children.inputs.edges.map(e => {
          if (e.node && e.node.process) {
            children.items = [];
            rowsTreeResultChildren(children, e.node.process);
          }
        });
      } else {
        console.log(result);
        setState(prevState => ({
          ...prevState,
          data: [result],
          load: true,
        }));
      }
    }
  };

  const rowsTreeResult = result => {
    console.log(result);
    result.id = result.processByProcessId.processId;
    result.process = result.processByProcessId.processId;

    result.productLog = renderButtonProduct(
      result.processByProcessId.productLog
    );
    result.comments = renderButtonComments(result.processByProcessId.comments);

    result.items = undefined;

    if (
      result &&
      result.processByProcessId &&
      result.processByProcessId.inputs &&
      result.processByProcessId.inputs.edges
    ) {
      if (result.processByProcessId.inputs.edges.length > 0) {
        result.processByProcessId.inputs.edges.map(e => {
          if (e.node && e.node.process) {
            result.items = [];
            rowsTreeResultChildren(result, e.node.process);
          }
        });
      } else {
        console.log(result);
        setState(prevState => ({
          ...prevState,
          data: [result],
          load: true,
        }));
      }
    }
  };

  const loadData = async () => {
    var processId = process.process;
    const result = await Centaurus.getAllProcessByProcessId(processId);
    if (
      result &&
      result.processByProcessId.inputs &&
      result.processByProcessId.inputs.edges
    ) {
      rowsTreeResult(result);

      // const rows =

      // if (result.processByProcessId.inputs.edges.length > 0 ?

      // result.processByProcessId.inputs.edges.map(e => {

      //   console.log(e.node.process);
      // });

      //     e =>
      //       new Provenance(
      //         Math.random()
      //           .toString(36)
      //           .substr(2, 9),
      //         e.node.process.name,
      //         e.node.process.processId,
      //         e.node.process.productLog,
      //         e.node.process.comments,
      //         e.node.process.inputs.edges.length > 0 ? [] : undefined
      //       )
      //   )
      // : undefined;
      // setState(prevState => ({
      //   ...prevState,
      //   data: rows,
      //   load: true,
      // }));
    } else {
      clearData();
    }
  };

  // state.data ||
  //   [].map(row => {
  //     row.productLog = renderButtonProduct(row.productLog);
  //     row.comments = renderButtonComments(row.comments);
  //     return row;
  //   });

  return (
    <Paper style={{ position: 'relative', zIndex: '999' }}>
      <Grid rows={state.data} columns={state.columns} getRowId={getRowId}>
        <TreeDataState
          expandedRowIds={state.expandedRowIds}
          onExpandedRowIdsChange={changeExpandedRowIds}
        />
        <CustomTreeData getChildRows={getChildRows} />
        <Table
          columnExtensions={state.tableColumnExtensions}
          cellComponent={Cell}
          containerComponent={tableContainerComponent}
        />
        <TableHeaderRow cellComponent={tableHeaderRowCell} />
        <TableTreeColumn for="name" cellComponent={tableTreeColumnCell} />
      </Grid>
      {state.loading && (
        <CircularProgress
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            margin: '10px 0 0 -20px',
          }}
        />
      )}
      {renderModal()}
    </Paper>
  );
}

TableProvenance.propTypes = {
  process: PropTypes.object.isRequired,
};

export default TableProvenance;

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../Table/';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
import {
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';

import Centaurus from '../../services/api';

import TableVersion from '../TableVersion/';
import TableProvenance from '../TableProvenance/';
import Comments from '../Comments/';
import TableProducts from '../TableProducts/';
import TableDataset from '../TableDataset/';

const styles = {
  btnIco: {
    padding: '0',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    margin: '0 auto',
    lineHeight: '.5',
  },
  titleDialog: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  closeButton: {
    float: 'right',
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
  icoCheck: {
    color: 'green',
    cursor: 'default',
    textAlign: 'center',
  },
  icoRemoved: {
    color: 'red',
    cursor: 'default',
    textAlign: 'center',
  },
  mark: {
    padding: '0px',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    margin: '0px auto',
    lineHeight: '2',
    textAlign: 'center',
  },
};

class TableProcess extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        name: 'process',
        title: 'Process ID',
        customElement: this.renderProcess,
        width: 120,
      },
      {
        name: 'release',
        title: 'Release',
        customElement: this.renderRelease,
        align: 'left',
        padding: '0.25em 20px 0.857em',
      },
      {
        name: 'dataset',
        title: 'Dataset',
        customElement: this.renderDataset,
        align: 'left',
        padding: '0.25em 20px 0.857em',
      },
      {
        name: 'start',
        title: 'Start Date',
        customElement: this.renderStartDate,
        width: '130px',
      },
      // {
      //   name: 'end',
      //   title: 'End time',
      //   customElement: this.renderEndTime,
      // },
      {
        name: 'duration',
        title: 'Duration',
        customElement: this.renderDuration,
      },
      {
        name: 'version',
        title: 'Version',
        customElement: this.actionVersion,
      },
      {
        name: 'owner',
        title: 'Owner',
        customElement: this.renderOwner,
        align: 'left',
        padding: '0.25em 20px 0.857em',
      },
      {
        name: 'status',
        title: 'Status',
        customElement: this.actionStatus,
      },
      {
        name: 'saved',
        title: 'Saved',
        customElement: this.actionSaved,
      },
      {
        name: 'removed',
        title: 'Removed',
        customElement: this.actionRemoved,
      },
      // {
      //   name: 'share',
      //   title: 'Share',
      //   customElement: this.actionShare,
      // },
      {
        name: 'published',
        title: 'Published',
        customElement: this.actionPublished,
      },
      {
        name: 'provenance',
        title: 'Provenance',
        customElement: this.actionProvenance,
      },
      {
        name: 'comments',
        title: 'Comments',
        customElement: this.actionComments,
      },
      {
        name: 'product',
        title: 'Product Log',
        customElement: this.actionProduct,
      },
      {
        name: 'products',
        title: 'Products',
        customElement: this.actionProducts,
      },
      // {
      //   name: 'export',
      //   title: 'Export',
      //   customElement: this.actionExport,
      // },
    ];

    this.state = {
      cols: columns,
      loading: false,
      visible: false,
      productsProcess: [],
      rowsDatasetProcess: {},
      versionProcess: [],
      commentsProcess: [],
      processByProcessId: [],
    };
  }

  static propTypes = {
    title: PropTypes.string,
    pipelineProcesses: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  onShowVersion = rowData => {
    this.onClickModal(rowData, 'Version');
    this.loadTableVersion(rowData.process);
  };

  onShowDatasets = rowData => {
    this.onClickModal(rowData, 'Datasets');
    this.loadTableDatasets(rowData);
  };

  onShowProvenance = rowData => {
    this.onClickModal(rowData, 'Provenance');
  };

  onShowProductLog = rowData => {
    window.open(rowData, 'Product Log');
  };

  onShowProducts = rowData => {
    this.onClickModal(rowData, 'Products');
    this.loadTableProducts(rowData.process);
  };

  onShowComments = rowData => {
    this.onClickModal(rowData, 'Comments');
    this.loadComments(rowData.process);
  };

  onClickModal = (rowData, modalType) => {
    this.setState({ visible: true, modalType: modalType, rowData: rowData });
  };

  onHideModal = () => {
    this.setState({ visible: false });
  };

  renderRelease = rowData => {
    return <span title={rowData.release}>{rowData.release}</span>;
  };

  renderDataset = rowData => {
    const datasets = rowData.dataset.split(', ');
    if (datasets.length <= 1) {
      return <span title={rowData.dataset}>{rowData.dataset}</span>;
    } else if (rowData) {
      return (
        <React.Fragment>
          <Button
            style={styles.btnIco}
            onClick={() => this.onShowDatasets(rowData)}
          >
            <Icon>format_list_bulleted</Icon>
          </Button>
        </React.Fragment>
      );
    }
    return '-';
  };

  renderProcess = rowData => {
    if (rowData && rowData.process) {
      return <span title={rowData.process}>{rowData.process}</span>;
    } else {
      return '-';
    }
  };

  renderStartDate = rowData => {
    if (rowData && rowData.start) {
      return <span title={rowData.time}>{rowData.start}</span>;
    } else {
      return '-';
    }
  };

  renderEndTime = rowData => {
    if (rowData && rowData.end) {
      return <span title={rowData.end}>{rowData.end}</span>;
    } else {
      return '-';
    }
  };

  renderOwner = rowData => {
    if (rowData && rowData.owner) {
      return <span title={rowData.owner}>{rowData.owner}</span>;
    } else {
      return '-';
    }
  };

  renderDuration = rowData => {
    if (rowData && rowData.duration) {
      return <span title={rowData.duration}>{rowData.duration}</span>;
    } else {
      return '-';
    }
  };

  actionVersion = rowData => {
    if (rowData && rowData.duration) {
      return (
        <Button
          style={styles.btnIco}
          onClick={() => this.onShowVersion(rowData)}
        >
          <Icon>format_list_bulleted</Icon>
        </Button>
      );
    } else {
      return '-';
    }
  };

  actionStatus = rowData => {
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

  actionSaved = rowData => {
    const { classes } = this.props;

    if (rowData && rowData.saved && rowData.saved.savedDateEnd) {
      const tooltDate = rowData.saved.savedDateEnd.split('T')[0];

      if (rowData.saved.savedDateEnd === null) {
        return (
          <CircularProgress
            disableShrink
            style={{ width: '25px', height: '25px' }}
          />
        );
      } else {
        return (
          <Icon title={tooltDate} className={classes.icoCheck}>
            check
          </Icon>
        );
      }
    } else if (rowData.saved === null) {
      return '-';
    }
  };

  actionRemoved = rowData => {
    const { classes } = this.props;

    if (typeof rowData.removed !== 'undefined') {
      if (rowData.removed === true) {
        return (
          <Icon title="Removed" className={classes.icoCheck}>
            check
          </Icon>
        );
      } else {
        return (
          <Icon title="Not removed" className={classes.icoRemoved}>
            close
          </Icon>
        );
      }
    } else {
      return (
        <Icon title="Not removed" className={classes.icoRemoved}>
          close
        </Icon>
      );
    }
  };

  actionShare = rowData => {
    const { classes } = this.props;
    if (rowData) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.share}
        >
          <Icon>share</Icon>
        </Button>
      );
    } else {
      return '-';
    }
  };

  actionPublished = rowData => {
    const { classes } = this.props;

    if (rowData && rowData.saved && rowData.saved.savedDateEnd) {
      const publishedDate = rowData.saved.savedDateEnd.split('T')[0];
      return (
        <span
          title={publishedDate}
          className={classes.icoCheck}
          style={styles.btnIco}
        >
          <Icon>check</Icon>
        </span>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  actionProvenance = rowData => {
    const { classes } = this.props;
    if (rowData) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.provenance}
          onClick={() => this.onShowProvenance(rowData)}
        >
          <Icon>device_hub</Icon>
        </Button>
      );
    }
    return '-';
  };

  actionProduct = rowData => {
    const { classes } = this.props;
    if (rowData && rowData.product !== null) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.product}
          onClick={() => this.onShowProductLog(rowData.product)}
        >
          <Icon>link</Icon>
        </Button>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  actionProducts = rowData => {
    const { classes } = this.props;
    if (rowData) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.products}
          onClick={() => this.onShowProducts(rowData)}
        >
          <Icon>view_list</Icon>
        </Button>
      );
    } else {
      return '-';
    }
  };

  actionComments = rowData => {
    const { classes } = this.props;
    if (rowData) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.comments}
          onClick={() => this.onShowComments(rowData)}
        >
          <Icon>comment</Icon>
        </Button>
      );
    } else {
      return '-';
    }
  };

  actionExport = rowData => {
    const { classes } = this.props;
    if (rowData) {
      return (
        <Button
          className={classes.button}
          style={styles.btnIco}
          title={rowData.export}
          onClick={() => this.onShowExport(rowData)}
        >
          <Icon>import_export</Icon>
        </Button>
      );
    } else {
      return '-';
    }
  };

  renderContentModal = () => {
    if (this.state.modalType === 'Version') {
      return <TableVersion versionProcess={this.state.versionProcess} />;
    } else if (this.state.modalType === 'Provenance') {
      return <TableProvenance process={this.state.rowData} />;
    } else if (this.state.modalType === 'Products') {
      return <TableProducts productsProcess={this.state.productsProcess} />;
    } else if (this.state.modalType === 'Comments') {
      return <Comments commentsProcess={this.state.commentsProcess} />;
    } else if (this.state.modalType === 'Datasets') {
      return (
        <TableDataset rowsDatasetProcess={this.state.rowsDatasetProcess} />
      );
    }
  };

  renderModal = () => {
    const { classes } = this.props;
    const title = this.state.modalType;
    const header = (
      <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{title}</span>
    );
    return (
      <Dialog
        open={this.state.visible}
        maxWidth="md"
        onClose={this.onHideModal}
      >
        <DialogTitle id="simple-dialog-title">
          <Typography className={classes.titleDialog} variant="h6">
            {header}
            <IconButton
              aria-label="close"
              className={classes.closeButton}
              onClick={this.onHideModal}
            >
              <CloseIcon />
            </IconButton>
          </Typography>
        </DialogTitle>
        <DialogContent>{this.renderContentModal()}</DialogContent>
      </Dialog>
    );
  };

  loadTableDatasets = rowData => {
    if (rowData) {
      const releases = rowData.release.split(', ');
      const datasets = rowData.dataset.split(', ');

      const rows = releases.map((el, i) => {
        return {
          release: el,
          dataset: datasets[i],
        };
      });

      this.setState({
        rowsDatasetProcess: rows,
      });
    } else {
      return null;
    }
  };

  loadTableVersion = async currentVersion => {
    const versionProcess = await Centaurus.getAllProcessComponentsByProcessId(
      currentVersion
    );

    if (versionProcess && versionProcess.processComponentsByProcessId) {
      const versionProcessLocal = versionProcess.processComponentsByProcessId.map(
        row => {
          return {
            name: row.module.displayName,
            version: row.version,
            last_version: row.module.version,
          };
        }
      );
      this.setState({
        versionProcess: versionProcessLocal,
        currentVersion: currentVersion,
      });
    } else {
      return null;
    }
  };

  loadComments = async currentComments => {
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
      this.setState({
        commentsProcess: commentsProcessLocal,
      });
    } else {
      return null;
    }
  };

  loadTableProducts = async currentProducts => {
    const productsProcess = await Centaurus.getAllProductsByProcessId(
      currentProducts
    );

    if (productsProcess && productsProcess.productsByProcessId) {
      const productsProcessLocal = productsProcess.productsByProcessId.map(
        row => {
          return {
            process: currentProducts,
            product: row.displayName,
            type: row.Class.productType.displayName,
            class: row.Class.displayName,
            database: row.table ? row.table.dachsUrl : null,
            dataType: row.dataType,
          };
        }
      );
      this.setState({
        productsProcess: productsProcessLocal,
        currentProducts: currentProducts,
      });
    } else {
      return null;
    }
  };

  render() {
    // const columns = this.state.cols.map((col, i) => {
    //   return (
    //     <Column
    //       key={i}
    //       field={col.name}
    //       header={col.title}
    //       // sortable={true}
    //       body={col.body}
    //       style={{
    //         whiteSpace: 'nowrap',
    //         overflow: 'hidden',
    //         textOverflow: 'ellipsis',
    //         width: col.width ? col.width : 'auto',
    //         textAlign: col.align ? col.align : 'auto',
    //         padding: col.padding ? col.padding : '0.25em 0.857em',
    //       }}
    //     />
    //   );
    // });

    return (
      <div>
        <CardContent>
          {/* <Typography className={classes.titleDialog} variant="subtitle2">
            {header ? header : ''}
          </Typography> */}
          <CustomTable
            columns={this.state.cols}
            data={this.props.pipelineProcesses}
            remote={false}
            pageSize={5}
            pageSizes={[5, 15, 50, 100, 500]}
            totalCount={this.props.pipelineProcesses.length}
            reload={false}
            hasSearching={false}
            hasToolbar={false}
            hasColumnVisibility={false}
            sizeTable={'smal'}
          />
        </CardContent>
        {this.renderModal()}
        {/* <DataTable
          value={this.props.pipelineProcesses}
          resizableColumns={true}
          columnResizeMode="expand"
          reorderableColumns={true}
          reorderableRows={true}
          responsive={true}
          selectionMode="single"
          selection={this.state.selectedCar1}
          onSelectionChange={e => this.setState({ selectedCar1: e.data })}
          scrollable={true}
          scrollHeight="600px"
        >
          {columns}
        </DataTable> */}
      </div>
    );
  }
}

export default withStyles(styles)(TableProcess);

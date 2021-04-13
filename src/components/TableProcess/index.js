import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../Table/';
// import { Column } from 'primereact/column';
// import { Dialog } from 'primereact/dialog';

import {
  withStyles,
  CardContent,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  CircularProgress,
} from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import moment from 'moment';

import Centaurus from '../../api';

import TableVersion from '../dashboard/TableVersion';
import TableProvenance from '../dashboard/TableProvenance';
import Comments from '../dashboard/comments';
import TableProducts from '../dashboard/TableProducts';
import TableDataset from '../dashboard/TableDataset';

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
        width: 150,
      },
      {
        name: 'release',
        title: 'Release',
        customElement: this.renderRelease,
        align: 'left',
        padding: '0.25em 20px 0.857em',
        width: 120,
      },
      {
        name: 'dataset',
        title: 'Dataset',
        customElement: this.renderDataset,
        align: 'left',
        padding: '0.25em 20px 0.857em',
        width: 120,
      },
      {
        name: 'start',
        title: 'Start Date',
        customElement: this.renderStartDate,
        width: 120,
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
        width: 120,
      },
      {
        name: 'version',
        title: 'Version',
        customElement: this.actionVersion,
        width: 70,
      },
      {
        name: 'owner',
        title: 'Owner',
        customElement: this.renderOwner,
        align: 'left',
        padding: '0.25em 20px 0.857em',
        width: 200,
      },
      {
        name: 'status',
        title: 'Status',
        customElement: this.actionStatus,
        width: 100,
      },
      {
        name: 'saved',
        title: 'Saved',
        customElement: this.actionSaved,
        width: 80,
      },
      {
        name: 'removed',
        title: 'Removed',
        customElement: this.actionRemoved,
        width: 80,
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
        width: 80,
      },
      {
        name: 'provenance',
        title: 'Provenance',
        customElement: this.actionProvenance,
        width: 80,
      },
      {
        name: 'comments',
        title: 'Comments',
        customElement: this.actionComments,
        width: 80,
      },
      {
        name: 'product',
        title: 'Product Log',
        customElement: this.actionProduct,
        width: 80,
      },
      {
        name: 'products',
        title: 'Products',
        customElement: this.actionProducts,
        width: 80,
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
    console.log(rowData);
    this.setState({
      visible: true,
      modalType: modalType,
      rowData: rowData,
      processId: rowData.process,
    });
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
      return <span style={styles.mark}>-</span>;
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
          title={rowData.products ? rowData.products : ''}
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
    const processId = this.state.processId;
    const header = (
      <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>
        {title} - Process ID: {processId}
      </span>
    );
    return (
      <Dialog
        open={this.state.visible}
        maxWidth="md"
        onClose={this.onHideModal}
      >
        <DialogTitle id="simple-dialog-title">
          <Typography className={classes.titleDialog}>
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
            used_version: row.used_version,
            last_version: row.module.last_version,
            versionDate: row.module.versionDate,

            name_pipeline: row.process.process_name,
            process_version:
              row.process.processPipeline.edges[0].node.process_version,

            pipeline_version:
              row.process.processPipeline.edges[0].node.pipeline.version,

            pipeline_versionDate:
              row.process.processPipeline.edges[0].node.pipeline.versionDate,
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
    if (
      this.props.pipelineProcesses &&
      this.props.pipelineProcesses.length > 0
    ) {
      this.props.pipelineProcesses.map(el => {
        el.version = null;
        el.products = null;
        el.provenance = null;
      });
    }
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
            pageSize={10}
            pageSizes={[10, 15, 50, 100, 500]}
            totalCount={this.props.pipelineProcesses.length}
            reload={false}
            hasSearching={false}
            hasToolbar={false}
            hasColumnVisibility={false}
            sizeTable={'smal'}
            defaultSorting={[
              {
                columnName: 'start',
                direction: 'desc',
              },
            ]}
          />
        </CardContent>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProcess);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';

import Centaurus from '../../api';

import TableVersion from './TableVersion';
import TableProvenance from './TableProvenance';
import Comments from './comments';
import TableProducts from './TableProducts';

const styles = {
  btnIco: {
    padding: '0',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    margin: '0 auto',
    lineHeight: '.5',
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
        field: 'release',
        header: 'Release',
      },
      {
        field: 'dataset',
        header: 'Dataset',
      },
      {
        field: 'process',
        header: 'Process ID',
      },
      {
        field: 'start',
        header: 'Start time',
      },
      {
        field: 'end',
        header: 'End time',
      },
      {
        field: 'version',
        header: 'Version',
        body: this.actionVersion,
      },
      {
        field: 'duration',
        header: 'Duration',
      },
      {
        field: 'owner',
        header: 'Owner',
      },
      {
        field: 'status',
        header: 'Status',
        body: this.actionStatus,
      },
      {
        field: 'saved',
        header: 'Saved',
        body: this.actionSaved,
      },
      // {
      //   field: 'share',
      //   header: 'Share',
      //   body: this.actionShare,
      // },
      {
        field: 'published',
        header: 'Published',
        body: this.actionPublished,
      },
      {
        field: 'provenance',
        header: 'Provenance',
        body: this.actionProvenance,
      },
      {
        field: 'comments',
        header: 'Comments',
        body: this.actionComments,
      },
      {
        field: 'product',
        header: 'Product Log',
        body: this.actionProduct,
      },
      {
        field: 'products',
        header: 'Products',
        body: this.actionProducts,
      },
      // {
      //   field: 'export',
      //   header: 'Export',
      //   body: this.actionExport,
      // },
    ];

    this.state = {
      cols: columns,
      loading: false,
      visible: false,
      productsProcess: [],
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

  actionVersion = rowData => {
    return (
      <Button
        style={styles.btnIco}
        title={rowData.version}
        onClick={() => this.onShowVersion(rowData)}
      >
        <Icon>format_list_bulleted</Icon>
      </Button>
    );
  };

  actionStatus = rowData => {
    const { classes } = this.props;
    if (rowData.status === 'failure') {
      return (
        <span className={classes.btnStatus} style={styles.btnFailure}>
          Failure
        </span>
      );
    } else if (rowData.status === 'running') {
      return (
        <span className={classes.btnRunning} style={styles.btnSuccess}>
          Running
        </span>
      );
    } else {
      return (
        <span className={classes.btnStatus} style={styles.btnSuccess}>
          Success
        </span>
      );
    }
  };

  actionSaved = rowData => {
    const { classes } = this.props;
    if (rowData.saved !== false) {
      return (
        <span className={classes.icoCheck} style={styles.btnIco}>
          <Icon>check</Icon>
        </span>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  actionShare = rowData => {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.share}
      >
        <Icon>share</Icon>
      </Button>
    );
  };

  actionPublished = rowData => {
    const { classes } = this.props;
    if (rowData.published !== false) {
      return (
        <span className={classes.icoCheck} style={styles.btnIco}>
          <Icon>check</Icon>
        </span>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  actionProvenance = rowData => {
    const { classes } = this.props;
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
  };

  actionProduct = rowData => {
    const { classes } = this.props;
    if (rowData.product !== null) {
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
  };

  actionComments = rowData => {
    const { classes } = this.props;
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
  };

  actionExport = rowData => {
    const { classes } = this.props;
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
    }
  };

  renderModal = () => {
    return (
      <Dialog
        header={this.state.modalType}
        visible={this.state.visible}
        width="50%"
        onHide={this.onHideModal}
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
        {this.renderContentModal()}
      </Dialog>
    );
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
            width: '2.2em',
          }}
        />
      );
    });

    return (
      <div>
        <DataTable
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
        </DataTable>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProcess);

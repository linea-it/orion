import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';

import TableProvenance from './TableProvenance';
import TableProducts from './TableProducts';

const styles = {
  btn: {
    margin: '0 auto',
    width: '4em',
    display: 'block',
  },
  btnIco: {
    padding: '0',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    margin: '0 auto',
    lineHeight: '.5',
  },
  btnStatus: {
    display: 'table',
    margin: '0 auto',
    width: '7em',
    padding: '0',
  },
  btnSuccess: {
    textTransform: 'none',
    backgroundColor: 'green',
    color: '#fff',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '1em',
    display: 'block',
    margin: '0 auto',
  },
  btnFailure: {
    textTransform: 'none',
    backgroundColor: 'red',
    color: '#fff',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '1em',
    display: 'block',
    margin: '0 auto',
  },
  btnRunning: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '1em',
    display: 'block',
    margin: '0 auto',
  },
  buttonCheck: {
    color: 'green',
    cursor: 'default',
  },
  buttonPointer: {
    cursor: 'default',
  },
  tooltipText: {
    fontSize: '1em',
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
      // {
      //   field: 'saved',
      //   header: 'Saved',
      //   body: this.actionSaved,
      // },
      // {
      //   field: 'share',
      //   header: 'Share',
      //   body: this.actionShare,
      // },
      // {
      //   field: 'published',
      //   header: 'Published',
      //   body: this.actionPublished,
      // },
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
      // {
      //   field: 'product',
      //   header: 'Product Log',
      //   body: this.actionProduct,
      // },
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
    };
  }

  static propTypes = {
    title: PropTypes.string,
    pipelineProcesses: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  onShowStatus = rowData => {
    console.log('onShowStatus: ', rowData);
  };

  onShowProvenance = rowData => {
    this.onClickModal(rowData, 'provenance');
  };

  onShowProducts = rowData => {
    this.onClickModal(rowData, 'products');
  };

  onShowComments = rowData => {
    this.onClickModal(rowData, 'comments');
  };

  onClickModal = (rowData, modalType) => {
    this.setState({ visible: true, modalType: modalType, rowData: rowData });
  };

  onHideModal = () => {
    this.setState({ visible: false });
  };

  actionVersion = rowData => {
    const { classes } = this.props;
    return (
      <Tooltip
        title="Description"
        placement="right-end"
        classes={{ tooltip: classes.tooltipText }}
      >
        <Button
          className={classes.buttonPointer}
          style={styles.btnIco}
          title={rowData.version}
        >
          <Icon>format_list_bulleted</Icon>
        </Button>
      </Tooltip>
    );
  };

  actionStatus = rowData => {
    if (rowData.status === 'failure') {
      return (
        <Button
          variant="contained"
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
          style={styles.btnRunning}
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
          style={styles.btnSuccess}
          title="Success"
          onClick={() => this.onShowStatus(rowData)}
        >
          Success
        </Button>
      );
    }
  };

  actionSaved = rowData => {
    const { classes } = this.props;
    if (rowData.saved !== 0) {
      return (
        <Button
          className={classes.buttonCheck}
          style={styles.btnIco}
          title={rowData.saved}
        >
          <Icon>check</Icon>
        </Button>
      );
    } else {
      return (
        <Button style={styles.btnIco} title={rowData.saved}>
          <Icon>more_horiz</Icon>
        </Button>
      );
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
    return (
      <Button
        className={classes.buttonCheck}
        style={styles.btnIco}
        title={rowData.published}
      >
        <Icon>check</Icon>
      </Button>
    );
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
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.product}
      >
        <Icon>link</Icon>
      </Button>
    );
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
        <Icon>link</Icon>
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
    if (this.state.modalType === 'provenance') {
      return <TableProvenance />;
    } else if (this.state.modalType === 'products') {
      return <TableProducts />;
    } else if (this.state.modalType === 'comments') {
      return <p>Teste</p>;
    }
  };

  renderModal = () => {
    return (
      <Dialog
        header="Title Modal"
        visible={this.state.visible}
        width="50%"
        minY={70}
        onHide={this.onHideModal}
        maximizable={true}
        modal={false}
        style={{ zIndex: '999' }}
        contentStyle={{ padding: '0', marginBottom: '-10px' }}
      >
        {this.renderContentModal()}
      </Dialog>
    );
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
          selection={this.state.selectedCar1}
          onSelectionChange={e => this.setState({ selectedCar1: e.data })}
          scrollable={true}
          scrollHeight="600px"
          style={{ zIndex: '91' }}
        >
          <Column selectionMode="multiple" style={{ width: '2.2em' }} />
          {columns}
        </DataTable>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProcess);

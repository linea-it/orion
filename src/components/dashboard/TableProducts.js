import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
  buttonCheck: {
    color: 'green',
    cursor: 'default',
  },
  buttonPointer: {
    cursor: 'default',
  },
};

class TableProducts extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'process',
        header: 'Process ID',
      },
      {
        field: 'product',
        header: 'Product Name',
      },
      {
        field: 'type',
        header: 'Type',
      },
      {
        field: 'class',
        header: 'Class',
      },
      // {
      //   field: 'provenance',
      //   header: 'Provenance',
      //   body: this.actionProvenance,
      // },
      // {
      //   field: 'viewer',
      //   header: 'Viewer',
      //   body: this.actionViewer,
      // },
      // {
      //   field: 'database',
      //   header: 'Database',
      //   body: this.actionDatabase,
      // },
      // {
      //   field: 'exported',
      //   header: 'Exported',
      //   body: this.actionExported,
      // },
      // {
      //   field: 'productType',
      //   header: 'Product Type',
      // },
      // {
      //   field: 'download',
      //   header: 'Download',
      //   body: this.actionDownload,
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
    productsProcess: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  onShowProvenance = rowData => {
    this.onClickModal(rowData, 'provenance');
  };

  onShowViewer = rowData => {
    this.onClickModal(rowData, 'viewer');
  };

  onShowDatabase = rowData => {
    this.onClickModal(rowData, 'database');
  };

  actionExported = rowData => {
    this.onClickModal(rowData, 'export');
  };

  onShowDownload = rowData => {
    this.onClickModal(rowData, 'download');
  };

  onClickModal = (rowData, modalType) => {
    this.setState({ visible: true, modalType: modalType, rowData: rowData });
  };

  onHideModal = () => {
    this.setState({ visible: false });
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

  actionViewer = rowData => {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.viewer}
        onClick={() => this.onShowViewer(rowData)}
      >
        <Icon>warning</Icon>
      </Button>
    );
  };

  actionDatabase = rowData => {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.database}
        onClick={() => this.onShowDatabase(rowData)}
      >
        <Icon>device_hub</Icon>
      </Button>
    );
  };

  actionExported = rowData => {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.exported}
      >
        <Icon>more_horiz</Icon>
      </Button>
    );
  };

  actionDownload = rowData => {
    const { classes } = this.props;
    return (
      <Button
        className={classes.button}
        style={styles.btnIco}
        title={rowData.provenance}
        onClick={() => this.onShowDownload(rowData)}
      >
        <Icon>cloud_download</Icon>
      </Button>
    );
  };

  renderContentModal = () => {
    if (this.state.modalType === 'provenance') {
      return <p>Teste</p>;
    } else if (this.state.modalType === 'viewer') {
      return <p>Teste</p>;
    } else if (this.state.modalType === 'dataBase') {
      return <p>Teste</p>;
    } else if (this.state.modalType === 'export') {
      return <p>Teste</p>;
    }
  };

  renderModal = () => {
    return (
      <Dialog
        header="Title Modal"
        visible={this.state.visible}
        width="50%"
        onHide={this.onHideModal}
        maximizable={true}
        modal={true}
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
          value={this.props.productsProcess}
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
          style={{ zIndex: '95' }}
        >
          {columns}
        </DataTable>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProducts);

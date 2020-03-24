import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CardContent from '@material-ui/core/CardContent';
// import Dialog from '@material-ui/core/Dialog';

import CustomTable from '../Table/';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  table: {
    minWidth: 650,
  },
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

class TableProducts extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        name: 'process',
        title: 'Process ID',
        width: 140,
      },
      {
        name: 'product',
        title: 'Product Name',
        width: 130,
      },
      {
        name: 'type',
        title: 'Type',
        width: 120,
      },
      {
        name: 'class',
        title: 'Class',
        width: 120,
      },
      {
        name: 'database',
        title: 'Database',
        width: 230,
      },
      {
        name: 'dataType',
        title: 'Data Type',
        width: 90,
      },
    ];

    this.state = {
      cols: columns,
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
    window.open(rowData, 'Database');
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

  renderContentModal = () => {
    if (this.state.modalType === 'provenance') {
      return <p>Teste</p>;
    } else if (this.state.modalType === 'viewer') {
      return <p>Teste</p>;
    } else if (this.state.modalType === 'export') {
      return <p>Teste</p>;
    }
  };

  renderModal = () => {
    // return (
    //   <Dialog open={this.state.visible} onClose={this.onHideModal}>
    //     {this.renderContentModal()}
    //   </Dialog>
    // );
  };

  render() {
    return (
      <div>
        <CardContent>
          <CustomTable
            columns={this.state.cols}
            data={this.props.productsProcess}
            remote={false}
            pageSize={5}
            pageSizes={[5, 15, 50, 100, 500]}
            totalCount={this.props.productsProcess.length}
            reload={false}
            hasSearching={false}
            hasToolbar={false}
            hasColumnVisibility={false}
            loading
          />
        </CardContent>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProducts);

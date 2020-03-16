import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

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
      {
        field: 'database',
        header: 'Database',
      },
      {
        field: 'dataType',
        header: 'Data Type',
      },
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
        <TableCell align="right" key={col.field} >{col.header}</TableCell>
      );
    });

    return (
      <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.productsProcess.map((product, i) => {
              return(
                <TableRow>   
                  {this.state.cols.map((col, j) => {
                    return(
                      <TableCell align="right">
                        <span title={product[col.field]}>{product[col.field]}</span>
                      </TableCell> 
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(TableProducts);

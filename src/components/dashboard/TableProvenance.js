import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  btn: {
    margin: '0 auto',
    width: '4em',
    display: 'block',
  },
};

class TableProvenance extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'name',
        header: 'Name',
      },
      {
        field: 'process',
        header: 'Process ID',
      },
      {
        field: 'product',
        header: 'Product Log',
      },
      {
        field: 'comments',
        header: 'Comments',
      },
    ];

    const columnsData = [
      {
        name: 'Teste',
        process: 'Teste',
        product: 'Teste',
        comments: 'Teste',
      },
    ];

    this.state = {
      cols: columns,
      data: columnsData,
      loading: false,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    rows: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  //   onShowStatus = rowData => {
  //     console.log('onShowStatus: ', rowData);
  //   };

  //   actionShare = rowData => {
  //     const { classes } = this.props;
  //     return (

  //     );
  //   };

  render() {
    const header = (
      <div style={{ textAlign: 'left' }}>
        {/* <p>{this.props.title}</p> */}
        <p>Title Table</p>
      </div>
    );

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
      <DataTable
        header={header}
        // value={this.props.rows}
        value={this.state.data}
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
    );
  }
}

export default withStyles(styles)(TableProvenance);

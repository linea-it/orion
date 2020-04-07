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

class TableVersion extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'name',
        header: 'Name',
        style: {
          textAlign: 'left',
          paddingLeft: '20px',
        },
      },
      {
        field: 'process_version',
        header: 'Process Version',
      },
      {
        field: 'used_version',
        header: 'Version Used',
      },
      {
        field: 'last_version',
        header: 'Last Version',
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    versionProcess: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const columns = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          sortable={true}
          style={col.style ? col.style : {}}
          body={col.body}
        />
      );
    });

    return (
      <DataTable
        value={this.props.versionProcess}
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

export default withStyles(styles)(TableVersion);

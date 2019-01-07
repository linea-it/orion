import React, { Component } from 'react';
import Proptypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default class TableProcess extends Component {
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
      },
      {
        field: 'share',
        header: 'Share',
      },
      {
        field: 'published',
        header: 'Published',
      },
      {
        field: 'provenance',
        header: 'Provenance',
      },
      {
        field: 'comments',
        header: 'Comments',
      },
      {
        field: 'product',
        header: 'Product Log',
      },
      {
        field: 'products',
        header: 'Products',
      },
      {
        field: 'export',
        header: 'Export',
        body: this.actionRuns,
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
    };
  }

  static propTypes = {
    title: Proptypes.string,
    rows: Proptypes.array,
  };

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
        resizableColumns={true}
        columnResizeMode="expand"
        reorderableColumns={true}
        reorderableRows={true}
        responsive={true}
        selectionMode="single"
        selection={this.state.selectedCar1}
        onSelectionChange={e => this.setState({ selectedCar1: e.data })}
        scrollable={true}
        scrollHeight="300px"
      >
        {columns}
      </DataTable>
    );
  }
}

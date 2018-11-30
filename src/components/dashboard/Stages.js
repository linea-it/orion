import React, { Component } from 'react';
// import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import Proptypes from 'prop-types';

import columnsTableHeader from '../../assets/json/columnsTableDashboard.json';

export default class Stages extends Component {
  constructor(props) {
    super(props);

    const columnsTable = columnsTableHeader;
    this.colOptionsTable = [];

    this.state = {
      colsTable: columnsTable,
      //   rows: [],
      loading: false,
    };

    for (const col of columnsTable) {
      this.colOptionsTable.push({
        label: col.header,
        value: col,
      });
    }
  }

  static propTypes = {
    title: Proptypes.string,
    rows: Proptypes.array,
    // level: Proptypes.number,
  };

  onColumnToggleTable = evt => {
    this.setState({ colsTable: evt.value });
  };

  //   componentDidMount() {
  //     this.setState({
  //       loading: true,
  //     });
  //   }

  render() {
    const header = (
      <div style={{ textAlign: 'left' }}>
        <p>{this.props.title}</p>
        <MultiSelect
          value={this.state.colsTable}
          options={this.colOptionsTable}
          onChange={this.onColumnToggleTable}
        />
      </div>
    );

    const columnsTable = this.state.colsTable.map(col => {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable={true}
        />
      );
    });

    return (
      <DataTable
        header={header}
        value={this.props.rows}
        resizableColumns={true}
        columnResizeMode="expand"
        reorderableColumns={true}
        reorderableRows={true}
        responsive={true}
        selectionMode="single"
        selection={this.state.selectedCar1}
        onSelectionChange={e => this.setState({ selectedCar1: e.data })}
        scrollable={true}
        scrollHeight="200px"
        loading={this.state.loading}
      >
        {columnsTable}
      </DataTable>
    );
  }
}

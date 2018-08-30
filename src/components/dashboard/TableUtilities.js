import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableUtilities extends Component {
  constructor() {
    super();

    const columnsTableUtilities = columnsTableDashboard;

    this.state = {
      colsTableUtilities: columnsTableUtilities,
      data: DADOS,
    };

    this.colOptionsTableUtilities = [];

    for (const col of columnsTableUtilities) {
      this.colOptionsTableUtilities.push({ label: col.header, value: col });
    }

    this.onColumnToggleTableUtilities = this.onColumnToggleTableUtilities.bind(
      this
    );
  }

  onColumnToggleTableUtilities(event) {
    this.setState({ colsTableUtilities: event.value });
  }

  render() {
    const footer = (
      <div style={{ textAlign: 'left' }}>
        <MultiSelect
          value={this.state.colsTableUtilities}
          options={this.colOptionsTableUtilities}
          onChange={this.onColumnToggleTableUtilities}
        />
      </div>
    );

    const columnsTableUtilities = this.state.colsTableUtilities.map(col => {
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
        header="Data Instalation"
        footer={footer}
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
        scrollHeight="200px"
      >
        {columnsTableUtilities}
      </DataTable>
    );
  }
}

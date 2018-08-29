import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableDataInstalation extends Component {
  constructor() {
    super();

    const columnsTableDataInstalation = columnsTableDashboard;

    this.state = {
      colsTableDataInstalation: columnsTableDataInstalation,
      data: DADOS,
    };

    this.colOptionsTableDataInstalation = [];

    for (const col of columnsTableDataInstalation) {
      this.colOptionsTableDataInstalation.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableDataInstalation = this.onColumnToggleTableDataInstalation.bind(
      this
    );
  }

  onColumnToggleTableDataInstalation(event) {
    this.setState({ colsTableDataInstalation: event.value });
  }

  render() {
    const footer = (
      <div style={{ textAlign: 'left' }}>
        <MultiSelect
          value={this.state.colsTableDataInstalation}
          options={this.colOptionsTableDataInstalation}
          onChange={this.onColumnToggleTableDataInstalation}
        />
      </div>
    );

    const columnsTableDataInstalation = this.state.colsTableDataInstalation.map(
      col => {
        return (
          <Column
            key={col.field}
            field={col.field}
            header={col.header}
            sortable={true}
          />
        );
      }
    );

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
        {columnsTableDataInstalation}
      </DataTable>
    );
  }
}

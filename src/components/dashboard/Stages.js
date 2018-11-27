import React, { Component } from 'react';
// import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import Proptypes from 'prop-types';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';

export default class Stages extends Component {
  constructor(props) {
    super(props);

    const columnsTableDataInstalation = columnsTableDashboard;

    this.state = {
      colsTableDataInstalation: columnsTableDataInstalation,
      rows: [],
      loading: false,
    };

    this.colOptionsTableDataInstalation = [];

    for (const col of columnsTableDataInstalation) {
      this.colOptionsTableDataInstalation.push({
        label: col.header,
        value: col,
      });
    }
  }

  static propTypes = {
    rows: Proptypes.array,
  };

  onColumnToggleTableDataInstalation = evt => {
    this.setState({ colsTableDataInstalation: evt.value });
  };

  render() {
    const header = (
      <div style={{ textAlign: 'left' }}>
        <p>Data Instalation</p>
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
        {columnsTableDataInstalation}
      </DataTable>
    );
  }
}

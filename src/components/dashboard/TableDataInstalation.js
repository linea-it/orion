import React, { Component } from 'react';
import Centaurus from '../../api';

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
      // rows: [],
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

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadDataInstalation();
  }

  loadDataInstalation = async () => {
    const dataInstalation = await Centaurus.getAllDataInstalation();
    if (
      dataInstalation &&
      dataInstalation.pipelinesModulesList &&
      dataInstalation.pipelinesModulesList.edges
    ) {
      const rows = dataInstalation.pipelinesModulesList.edges.map(e => {
        return {
          pipeline: e.node.pipeline.displayName,
          displayName: e.node.module.displayName,
          moduleId: e.node.module.moduleId,
          owner: e.node.module.user.displayName,
          version: e.node.module.version,
        };
      });
      this.setState({
        rows,
        loading: false,
      });
    } else {
      this.setState({ loading: false });
    }
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
        value={this.state.data}
        // value={this.state.rows}
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

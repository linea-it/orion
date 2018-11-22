import React, { Component } from 'react';
import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableDataPreparation extends Component {
  constructor() {
    super();

    const columnsTableDataPreparation = columnsTableDashboard;

    this.state = {
      colsTableDataPreparation: columnsTableDataPreparation,
      data: DADOS,
      // rows: [],
    };

    this.colOptionsTableDataPreparation = [];

    for (const col of columnsTableDataPreparation) {
      this.colOptionsTableDataPreparation.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableDataPreparation = this.onColumnToggleTableDataPreparation.bind(
      this
    );
  }

  onColumnToggleTableDataPreparation(event) {
    this.setState({ colsTableDataPreparation: event.value });
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadDataPreparation();
  }

  loadDataPreparation = async () => {
    const dataPreparation = await Centaurus.getAllDataPreparation();
    if (
      dataPreparation &&
      dataPreparation.pipelinesModulesList &&
      dataPreparation.pipelinesModulesList.edges
    ) {
      const rows = dataPreparation.pipelinesModulesList.edges.map(e => {
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
        <p>Data Preparation</p>
        <MultiSelect
          value={this.state.colsTableDataPreparation}
          options={this.colOptionsTableDataPreparation}
          onChange={this.onColumnToggleTableDataPreparation}
        />
      </div>
    );

    const columnsTableDataPreparation = this.state.colsTableDataPreparation.map(
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
        {columnsTableDataPreparation}
      </DataTable>
    );
  }
}

import React, { Component } from 'react';
import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableScienceReadyCatalogs extends Component {
  constructor() {
    super();

    const columnsTableScienceReadyCatalogs = columnsTableDashboard;

    this.state = {
      colsTableScienceReadyCatalogs: columnsTableScienceReadyCatalogs,
      data: DADOS,
      // rows: [],
      loading: false,
    };

    this.colOptionsTableScienceReadyCatalogs = [];

    for (const col of columnsTableScienceReadyCatalogs) {
      this.colOptionsTableScienceReadyCatalogs.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableScienceReadyCatalogs = this.onColumnToggleTableScienceReadyCatalogs.bind(
      this
    );
  }

  onColumnToggleTableScienceReadyCatalogs(event) {
    this.setState({ colsTableScienceReadyCatalogs: event.value });
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadScienceReadyCatalogs();
  }

  loadScienceReadyCatalogs = async () => {
    const scienceReadyCatalogs = await Centaurus.getAllScienceReadyCatalogs();
    if (
      scienceReadyCatalogs &&
      scienceReadyCatalogs.pipelinesModulesList &&
      scienceReadyCatalogs.pipelinesModulesList.edges
    ) {
      const rows = scienceReadyCatalogs.pipelinesModulesList.edges.map(e => {
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
        <p>Science Ready Catalogs</p>
        <MultiSelect
          value={this.state.colsTableScienceReadyCatalogs}
          options={this.colOptionsTableScienceReadyCatalogs}
          onChange={this.onColumnToggleTableScienceReadyCatalogs}
        />
      </div>
    );

    const columnsTableScienceReadyCatalogs = this.state.colsTableScienceReadyCatalogs.map(
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
        loading={this.state.loading}
      >
        {columnsTableScienceReadyCatalogs}
      </DataTable>
    );
  }
}

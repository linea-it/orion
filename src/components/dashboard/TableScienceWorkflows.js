import React, { Component } from 'react';
import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableScienceWorkflows extends Component {
  constructor() {
    super();

    const columnsTableScienceWorkflows = columnsTableDashboard;

    this.state = {
      colsTableScienceWorkflows: columnsTableScienceWorkflows,
      data: DADOS,
      // rows: [],
    };

    this.colOptionsTableScienceWorkflows = [];

    for (const col of columnsTableScienceWorkflows) {
      this.colOptionsTableScienceWorkflows.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableScienceWorkflows = this.onColumnToggleTableScienceWorkflows.bind(
      this
    );
  }

  onColumnToggleTableScienceWorkflows(event) {
    this.setState({ colsTableScienceWorkflows: event.value });
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadScienceWorkflows();
  }

  loadScienceWorkflows = async () => {
    const scienceWorkflows = await Centaurus.getAllScienceWorkflows();
    if (
      scienceWorkflows &&
      scienceWorkflows.pipelinesModulesList &&
      scienceWorkflows.pipelinesModulesList.edges
    ) {
      const rows = scienceWorkflows.pipelinesModulesList.edges.map(e => {
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
        <p>Science Workflows</p>
        <MultiSelect
          value={this.state.colsTableScienceWorkflows}
          options={this.colOptionsTableScienceWorkflows}
          onChange={this.onColumnToggleTableScienceWorkflows}
        />
      </div>
    );

    const columnsTableScienceWorkflows = this.state.colsTableScienceWorkflows.map(
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
        {columnsTableScienceWorkflows}
      </DataTable>
    );
  }
}

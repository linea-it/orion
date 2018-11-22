import React, { Component } from 'react';
import Centaurus from '../../api';

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
      // rows: [],
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

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadUtilities();
  }

  loadUtilities = async () => {
    const utilities = await Centaurus.getAllUtilities();
    if (
      utilities &&
      utilities.pipelinesModulesList &&
      utilities.pipelinesModulesList.edges
    ) {
      const rows = utilities.pipelinesModulesList.edges.map(e => {
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
        <p>Utilities</p>
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
        {columnsTableUtilities}
      </DataTable>
    );
  }
}

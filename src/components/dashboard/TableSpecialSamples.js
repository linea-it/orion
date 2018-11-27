import React, { Component } from 'react';
import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableSpecialSamples extends Component {
  constructor() {
    super();

    const columnsTableSpecialSamples = columnsTableDashboard;

    this.state = {
      colsTableSpecialSamples: columnsTableSpecialSamples,
      data: DADOS,
      // rows: [],
      loading: false,
    };

    this.colOptionsTableSpecialSamples = [];

    for (const col of columnsTableSpecialSamples) {
      this.colOptionsTableSpecialSamples.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableSpecialSamples = this.onColumnToggleTableSpecialSamples.bind(
      this
    );
  }

  onColumnToggleTableSpecialSamples(event) {
    this.setState({ colsTableSpecialSamples: event.value });
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadSpecialSamples();
  }

  loadSpecialSamples = async () => {
    const specialSamples = await Centaurus.getAllSpecialSamples();
    if (
      specialSamples &&
      specialSamples.pipelinesModulesList &&
      specialSamples.pipelinesModulesList.edges
    ) {
      const rows = specialSamples.pipelinesModulesList.edges.map(e => {
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
        <p>Special Samples</p>
        <MultiSelect
          value={this.state.colsTableSpecialSamples}
          options={this.colOptionsTableSpecialSamples}
          onChange={this.onColumnToggleTableSpecialSamples}
        />
      </div>
    );

    const columnsTableSpecialSamples = this.state.colsTableSpecialSamples.map(
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
        {columnsTableSpecialSamples}
      </DataTable>
    );
  }
}

import React, { Component } from 'react';
import Centaurus from '../../api';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableParameterStimation extends Component {
  constructor() {
    super();

    const columnsTableParameterStimation = columnsTableDashboard;

    this.state = {
      colsTableParameterStimation: columnsTableParameterStimation,
      data: DADOS,
      // rows: [],
    };

    this.colOptionsTableParameterStimation = [];

    for (const col of columnsTableParameterStimation) {
      this.colOptionsTableParameterStimation.push({
        label: col.header,
        value: col,
      });
    }

    this.onColumnToggleTableParameterStimation = this.onColumnToggleTableParameterStimation.bind(
      this
    );
  }

  onColumnToggleTableParameterStimation(event) {
    this.setState({ colsTableParameterStimation: event.value });
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    this.loadParameterStimation();
  }

  loadParameterStimation = async () => {
    const parameterStimation = await Centaurus.getAllParameterStimation();
    if (
      parameterStimation &&
      parameterStimation.pipelinesModulesList &&
      parameterStimation.pipelinesModulesList.edges
    ) {
      const rows = parameterStimation.pipelinesModulesList.edges.map(e => {
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
        <p>Parameter Stimation</p>
        <MultiSelect
          value={this.state.colsTableParameterStimation}
          options={this.colOptionsTableParameterStimation}
          onChange={this.onColumnToggleTableParameterStimation}
        />
      </div>
    );

    const columnsTableParameterStimation = this.state.colsTableParameterStimation.map(
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
        {columnsTableParameterStimation}
      </DataTable>
    );
  }
}

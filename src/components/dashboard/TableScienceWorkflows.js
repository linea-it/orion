import React, { Component }from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableScienceWorkflows extends Component {
    constructor() {
        super();

        let columnsTableScienceWorkflows = columnsTableDashboard;

        this.state = {
            colsTableScienceWorkflows: columnsTableScienceWorkflows,
            data: DADOS
        };

        this.colOptionsTableScienceWorkflows = [];

        for(let col of columnsTableScienceWorkflows) {
            this.colOptionsTableScienceWorkflows.push({label: col.header, value: col});
        }

        this.onColumnToggleTableScienceWorkflows = this.onColumnToggleTableScienceWorkflows.bind(this);
    }

    onColumnToggleTableScienceWorkflows(event) {
        this.setState({colsTableScienceWorkflows: event.value});
    }

    render() {
        let footer = <div style={{textAlign:'left'}}>
                        <MultiSelect value={this.state.colsTableScienceWorkflows} options={this.colOptionsTableScienceWorkflows} onChange={this.onColumnToggleTableScienceWorkflows} />
                    </div>;

        let columnsTableScienceWorkflows = this.state.colsTableScienceWorkflows.map((col,i) => {
            return <Column key={col.field} field={col.field} header={col.header} sortable={true} />;
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
                onSelectionChange={(e) => this.setState({selectedCar1: e.data})}
                scrollable={true}
                scrollHeight="200px"
            >
                {columnsTableScienceWorkflows}
            </DataTable>
        )
    }
}
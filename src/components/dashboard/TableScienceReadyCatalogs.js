import React, { Component }from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableScienceReadyCatalogs extends Component {
    constructor() {
        super();

        let columnsTableScienceReadyCatalogs = columnsTableDashboard;

        this.state = {
            colsTableScienceReadyCatalogs: columnsTableScienceReadyCatalogs,
            data: DADOS
        };

        this.colOptionsTableScienceReadyCatalogs = [];

        for(let col of columnsTableScienceReadyCatalogs) {
            this.colOptionsTableScienceReadyCatalogs.push({label: col.header, value: col});
        }

        this.onColumnToggleTableScienceReadyCatalogs = this.onColumnToggleTableScienceReadyCatalogs.bind(this);
    }

    onColumnToggleTableScienceReadyCatalogs(event) {
        this.setState({colsTableScienceReadyCatalogs: event.value});
    }

    render() {
        let footer = <div style={{textAlign:'left'}}>
                        <MultiSelect value={this.state.colsTableScienceReadyCatalogs} options={this.colOptionsTableScienceReadyCatalogs} onChange={this.onColumnToggleTableScienceReadyCatalogs} />
                    </div>;

        let columnsTableScienceReadyCatalogs = this.state.colsTableScienceReadyCatalogs.map((col,i) => {
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
                {columnsTableScienceReadyCatalogs}
            </DataTable>
        )
    }
}
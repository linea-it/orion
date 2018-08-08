import React, { Component }from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableDataPreparation extends Component {
    constructor() {
        super();

        let columnsTableDataPreparation = columnsTableDashboard;

        this.state = {
            colsTableDataPreparation: columnsTableDataPreparation,
            data: DADOS
        };

        this.colOptionsTableDataPreparation = [];

        for(let col of columnsTableDataPreparation) {
            this.colOptionsTableDataPreparation.push({label: col.header, value: col});
        }

        this.onColumnToggleTableDataPreparation = this.onColumnToggleTableDataPreparation.bind(this);
    }

    onColumnToggleTableDataPreparation(event) {
        this.setState({colsTableDataPreparation: event.value});
    }

    render() {
        let footer = <div style={{textAlign:'left'}}>
                        <MultiSelect value={this.state.colsTableDataPreparation} options={this.colOptionsTableDataPreparation} onChange={this.onColumnToggleTableDataPreparation} />
                    </div>;

        let columnsTableDataPreparation = this.state.colsTableDataPreparation.map((col,i) => {
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
                {columnsTableDataPreparation}
            </DataTable>
        )
    }
}
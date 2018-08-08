import React, { Component }from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableSpecialSamples extends Component {
    constructor() {
        super();

        let columnsTableSpecialSamples = columnsTableDashboard;

        this.state = {
            colsTableSpecialSamples: columnsTableSpecialSamples,
            data: DADOS
        };

        this.colOptionsTableSpecialSamples = [];

        for(let col of columnsTableSpecialSamples) {
            this.colOptionsTableSpecialSamples.push({label: col.header, value: col});
        }

        this.onColumnToggleTableSpecialSamples = this.onColumnToggleTableSpecialSamples.bind(this);
    }

    onColumnToggleTableSpecialSamples(event) {
        this.setState({colsTableSpecialSamples: event.value});
    }

    render() {
        let footer = <div style={{textAlign:'left'}}>
                        <MultiSelect value={this.state.colsTableSpecialSamples} options={this.colOptionsTableSpecialSamples} onChange={this.onColumnToggleTableSpecialSamples} />
                    </div>;

        let columnsTableSpecialSamples = this.state.colsTableSpecialSamples.map((col,i) => {
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
                {columnsTableSpecialSamples}
            </DataTable>
        )
    }
}
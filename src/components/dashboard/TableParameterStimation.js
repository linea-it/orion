import React, { Component }from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';

import columnsTableDashboard from '../../assets/json/columnsTableDashboard.json';
import DADOS from '../../assets/json/dataDashboard.json';

export default class TableParameterStimation extends Component {
    constructor() {
        super();

        let columnsTableParameterStimation = columnsTableDashboard;

        this.state = {
            colsTableParameterStimation: columnsTableParameterStimation,
            data: DADOS
        };

        this.colOptionsTableParameterStimation = [];

        for(let col of columnsTableParameterStimation) {
            this.colOptionsTableParameterStimation.push({label: col.header, value: col});
        }

        this.onColumnToggleTableParameterStimation = this.onColumnToggleTableParameterStimation.bind(this);
    }

    onColumnToggleTableParameterStimation(event) {
        this.setState({colsTableParameterStimation: event.value});
    }

    render() {
        let footer = <div style={{textAlign:'left'}}>
                        <MultiSelect value={this.state.colsTableParameterStimation} options={this.colOptionsTableParameterStimation} onChange={this.onColumnToggleTableParameterStimation} />
                    </div>;

        let columnsTableParameterStimation = this.state.colsTableParameterStimation.map((col,i) => {
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
                {columnsTableParameterStimation}
            </DataTable>
        )
    }
}
import React, { Component } from 'react';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import Proptypes from 'prop-types';
import { Button } from 'primereact/button';

const styles = {
  btnStatus: {
    textAlign: 'center',
    width: '100%',
  },
  btnRuns: {
    margin: '0 auto',
    width: '4em',
    display: 'block',
  },
};

export default class Stages extends Component {
  constructor(props) {
    super(props);

    this.colOptionsTable = [];

    const columns = [
      {
        field: 'displayName',
        header: 'Pipeline',
      },
      {
        field: 'start',
        header: 'Start',
      },
      {
        field: 'duration',
        header: 'Duration',
      },
      {
        field: 'runs',
        header: 'Runs',
        body: this.actionRuns,
      },
      {
        field: 'status',
        header: 'Status',
        body: this.actionStatus,
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
    };

    for (const col of columns) {
      this.colOptionsTable.push({
        label: col.header,
        value: col,
      });
    }
  }

  static propTypes = {
    title: Proptypes.string,
    rows: Proptypes.array,
  };

  onColumnToggleTable = evt => {
    this.setState({ cols: evt.value });
  };

  openRuns = rowData => {
    window.open('http://www.linea.gov.br/', rowData, 'width=950, height=650');
  };

  onStatus = rowData => {
    console.log('onStatus: ', rowData);
  };

  actionStatus = rowData => {
    if (rowData.status === 'failure') {
      return (
        <Button
          type="button"
          label="Failure"
          title="Failure"
          className="ui-button-danger"
          style={styles.btnStatus}
          // disabled={true}
          onClick={() => this.onStatus(rowData)}
        />
      );
    } else if (rowData.status === 'invalid') {
      return (
        <Button
          type="button"
          label="Invalid"
          title="Invalid"
          className="ui-button-secondary"
          style={styles.btnStatus}
          disabled={true}
          onClick={() => this.onStatus(rowData)}
        />
      );
    } else {
      return (
        <Button
          type="button"
          label="Success"
          title="Success"
          className="ui-button-success"
          style={styles.btnStatus}
          onClick={() => this.onStatus(rowData)}
        />
      );
    }
  };

  actionRuns = rowData => {
    if (rowData.runs !== 0) {
      return (
        <Button
          type="button"
          label={rowData.runs}
          title={rowData.runs}
          className="ui-button-info"
          style={styles.btnRuns}
          onClick={() => this.openRuns(rowData)}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    const header = (
      <div style={{ textAlign: 'left' }}>
        <p>{this.props.title}</p>
        <MultiSelect
          value={this.state.cols}
          options={this.colOptionsTable}
          onChange={this.onColumnToggleTable}
        />
      </div>
    );

    const columns = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          sortable={true}
          body={col.body}
        />
      );
    });

    return (
      <DataTable
        header={header}
        value={this.props.rows}
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
        {columns}
      </DataTable>
    );
  }
}

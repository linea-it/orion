import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Button } from 'primereact/button';
import { withStyles } from '@material-ui/core/styles';
import { Dialog } from 'primereact/dialog';

import TableProcess from './TableProcess';

const styles = {
  btnStatus: {
    display: 'table',
    margin: '0 auto',
    width: '7em',
  },
  btnRuns: {
    display: 'table',
    margin: '0 auto',
    width: '4em',
  },
};

class Stages extends Component {
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
      visible: false,
    };

    for (const col of columns) {
      this.colOptionsTable.push({
        label: col.header,
        value: col,
      });
    }
  }

  static propTypes = {
    title: PropTypes.string,
    rows: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  onColumnToggleTable = evt => {
    this.setState({ cols: evt.value });
  };

  openRuns = rowData => {
    // window.open(<TableProcess />, rowData, 'width=950, height=650');
    this.onClick(rowData);
  };

  onStatus = rowData => {
    console.log('onStatus: ', rowData);
  };

  onClick = () => {
    this.setState({ visible: true });
  };

  onHide = () => {
    this.setState({ visible: false });
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

  renderModal = () => {
    return (
      <Dialog
        header="Godfather I"
        visible={this.state.visible}
        width="auto"
        minY={70}
        onHide={this.onHide}
        maximizable={true}
        modal={true}
        style={{ zIndex: '999' }}
      >
        <TableProcess />
      </Dialog>
    );
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
      <div>
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
        {this.renderModal()}
      </div>
    );
  }
}

export default withStyles(styles)(Stages);

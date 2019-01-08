import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { MultiSelect } from 'primereact/multiselect';
import { Dialog } from 'primereact/dialog';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import TableProcess from './TableProcess';

const styles = {
  button: {
    textTransform: 'none',
    padding: '1px 5px',
    minWidth: '5em',
    minHeight: '2em',
    display: 'block',
    margin: '0 auto',
  },
  btnSuccess: {
    backgroundColor: 'green',
    color: '#fff',
  },
  btnFailure: {
    backgroundColor: 'red',
    color: '#fff',
  },
  btnRuns: {
    minWidth: '2em',
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

  onShowRuns = rowData => {
    this.onClick(rowData);
  };

  onShowStatus = rowData => {
    console.log('onShowStatus: ', rowData);
  };

  onClick = () => {
    this.setState({ visible: true });
  };

  onHideRuns = () => {
    this.setState({ visible: false });
  };

  actionStatus = rowData => {
    const { classes } = this.props;
    if (rowData.status === 'failure') {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnFailure}
          onClick={() => this.onShowStatus(rowData)}
        >
          Failure
        </Button>
      );
    } else if (rowData.status === 'invalid') {
      return (
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          style={styles.btnInvalid}
          disabled
          onClick={() => this.onShowStatus(rowData)}
        >
          Invalid
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnSuccess}
          onClick={() => this.onShowStatus(rowData)}
        >
          Success
        </Button>
      );
    }
  };

  actionRuns = rowData => {
    const { classes } = this.props;
    if (rowData.runs !== 0) {
      return (
        <Button
          variant="contained"
          className={classes.button}
          style={styles.btnRuns}
          onClick={() => this.onShowRuns(rowData)}
        >
          {/* {rowData.runs} */}
          88
        </Button>
      );
    } else {
      return null;
    }
  };

  renderModal = () => {
    return (
      <Dialog
        header="Title Modal"
        visible={this.state.visible}
        width="90%"
        minY={70}
        onHide={this.onHideRuns}
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

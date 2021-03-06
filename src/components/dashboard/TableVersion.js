import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { withStyles } from '@material-ui/core/styles';

const styles = {
  btn: {
    margin: '0 auto',
    width: '4em',
    display: 'block',
  },
};

class TableVersion extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'name',
        header: 'Component',
        style: {
          textAlign: 'left',
          paddingLeft: '20px',
        },
        width: 120,
      },
      {
        field: 'versionDate',
        header: 'Current Date',
        body: this.renderData,
      },
      {
        field: 'last_version',
        header: 'Current Version',
      },
      {
        field: 'used_version',
        header: 'Current Used',
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
    };
  }

  static propTypes = {
    title: PropTypes.string,
    versionProcess: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  renderData = rowData => {
    if (rowData && rowData.versionDate) {
      return (
        <span>{moment(rowData.versionDate).format('YYYY-MM-DD HH:mm:ss')}</span>
      );
    } else {
      return '-';
    }
  };

  render() {
    const pipelineProcess = this.props.versionProcess[0]
      ? [
          {
            name: this.props.versionProcess[0].name_pipeline,
            used_version: this.props.versionProcess[0].process_version,
            last_version: this.props.versionProcess[0].pipeline_version,
            versionDate: this.props.versionProcess[0].pipeline_versionDate,
          },
        ]
      : [];

    const columns = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          sortable={true}
          style={col.style ? col.style : {}}
          body={col.body}
        />
      );
    });

    const columns_pipeline = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={i === 0 ? 'Pipeline' : col.header}
          sortable={true}
          style={col.style ? col.style : {}}
          body={col.body}
        />
      );
    });

    return (
      <div>
        <DataTable
          value={pipelineProcess}
          resizableColumns={true}
          columnResizeMode="expand"
          reorderableColumns={true}
          reorderableRows={true}
          responsive={true}
          selectionMode="single"
          selection={this.state.selectedCar1}
          onSelectionChange={e => this.setState({ selectedCar1: e.data })}
          scrollable={true}
          scrollHeight="60vh"
          style={{ zIndex: '95', paddingTop: '10px' }}
        >
          {columns_pipeline}
        </DataTable>
        <DataTable
          value={this.props.versionProcess}
          resizableColumns={true}
          columnResizeMode="expand"
          reorderableColumns={true}
          reorderableRows={true}
          responsive={true}
          selectionMode="single"
          selection={this.state.selectedCar1}
          onSelectionChange={e => this.setState({ selectedCar1: e.data })}
          scrollable={true}
          scrollHeight="60vh"
          style={{ zIndex: '95', paddingTop: '10px' }}
        >
          {columns}
        </DataTable>
      </div>
    );
  }
}

export default withStyles(styles)(TableVersion);

import React, { Component } from 'react';
import PropTypes from 'prop-types';

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

class TableDataset extends Component {
  constructor(props) {
    super(props);

    const columns = [
      {
        field: 'dataset',
        header: 'Dataset',
        style: {
          textAlign: 'left',
          paddingLeft: '20px',
        },
      },
      {
        field: 'release',
        header: 'Release',
        style: {
          textAlign: 'left',
          paddingLeft: '20px',
        },
      },
    ];

    this.state = {
      cols: columns,
      loading: false,
      expandedRows: null,
    };

    this.headerTemplate = this.headerTemplate.bind(this);
    this.footerTemplate = this.footerTemplate.bind(this);
  }

  static propTypes = {
    title: PropTypes.string,
    rowsDatasetProcess: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
  };

  headerTemplate(data) {
    return data.release;
  }

  footerTemplate() {
    return null;
  }

  render() {
    const columns = this.state.cols.map((col, i) => {
      return (
        <Column
          key={i}
          field={col.field}
          header={col.header}
          // sortable={true}
          body={col.body}
          style={col.style ? col.style : {}}
        />
      );
    });

    return (
      <DataTable
        value={this.props.rowsDatasetProcess}
        scrollable={true}
        scrollHeight="60vh"
        style={{ zIndex: '95' }}
        sortField="release"
        sortOrder={1}
      >
        {columns}
      </DataTable>
    );
  }
}

export default withStyles(styles)(TableDataset);

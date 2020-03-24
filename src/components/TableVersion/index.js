import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomTable from '../Table/';

// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

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
        name: 'name',
        title: 'Name',
        style: {
          textAlign: 'left',
          paddingLeft: '20px',
        },
        width: 300,
      },
      {
        name: 'version',
        title: 'Version',
        width: 300,
      },
      {
        name: 'last_version',
        title: 'Last Version',
        width: 300,
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

  render() {
    return (
      <CustomTable
        // eslint-disable-next-line react/prop-types
        data={this.props.versionProcess}
        columns={this.state.cols}
        remote={false}
        pageSize={5}
        pageSizes={[5, 15, 50, 100, 500]}
        // eslint-disable-next-line react/prop-types
        totalCount={this.props.versionProcess.length}
        reload={false}
        hasSearching={false}
        hasToolbar={false}
        hasPagination={false}
        hasColumnVisibility={false}
      />
      // <DataTable
      //   value={this.props.versionProcess}
      //   resizableColumns={true}
      //   columnResizeMode="expand"
      //   reorderableColumns={true}
      //   reorderableRows={true}
      //   responsive={true}
      //   selectionMode="single"
      //   selection={this.state.selectedCar1}
      //   onSelectionChange={e => this.setState({ selectedCar1: e.data })}
      //   scrollable={true}
      //   scrollHeight="600px"
      //   style={{ zIndex: '95' }}
      // >
      //   {columns}
      // </DataTable>
    );
  }
}

export default withStyles(styles)(TableVersion);

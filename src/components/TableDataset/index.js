/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import CustomTable from '../Table/';
import { CardContent } from '@material-ui/core';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';

function TableDataset(props) {
  const columns = [
    {
      name: 'release',
      title: 'Release',
      style: {
        textAlign: 'left',
        paddingLeft: '20px',
      },
      width: 400,
    },
    {
      name: 'dataset',
      title: 'Dataset',
      style: {
        textAlign: 'left',
        paddingLeft: '20px',
      },
      width: 400,
    },
  ];

  const [state] = useState({
    cols: columns,
    loading: false,
  });

  return (
    <CardContent>
      <CustomTable
        data={props.rowsDatasetProcess}
        columns={state.cols}
        remote={false}
        pageSize={5}
        pageSizes={[5, 15, 50, 100, 500]}
        totalCount={props.rowsDatasetProcess.length}
        reload={false}
        hasSearching={false}
        hasToolbar={false}
        hasPagination={false}
        hasColumnVisibility={false}
      />
    </CardContent>
  );
}

export default TableDataset;

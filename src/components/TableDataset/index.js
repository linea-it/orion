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
    },
    {
      name: 'dataset',
      title: 'Dataset',
      style: {
        textAlign: 'left',
        paddingLeft: '20px',
      },
    },
  ];

  const [state] = useState({
    cols: columns,
    loading: false,
  });

  // const columnsList = state.cols.map((col, i) => {
  //   return (
  //     <Column
  //       key={i}
  //       field={col.field}
  //       header={col.header}
  //       body={col.body}
  //       style={col.style ? col.style : {}}
  //     />
  //   );
  // });

  return (
    <CardContent>
      {/* <Typography className={classes.titleDialog} variant="subtitle2">
        {header ? header : ''}
      </Typography> */}
      <CustomTable
        // eslint-disable-next-line react/prop-types
        data={props.rowsDatasetProcess}
        columns={state.cols}
        remote={false}
        pageSize={5}
        pageSizes={[5, 15, 50, 100, 500]}
        // eslint-disable-next-line react/prop-types
        totalCount={props.rowsDatasetProcess.length}
        reload={false}
        hasSearching={false}
        hasToolbar={false}
        hasPagination={false}
        hasColumnVisibility={false}
        sizeTable={'smal'}
      />
    </CardContent>
    // <DataTable
    //   // eslint-disable-next-line react/prop-types
    //   value={props.rowsDatasetProcess}
    //   resizableColumns={true}
    //   columnResizeMode="expand"
    //   reorderableColumns={true}
    //   reorderableRows={true}
    //   responsive={true}
    //   selectionMode="single"
    //   selection={state.selectedCar1}
    //   onSelectionChange={e => setState({ selectedCar1: e.data })}
    //   scrollable={true}
    //   scrollHeight="600px"
    //   style={{ zIndex: '95' }}
    // >
    //   {columnsList}
    // </DataTable>
  );
}

export default TableDataset;

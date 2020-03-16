import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

function TableDataset(props) {

  const columns = [
    {
      field: 'release',
      header: 'Release',
      style: {
        textAlign: 'left',
        paddingLeft: '20px',
      },
    },
    {
      field: 'dataset',
      header: 'Dataset',
      style: {
        textAlign: 'left',
        paddingLeft: '20px',
      },
    },
  ];

  const [state, setState] = useState({
    cols: columns,
    loading: false,
  });

  const columnsList = state.cols.map((col, i) => {
    return (
      <Column
        key={i}
        field={col.field}
        header={col.header}
        body={col.body}
        style={col.style ? col.style : {}}
      />
    );
  });

  return (
    <DataTable
      value={props.rowsDatasetProcess}
      resizableColumns={true}
      columnResizeMode="expand"
      reorderableColumns={true}
      reorderableRows={true}
      responsive={true}
      selectionMode="single"
      selection={state.selectedCar1}
      onSelectionChange={e => setState({ selectedCar1: e.data })}
      scrollable={true}
      scrollHeight="600px"
      style={{ zIndex: '95' }}
    >
      {columnsList}
    </DataTable>
  );
}

export default (TableDataset);

import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
// import { Loading } from '../../../theme-sources/material-ui/components/loading';

import Centaurus from '../../api';

// const URL = 'https://js.devexpress.com/Demos/Mvc/api/treeListData';
const ROOT_ID = '';

const getRowId = row => row.process;
const getChildRows = (row, rootRows) => {
  console.log(row)
  const childRows = rootRows.filter(
    r => r.parentId === (row ? row.process : ROOT_ID)
  );
  if (childRows.length) {
    return childRows;
  }
  return row && row.hasItems ? [] : null;
};

const styles = {
  btnIco: {
    padding: '0',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    lineHeight: '.5',
  },
  mark: {
    padding: '0px',
    minWidth: '30px',
    minHeight: '30px',
    display: 'block',
    margin: '0px auto',
    lineHeight: '2',
    textAlign: 'center',
  },
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'process', title: 'Process ID' },
        { name: 'product', title: 'Product Log' },
        { name: 'comments', title: 'Comments' },
      ],
      tableColumnExtensions: [{ columnName: 'name', width: 300 }],
      expandedRowIds: [],
      loading: false,
      data: [],
    };
  }

  static propTypes = {
    // processByProcessId: PropTypes.array,
    loadTableProvenance: PropTypes.func,
    process: PropTypes.object,
  };

  componentDidMount() {
    console.log('DidMount: ', this.props.process);
    this.loadData();
  }

  componentDidUpdate() {

  }

  renderButtonProduct = rowData => {
    if (rowData !== null) {
      return (
        <Button
          style={styles.btnIco}
          title={rowData}
          onClick={() => this.handleClickProductLog(rowData)}
        >
          <Icon>link</Icon>
        </Button>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  renderButtonComments = ({ rowData }) => {
    return (
      <Button
        style={styles.btnIco}
        onClick={this.handleClickComments.bind(this, { rowData: rowData })}
      >
        <Icon>comment</Icon>
      </Button>
    );
  };

  handleClickProductLog = rowData => {
    window.open(rowData, 'Product Log');
  };

  handleClickComments = ({ rowData }) => {
    console.log(rowData, 'handleClickButton');
  };

  changeExpandedRowIds = expandedRowIds => {
    this.setState({ expandedRowIds });
  };

  loadData = async () => {
    const { expandedRowIds, data, loading } = this.state;

    if (loading) {
      return;
    }

    if (data.length === 0) {
      //  Primeira vez, carrega a provenance do processo que recebeu pela prop. 

      console.log('Primeira Vez');

      var processId = this.props.process.process;

      // TODO carregar a provenance
      let [result] = await Promise.all([Centaurus.getAllProcessByProcessId(processId)])

      let rows = this.formatRows(result);

      // Depois de carregar os filhos setar o estado
      this.setState({
        data: rows,
        loading: false,
      })

    } else {

      // Descobrir o id de todos as linhas que nao tem filhos carregados. 
      const rowIdsWithNotLoadedChilds = [ROOT_ID, ...expandedRowIds].filter(
        rowId => data.findIndex(row => row.parentId === rowId) === -1
      );
      console.log('rowIdsWithNotLoadedChilds: ', rowIdsWithNotLoadedChilds);

      //  para cada linha que não tem filho fazer o load do filho. 
      if (rowIdsWithNotLoadedChilds.length) {
        if (loading) return;
        this.setState({ loading: true });

        rowIdsWithNotLoadedChilds.map(rowId => {
          // Fazer a requisicao para cada um dos filhos usando
          // Usar a mesma funcao que usou na primeira vez mais passando o proccess id do filho. 
          console.log("Fazer o request para o id: ", rowId)
        })
      }
    }


  };

  formatRows = (data) => {

    if (data && data.processByProcessId) {
      const rows = data.processByProcessId.inputs.edges.map(
        row => {
          return {
            name: row.node.process.name,
            process: row.node.process.processId,
            product: row.node.process.productLog,
            inputs: row.node.process.inputs.edges,
            items: [],
          };
        }
      );
      return rows;
    } else {
      return [];
    }
  }

  render() {
    const {
      data,
      columns,
      tableColumnExtensions,
      expandedRowIds,
      loading,
    } = this.state;

    console.log('Data: ', data);

    // this.props.processByProcessId.map(el => {
    //   eprocessl['product'] = this.renderButtonProduct(el.product);
    //   el['comments'] = this.renderButtonComments.call(this, { rowData: el });
    //   return el;
    // });
    // console.log(this.props.processByProcessId);

    return (
      <Paper style={{ position: 'relative' }}>
        <Grid rows={data} columns={columns} getRowId={getRowId}>
          <TreeDataState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={this.changeExpandedRowIds}
          />
          <CustomTreeData getChildRows={getChildRows} />
          <VirtualTable columnExtensions={tableColumnExtensions} />
          <TableHeaderRow />
          <TableTreeColumn for="name" />
        </Grid>
        {loading && <CircularProgress />}
      </Paper>
    );
  }
}

import * as React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { TreeDataState, CustomTreeData } from '@devexpress/dx-react-grid';
import {
  Grid,
  Table,
  TableHeaderRow,
  TableTreeColumn,
} from '@devexpress/dx-react-grid-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import Provenance from '../../services/Provenance';

import Centaurus from '../../services/api';

const getRowId = row => {
  return row.id;
};

const getChildRows = (row, rootRows) => (row ? row.items : rootRows);

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
  },
};

const tableContainerComponent = ({ ...restProps }) => (
  <Table.Container
    {...restProps}
    style={{
      maxHeight: '500px',
      overflow: 'auto',
    }}
  />
);

const Cell = ({ ...restProps }) => (
  <Table.Cell
    {...restProps}
    style={{
      fontSize: '1em',
    }}
  />
);

const tableHeaderRowCell = ({ ...restProps }) => (
  <TableHeaderRow.Cell
    {...restProps}
    style={{
      color: '#555555',
      fontSize: '1em',
    }}
  />
);

const tableTreeColumnCell = ({ ...restProps }) => (
  <TableTreeColumn.Cell
    {...restProps}
    style={{
      fontSize: '1em',
    }}
  />
);

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      columns: [
        { name: 'name', title: 'Name' },
        { name: 'process', title: 'Process ID' },
        { name: 'product_btn', title: 'Product Log' },
        { name: 'comments', title: 'Comments' },
      ],
      tableColumnExtensions: [{ columnName: 'name', width: 300 }],
      expandedRowIds: [],
      loading: false,
      data: [],
    };
  }

  static propTypes = {
    process: PropTypes.object,
  };

  componentDidMount() {
    this.loadData();
  }

  componentWillReceiveProps(nextProps) {
    if ((nextProps.process.process, this.props.process.process)) {
      this.setState({ loading: true });
      this.loadData();
    }
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

  renderButtonComments = rowData => {
    if (rowData !== null && rowData.length > 0) {
      return (
        <Button
          style={styles.btnIco}
          title={rowData}
          onClick={() => this.handleClickComments(rowData)}
        >
          <Icon>comment</Icon>
        </Button>
      );
    } else {
      return <span style={styles.mark}>-</span>;
    }
  };

  handleClickProductLog = rowData => {
    window.open(rowData, 'Product Log');
  };

  handleClickComments = rowData => {
    console.log(rowData, 'Comments');
  };

  findProduct = async processId => {
    const data = this.state.data;
    this.setState({ loading: true });
    // eslint-disable-next-line
    const newData = await Promise.all(
      data.map(async p => {
        await p.findProvenance(processId);
        return p;
      })
    );
    this.setState({ data: newData, loading: false });
  };

  changeExpandedRowIds = expandedRowIds => {
    const added = expandedRowIds.filter(
      e => !this.state.expandedRowIds.includes(e)
    );
    if (added.length > 0) this.findProduct(added[0]);
    this.setState({ expandedRowIds });
  };

  clearData = () => {
    this.setState({
      data: [],
      loading: false,
    });
  };

  loadData = async () => {
    const { loading } = this.state;

    if (loading) {
      return;
    }

    var processId = this.props.process.process;

    const result = await Centaurus.getAllProcessByProcessId(processId);
    if (
      result &&
      result.processByProcessId.inputs &&
      result.processByProcessId.inputs.edges
    ) {
      const rows =
        result.processByProcessId.inputs.edges.length > 0
          ? result.processByProcessId.inputs.edges.map(
              e =>
                new Provenance(
                  Math.random()
                    .toString(36)
                    .substr(2, 9),
                  e.node.process.name,
                  e.node.process.processId,
                  e.node.process.productLog,
                  e.node.process.comments,
                  e.node.process.inputs.edges.length > 0 ? [] : undefined
                )
            )
          : undefined;
      this.setState({
        data: rows,
        loading: false,
      });
    } else {
      this.clearData();
    }
  };

  render() {
    const {
      data,
      columns,
      tableColumnExtensions,
      expandedRowIds,
      loading,
    } = this.state;

    data.map(row => {
      row.product_btn = this.renderButtonProduct(row.product);
      row.comments = this.renderButtonComments(row.comments);
      return row;
    });

    return (
      <Paper style={{ position: 'relative', zIndex: '999' }}>
        <Grid rows={data} columns={columns} getRowId={getRowId}>
          <TreeDataState
            expandedRowIds={expandedRowIds}
            onExpandedRowIdsChange={this.changeExpandedRowIds}
          />
          <CustomTreeData getChildRows={getChildRows} />
          <Table
            columnExtensions={tableColumnExtensions}
            cellComponent={Cell}
            containerComponent={tableContainerComponent}
          />
          <TableHeaderRow cellComponent={tableHeaderRowCell} />
          <TableTreeColumn for="name" cellComponent={tableTreeColumnCell} />
        </Grid>
        {loading && (
          <CircularProgress
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              margin: '10px 0 0 -20px',
            }}
          />
        )}
      </Paper>
    );
  }
}
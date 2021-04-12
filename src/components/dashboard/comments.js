import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { Card } from 'primereact/card';

const styles = {
  comment: {
    borderBottom: '1px solid #ccc',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  card: {
    zIndex: '99',
    position: 'relative',
  },
};

class Comments extends Component {
  static propTypes = {
    title: PropTypes.string,
    commentsProcess: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Card style={styles.card}>
        {this.props.commentsProcess.map((item, i) => {
          return (
            <div style={styles.comment} key={i}>
              {item.date} - <strong>{item.user}:</strong> {item.comments}
            </div>
          );
        })}
        {this.props.commentsProcess.length === 0 ? (
          <div>Not found results</div>
        ) : (
          ''
        )}
      </Card>
    );
  }
}

export default withStyles(styles)(Comments);

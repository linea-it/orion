import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import styles from './styles'


function Comments() {

  const classes = styles();

  const propTypes = {
    title: PropTypes.string,
    commentsProcess: PropTypes.array,
    classes: PropTypes.object.isRequired,
  };

  return (
    <Card style={styles.card}>
      {this.props.commentsProcess.map((item, i) => {
        return (
          <div style={styles.comment} key={i}>
            {item.date} - <strong>{item.user}:</strong> {item.comments}
          </div>
        );
      })}
    </Card>
  );
}

export default (Comments);

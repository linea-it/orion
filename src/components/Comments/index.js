import React from 'react';
import { Card } from 'primereact/card';
import style from './styles'

function Comments(props) {

  const styles = style;

  return (
    <Card style={styles.card}>
      {props.commentsProcess.map((item, i) => {
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

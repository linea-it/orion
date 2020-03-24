/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import React from 'react';
import { List, ListItem } from '@material-ui/core';
import { classe, style } from './styles';

function Comments(props) {
  const styles = style;
  const classes = classe();

  return (
    <List className={classes.root}>
      {props.commentsProcess.map((item, i) => {
        return (
          <ListItem alignItems="flex-start" key={i}>
            <div style={styles.comment}>
              {item.date} - <strong>{item.user}:</strong> {item.comments}
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}

export default Comments;

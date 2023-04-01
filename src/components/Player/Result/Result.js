import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './Result.module.scss';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

export default class Results extends Component {

  render () {
    const correct = this.props.lastCorrect;
    let showResult;

    if (correct) {
      showResult =
      <div>
        <div>Correct</div>
        <div>
          <CheckIcon style={{ color:"white", fontSize: 100 }}/>
        </div>
      </div>
    } else {
      showResult =
      <div>
        <div>Incorrect</div>
        <div>
          <CloseIcon style={{ color:"white", fontSize: 100 }}/>
        </div>
      </div>
    }

    return (
      <div>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <Grid
            item
            container
            xs={12}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: "90vh", textAlign: "center" }}
            className={ correct ? styles.correct :  styles.incorrect }
          >
            <div className={ styles.result }>{ showResult }</div>
          </Grid>
        </Grid>
      </div>
    )
  }
}

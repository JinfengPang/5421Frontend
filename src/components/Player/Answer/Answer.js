import React, { Component } from 'react';
import styles from './Answer.module.scss';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';

export default class Answer extends Component {
  constructor() {
    super();
    this.state = {
      answer: '',
      buttonsOn: true
    }
  }

  handleClick = event => {
    this.props.submitAnswer(event.currentTarget.value);
    this.setState({
      buttonsOn: false
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  componentDidMount() {
    const timer = setTimeout(this.props.submitAnswer, 20000, null)
    this.setState({
      timer: timer
    })
  }

  render() {
    let body;

    if (!this.state.buttonsOn) {
      body = <Grid
        item
        container
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "90vh" }}
        className={ styles.answerSubmitted }
      >
        <div>Answer submitted. Waiting for other players.</div>
      </Grid>
    } else {
      body = <Grid
        item
        container
        spacing={1}
        xs={12}
        alignItems="center"
        justify="center"
        style={{ minHeight: "90vh" }}
        className={ styles.answerBlock }
      >
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.red } value="A" onClick={ this.handleClick } fullWidth>
            <FavoriteIcon className={ styles.icons } />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.blue } value="B" onClick={ this.handleClick } fullWidth>
            <GradeIcon className={ styles.icons }  />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.orange } value="C" onClick={ this.handleClick } fullWidth>
            <FiberManualRecordRoundedIcon className={ styles.icons } />
          </Button>
        </Grid>
        <Grid
          item
          xs={6}
        >
          <Button variant="contained" className={ styles.green } value="D" onClick={ this.handleClick } fullWidth>
            <Brightness3SharpIcon className={ styles.icons } />
          </Button>
        </Grid>
      </Grid>
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
       { body }
      </Grid>
    )
  }
}

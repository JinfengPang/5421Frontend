import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import styles from './Instructions.module.scss';
import Grid from '@material-ui/core/Grid';
import axios from "axios";
import {URL} from "../../utils";

export default class Instructions extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);
    const pin = searchParams.get('room_id');
    this.state = {
      pin: pin
    };
  }

  checkGameState = () => {
    axios.post(URL('room/game_state'), {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        step: state.step
      })
    })
  }

  componentDidMount() {
    const serverTimer = setInterval(this.checkGameState, 500);
    this.setState({
      serverTimer: serverTimer,
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.serverTimer)
  }

  render() {
    if (this.state.step === 1) {
      return <Redirect to="/playblock"></Redirect>
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid
          item
          container
          xs={12}
          spacing={4}
          direction="column"
          justify="center"
          alignItems="center"
          style={{ minHeight: "90vh" }}
          className={ styles.mainInfo }
        >
          <Grid
            item
            xs={12}
            className={ styles.in }
          >
            You're in
          </Grid>
          <Grid
            item
            xs={12}
            className={ styles.name }
          >
            See your nickname on screen?
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

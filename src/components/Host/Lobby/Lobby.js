import React, { Component } from 'react';
import styles from './Lobby.module.scss';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { URL } from '../../utils';
import theme from '../Music/theme.mp3';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';


export default class Lobby extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);
    const quizId = searchParams.get('quizId');
    const roomId = searchParams.get('roomId');
    this.state = {
      quizId: quizId,
      pin: roomId,
      players: null,
      playersCount: null,
      muted: false,
      timer: null
    };
  }

  timerCallback = () => {
    axios.get(URL('get_players'), {
      room_id: this.pin
    }).then(response => {
      let data = response.data.data
      this.setState({
        players: data.players,
        playersCount: data.length
      })
    })
  }

  componentDidMount() {
    const timer = setInterval(this.timerCallback, 1000)
    this.setState({
      timer: timer
    })
  }

  handleMusic = event => {
    event.preventDefault();
    this.setState({
      muted: !this.state.muted
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.timer)
  }

  render() {
    let name;
    if (this.state.playersCount === 1) {
      name = <span>Player</span>
    } else {
      name = <span>Players</span>
    }

    let button;
    if (!this.state.muted) {
      button = <button onClick={ this.handleMusic }><VolumeUpIcon /></button>
    } else {
      button = <button onClick={ this.handleMusic }><VolumeOffIcon /></button>
    }

    return (
      <div className={ styles.main }>
        <div className={ styles.music }>
          { button }
        </div>
        <div>
          <audio ref="audio_tag" src={ theme } autoPlay muted={ this.state.muted }/>
        </div>
        <Grid
          container
          direction="column"
        >
          <Grid
            item
            container
            justify="center"
            alignItems="center"
            xs={12}
            style={{ minHeight: "20vh" }}
            className={ styles.statusBar }
          >
            <div className={ styles.title }>
              <div className={ styles.join }><span>Join at <strong>CS4221-T16</strong></span></div>
              <div className={ styles.gamePin }>with Game PIN:</div>
              <div className={ styles.pin }>{ this.state.pin }</div>
            </div>
          </Grid>
          <Grid
            item
            container
            xs={12}
            direction="row"
            justify="space-between"
            alignItems="center"
            style={{ minHeight: "10vh", marginTop: "30px" }}
          >
            <Grid
              item
              xs={4}
              style={{ paddingLeft: "5rem" }}
            >
              <div className={ styles.left }>
                <div className={ styles.playersCounter }>
                  <div className={ styles.count }>
                    { this.state.playersCount || 0 }
                  </div>
                  <div className={ styles.player }>
                    { name }
                  </div>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "center" }}
            >
              <h1 className={ styles.logo }>QUIZY</h1>
            </Grid>
            <Grid
              item
              xs={4}
              style={{ textAlign: "right", paddingRight: "50px" }}
            >
              <Link to={`/gameblock?quizId=${ this.state.quizId }`}>
                <Button variant="contained" color="primary" className={ styles.startBtn } onClick={ this.startGame } style={{ fontSize: "1.6rem" }}>
                  Start
                </Button>
              </Link>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Players players={ this.state.players } playersCount={ this.state.playersCount }/>
          </Grid>
          <Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const Players = (props) => {

  if (props.players === null || props.playersCount === null) {
    return null
  }

  const playerNames = props.players.map((p, i) => (
    <div key={ p._id }>
      { p.nickname }
    </div>
  ))

  return (
    <div className={ styles.names }>
      { playerNames }
    </div>
  )
}



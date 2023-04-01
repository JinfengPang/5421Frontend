import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import styles from './JoinGame.module.scss';
import { MuiThemeProvider, createMuiTheme, withStyles  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import {URL} from "../../utils";

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
});

const JoinGameInput = withStyles(theme => ({
  root: {
    '& input:invalid + fieldset': {
     borderColor: 'red',
     borderWidth: 2,
   },
 },
  input: {
    margin: "1rem 0",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '2px solid #ced4da',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    padding: '10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      borderColor: theme.palette.common.black
    },
    '&:focus': {
      borderColor: theme.palette.common.black
    },
  },
}))(InputBase);

export default class JoinGame extends Component {
  constructor() {
    super();
    this.state = {
      nickname: null,
      pin: null,
      message: null,
      disabled: false
    };
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
    console.log(event.target)
  };

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    console.log(this.state)
    axios.post(URL('room/player_join_room'), {
      nickname: nickname,
      room_id: pin
    }).then((response) => {
          localStorage.setItem("nickname", nickname);
          localStorage.setItem("pin", pin);
          this.props.history.push(`/instructions/?room_id=${pin}`)
        }
    )
  };


  render() {
    if (!localStorage.getItem("userId")) {
      return <Redirect to="/login"/>
    }
    let error;

    if (this.state.message === null) {
      error = null
    } else if (this.state.message === "Not found") {
      error = <div className={ styles.error }><div>We didn't recognise the game pin.</div>Please check and try again.</div>
    } else if (this.state.message === "Nickname taken") {
      error = <div className={ styles.error }>Sorry, that nickname is taken.</div>
    }

    return (
      <div className={ styles.home }>
        <Grid
          container
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: '100vh' }}
        >
          <div>
            <h1 className={ styles.mainTitle }>QUIZY</h1>
          </div>
          <div className={ styles.verticalMainForm }>
            <form onSubmit={ this.handleSubmit }>
              <JoinGameInput
                placeholder="NICKNAME"
                name="nickname"
                value={ this.state.nickname || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required
                fullWidth
              />
              <JoinGameInput
                placeholder="GAME PIN"
                name="pin"
                value={ this.state.pin || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required
                fullWidth
              />
              <MuiThemeProvider theme={ darkGreyTheme }>
                <Button
                  style={{
                    fontSize: "1.6rem",
                    textAlign: "center",
                    fontWeight: "bold",
                    margin: "1rem 0"
                  }}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={ this.state.disabled }
                  fullWidth
                  className={ styles.enterBtn }
                >
                  Enter
                </Button>
              </MuiThemeProvider>
            </form>
          </div>
          <div style={{ minHeight: "6rem", margin: "1rem 0" }}>
            { error }
          </div>
          <div style={{ textAlign: "center" }}>
            <p className={ styles.hostQuiz }><Link to="/quizzes" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>HOST</Link> a quiz.</p>
            <p className={ styles.hostQuiz } style={{ fontWeight: "bold" }}>OR</p>
            <p className={ styles.createQuiz }><Link to="/quizzes/new" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>CREATE</Link> your own.</p>
          </div>
        </Grid>
      </div>
    )
  }
}

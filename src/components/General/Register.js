import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import { MuiThemeProvider, createMuiTheme, withStyles  } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import grey from '@material-ui/core/colors/grey';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { socket } from '../Global/Header';

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

export default class Register extends Component {
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
  };

  handleClick = event => {
    this.setState({
      disabled: true
    })

    setTimeout(() => this.setState({
      disabled: false
    }), 500);
  };

  handleSubmit = event => {
    event.preventDefault();
    const { nickname, pin } = this.state;
    socket.emit("USER_REGISTERED", {
      nickname: nickname,
      pin: parseInt(pin)
    });
  };
  render() {

    let error;

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
                placeholder="user name"
                name="nickname"
                value={ this.state.nickname || '' }
                onChange={ this.handleChange }
                margin="dense"
                variant="outlined"
                required
                fullWidth
              />
              <JoinGameInput
                placeholder="password"
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
                  Register
                </Button>
              </MuiThemeProvider>
            </form>
          </div>
          <div style={{ minHeight: "6rem", margin: "1rem 0" }}>
            { error }
          </div>
          <div style={{ textAlign: "center" }}>
          </div>
        </Grid>
      </div>
    )
  }
}

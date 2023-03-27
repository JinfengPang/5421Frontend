import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.scss';
import Grid from '@material-ui/core/Grid';
import { socket } from '../Global/Header';
import { Form } from "@douyinfe/semi-ui";
import Button from '@material-ui/core/Button';
import axios from "axios";
const { ErrorMessage } = Form;

const style = {
  borderColor: 'red',
  borderRadius: 4,
  position: 'relative',
  backgroundColor: 'white',
  border: '2px solid #ced4da',
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 16,
  width: '250px',
}

let URL = (model) => {
  return `http://34.200.215.19:5000/api/${ model }/`
};

export default class Register extends Component {
  constructor() {
    super();
    this.getFormApi = this.getFormApi.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();
    let postRequest = {...this.formApi.getValues()}
    axios
        .post(URL('user/sign_in'), postRequest)
        .then((response) => {
          let user_id = response.data.user_id;
          localStorage.setItem("userId", user_id)
          this.props.history.push(`/`)
        })
        .catch((err) => {
          this.formApi.setError("password", "username or password is wrong.")
        })
  };

  getFormApi(formApi) {
    this.formApi = formApi;
  }

  render() {
    let error;

    // if (this.state.message === null) {
    //   error = null
    // } else if (this.state.message === "Not correct") {
    //   error = <div className={ styles.error }><div>Password is not matched</div>Please check and try again.</div>
    // } else if (this.state.message === "username taken") {
    //   error = <div className={ styles.error }>Sorry, that username is taken.</div>
    // }

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
            <Form layout='vertical'
                  getFormApi={this.getFormApi}
            >
              <Form.Input field='user_name' label='Username'
                          rules={[{required: true, message: 'Username is required' }]}
                          style={style}
              />
              <Form.Input field='password' label='Password' mode="password"
                          rules={[{required: true, message: 'Password is required' }]}
                          style={style}
              />
            </Form>
            <ErrorMessage/>

            <Button
                style={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "1rem 0",
                }}
                variant="contained"
                color="primary"
                fullWidth
                onClick={this.handleSubmit}
                className={ styles.enterBtn }
            >
              Login
            </Button>
          </div>

          <div style={{ minHeight: "6rem", margin: "1rem 0" }}>
            { error }
          </div>
          <div style={{ textAlign: "center" }}>
          <p className={ styles.hostQuiz }>Do not have an account yet?</p><p className={ styles.hostQuiz }><Link to="/register" style={{ color: "white", textDecoration: "none", fontWeight: "bold" }}>Register</Link> a new account</p>
          </div>
        </Grid>
      </div>
    )
  }
}

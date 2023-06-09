import React, { Component } from 'react';
import styles from './ShowQuiz.module.scss';
import { QuizInfo } from '../../utils';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import { URL } from '../../utils';

export default class ShowQuiz extends Component {
  constructor() {
    super();
    this.state = {
      difficulty: '',
      total: 0,
      questions: [],
    }
    this.getFormApi = this.getFormApi.bind(this);
    this.hostGame = this.hostGame.bind(this);
  }

  componentDidMount() {
    const { quizId } = this.props.match.params;
    QuizInfo.getQuiz( quizId ).then(response => {
      let response_data = response.data.data
      let difficulty = response_data.quiz_type,
          questions = JSON.parse(response_data.questions)
      this.setState({
        id: quizId,
        difficulty: difficulty,
        total: questions.length,
        questions: questions
      })
    });
  }

  hostGame(event) {
    event.preventDefault()
    let postRequest = {
      room_size: 100,
      time_limit: 100,
      host_id: localStorage.getItem("userId"),
      quiz_id: this.state.id,
    }
    axios
        .post(URL('room/create_room'), postRequest)
        .then((response) => {
          let room_id = response.data.data.room_id;
          this.props.history.push(`/lobby/?quizId=${ this.state.id }&roomId=${ room_id }&totalAnswers=${this.state.total}`)
        })
        .catch((err) => {
          console.log(err);
        })
  }

  getFormApi(formApi) {
      this.formApi = formApi;
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{ minHeight: "100vh" }}
        className={ styles.container }
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "10vh" }}
          className={ styles.title }
        >
          <h1>QUIZY</h1>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justify="flex-start"
          alignItems="flex-start"
          md={6}
          xs={12}
          style={{ minHeight: "90vh" }}
          className={ styles.preview }
        >
          <h2>QUIZ PREVIEW</h2>
          <h3>Difficulty: { this.state.difficulty }</h3 >
          <h3>Total Questions: { this.state.total }</h3 >
          <Button
              style={{
                fontSize: "1.6rem",
                textAlign: "center",
                fontWeight: "bold",
                margin: "1rem 0",
              }}
              variant="contained"
              color="primary"
              className={ styles.hostGameBtn }
              onClick = {this.hostGame}
            >
            Host Game
          </Button>
          <PreviewQuestions questions={ this.state.questions } />
        </Grid>
      </Grid>
    );
  }
}

const PreviewQuestions = (props) => {
  if (props.questions.length === 0) {
    return (<div className={ styles.questions }>Questions are loading.</div>)
  }

  const questions = props.questions.map((q, i) => (
    <div key={ i }>
      <div style={{ fontWeight: "bold" }}>Question { i + 1 }</div>
      <p>{ q.description }</p>
        <ul style={{"list-style-type": "none"}}>
            Choices
            {
                q.choices.map((element, index) => {
                    if (index === q.answer) {
                        return <li style={{"color": "green"}}>{element.toString()}</li>
                    }
                    return <li style={{"color": "red"}}>{element.toString()}</li>
                })
            }
        </ul>
    </div>
  ))

  return (
    <div className={ styles.questions }>
      { questions }
    </div>
  )
}

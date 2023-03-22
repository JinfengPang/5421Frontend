import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Button  from '@material-ui/core/Button';
import styles from './Confirm.module.scss';

export default class Confirm extends Component {
  continue = event => {
    event.preventDefault();
    this.props.saveQuiz();
  };

  back = event => {
    event.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values: { difficulty, total} } = this.props;

    const questions = [{
      question: 'asdkhkjas',
      answers: {
        a: '1234',
        b: 'jhk',
        c: '98098jh',
        d: '12dss'
      },
      correct: 'a'
    }]

    return (
      <>
        <Grid
          item
          container
          direction="column"
          md={6}
          sm={12}
          alignItems="center"
          justify="center"
          className={ styles.container }
        >
          <Grid
            item
            md={6}
            sm={12}
          >
            <h3>Confirm details:</h3>
          </Grid>
          <Grid
            item
            container
            direction="column"
            md={6}
            sm={12}
            alignItems="flex-start"
            justify="center"
          >
            <QuizDetails total={ total } difficulty={ difficulty } />
            <QuestionList questions={ questions } />
          </Grid>
          <Grid item md={4} sm={12}>
            <Grid
              container
            >
              <Grid item md={6} xs={12}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={ this.back }
                  fullWidth
                  className={ styles.backBtn }
                >
                  Back
                </Button>
              </Grid>
              <Grid item md={6} xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={ this.continue }
                  fullWidth
                  className={ styles.confirmBtn }
                >
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    )
  }
}

const QuizDetails = (props) => {
  return (
    <div>
      <p><span style={{ fontWeight: "bold" }}>Difficulty: </span>{ props.difficulty }</p>
      <p><span style={{ fontWeight: "bold" }}>Total Questions: </span>{ props.total }</p>
    </div>
  )
}

const QuestionList = (props) => {
  const quizQuestions = props.questions.map((q,i) => (
    <div key={ i }>
      <div>Question { i + 1 }: { q.question } </div>
      <p>Answer: { q.answers[q.correct] }</p>
    </div>
  ))

  return (
    <div>
      { quizQuestions }
    </div>
  )
}

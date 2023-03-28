import React, { Component } from 'react';
import styles from './QuizForm.module.scss';
import axios from 'axios';
import QuizDetailsForm from '../QuizDetailsForm/QuizDetailsForm';
import Confirm from '../Confirm/Confirm';
import Grid from '@material-ui/core/Grid';
import {Redirect} from "react-router-dom";
import { URL } from "../../../utils";

export default class QuizForm extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      total: 1,
      difficulty: 'easy',
      questions: []
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1
    });
  }

  saveQuiz = async () => {
    const { difficulty, total } = this.state;
    const postRequest = {
      quiz_type: difficulty,
      quiz_count: total,
      user_id: localStorage.getItem("userId")
    }
    let res = await axios.post(URL('quiz/generate_quiz'), postRequest);
    let quizId = res.data.data.quiz_id
    this.props.history.push(`/quizzes/${ quizId }`);
  }

  handleNumberChange = number => {
    this.setState({
      total: number
    });
  };

  handleDifficultyChange = difficulty => {
    this.setState({
      difficulty: difficulty
    });
  };

  render() {
    if (!localStorage.getItem("userId")) {
      return <Redirect to="/login"/>
    }

    const { step } = this.state;
    const { total, difficulty, questions } = this.state;
    const values = { difficulty, questions, total };

    let component = null;
    switch(step) {
      case 1:
        component = <QuizDetailsForm
          nextStep={ this.nextStep }
          handleNumberChange={ this.handleNumberChange }
          handleDifficultyChange = { this.handleDifficultyChange }
          values={ values }
        />;
        break;

      case 2:
        component = <Confirm
          nextStep={ this.nextStep }
          prevStep={ this.prevStep }
          saveQuiz={ this.saveQuiz }
          values={ values }
        />;
        break;
      default:
        component = null;
    }

    return (
      <Grid
        container
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
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
          alignItems="center"
          xs={12}
          style={{ minHeight: "90vh" }}
          className={ styles.container }
        >
          <h2 style={{ marginTop: "3rem", marginBottom: "6rem" }}>NEW QUIZ</h2>
          { component }
        </Grid>
      </Grid>
    )
  }
}

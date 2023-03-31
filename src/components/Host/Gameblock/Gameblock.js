import React, { Component } from 'react';
import axios  from "axios";
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import ResultBlock from '../ResultBlock/ResultBlock';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gameover from '../Gameover/Gameover';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 3,
      pin: null,
      questionNumber: 1,
      totalNumberOfQuestions: null,
      question: null,
      answers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      answeredD: 0,
      correctAnswer: '',
      rankedPlayers: []
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  nextQuestion = () => {
    if (this.state.questionNumber + 1 === this.state.totalNumberOfQuestions) {
      this.endGame()
      return
    }

    axios.post('room/next_question', {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        question: state.question,
        answers: state.answers,
      })
    })

    this.setState({
      step: 1,
      rankedPlayers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      answeredD: 0,
      correctAnswer: null
    })
  }

  endGame = () => {
    this.setState({
      step: 4
    })
  }

  fetchScoreboard = () => {
    axios.post('room/scoreboard', {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        answeredA: state.answeredA,
        answeredB: state.answeredB,
        answeredC: state.answeredC,
        answeredD: state.answeredD,
        rankedPlayers: state.rankedPlayers
      })
    })
  }

  checkGameState = () => {
    axios.post('room/game_state', {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        step: state.step
      })
    })
  }

  componentDidMount() {
    const { quizId, totalNumberOfQuestions } = this.props.match.params;
    const serverTimer = setInterval(this.checkGameState, 500);
    this.setState({
      serverTimer: serverTimer,
      pin: quizId,
      totalNumberOfQuestions: totalNumberOfQuestions
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.serverTimer)
  }

  render() {
    const { step } = this.state;
    const { pin, questionNumber, totalNumberOfQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, playersAnswered, rankedPlayers } = this.state;

    let component = null;
    switch(step) {
      case 1:
        component = <QuestionBlock
          nextStep={ this.nextStep }
          pin={ pin }
          question={ question }
          answers={ answers }
          playersAnswered={ playersAnswered }
        />
        break;
      case 2:
        component = <ResultBlock
          answers={ answers }
          answeredA={ answeredA }
          answeredB={ answeredB }
          answeredC={ answeredC }
          answeredD={ answeredD }
          correctAnswer={ correctAnswer }
          question={ question }
          pin={ pin }
          nextStep={ this.nextStep }
          fetchScoreboard={ this.fetchScoreboard }
        />
        break;
      case 3:
        component = <Scoreboard
          pin={ pin }
          rankedPlayers={ rankedPlayers }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nextQuestion={ this.nextQuestion }
          endGame={ this.endGame }
        />
        break;
      case 4:
        component = <Gameover
          totalNumberOfQuestions={ totalNumberOfQuestions }
          finalRankings={ rankedPlayers }
        />
        break;
      default:
        component = null
    }
    return (
      <div>
        { component }
      </div>
    )
  }
}

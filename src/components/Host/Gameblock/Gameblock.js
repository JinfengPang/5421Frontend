import React, { Component } from 'react';
import axios  from "axios";
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import ResultBlock from '../ResultBlock/ResultBlock';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gameover from '../Gameover/Gameover';
import {URL} from "../../utils";

export default class Gameblock extends Component {
  constructor(props) {
    super(props);
    const searchParams = new URLSearchParams(props.location.search);
    const quizId = searchParams.get('quiz_id');
    const roomId = searchParams.get('room_id');
    const totalAnswers = searchParams.get('total_answers');
    this.state = {
      step: 4,
      quizId: quizId,
      pin: roomId,
      questionNumber: 0,
      totalNumberOfQuestions: totalAnswers,
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
    if (this.state.questionNumber >= parseInt(this.state.totalNumberOfQuestions)) {
      this.setState({
        step: 4
      })
      return
    }

    axios.post(URL('room/next_question'), {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        question: state.description,
        answers: state.choices,
        questionNumber: this.state.questionNumber + 1
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
    this.props.history.push("/")
  }

  fetchScoreboard = () => {
    axios.post(URL('room/scoreboard'), {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        correctAnswer: state.correct_ans,
        answeredA: state.answers_count[0],
        answeredB: state.answers_count[1],
        answeredC: state.answers_count[2],
        answeredD: state.answers_count[3],
        rankedPlayers: state.ranked_players
      })
    })
  }

  checkGameState = () => {
    axios.post(URL('room/game_state'), {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      if (this.state.step >= 2) {
        return
      }

      this.setState({
        step: state.step
      })
    })
  }

  componentDidMount() {
    const serverTimer = setInterval(this.checkGameState, 5000);
    this.setState({
      serverTimer: serverTimer,
    })
    this.nextQuestion()
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
          questioinId = { questionNumber }
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
          endGame = {this.endGame}
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

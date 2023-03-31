import React, { Component } from 'react';
import { socket } from '../../Global/Header';
import QuestionBlock from '../QuestionBlock/QuestionBlock';
import ResultBlock from '../ResultBlock/ResultBlock';
import Scoreboard from '../Scoreboard/Scoreboard';
import Gameover from '../Gameover/Gameover';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      gameId: null,
      quizId: null,
      pin: null,
      questionNumber: 1,
      totalNumberOfQuestions: null,
      question: "\"Given a database schema [\\'B\\', \\'F\\', \\'W\\', \\'V\\'] and functional dependencies: {W, B, V} -> {W, B}, {V, B, F} -> {F, B, W}, {B, V} -> {F, W}, {F, B} -> {W, F}, what are the candidate keys of this relational schema\"},",
      answers: ['A', 'B', 'C', 'D'],
      answeredA: 2,
      answeredB: 3,
      answeredC: 4,
      answeredD: 5,
      correctAnswer: 'a',
      gameStatus: true,
      rankedPlayers: [{nickname: 'a', score: 100}, {nickname: 'b', score: 200}, {nickname: 'c', score: 300}]
    };
  }

  nextStep = () => {
    const { step, questionNumber, totalNumberOfQuestions } = this.state;
    this.setState({
      step: step + 1
    });

    if (questionNumber === totalNumberOfQuestions) {
      this.setState({
        gameStatus: false
      })
    }
  }

  nextQuestion = () => {
    this.setState({
      step: 1,
      rankedPlayers: [],
      answeredA: 0,
      answeredB: 0,
      answeredC: 0,
      answeredD: 0,
      correctAnswer: null
    })
    const { pin } = this.state;
    socket.emit("PROCEED_TO_NEXT_QUESTION", pin);
  }

  endGame = () => {
    this.setState({
      step: 4
    })
    const pin = this.state.pin;
    socket.emit("FINISH_GAME", pin);
  }

  fetchScoreboard = () => {
    const { gameId } = this.state;
    socket.emit("FETCH_SCOREBOARD", gameId);
    console.log('Host requesting for scoreboard.');
  }

  componentDidMount() {
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const quizId = parsed.quizId;
    const pin = parseInt(parsed.pin);
    this.setState({
      pin: pin,
      quizId: quizId
    })
    socket.emit("GO_TO_NEXT_QUESTION", this.state.pin);

    socket.on("RECEIVE_QUESTION", data => {
      const { gameId, question, totalNumberOfQuestions } = data;
      this.setState({
        gameId: gameId,
        question: question.question,
        answers: question.answers,
        correctAnswer: question.correct,
        totalNumberOfQuestions: totalNumberOfQuestions
      })
    })

    socket.on("RECEIVE_SCOREBOARD", data => {
      const { answeredA, answeredB, answeredC, answeredD, rankedPlayers } = data;
      this.setState({
        answeredA: answeredA,
        answeredB: answeredB,
        answeredC: answeredC,
        answeredD: answeredD,
        rankedPlayers: rankedPlayers,
        step: 2
      });
    });
    socket.on("GAME_OVER", data => {
      this.setState({
        gameStatus: false,
        rankedPlayers: data
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, questionNumber, totalNumberOfQuestions, question, answers, answeredA, answeredB, answeredC, answeredD, correctAnswer, playersAnswered, rankedPlayers, gameStatus } = this.state;

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

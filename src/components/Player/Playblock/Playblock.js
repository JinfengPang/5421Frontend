import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { socket } from '../../Global/Header';
import Preview from '../Preview/Preview';
import Answer from '../Answer/Answer';
import Result from '../Result/Result';
import Ranking from '../Ranking/Ranking';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 2,
      gameId: null,
      nickname: null,
      pin: null,
      answer: null,
      score: 0,
      streak: 0,
      rank: 0,
      lastCorrect: false,
      totalCorrect: 0,
      questionNumber: 1,
      totalNumberOfQuestions: null,
      answers: [],
      hostDisconnected: false
    };
  }

  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1
    });
  }

  submitAnswer = letter => {
    this.setState({
      answer: letter
    })

    const data = {
      answer: letter,
      gameId: this.state.gameId
    }
    axios.post('room/player_ans', {
      answer: letter,
    })
    // socket.emit("ANSWER_SUBMITTED", data);
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
    const queryString = require('query-string');
    const parsed = queryString.parse(this.props.location.search);
    const nickname = parsed.nickname;
    const serverTimer = setInterval(this.checkGameState, 500);

    const pin = parseInt(parsed.pin);
    this.setState({
      nickname: nickname,
      pin: pin
    })
  }

  render() {
    const { step } = this.state;
    const { pin, nickname, score, streak, lastCorrect, questionNumber, totalNumberOfQuestions, answers, rank } = this.state;

    let component = null;
    switch(step) {
      case 1:
        component = <Preview
          nextStep={ this.nextStep }
          pin={ pin }
          nickname={ nickname }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
        />;
        break;
      case 2:
        component = <Answer
          submitAnswer={ this.submitAnswer }
          pin={ pin }
          nickname={ nickname }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          answers={ answers }
        />;
        break;
      case 3:
        component = <Result
          pin={ pin }
          questionNumber={ questionNumber }
          totalNumberOfQuestions={ totalNumberOfQuestions }
          nickname={ nickname }
          lastCorrect={ lastCorrect }
          streak={ streak }
          rank={ rank }
          score={ score }
        />;
        break;
      case 4:
        component = <Ranking
          nickname={ nickname }
          rank={ rank }
          score={ score }
        />;
        break;
      default:
        component = null
    }
    return (
      <div>
        { component }
        {
          this.state.hostDisconnected ?
          <Redirect to='/' />
          : null
        }
      </div>
    )
  }
}

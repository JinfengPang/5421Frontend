import React, { Component } from 'react';
import Answer from '../Answer/Answer';
import Result from '../Result/Result';
import Ranking from '../Ranking/Ranking';
import axios from 'axios';
import {URL} from '../../utils';

export default class Gameblock extends Component {
  constructor() {
    super();
    this.state = {
      step: 1,
      pin: localStorage.getItem("pin"),
      nickname: localStorage.getItem("nickname"),
      answer: null,
      score: 0,
      rank: 0,
      lastCorrect: false,
      totalCorrect: 0,
      questionNumber: 1,
    };
  }

  submitAnswer = letter => {
    this.setState({
      answer: letter
    })

    axios.post(URL('room/player_ans'), {
      answer: letter,
      nickname: this.state.nickname,
      room_id: this.state.pin
    }).then(response => {
      this.setState({
        lastCorrect: response.data.data.is_correct
      })
    })

    const serverTimer = setInterval(this.checkGameState, 500)
    this.setState({
      serverTimer: serverTimer
    })
  }


  checkGameState = () => {
    axios.post(URL('room/game_state'), {
      room_id: this.state.pin
    }).then(response => {
      let state = response.data.data
      this.setState({
        step: state.step
      })
    })
  }

  render() {
    const { step } = this.state;
    const { pin, nickname, score, lastCorrect, questionNumber, rank } = this.state;

    let component = null;
    switch(step) {
      case 1:
        component = <Answer
          submitAnswer={ this.submitAnswer }
        />;
        break;
      case 2:
        component = <Result
          pin={ pin }
          questionNumber={ questionNumber }
          nickname={ nickname }
          lastCorrect={ lastCorrect }
          rank={ rank }
          score={ score }
        />;
        break;
      case 3:
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
      </div>
    )
  }
}

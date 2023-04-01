import React, { Component } from 'react';
import Footer from '../Footer/Footer';
import styles from './QuestionBlock.module.scss';
import Grid from '@material-ui/core/Grid';
import FavoriteIcon from '@material-ui/icons/Favorite';
import GradeIcon from '@material-ui/icons/Grade';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import Brightness3SharpIcon from '@material-ui/icons/Brightness3Sharp';
import { Layout } from '@douyinfe/semi-ui';
import axios from "axios";
import {URL} from "../../utils";
const { Sider, Content } = Layout;

export default class QuestionBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionId: props.questionId,
      time: 20,
      playersAnswered: 0,
      intervalId: null,
      serverTimer: null
    }
  }

  timer = () => {
    this.setState({
      time: this.state.time - 1
    })

    if (this.state.time <= 0 ) {
      clearInterval(this.state.intervalId);
      clearInterval(this.state.serverTimer)
      this.props.nextStep();
    }
  }

  timerCallback = () => {
    axios.post(URL('room/get_total_answers'), {
      room_id: this.props.pin
    }).then(response => {
      let data = response.data.data
      this.setState({
        playersAnswered: data.players_answered,
      })
    })
  }

  componentDidMount() {
    const intervalId = setInterval(this.timer, 1000);
    const serverTimer = setInterval(this.timerCallback, 3000);
    this.setState({
      intervalId: intervalId,
      serverTimer: serverTimer
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
    clearInterval(this.state.serverTimer)
  }

  render() {
    let name;

    if (this.state.playersAnswered === 1) {
      name = <span>answer</span>
    } else {
      name = <span>answers</span>
    }

    const { pin, question, answers } = this.props;

    if (!question) {
      return <div>Question Loading...</div>
    }

    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid
          item
          container
          justify="center"
          alignItems="center"
          xs={12}
          style={{ minHeight: "20vh" }}
          className={ styles.question }
        >
          <h1>Question {this.state.questionId}</h1>
        </Grid>
        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          xs={12}
          style={{ minHeight: "40vh" }}
          className={ styles.controls }
        >
          <Layout >
            <Sider className={styles.time}>{this.state.time}</Sider>
            <Content>
              <div style={{
                padding: "2rem", fontSize: '2.4rem', "overflow-wrap": "anywhere",
                fontWeight: 600, textAlign: "center" }}>
                {question}
              </div>

            </Content>
            <Sider className={styles.right}>
              <div className={styles.answersCounter}>
                <div className={styles.count}>{this.state.playersAnswered || 0}</div>
                <div className={styles.answer}>{name}</div>
              </div>
            </Sider>
          </Layout>
        </Grid>
        <Grid
          item
          container
          xs={12}
          alignItems="center"
          justify="center"
          style={{ minHeight: "30vh" }}
          className={ styles.answers }
        >
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.red }
          >
            <FavoriteIcon className={ styles.icons }/>{ answers[0].toString() }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.blue }
          >
            <GradeIcon className={ styles.icons }/>{ answers[1].toString() }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.orange }
          >
            <FiberManualRecordRoundedIcon className={ styles.icons }/>{ answers[2].toString() }
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            xs={6}
            className={ styles.green }
          >
            <Brightness3SharpIcon className={ styles.icons }/>{ answers[3].toString() }
          </Grid>
        </Grid>
        <Footer pin={ pin }/>
      </Grid>
    )
  }
}

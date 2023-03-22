import React, { Component } from 'react';
import {InputNumber, Select} from '@douyinfe/semi-ui';
import styles from './QuizDetailsForm.module.scss';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { MuiThemeProvider, createMuiTheme  } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

const darkGreyTheme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    }
  }
});

const style = {
    margin: "1rem 0",
    borderRadius: 4,
    position: 'relative',
    backgroundColor: "white",
    border: '2px solid #ced4da',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
    height: "4rem",
    width: "100%",
    padding: '10px 12px'
}


export default class QuizDetailsForm extends Component {

  continue = event => {
    event.preventDefault();
    this.props.nextStep();
  }


  render() {
      const {total, difficulty} = this.props.values
    return (
      <>
        <Grid
          item
          md={4}
          sm={12}
          container
          direction="column"
          alignItems="center"
          justify="center"
          spacing={2}
          style={{ minHeight: '25vh' }}
        >
          <Grid item xs={12} style={{ textAlign: "center"}}>
            <h3>Enter quiz details:</h3>
          </Grid>

          <Grid item  style={{width: "100%"}}>
              <label>Difficulty</label>
              <Select defaultValue={difficulty} style={style}
                      onChange={this.props.handleDifficultyChange}>
                  <Select.Option value="easy">Easy</Select.Option>
                  <Select.Option value="medium">Medium</Select.Option>
                  <Select.Option value="hard">Hard</Select.Option>
              </Select>
          </Grid>

            <Grid item style={{width: "100%"}}>
                <label>Number of Questions</label>
                <InputNumber formatter={value => `${value}`.replace(/\D/g, '')}
                             onNumberChange={this.props.handleNumberChange}
                             defaultValue={total}
                             min={1} max={Number.MAX_SAFE_INTEGER}
                             style={ style } />
            </Grid>
          <Grid item xs={12}>
            <MuiThemeProvider theme={ darkGreyTheme }>
              <Button
                style={{
                  fontSize: "1.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  margin: "1rem 0"
                }}
                variant="contained"
                color="primary"
                onClick={ this.continue }
                fullWidth
                className={ styles.continueBtn }
              >
                Continue
              </Button>
            </MuiThemeProvider>
          </Grid>
        </Grid>
      </>
    )
  }
}

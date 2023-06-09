import React from 'react';
import AllQuizzes from './quiz/AllQuizzes/AllQuizzes';
import ShowQuiz from './quiz/ShowQuiz/ShowQuiz';
import Lobby from './Host/Lobby/Lobby';
import Gameblock from './Host/Gameblock/Gameblock';
import JoinGame from './Player/JoinGame/JoinGame';
import QuizForm from './quiz/NewQuiz/QuizForm/QuizForm';
import Playblock from './Player/Playblock/Playblock';
import Instructions from './Player/Instructions/Instructions';
import { HashRouter, Switch, Route } from 'react-router-dom';
import Login from './General/Login';
import Register from './General/Register';

function App() {
  return (
    <div className="app">
      <HashRouter>
        <Switch>
          <Route exact path='/register' component={ Register }/>
          <Route exact path='/login' component={ Login }/>
          <Route exact path='/' component={ JoinGame }/>
          <Route exact path='/instructions' component={ Instructions }/>
          <Route exact path='/lobby/' component={ Lobby }/>
          <Route exact path='/gameblock/' component={ Gameblock }/>
          <Route exact path='/playblock' component={ Playblock }/>
          <Route exact path='/quizzes' component={ AllQuizzes }/>
          <Route exact path='/quizzes/new' component={ QuizForm }/>
          <Route path='/quizzes/:quizId' component={ ShowQuiz }/>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;

import { Component } from 'react';
import io from 'socket.io-client';
import {IP} from '../utils';


let socket;
const baseURL = `http://${IP}/`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: 'http://127.0.0.1:5000'
    };
  socket = io(this.state.endpoint);
  console.log(socket.connected)
  }

  render() {
    return null
  }
}

export { Header, socket, baseURL };

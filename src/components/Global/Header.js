import { Component } from 'react';
import io from 'socket.io-client';
import {IP} from '../utils';


let socket;
const baseURL = `http://${IP}/`;

class Header extends Component {
  constructor() {
    super();
    this.state = {
      endpoint: baseURL
    };
  socket = io(this.state.endpoint);
  }

  render() {
    return null
  }
}

export { Header, socket, baseURL };

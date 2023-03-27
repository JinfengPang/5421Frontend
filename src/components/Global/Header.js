import { Component } from 'react';
import io from 'socket.io-client';


let socket;
const baseURL = 'http://34.200.215.19:5000/';

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

import React, {Component} from 'react';

export default class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <a className="navbar-brand" href="#">AppTrack</a>
        </nav>
      </div>
    );
  }
}
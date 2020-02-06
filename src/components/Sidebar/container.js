import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { SidebarUI } from './ui';

export class Sidebar extends Component {
  handleLogOut = () => {
    const { history } = this.props;
    localStorage.removeItem('token');
    history.push('/log-in');
  };
  render() {
    return <SidebarUI onLogOut={this.handleLogOut} />;
  }
}

export const SidebarContainer = withRouter(Sidebar);

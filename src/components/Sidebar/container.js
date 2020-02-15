import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { AuthContext } from '../../provider/auth';
import { SidebarUI } from './ui';

export class Sidebar extends Component {
  render() {
    return (
      <AuthContext.Consumer>
        {({ logOut }) => <SidebarUI onLogOut={logOut} />}
      </AuthContext.Consumer>
    );
  }
}

export const SidebarContainer = withRouter(Sidebar);

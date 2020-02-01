import React, { Component } from 'react';
import { SidebarUI } from './ui';

export class Sidebar extends Component {
    render() {
        return <SidebarUI />;
    }
}

export const SidebarContainer = Sidebar;

const drawerWidth = 240;

export const styles = theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  navList: {
    flex: '1 1 auto'
  },
  navItem: {
    color: theme.palette.text.primary
  },
  signOut: {
    borderTop: `1px solid ${theme.palette.divider}`
  },
  title: {
    ...theme.mixins.toolbar,
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    display: 'flex',
    justifyContent: 'center',
    textDecoration: 'none'
  }
});

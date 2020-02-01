const drawerWidth = 240;

export const styles = theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth
    },
    title: {
        ...theme.mixins.toolbar,
        alignItems: 'center',
        borderBottom: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        justifyContent: 'center'
    }
});

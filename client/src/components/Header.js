import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 4,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 4,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="black" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="l7" className={classes.title}>
                        cathetons
          </Typography>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">About</Button>
                    <Button color="inherit">This is a button</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}

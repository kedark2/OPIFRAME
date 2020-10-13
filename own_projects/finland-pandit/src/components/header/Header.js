import React from 'react'
import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1, backgroundColor: "lightyellow"
    },
    menuButton: {
        marginRight: theme.spacing(-15),
    },
    title: {
        flexGrow: 1,
    }

}));

export default function ButtonAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <h1>Hello I am header</h1>

            <AppBar position="static" color="red">
                <Toolbar backgroundColor="red">
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/"><Button color="inherit">Home</Button></Link>
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/gallery"><Button color="inherit">Gallery</Button></Link>            </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/about"><Button color="inherit">About Us</Button></Link>            </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <Link to="/contact"><Button color="inherit">Contact</Button></Link>
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
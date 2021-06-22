import React, { useState, useEffect } from 'react';
import {AppBar, Toolbar, Typography, Avatar, Button, Grid} from "@material-ui/core";
import memories from "../../images/memories.png";
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import useStyles from './styles';


 export  default function Navbar(){
     const classes = useStyles();
     const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
     const history = useHistory();
     const dispatch = useDispatch();
     const location = useLocation();


     const Logout = () =>{
         dispatch({ type: 'LOGOUT' })
         history.push('/');
         setUser(null);
     }
     useEffect(()=>{
         const token = user?.token;

         if(token){
             const decodedToken = decode(token);
             if(decodedToken.exp * 1000 < new Date().getTime()) Logout();

         }
         setUser(JSON.parse(localStorage.getItem('profile')));

     }, [location])


    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Grid item sm={7}>
                <div className={classes.brandContainer} >
                    <Typography component={Link} to={'/'} className={classes.heading} variant="h2" align="center">Memories</Typography>
                    <img className={classes.image} src={memories} alt="icon" height="60" />
                </div>
            </Grid>
            <Grid item sm={5}>
                <Toolbar className={classes.toolBar} >
                    {
                        user ? (
                            <div className={classes.log}>
                                <Avatar className={classes.profile} alt={user.result.name} src={user.result.imageUrl}>
                                    {user.result.name.charAt(0)}
                                </Avatar>
                                <Typography className={classes.profile} variant={'h6'}>{user.result.name}</Typography>
                                <Button variant={'contained'} className={classes.logout} color={'secondary'} onClick={Logout}>Logout</Button>
                            </div>
                        ) : (
                            <Button component={Link} to={'/auth'} variant={'contained'} color={'primary'} className={classes.btn}>Sign In</Button>
                        )
                    }
                </Toolbar>
            </Grid>





        </AppBar>
    )
}
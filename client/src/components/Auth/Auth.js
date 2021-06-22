import React, {useState} from 'react';
import {Avatar, Button, Paper, Grid, Typography, Container, TextField} from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useStyles  from './styles';
import { LockOutlined } from "@material-ui/icons";
import Input from './Input';
import { signup, signin } from '../../actions/auth';


const initialState = {
    firstName: '',
    lastName:'',
    email: '',
    password:'',
    confirmPassword: ''
}

const Auth = () =>{

    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);

    const dispatch = useDispatch();
    const history = useHistory();

    const handleShowPassword = () =>setShowPassword((prevShowPassword)=>!prevShowPassword);
    const switchMode = () =>{
        setIsSignUp(p=>!p)
        handleShowPassword()

    }
    const handleSubmit=(e)=>{
        e.preventDefault();

        if(isSignUp){
            dispatch(signup(formData, history));
        }else{
            dispatch(signin(formData, history));


        }

    }

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value})
        console.log(formData)

    }


    const googleSuccess = (res) =>{
        const result = res?.profileObj;
        const token = res?.tokenId;
        try{
            dispatch({type: 'AUTH', data:{result, token}});
            history.push('/');

        }catch (e) {
            console.log(e)
        }

    }

    const googleFailure = () =>{
        console.log('Google Sign In was unsuccessful. Try Again Later')
    }
    return (
        <Container component={'main'} maxWidth={'xs'}>
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlined/>
                </Avatar>
                <Typography variant={'h5'}>{isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name={'firstname'} label={'First Name'} handleChange={handleChange} autoFocus half type={'text'}/>
                                    <Input name={'firstname'} label={'First Name'} handleChange={handleChange} half type={'text'}/>

                                </>
                            )
                        }
                        <Input name={'email'} label={'Email address'} handleChange={handleChange} type={'email'}/>
                        <Input name={'password'} label={'Password'} handleChange={handleChange} type={ showPassword ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                        {isSignUp && <Input name={'confirmPassword'} label={'Repeat Password'}  handleChange={handleChange} type={'password'}/>}
                        <Button type={'submit'} fullWidth variant={'contained'} color={'primary'} className={classes.submit} >
                            { isSignUp ? 'Sign Up' : 'Sign In'}
                        </Button>
                        <GoogleLogin
                            clientId={'927696723034-9oqam7magond0dp85j4v831ubn0pufvi.apps.googleusercontent.com'}
                            render={(renderProps)=>(
                                <Button className={classes.googleButton}
                                        color={'primary'}
                                        fullWidth onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                    //startIcon={<Icon/>}
                                        variant={'contained'}>
                                    Google Sign In
                                </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}
                        />
                        <Grid container justify={'flex-end'}>
                            <Grid item>
                                <Button onClick={switchMode} fullWidth color={'primary'}>
                                    { isSignUp ? 'Already  have an account?  Sign In' : 'Don`t have an account ? Sign Up' }
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;
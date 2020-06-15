import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn } from '../../store/actions/authActions'
import { Redirect, Link as RouteLink } from 'react-router-dom';
import {Select, Button, createMuiTheme, Slide, Grow, Zoom, InputLabel, Link, Paper, Typography, Divider, FormControl, IconButton, Input, InputAdornment, MenuItem, TextField, Grid} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import AppBackdrop from '../layout/Backdrop'
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

const theme = createMuiTheme();

const FormStyle = {
    // marginRight: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    // marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    maxWidth: 600
}

const InputStyle = {
    margin: theme.spacing(3),
    
    // padding: "20px"
}

const InStyle = {
    // marginTop: theme.spacing(3),
    // padding: "20px"
    marginTop: theme.spacing(1)
}

class SignIn extends Component {
    state = {
        email: '',
        password: '',
        showPassword: false,
        helperText: '',
        error: false
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            helperText: '',
            error: false
        })
        // console.log(e.target.value)
        // console.log(this.props)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signIn(this.state)
        // this.props.authError ? this.setState({
        //     helperText: this.props.authError,
        //     error: true
        // }) : this.setState({
        //     helperText: '',
        //     error: false
        // })
    }

    onLinkClick = () => {
        this.setState({
            helperText: '',
            error: false
        })
    }

    handleClickShowPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword
        })
      };

    render() {

        const { authError, auth } = this.props;
        if (auth.uid) return <Redirect to='/'/>
        return (

            <Grid container alignItems="center">
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}> 
                    <Grow in={true} timeout={500}>
                        <Paper id='form' elevation={3} style={FormStyle}>
                            <form onSubmit={this.handleSubmit}>
                                <Grid container>
                                    <Grid item xs={2}/>
                                    <Grid item xs={8} style={InputStyle}>
                                        <Typography variant='h6'>Sign in</Typography>
                                        <div>
                                            <TextField
                                                label="Email"   
                                                name="email"
                                                type='email'
                                                onChange={this.handleChange}
                                                style={InStyle}
                                                // error={this.state.error}
                                            />
                                        </div>
                                        <div style={InStyle}>
                                            <TextField
                                                label="Password"   
                                                name="password"
                                                type={this.state.showPassword ? 'text' : 'password'}
                                                style={{width: '9em'}}
                                                onChange={this.handleChange}
                                                // error={this.state.error}
                                            />
                                            <IconButton
                                                style={{marginTop: theme.spacing(2)}}
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                edge="end"
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </div>
                                        
                                            <Button style={{width: '15em', marginTop: '1em'}}  variant="contained" color="primary" onClick={this.handleSubmit}>
                                                Sign in
                                            </Button>
                                            <div id='link' style={{marginTop: '1em', textAlign: 'middle'}}>
                                            <Link 
                                                
                                                component={RouteLink} 
                                                to='/signup'
                                                onClick={this.onLinkClick}
                                            >
                                                i don't have account
                                            </Link>
                                            </div>

                                    </Grid>
                                    {
                                        this.props.authError
                                        ? 
                                        <Zoom in={true}>
                                            <Alert 
                                                severity="error" 
                                                style={{width: '100%', borderRadius: theme.spacing(2)}}
                                            >
                                                {this.props.authError}
                                            </Alert>
                                        </Zoom>
                                        : 
                                        null
                                    }
                                    <Grid item xs={2}/>
                                </Grid>
                            </form>
                        </Paper>
                    </Grow>
                </Grid>
                <Grid item xs={false} sm={2}/>
            </Grid>
            
            // <div className="container">
            //     <form onSubmit={this.handleSubmit} className="white">
            //         <h5 className="grey-text text-darken-3">Sign in</h5>
            //         <div className="input-field">
            //             <label htmlFor="email"> Email</label>
            //             <input type="email" id="email" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <label htmlFor="password">Password</label>
            //             <input type="password" id="password" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <button className="btn pink lighten-1 z-depth-0">Submit</button>
            //             <div className="center">
            //                 { authError ? <p className='red-text'>{authError}</p> : null}
            //             </div>
            //         </div>
            //     </form>
            // </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

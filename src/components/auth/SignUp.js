import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, Link as RouteLink } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions'
import {Select, Button, createMuiTheme, InputLabel, Link, Zoom, Grow, Paper, Typography, Divider, FormControl, IconButton, Input, InputAdornment, MenuItem, TextField, Grid} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Alert from '@material-ui/lab/Alert';

const theme = createMuiTheme();

const FormStyle = {
    // marginRight: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    // marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    maxWidth: 700
}

const InputStyle = {
    margin: theme.spacing(2),
    
    // padding: "20px"
}

const InStyle = {
    // marginTop: theme.spacing(3),
    // padding: "20px"
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(3)
}

class SignUp extends Component {
    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
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
        this.props.signUp(this.state)
        // this.props.authError ? this.setState({
        //     helperText: this.props.authError,
        //     error: true
        // }) : this.setState({
        //     helperText: '',
        //     error: false
        // })
        console.log(this.props)
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
        const { auth, authError } = this.props;
        if (auth.uid) return <Redirect to='/'/>
        return (
            <Grid container>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}> 
                <Grow in={true} timeout={500}>
                    <Paper id='form' elevation={3} style={FormStyle}>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container>
                                <Grid item xs={2}/>
                                <Grid item xs={8} style={InputStyle}>
                                    <Typography variant='h6'>Sign up</Typography>
                                    <TextField
                                            label="First name"   
                                            name="firstNmae"
                                            type='text'
                                            onChange={this.handleChange}
                                            style={InStyle}
                                            error={this.state.error}
                                    />
                                    <TextField
                                        label="Last name"   
                                        name="lastNmae"
                                        type='text'
                                        onChange={this.handleChange}
                                        style={InStyle}
                                        error={this.state.error}
                                    />
                                    <div>
                                        <TextField
                                            label="Email"   
                                            name="email"
                                            type='email'
                                            onChange={this.handleChange}
                                            style={InStyle}
                                            error={this.state.error}
                                        />
                                    </div>
                                    <div style={InStyle}>
                                        <TextField
                                            label="Password"   
                                            name="password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            onChange={this.handleChange}
                                            style={{width: '9em'}}
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
                                    
                                        <Button 
                                            style={{width: '15em', marginTop: '1em'}} 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={this.handleSubmit}
                                        >
                                            Sign up
                                        </Button>
                                        <div id='link' style={{marginTop: '1em'}}>
                                        <Link 
                                            
                                            onClick={this.onLinkClick} 
                                            component={RouteLink} 
                                            to='/signin'
                                        >
                                            Already have account?
                                        </Link>
                                        </div>
                                </Grid>
                                <Grid item xs={2}/>
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
                            </Grid>
                        </form>
                    </Paper>
                    </Grow>
                </Grid>
                <Grid item xs={false} sm={2}/>
            </Grid>
            // <div className="container">
            //     <form onSubmit={this.handleSubmit} className="white">
            //         <h5 className="grey-text text-darken-3">Sign up</h5>
            //         <div className="input-field">
            //             <label htmlFor="email"> Email</label>
            //             <input type="email" id="email" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <label htmlFor="password">Password</label>
            //             <input type="password" id="password" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <label htmlFor="firstName">First name</label>
            //             <input type="text" id="firstName" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <label htmlFor="lastName">Last name</label>
            //             <input type="text" id="lastName" onChange={this.handleChange}/>
            //         </div>
            //         <div className="input-field">
            //             <button className="btn pink lighten-1 z-depth-0">Sign up</button>
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
        auth: state.firebase.auth,
        authError: state.auth.authError
    }   
}

const mapDispatchToProps = (dispatch) => {
    return {
        signUp: (newUser) => dispatch(signUp(newUser))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)

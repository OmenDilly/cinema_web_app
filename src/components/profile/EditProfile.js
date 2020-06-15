import React, { Component } from 'react'
// import 'date-fns';
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect } from 'react-router-dom'
import {Select, Button, Input, Typography, createMuiTheme, FormControlLabel, Switch, Slide, InputLabel, Paper, FormControl, MenuItem, InputAdornment, TextField, Grid} from '@material-ui/core';

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
    margin: theme.spacing(2),
    // padding: "20px"
}

const InStyle = {
    marginRight: theme.spacing(4),
    // padding: "20px"
}

class EditPRofile extends Component {
    state = {
        f_title: '',
        s_hall: 'Small',
        s_date: '2020-05-22',
        s_time: '09:00',
        s_price: '100',
        s_format: '2d',
        msg: '',
        adult: false
    }


    
    handleChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)
        console.log(this.state)
        this.setState({
            [e.target.name]: e.target.value,
            msg: '',
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        // if (this.state.f_title === '') {
        //     this.setState({ msg: 'Film title is required'})
        // } else {
        //     this.props.createProject(this.state);
        //     this.setState({ msg: 'Creation complete'});
        // }
    }

    handleSwitch = () => {
        this.setState({
            adult: !this.state.adult
        })
        console.log(this.state)
    }

    render() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin'/>
        return (
            <Grid container>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}>
                    <Slide direction='up' in={true}>
                        <Paper elevation={3} style={FormStyle}>
                            <form onSubmit={this.handleSubmit}>
                                <Grid container>
                                    <Grid item xs={12} style={InputStyle}>
                                        <TextField
                                            label="Film title"   
                                            name="f_title"
                                            required={true}
                                            onChange={this.handleChange}
                                            style={InStyle}
                                        />
                                        <Input
                                            name="s_price"
                                            label="price"
                                            defaultValue={this.state.s_price}
                                            onChange={this.handleChange}
                                            startAdornment={<InputAdornment position="start">RUB</InputAdornment>}
                                            type='number'
                                            style={{marginTop: theme.spacing(2)}}
                                            inputProps={{
                                                step: 10,
                                                min:'70',
                                                max:'300',
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={InputStyle}>
                                        <FormControl style={InStyle}>
                                            <InputLabel id="hall-select">Hall</InputLabel>
                                            <Select
                                                labelId="hall-select"
                                                name="s_hall"
                                                value={this.state.s_hall}
                                                onChange={this.handleChange}
                                                label="Hall"
                                            >
                                                <MenuItem value={'Small'}>Small</MenuItem>
                                                <MenuItem value={'Middle'}>Middle</MenuItem>
                                                <MenuItem value={'Large'}>Large</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControl style={InStyle}>
                                            <InputLabel id="format-select">Format</InputLabel>
                                            <Select
                                                labelId="format-select"
                                                name="s_format"
                                                value={this.state.s_format}
                                                onChange={this.handleChange}
                                                label="Format"
                                            >
                                                <MenuItem value={'3d'}>3d</MenuItem>
                                                <MenuItem value={'2d'}>2d</MenuItem>
                                                <MenuItem value={'IMAX'}>IMAX</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <FormControlLabel
                                            control={<Switch color="primary" />}
                                            label="For adults"
                                            labelPlacement="end"
                                            style={InputStyle}
                                            onClick={this.handleSwitch}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={InputStyle}>
                                        <TextField
                                            name="s_date"
                                            label="Session date"
                                            type="date"
                                            style={InStyle}
                                            defaultValue={this.state.s_date}
                                            onChange={this.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            name="s_time"
                                            label="Time"
                                            type="time"
                                            defaultValue={this.state.s_time}
                                            onChange={this.handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            inputProps={{
                                                step: 300,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} style={InputStyle}>
                                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>
                                            Create
                                        </Button>
                                        {
                                            this.state.msg === 'Film title is required' 
                                            ? 
                                            <Typography style={{color: 'red', marginTop: theme.spacing(2)}}>{this.state.msg}</Typography>
                                            :
                                            <Typography style={{color: 'green', marginTop: theme.spacing(2)}}>{this.state.msg}</Typography>
                                        }
                                    </Grid>
                                </Grid>
                            </form>
                        </Paper>
                    </Slide> 
                </Grid>
                <Grid item xs={false} sm={2}/>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProject: (project) => dispatch(createProject(project))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPRofile)

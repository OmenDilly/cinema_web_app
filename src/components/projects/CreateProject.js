import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createProject } from '../../store/actions/projectActions'
import { Redirect, Link, useHistory } from 'react-router-dom'
import Alert from '@material-ui/lab/Alert';
import {Select, Button, Input, Zoom, Typography, createMuiTheme, FormControlLabel, Switch, Slide, InputLabel, Paper, FormControl, MenuItem, InputAdornment, TextField, Grid} from '@material-ui/core';
import SearchDialog from '../search/SearchDialog'
import {SearchContext} from '../search/SearchContext'
import axios from 'axios'

const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=83609f5a';

const theme = createMuiTheme();

const FormStyle = {
    // marginRight: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    // marginTop: theme.spacing(2),
    // padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    maxWidth: 600,
    margin: 0,
}

const InputStyle = {
    margin: theme.spacing(2),
    // padding: "20px"
}

const InStyle = {
    marginRight: theme.spacing(4),
    // padding: "20px"
}

var message

class CreateProject extends Component {
    
    state = {
        f_title: '',
        s_hall: 'green',
        s_date: '2020-05-22',
        s_time: '09:00',
        s_price: '100',
        s_format: '2d',
        msg: '',
        result: {},
        // adult: false,
        search: false
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

    // setFilmTitle = (result, id) => {
    //     this.setState({
    //         f_title: result.Title,
    //         msg: result.Year,
    //         film_id: result.imdbID
    //     })
    //     this.openPopup(id)
    // }

    handleClick = () => {
        this.setState({
            search: !this.state.search 
        })
    }
    
    handleClose = () => {
        this.setState({
            search: !this.state.search  
        })
        console.log(this.state.search)
    };

    openPopup = (title) => {
        axios(apiKey + '&t=' + title).then(({data}) => {
            let result = data 

            this.setState({
                f_title: result.Title,
                result: result
            })
        })
        this.handleClose()
        console.log(this.state.result)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.f_title === '') {
            this.setState({ msg: 'Film title is required'})
            message = <Zoom in={true}><Alert severity="error" style={{width: '100%', borderRadius: theme.spacing(2)}}>Film title is required</Alert></Zoom>
        } else if (this.state.s_date === '') {
            this.setState({ msg: 'Date is required'})
            message = <Zoom in={true}><Alert severity="error" style={{width: '100%', borderRadius: theme.spacing(2)}}>Date is required</Alert></Zoom>
        } else if (this.state.s_time === '') {
            this.setState({ msg: 'Time is required'})
            message = <Zoom in={true}><Alert severity="error" style={{width: '100%', borderRadius: theme.spacing(2)}}>Time is required</Alert></Zoom>
        } else {
            this.props.createProject(this.state);
            this.setState({ msg: 'Creation complete'});
            message = <Zoom in={true}><Alert severity="success" style={{width: '100%', borderRadius: theme.spacing(2)}}>Creation complete</Alert></Zoom>
        }
    }

    // handleSwitch = () => {
    //     this.setState({
    //         adult: !this.state.adult
    //     })
    //     console.log(this.state)
    // }

    render() {
        const { auth } = this.props
        if (!auth.uid) return <Redirect to='/signin'/>
        return (
            <SearchContext.Provider value={this.openPopup}>
            <Grid container>
                <Grid item xs={false} sm={2}/>
                <Grid item xs={12} sm={8}>
                    <Slide direction='up' in={true}>
                        <Paper id='form' elevation={3} style={FormStyle}>
                            <form onSubmit={this.handleSubmit}>
                                <Grid container>
                                    <Grid item xs={12} style={InputStyle}>
                                        <TextField
                                            label="Film title"   
                                            name="f_title"
                                            value={this.state.f_title}
                                            onClick={this.handleClick}
                                            // onChange={this.handleChange}
                                            style={InStyle}
                                            inputProps={{
                                                disabled: true
                                            }}
                                    
                                        />
                                        <SearchDialog
                                            open={this.state.search} 
                                            onClose={this.handleClose}/>
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
                                                <MenuItem value={'green'}>green</MenuItem>
                                                <MenuItem value={'blue'}>blue</MenuItem>
                                                <MenuItem value={'red'}>red</MenuItem>
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
                                        {/* <FormControlLabel
                                            control={<Switch color="primary" />}
                                            label="For adults"
                                            labelPlacement="end"
                                            style={InputStyle}
                                            onClick={this.handleSwitch}
                                        /> */}
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
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            style={{borderRadius: theme.spacing(1), paddingLeft: theme.spacing(5), paddingRight: theme.spacing(5)}} 
                                            onClick={this.handleSubmit}>
                                            Create
                                        </Button>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            style={{borderRadius: theme.spacing(1), marginLeft: theme.spacing(2), paddingLeft: theme.spacing(5), paddingRight: theme.spacing(5)}} 
                                            component={Link} 
                                            to='/'>
                                            Cancel
                                        </Button>
                                    </Grid>
                                    {message}
                                </Grid>
                            </form>
                        </Paper>
                    </Slide> 
                </Grid>
                <Grid item xs={false} sm={2}/>
            </Grid>
            </SearchContext.Provider>
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject)

import React, {Component} from 'react'
import Notification from './Notification'
import ProjectList from '../projects/ProjectList'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import {createMuiTheme} from '@material-ui/core';

class Dashboard extends Component {

    render() {
        console.log(this.props.projects)
        const { projects, auth } = this.props;
        if (!auth.uid) return <Redirect to='/signin'/>
        return (
            <Grid container>
                <Grid item xs={false} sm={1}/>
                <Grid item xs={12} sm={10}>
                    <ProjectList projects={projects}/>
                </Grid>
                <Grid item xs={false} sm={1}/>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state )
    return {
        projects: state.firestore.ordered.projects,
        auth: state.firebase.auth
    }
}

export default compose(firestoreConnect(['projects']),connect(mapStateToProps))(Dashboard)
import React, {useState} from 'react'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles';
import MenuList from '@material-ui/core/MenuList';
import { connect } from 'react-redux'
import SignedInLinks from '../layout/SignedInLinks'
import SignedOutLinks from '../layout/SignedOutLinks'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Box from '@material-ui/core/Box';

function AppDrawer(props) {
    const { auth, profile } = props
    console.log(auth)
    
    // const [drawerOpen, setDrawerOpen] = useState(props.open)

    return (
        <SwipeableDrawer
            open={props.open}
            onClose={() => props.onToggle(false)}
            onOpen={() => props.onToggle(true)}
        >
            {
                auth.uid ? <SignedInLinks onItemClick={() => props.onToggle(false)} profile={profile}/> : <SignedOutLinks onItemClick={() => props.onToggle(false)}/>
            }
        </SwipeableDrawer>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(AppDrawer)
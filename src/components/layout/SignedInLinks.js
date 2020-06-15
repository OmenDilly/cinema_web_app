import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    root: {
      width: theme.spacing(2) * 25,
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      
    },
    item: {
        padding: theme.spacing(2)
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    }
  }));

const SignedInLinks = (props) => {

    const classes = useStyles();
    console.log(props)

    const handleItemClick = () => {
        props.signOut()
        props.onItemClick()
        console.log(props.signOut, props.onItemClick)
    }
    
    return (
        <MenuList className={classes.root}>
            <MenuItem className={classes.item} component={NavLink} to='/' onClick={() => props.onItemClick()}><ListItemIcon><HomeIcon/></ListItemIcon>Main</MenuItem>
            <MenuItem className={classes.item} component={NavLink} to='/create' onClick={() => props.onItemClick()}><ListItemIcon><AddCircleIcon/></ListItemIcon>Create</MenuItem>
            <MenuItem className={classes.item}><ListItemIcon><AccountCircleIcon/></ListItemIcon>Profile</MenuItem>
            <Divider/>
            <MenuItem className={classes.item}><ListItemIcon><SettingsIcon/></ListItemIcon>Settings</MenuItem>
            <MenuItem className={classes.item}><ListItemIcon><InfoIcon/></ListItemIcon>About</MenuItem>
            <MenuItem className={classes.item} onClick={handleItemClick}><ListItemIcon><ExitToAppIcon/></ListItemIcon>Sign out</MenuItem>
        </MenuList>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut: () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
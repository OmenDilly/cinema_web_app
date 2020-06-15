import React from 'react'
import { NavLink } from 'react-router-dom'
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
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
  }
}));



const SignedOutLinks = (props) => {

  const handleItemClick = () => {
    
    props.onItemClick()
}

    const classes = useStyles();

  return (
      <MenuList className={classes.root}>
          <MenuItem className={classes.item} component={NavLink} to='/signup' onClick={handleItemClick}><ListItemIcon><PersonAddIcon/></ListItemIcon>Sign up</MenuItem>
          <MenuItem className={classes.item} component={NavLink} to='/signin' onClick={handleItemClick}><ListItemIcon><AccountCircleIcon/></ListItemIcon>Sign in</MenuItem>
          <Divider/>
          <MenuItem className={classes.item}><ListItemIcon><SettingsIcon/></ListItemIcon>Settings</MenuItem>
          <MenuItem className={classes.item}><ListItemIcon><InfoIcon/></ListItemIcon>About</MenuItem>
      </MenuList>
  )
}

export default SignedOutLinks
import React, { useState } from 'react'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import MenuItem from '@material-ui/core/MenuItem'
import SearchResults from '../search/SearchResults'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Slide from '@material-ui/core/Slide'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import Popover from '@material-ui/core/Popover';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SearchModule from '../search/SearchModule'

const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=83609f5a';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    nav: {
      boxShadow: 0

    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'block',
      textDecoration: 'none', 
      color: 'white'
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   marginLeft: theme.spacing(1),
      //   width: 'auto',
      // },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    searchList: {
      position: 'absolute', 
      top: theme.spacing(8),
      right: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
      },
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch',
      //   },
      // },
    },
  }));

const Navbar = (props) => {

    const [popover, setPopover] =useState(null)
    const [focus, setFocus] = useState(false)

    const handleClickSearch = (e) => {
        setPopover(e.currentTarget)
    }

    const handlePopoverClose = () => {
        setPopover(null)
    }

    const handleEnter = () => {
      setFocus(true)
    }

    const open = Boolean(popover)

    const history = useHistory()

    const [value, setValue] = useState({
        s: '',
        results: [],
        selected: {}
    })

    const handleChange = (e) => {
        let s = e.target.value;

        setValue(prevState => {
            return { ...prevState, s: s}
        })
        search()
        console.log(value.s)
    }

    const handleItemClick = () => {
      // history.push('/create')
      openPopup()
      setPopover(null)
      setValue(prevState => {
        return { ...prevState, s: '', results: []}
    })
    }

    const openPopup = id => {
      axios(apiKey + '&i=' + id).then(({data}) => {
        let result = data 

        setValue(prevState => {
          return {...prevState, selected: result}
        })
      })
      console.log(value.selected.Title)
    }

    // let match = useRouteMatch("/create")

    // const handleFade = () => {
      
    //   while (value.s !== '' & value.results !== []){
    //     return null
    //   } 
    //   setValue(prevState => {
    //     return { ...prevState, s: '', results: []}
    // })
    // }

    const search = () => {
        axios(apiKey + '&s=' + value.s).then(({data}) => {
            let results = data.Search
            setValue(prevState => {
                return { ...prevState, results: results}
            })
            console.log(data)
        })
    }

    const [expanded, setExpanded] = useState(false);

    const handleClick = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel: false)
    }

    const classes = useStyles();

    return (
        <div className={classes.root}>
        <AppBar id='nav' className={classes.nav} position="static">
          <Toolbar>
            <Slide in={true} timeout={600} direction='right'>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
                onClick={() => props.onLeftIconClick()}
              >
                <MenuIcon />
              </IconButton>
            </Slide>
            <Slide in={true} timeout={600} direction='down'>
              <Typography component={Link} to='/' className={classes.title} variant="h6" noWrap onClick={handleClick}>
                  FunFlow Cinema
              </Typography>
            </Slide>
            { 
              props.auth.uid
              ? 
              <>
                <Grow timeout={1000} in={true}>
                  <div > 
                    <IconButton color="inherit" onClick={handleClickSearch}><SearchIcon /></IconButton>
                  </div>
                </Grow>
                <Slide direction='left' timeout={600} in={true}>
                  <div > 
                    <IconButton color="inherit"><NotificationsIcon /></IconButton>
                  </div>
                </Slide>
              </>
              : 
              null
            }
            <Popover
              open={open}
              anchorEl={popover}
              onEntered={handleEnter}
              onClose={handlePopoverClose}
              elevation={10}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
              <SearchIcon />
              </div>
                <InputBase
                  onBlur={handleItemClick}
                  value={value.s}
                  placeholder="Search…"
                  onChange={handleChange}
                  autoFocus={true}
                  
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <SearchResults onItemsClick={handleItemClick} popup={value.selected} results={value.results}/>
            </Popover>
            {/* <Grow in={true} timeout={1000}>
              <Paper elevation={4} square={true} className={classes.searchList}>
                  <SearchResults onItemsClick={handleItemClick} popup={value.selected} results={value.results}/>
              </Paper>
            </Grow> */}
          </Toolbar>
        </AppBar>
      </div>
    )
}

const mapStateToProps = (state) => {
    console.log(state)
    return {
        auth: state.firebase.auth,
        profile: state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import moduleName from './SearchResults'
import Input from '@material-ui/core/Input';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import SearchModule from './SearchModule'
import SearchResults from './SearchResults'
import axios from 'axios'
import {SearchContext} from './SearchContext'
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  input: {
    margin: theme.spacing(4),
  },
}));

export default function SearchDialog(props) {
    const classes = useStyles();
    const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=83609f5a';

  
    const [value, setValue] = useState({
        s: '',
        id: props.filmID,
        results: [],
        selected: {}
    })
    const search = () => {
        axios(apiKey + '&s=' + value.s).then(({data}) => {
            let results = data.Search
            setValue(prevState => {
                return { ...prevState, results: results}
            })
            console.log(data)
        })
    }
    const handleChange = (e) => {
        let s = e.target.value;
        
        setValue(prevState => {
            return { ...prevState, s: s}
        })
        search()
        console.log(value.id)
    }

    const closePopup = () => {
        setValue(prevState => {
        return {...prevState, results: []}
        })
    }

  
    const { open, onClose } = props;

    return (
    <Dialog onExited={closePopup} maxWidth='sm' onClose={onClose} aria-labelledby="simple-dialog-title" open={open}>
        <Paper className={classes.form}>
            <Input
                placeholder='Search for films'
                startAdornment={<SearchIcon/>}
                className={classes.input}
                autoFocus={true}
                onChange={handleChange}
                type='text'
            />
            <Grow in={true} timeout={1000}>
                <Paper elevation={4} square={true} className={classes.searchList}>
                    <SearchResults value={value.selected} results={value.results}/>
                </Paper>
            </Grow>
        </Paper>

    </Dialog>
    );
    }

    SearchDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
    };
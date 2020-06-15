import React, {useState} from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Grow from '@material-ui/core/Grow'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles';
import GradeIcon from '@material-ui/icons/Grade';
import Fab from '@material-ui/core/Fab';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Divider from '@material-ui/core/Divider';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import Sits from '../layout/Sits'

const useStyles = makeStyles((theme) => ({
    form: {

        marginTop: theme.spacing(5),

        borderRadius: theme.spacing(3),

        [theme.breakpoints.down('xs')]: {
            
            marginTop: 0,
            borderRadius: 0
            // borderRadius: theme.spacing(3),
            // borderBottomLeftRadius: 0,
            // borderBottomRightRadius: 0
          },
    },
    content: {
        // marginTop: theme.spacing(3),
        // marginBottom: theme.spacing(3),
       paddingLeft: theme.spacing(5),
       paddingRight: theme.spacing(5),
       paddingTop: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
        padding: theme.spacing(2),
      },
        
    },
    posterContainer: {
        paddingLeft: theme.spacing(5),
        paddingTop: theme.spacing(5),
         [theme.breakpoints.down('xs')]: {
         padding: theme.spacing(2),
         paddingTop: theme.spacing(5),
       },
        
    },
    table: {

        padding: theme.spacing(5),
        [theme.breakpoints.down('xs')]: {
            padding: theme.spacing(2)
          },
    },
    poster: {
       
        borderRadius: theme.spacing(2),
        
    },
    chip: {
        margin: theme.spacing(0.5),
        paddingLeft: theme.spacing(1.5),
        paddingRight: theme.spacing(1.5),
    },
    fabProgress: {
        
        position: 'absolute',
        top: 0,
        left: 0,
        
    },
    fab: {
        marginRight: theme.spacing(5)
        
    },
    fabItems: {
        color: 'blue',
        
    },
    title: {
        width: '100%',
        marginBottom: theme.spacing(5)
    },
    expansion: {
        
        marginTop: theme.spacing(2),
        boxShadow: 'none',
        
    },
    addInf: {
        fontWeight: 'bold',
        color: '#616161'
    },
    popover: {
        padding: theme.spacing(2),
        
    },
    sitButton: {
        width: '10em',
        borderRadius: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            width: '20em'
          },
        // borderRadius: theme.spacing(2),
    },
    buttonContainer: {
        margin: theme.spacing(2),
        textAlign: 'center',
        width: '100%'
    }
  }));

const ProjectDetail = (props) => {

    const [sit, setSit] = useState({
        row: [1, 2, 3, 4, 5, 6],
        sit: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    })




    const [choose, setChoose] = useState(false)
    const handleSitClick = () => {
        setChoose(!choose)
        console.log(choose)
    }
    
    const handleSitClose = () => {
        setChoose(!choose)
        console.log(choose)
    };

    const [popover, setPopover] =useState(null)

    const handleClick = (e) => {
        setPopover(e.currentTarget)
    }

    const handlePopoverClose = () => {
        setPopover(null)
    }

    const open = Boolean(popover)

    const classes = useStyles()

    const {project, auth} = props;

    if (!auth.uid) return <Redirect to='/signin'/>
    if (project) {
        var genres = project.result.Genre.split(', ');
        var count = 1
        var rating = project.result.imdbRating
        var hallColor, textColor
        if (project.s_hall === 'green') {
            hallColor = '#ccff90'
            textColor = '#33691e'
        } else if (project.s_hall === 'blue') {
            hallColor = '#90caf9'
            textColor = '#1a237e'
        } else if (project.s_hall === 'red') {
            hallColor = '#ff5252'
            textColor = '#ffebee'
        }
        console.log(genres)
        parseFloat(rating)
        return (
            <Grid container>
                <Grid item xs={false} sm={1}/>
                <Grid item xs={12} sm={10}>
                    <Grow in={true} timeout={600}>
                        <Paper className={classes.form} elevation={3}>
                            <Grid container>
                                <Grid item xs={12} sm={4} className={classes.posterContainer}>
                                    
                                    <img className={classes.poster} src={project.result.Poster} alt="" width='100%'/>

                                </Grid>
                                <Grid item xs={12} sm={8} className={classes.content}>
                                    <table className={classes.title}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Typography variant='h5'>{project.result.Title}{project.result.Rated === 'R' ? <Typography style={{marginLeft: '0.5em', fontSize: '1em'}} display='inline' color='secondary'>18+</Typography> : ''}</Typography>
                                                    <Typography variant='subtitle1'>{project.result.Year}</Typography>
                                                </td>
                                                
                                                <td  valign='top' align='right'>
                                                    <Zoom in={true} timeout={600}>
                                                        <IconButton
                                                            onClick={handleClick}
                                                        >
                                                            <Typography color='primary'>{rating}</Typography>
                                                            <CircularProgress 
                                                                thickness={1.5}
                                                                color='primary' 
                                                                className={classes.fabProgress} 
                                                                variant="static" 
                                                                value={rating * 10} 
                                                                size='100%'
                                                            />
                                                        </IconButton>
                                                    </Zoom>
                                                    <Popover
                                                        open={open}
                                                        anchorEl={popover}
                                                        onClose={handlePopoverClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'center',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'right',
                                                        }}
                                                    >
                                                        <Typography className={classes.popover} variant='body2'>{project.result.Ratings[0].Source + ': ' + project.result.Ratings[0].Value}</Typography>
                                                        {
                                                            project.result.Ratings[1] 
                                                            ?
                                                            <Typography className={classes.popover} variant='body2'>{project.result.Ratings[1].Source + ': ' + project.result.Ratings[1].Value}</Typography>
                                                            :
                                                            null
                                                        }
                                                        {
                                                            project.result.Ratings[2] 
                                                            ?
                                                            <Typography className={classes.popover} variant='body2'>{project.result.Ratings[2].Source + ': ' + project.result.Ratings[2].Value}</Typography>
                                                            :
                                                            null
                                                        }

                                                    </Popover>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                    <Typography variant='body1' gutterBottom>{project.result.Plot}</Typography>
                                    {genres.map(genre => (
                                        <Chip className={classes.chip} onClick={() => console.log('hello')} key={count=count+1} label={genre} />
                                    ))}
                                    <ExpansionPanel square className={classes.expansion}>
                                        <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                        >
                                        <Typography variant='body2'>More information</Typography>
                                        </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <table width='100%'>
                                            <tbody>
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Actors:</td>
                                                    <td align='left' valign='top'>{project.result.Actors}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Directors:</td>
                                                    <td align='left' valign='top'>{project.result.Director}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Writers:</td>
                                                    <td align='left' valign='top'>{project.result.Writer}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Runtime:</td>
                                                    <td align='left' valign='top'>{project.result.Runtime}</td>
                                                </tr>
                                                
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Box office:</td>
                                                    <td align='left' valign='top'>{project.result.Type === 'movie' ? <span>{project.result.BoxOffice}</span> : 'N/A'}</td>
                                                </tr>
                                                <tr>
                                                    <td className={classes.addInf} align='left' width='18%' valign='top'>Production:</td>
                                                    <td align='left' valign='top'>{project.result.Type === 'movie' ? <span>{project.result.Production}</span> : 'N/A'}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        {/* <Typography>
                                            Actors: {project.result.Actors}
                                        </Typography> */}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                                
                                <Grid item container xs={12} className={classes.table}>
                                    <Typography variant='h5'>Session</Typography>
                                    <div style={{width:'100%'}}>
                                        <Chip clickable className={classes.chip} icon={<AspectRatioIcon style={{color: textColor}}/>} style={{backgroundColor: hallColor, color: textColor}} label='Hall'/>
                                        <Chip clickable className={classes.chip} icon={<PlayCircleFilledWhiteIcon/>} label={project.s_format}/>
                                        <Chip clickable className={classes.chip} icon={<CalendarTodayIcon/>} label={project.s_date}/>
                                        <Chip clickable className={classes.chip} icon={<AccessTimeIcon/>} label={project.s_time}/>
                                    </div>
                                    <div className={classes.buttonContainer}>
                                        <Button onClick={handleSitClick} variant='contained' size='large' className={classes.sitButton} color='primary'>Choose sit</Button>
                                    </div>
                                    <Sits open={choose} onClose={handleSitClose}/>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grow>
                </Grid>
                <Grid item xs={false} sm={1}/>
            </Grid>
        )
    } else {
        return (
            <Backdrop className={classes.backdrop} open={true}>
                <CircularProgress/>
            </Backdrop>
        )
    }
    
}

const mapStateToProps = (state, ownProps) => {
    console.log(state)
    const id = ownProps.match.params.id;
    const projects = state.firestore.data.projects;
    const project = projects ? projects[id] : null;
    return {
        project: project,
        auth: state.firebase.auth
    }
}

export default compose(firestoreConnect(['projects']),connect(mapStateToProps))(ProjectDetail)
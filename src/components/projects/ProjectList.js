import React, {useState} from 'react'
import ProjectSummary from './ProjectSummary'
import { Link, Redirect, useHistory } from 'react-router-dom'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import Zoom from '@material-ui/core/Zoom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        [theme.breakpoints.up('sm')]: {
            marginTop: theme.spacing(5),
        }
        
    },
    item: {
        BackGroundColor: 'red'
    }, 
    price: {
        
    },
    table: {

    }
}))

const ProjectList = ({projects}, props) => {

    let history = useHistory();

    const classes = useStyles()

    const [projectId, setProjectId] = useState()

    const handleClick = () => {
        history.push("/project/"+projectId);
        console.log(projectId)
    }


    return (
        <Grow in={true} timeout={1000}>
            <TableContainer component={Paper} id='paper' className={classes.root}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left" width='50em'>Poster</TableCell>
                            <TableCell><Typography>Title</Typography></TableCell>
                            {/* <TableCell align="right">Hall</TableCell>
                            <TableCell align="right">Format</TableCell> */}
                            {/* <TableCell align="right">Adult</TableCell> */}
                            <TableCell align="right">Date</TableCell>
                            <TableCell align="right">Time</TableCell>
                            <TableCell align="right">Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects && projects.map((project) => (
                            <Slide in={true} direction='up' timeout={700} key={project.id}>
                            <TableRow style={{cursor: 'pointer'}} hover={true} onMouseDown={() => setProjectId(project.id)} onClick={handleClick}>
                                <TableCell><img src={project.result.Poster} alt='film poster' width='100%'/></TableCell>
                                <TableCell component="th" scope="row">{project.f_title}</TableCell>
                                {/* <TableCell align="right">{project.s_hall}</TableCell>
                                <TableCell align="right">{project.s_format}</TableCell> */}
                                {/* <TableCell align="right">{project.adult === false ? 'No' : 'Yes'}</TableCell> */}
                                <TableCell align="right">{project.s_date}</TableCell>
                                <TableCell align="right">{project.s_time}</TableCell>
                                <TableCell align="right">{project.s_price + ' RUB'}</TableCell>
                            </TableRow>
                            </Slide>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grow>
    )
}

export default ProjectList
import React, {useState} from 'react'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Grow from '@material-ui/core/Grow';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
    sit: {
        borderRadius: 10,
        [theme.breakpoints.up('sm')]:
        {
            height: '2.5em',
            width: '2.5em',
        },

        // backgroundColor: '#90a4ae'
    },
    form: {
        padding: theme.spacing(2)
    },
    rowCell: {
        paddingRight: theme.spacing(2)
    },
    buttonContainer: {
        margin: theme.spacing(2),
        textAlign: 'right'
        
    },
    table: {

    },
    button: {
        width: '10em',
        [theme.breakpoints.down('xs')]:
        {
            width: '100%',
        },
    },
    sitCell: {
        paddingBottom: theme.spacing(2)
    }
}))

function Sits(props) {

    const { open, onClose } = props;

    const classes = useStyles()
    

    const [sit, setSit] = useState(
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    )

    var id = 0
    const [name, setName] = useState()

    const [selected, setSelected] = useState(false)
    const [sitId, setSitId] = useState(null)

    const handleSitClick = (e, index) => {
        setSitId(e.currentTarget.id)
        
        if (sitId === e.currentTarget.id){
            // setSit(prevState => {
            //     return { ...prevState, sit[0]: 'ok'}
            // })
            // setSit(...sit, sit[0]: 'ok')
            console.log(props)
            console.log(e.target.id)
        }            
    } 

    return (
        <Dialog open={open} onClose={onClose}>
            <Paper className={classes.form}>
                <table className={classes.table }>
                    <thead>
                        <tr>
                            <td></td>
                            { 
                                sit.map((sit, index) => (<td className={classes.sitCell} align='center' key={index}>{index+1}</td>))
                            }
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td className={classes.rowCell} align='left'>1</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)} onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    <tr>
                        <td className={classes.rowCell} align='left'>2</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)}  onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    <tr>
                        <td className={classes.rowCell} align='left'>3</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)}  onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    <tr>
                        <td className={classes.rowCell} align='left'>4</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)}  onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    <tr>
                        <td className={classes.rowCell} align='left'>5</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)}  onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    <tr>
                        <td className={classes.rowCell} align='left'>6</td>
                        {   
                            sit.map((sit, index) => (<td className={classes.sit} key={id = id+1}><Checkbox id={String(id=id+1)}  onClick={handleSitClick}></Checkbox></td>))
                        }
                    </tr>
                    {/* {
                        sit.row.map((row, index) => (
                            <tr key={index}>
                                <td className={classes.rowCell} align='left'>{row}</td>
                                {   
                                    sit.sit.map((sit) => (<td className={classes.sit} key={id = id+1}><MenuItem id={sitId} onClick={handleSitClick} disabled={selected} className={classes.sit}></MenuItem></td>))
                                }
                            </tr>
                        ))
                    } */}
                    </tbody>
                </table>
                <div className={classes.buttonContainer}>
                    <Button className={classes.button} size='large' variant='contained'>Choose</Button>
                </div>

            </Paper>
        </Dialog>
    )
}

export default Sits

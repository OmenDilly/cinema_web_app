// import React from 'react'
// import MenuItem from '@material-ui/core/MenuItem'

// function ResultItem({result}) {
//     return (
//         <MenuItem>{result.title}</MenuItem>
//     )
// }

// export default ResultItem
import React, {useContext, useCallback} from 'react'
import MenuItem from '@material-ui/core/MenuItem'
import { Link, useRouteMatch } from 'react-router-dom'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'
import Divider from '@material-ui/core/Divider'
import {SearchContext} from './SearchContext'

function ResultItem({ result, value }) {

    // let itemTitle = result.title
    // onItemSubmit(itemTitle)

    const openPopup = useContext(SearchContext)
	return (

        <div>
            <Grow  in={true} timeout={600}>
                <MenuItem onClick={() => openPopup(result.Title)} className="result">
                <table style={{width: '100%'}}>
                    <tbody>
                        <tr>
                            <td style={{width: '4em'}} align='left'><img src={result.Poster} style={{width: '3em'}} alt="Film poster"/></td>
                            <td align='left'>{result.Title} </td>
                            <td style={{width: '8em'}} align='right'>{result.Year}</td>
                        </tr>
                    </tbody>
                </table>
                    
              
                </MenuItem>
            </Grow>
            <Divider />
    </div>
	)
}

export default ResultItem

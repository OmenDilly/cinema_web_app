// import React from 'react'
// import MenuItem from '@material-ui/core/MenuItem'
// import { fade, makeStyles } from '@material-ui/core/styles';
// import ResultItem from './ResultItem'

// const useStyles = makeStyles((theme) => ({
//     root: {
//         // marginLeft: 500, 
//         // position: 'absolute', 
//         // bottom: theme.spacing(2), 
//         // right: 0,
//         // width: 200,
//         // height: 100
//     }
// }))

// function SearchResults({results}) {

//     const classes = useStyles();

//     return (
//         <div className={classes.root} name='results'>
//             {
//                 results && results.map(result => (
//                     <ResultItem key={result.imdbID} result={result}/>
//                 ))
//             }

//         </div>

//     )
// }

// export default SearchResults
  

import React, {useContext} from 'react'
import MenuList from '@material-ui/core/MenuList'
import ResultItem from './ResultItem'

function SearchResults ({ results, popup, value }) {

	// const callback = (dataFromChild) => {
	// 	console.log(dataFromChild)
	// }
	return (
		<div className="results">
			{results && results.map(result => (

				<ResultItem key={result.imdbID} value={value} result={result} openPopup={popup}/>
				
			))}
		</div>
	)
}

export default SearchResults

import React, {useState} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

const apiKey = 'https://www.omdbapi.com/?i=tt3896198&apikey=83609f5a';

export default function SearchModule() {
    const [value, setValue] = useState({
        s: '',
        results: [],
        selected: {}
    })
    const search = () => {
        axios(apiKey + '&s=' + value.s).then(({data}) => {
            let results = data.Search
            let summary = data
            setValue(prevState => {
                return { ...prevState, results: results, selected: summary}
            })
            console.log(data)
        })
    }
}

// const mapStateToProps = (state) => {
//     return {
//         film: state.firebase.auth
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         createProject: (film) => dispatch(SearchModule(film))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(SearchModule)

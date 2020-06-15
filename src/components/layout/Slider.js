import React, { Component } from 'react'
import { M } from 'materialize-css'

class Slider extends Component {
    componentDidMount() {
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('select');
            var instances = M.FormSelect.init(elems, {});
          });
    }

    handleChange = (item) =>{
        var item_id = item.target.value
        console.log(item.target.value)
    }

    render() {
        return (
            <select className="browser-default" onChange={this.handleChange}>
                <option value="" disabled>Choose your option</option>
                <option value="1">New film</option>
                <option value="2">New session</option>
            </select>
        )
    }
}

export default Slider
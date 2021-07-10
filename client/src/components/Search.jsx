import React, { Component } from 'react'
import axios from 'axios'
import Results from './Cards'
import "../App.css"

const API_URL = `${API_URL}`


class Search extends Component {

    state = {
        query: '',
        results: []
    }

    getInfo = () => {
        axios.get(`${API_URL}${this.state.query}`)
            .then(({ data }) => {
                this.setState({
                    results: data.results
                })
            })
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query && this.state.query.length > 10) {
                if (this.state.query.length % 40 === 0) {
                    this.getInfo()
                    console.log("shit!")
                }
            } else if (!this.state.query && this.state.query.length > 1) {
                console.log("nothin")

            }
        })
    }

    render() {
        return (

            <div>
                <form>
                    <center>
                        <input placeholder="           Search         "
                            ref={
                                (input) => { this.search = input }}
                            id="myInput"
                            type="text"
                            value={this.state.value}
                            onChange={this.handleInputChange}
                        />
                    </center>
                    <button type="button" onClick={this.getInfo()}>
                    </button>
                    <div >
                    </div>
                    <Results results={this.state.results} />
                </form>
            </div>
        )
    }
}

export default Search
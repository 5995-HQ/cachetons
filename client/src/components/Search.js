import React, { Component } from 'react'
import axios from 'axios'
import Results from './Cards'

const API_URL = 'http://localhost:5000/api/v1/craigslist?page=1&subject='


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
            if (this.state.query && this.state.query.length > 1) {
                if (this.state.query.length % 2 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query && this.state.query.length > 1) {
                this.getInfo()

            }
        })
    }

    render() {
        return (
            <div>
                <div>
                    <center>
                        <form>
                            <input
                                placeholder="Search something..."
                                ref={(input) => { this.search = input }}
                                id="myInput"
                                onKeyDown="myFunction()"
                                type="search"
                                value={this.state.value}
                                onChange={this.handleInputChange}
                            />
                            <button type="submit"> Search </button>
                            <div>
                            </div>
                            <Results results={this.state.results} />
                        </form>
                    </center>
                </div>
            </div>

        )
    }
}

export default Search

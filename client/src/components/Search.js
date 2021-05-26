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
                if (this.state.query.length % 5 === 0) {
                    this.getInfo()
                }
            } else if (!this.state.query) {
            }
        })
    }

    render() {
        return (
            <div className="p-8">
                <div className="bg-white flex items-center rounded-full shadow-xl">
                    <center>
                        <form className="rounded-l-full w-full py-4 px-6 text-gray-700 leading-tight focus:outline-none">
                            <input
                                placeholder="Search for..."
                                ref={input => this.search = input}
                                onChange={this.handleInputChange}
                            />
                            <div className="p-4">
                                <button className="bg-blue-500 text-white rounded-full p-2 hover:bg-blue-400 focus:outline-none w-12 h-12 flex items-center justify-center">
                                    Search
                                  </button>
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

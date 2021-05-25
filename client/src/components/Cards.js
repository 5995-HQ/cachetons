import React, { useEffect, useState } from "react";

const ResultsContext = React.createContext({
    results: [], fetchResults: () => { }
})

export default function Results() {
    const [results, setResults] = useState([])
    const [searchQuery, setSearchQuery] = useState("");
    const fetchResults = async () => {
        const response = await fetch("http://localhost:5000/api/v1/craigslist?page=1&subject=Beer+Brewing")
        const results = await response.json()
        setResults(results.results)
    }
    useEffect(() => {
        fetchResults()
    }, [])
    return (
        <ResultsContext.Provider value={{ results, fetchResults }}>
            {results.map((result) => (
                <center><p>
                    <a href={result.link_}>
                        <img src={result.image} />
                        <b>{result.title}</b>
                        <b>{result.price}</b>
                    </a>
                </p>
                </center>
            ))
            }

        </ResultsContext.Provider >
    )
}


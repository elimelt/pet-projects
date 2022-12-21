import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchBar = ({ query, handleQueryChange }) => {

    return(
        <>
            <input value={query} onChange={handleQueryChange}/>
        </>
    ) 
}

const Matches = ({ matches }) => {
    return (
        <div>
        {
        (matches.length <= 10) ?
            matches.map((country) => 
                <p key={country.name.common}> {country.name.official}</p>)
            :
            'narrow it down some'
        }
        </div>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState('')
    const [matches, setMatches] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data)
                setMatches(response.data)
            })
    }, [])

    const handleQueryChange = (event) => {
        const curr = event.target.value
        setQuery(curr)
 

        const fits = (str, value) => str.toLowerCase().includes(value.toLowerCase());
        const filtered = countries.filter(country => fits(country.name.official, event.target.value))
        
        setMatches(filtered)
    }

    return (
        <div>
            find countries <SearchBar value={query} handleQueryChange={handleQueryChange}/>
            <Matches matches={matches}/>
        </div>

    )
}
export default App;
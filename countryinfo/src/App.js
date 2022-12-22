import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchBar = ({ query, handleQueryChange }) => {

    return(
        <>
            <input value={query} onChange={handleQueryChange}/>
        </>
    ) 
}

//not broken thus far
const Matches = (props) => {
    console.log('Matches props', props);
    const { matches, countries, handleClick } = props

    const find = (array, countryName) => {
        let i = array.findIndex((curr) => curr.name === countryName)
        return array[i].countryData
    }


    if (matches.length === 0) {
        console.log('empty')
        return (<></>)
    }

    if (matches.length > 10)
        return (<div>Narrow it down</div>)
    
    //here is the problem    
    if (matches.length > 0 && matches.length <= 10){
        console.log('should run')
        return (
            <div>
            {
                matches.map((country, i) =>{

                    return (<Country 
                                country={find(countries, country.name)}
                                matches={matches}
                                handleClick={handleClick}
                                key={i}
                                index={i}
                            />)
                }) 
                    
            }
            </div>
        )
    }
}

const Country = ( props ) => {
    console.log('Country props', props)
    const { country, matches, handleClick, index } = props
    

    if (matches.length === 0) {
        return (<></>)
    }

    if (matches[index].show) {
        console.log('CI render');
        return(
            <>
                <CountryInfo 
                    country={country} 
                    handleClick={handleClick} 
                    index={index}
                />
            </>
        )
    }else {

        return (
            <div>
                {country.name.common}---
                <button 
                    onClick={handleClick(index)}>
                    show
                </button>
                
            </div>
        )
    }
}

const CountryInfo = (props) => {
    console.log('CountryInfo props: ', props);
    const { country, handleClick, index } = props
    const langs = (c) => {
        const keys = []
        for (const lang in c.languages)
            keys.push(lang)
        return keys
    }


    return (
        <>
            <h1>{country.name.common}</h1>
            <button onClick={handleClick(index)}>hide</button>
            <p>capital: {country.capital[0]}</p>
            <p>area: {country.area}</p>
         
            <h3>languages:</h3>
            <ul>
            {
                langs(country).map((lang) => {
                    return <li key={lang}>{country.languages[lang]}</li>
                }) 
            }
            </ul>
            <img src={country.flags['png']} alt='flag'/>
            
        </>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState('')
    const [matches, setMatches] = useState([])//{country.name.official: show}

    

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data.map(country => { 
                    return {name: country.name.official, countryData: {...country}}
                }))
                setMatches(response.data.map(country => { 
                    return {name: country.name.official, show: false}
                }))
                //console.log('c', countries);
                //console.log('m', matches);
                
            })
    }, [])

    const handleQueryChange = (event) => {
        //updates query
        const curr = event.target.value
        setQuery(curr)
 
        //updates matches
        const fits = (str, value) => str.toLowerCase().includes(value.toLowerCase());
        const filteredCountries = countries.filter(country => 
            fits(country.countryData.name.common, event.target.value))

        setMatches(filteredCountries.map((country) => {
            return {name: country.name, show: false}
        }))
    }

    const handleClick = (index) => {
        const handleCountryClick = () => {
            const updatedCountry = matches[index].name
            const newMatches = matches.slice()
            newMatches[index] = {name:updatedCountry, show:!(matches[index].show)}
            console.log(newMatches)
            setMatches(newMatches)
        }
        return handleCountryClick
    }


    return (
        <div>
            find countries <SearchBar value={query} handleQueryChange={handleQueryChange}/>
            <Matches matches={matches} countries={countries} handleClick={handleClick}/>
        </div>

    )
}
export default App;
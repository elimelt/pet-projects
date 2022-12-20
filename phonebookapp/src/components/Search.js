const Search = (props) => {
    return (
        <div>
            <h2>Search</h2>
            <input onChange={props.searchChange}/>
        </div>
    )
}
export default Search
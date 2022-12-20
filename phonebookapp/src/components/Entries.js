const Entries = (props) => {
    console.log(props)
    const {persons} = props
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return <Entry key={person.id} person={person}/>
            })}
        </div>
    )
}

const Entry = ({person}) => {
    return (
       <div>{person.name} ============= {person.number}</div> 
    )
}

export default Entries
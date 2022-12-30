const Entries = (props) => {

    const { persons, handleDelete } = props
    return (
        <div>
            <h2>Numbers</h2>
            {persons.map((person) => { 
                return <Entry 
                    key={person.id} 
                    person={person} 
                    handleDelete={handleDelete}
                />
            })}
        </div>
    )
}

const Entry = (props) => {
    //console.log(props)
    const { person, handleDelete } = props
    return (
       <div>
            {person.name} ============= {person.number}
            <button 
                key={person.id} 
                onClick={() => handleDelete(person.id)}>delete
            </button>    
       </div> 
    )
}

export default Entries
const AddEntry = (props) => {
    return (
        <div>
            <h2>Add a new number</h2>
            <form onSubmit={props.addEntry}>
                <div>name: <input value={props.newName} onChange={props.inputNameChange}/></div>
                <div>number: <input value={props.newNumber} onChange={props.inputNumberChange}/></div>
                <div><button type="submit">add</button></div>
            </form>
        </div>
    )
}
export default AddEntry
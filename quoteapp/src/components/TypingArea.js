

const TypingArea = (props) => {
    const { currText, setCurrText} = props

    const handleChange = (event) => {
        setCurrText(event.target.value)
    }

    return (
        <>
        <input value={currText} onChange={handleChange}  />
        </>
    )
}
export default TypingArea
const Notification = (props) => {
    const { message } = props
    const style = {
        
    }
    if (message === null) return null
    return (
        <div className={message.messageClass}>
            {message.text}
        </div>
    )
}
export default Notification
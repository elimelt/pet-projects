import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
    const [display, setDisplay] = useState()
    
    const URL_PLEASE = 'https://www.bing.com/search?q=reddit+how+to+packet+sniff+using+wireshark&FORM=AWRE'
    
    
    
    useEffect(() => {
        axios
            .get(URL_PLEASE)
            .then(response => {
                console.log(response.data)
                //setDisplay(findBottom(response.data))
            })
    })


    const findBottom = (object) => {
        let result = []
        for (let property in object){
            if (typeof(object) === typeof(property)) findBottom(property)
            else result.concat(property)
        }
        return result
    }

    return (
        <div>
            {display}
        </div>
    )
}
export default App
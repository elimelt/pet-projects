

const ValidationArea = (props) => {
    const { currText, currQuote } = props

    function validateState(str1, str2) {
        let result = [];
      
        for (let i = 0; i < str1.length; i++) {
          if (str1[i] !== str2[i]) {
            result.push('-');
            //code:
            //  function: dont let the user continue  
            //  until they press backspace
          } else {
            result.push(str1[i]);
          }
        }
      
        return result.join('');
    }

    return(
        <div>
            {validateState(currText, currQuote)}
        </div>

    ) 
}
export default ValidationArea
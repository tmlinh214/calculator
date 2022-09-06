/* eslint-disable no-new-func */
import React from 'react'

function Buttons() {
    const endWithDoubleMinus= /[-|+|*|/]-$/
    const hasEqual=/=/;
    const startWithNull=/^0/;
    const endWithOperator=/[-|+|*|/]$/;
    const endWithMinus=/-$/;
    const endWithDecimal=/[.]$/;
    const [oldNumber,setOldNumber]=React.useState('')
    const [newNumber,setNewNumber]=React.useState('')
    const [isNumberDisabled,setIsNumberDisabled]=React.useState(false)
    const [isOPDisabled,setIsOPDisabled]=React.useState(false)
    // const [display,setDisplay]=React.useState('')
    function handleNumber(input){
        if (newNumber.length>=17 || oldNumber.length>=35){
            handleMaxDigit()
        } else if(hasEqual.test(oldNumber)){
            handleHasEqual(input)
        } else if (startWithNull.test(oldNumber)){
            nullStart(input)
        } else if (endWithDecimal.test(oldNumber)){
            handleDecimal(input)
        } else {
            setOldNumber(prevState => prevState + input)
            setNewNumber(prevState => prevState + input)
        }
        
        
    }
    function nullStart(input){
            if(input==='0'){
                setOldNumber('0')
                setNewNumber('0')
            } else if (input !=='0'){
                setOldNumber('')
                setNewNumber('')
                setOldNumber(prevState => prevState + input)
                setNewNumber(prevState => prevState + input)
            }
    }
    function handleHasEqual(input){
            setOldNumber('')
            setNewNumber('')
            setOldNumber(prevState => prevState + input)
            setNewNumber(prevState => prevState + input)
    }
    function handleDecimal(input){
            if (input==='.'){
                setOldNumber(prevState => prevState.slice(0,-1) + input)
                setNewNumber(prevState => prevState.slice(0,-1) + input)
            } else if (input !== '.') {
                setOldNumber(prevState => prevState + input)
                setNewNumber(prevState => prevState + input)
            }
    }
    function handleOperator(input){
        if(endWithDoubleMinus.test(oldNumber)){
            if(input !== '-'){
                setOldNumber(prevState => prevState.slice(0,-2) + input)
                setNewNumber(input)
            } else {
                setOldNumber(prevState => prevState.slice(0,-1)+input)
                setNewNumber(input)
            }
        } else if (endWithOperator.test(oldNumber)){
            if(input !== '-'){
                setOldNumber(prevState => prevState.slice(0,-1) + input)
                setNewNumber(input)
            } else {
                if(endWithMinus.test(oldNumber)){
                    setOldNumber(prevState => prevState.slice(0,-1) + '+')
                    setNewNumber('+')
                } else{
                    setOldNumber(prevState => prevState + input)
                    setNewNumber(input)
                }  
            }
        }else if(hasEqual.test(oldNumber)){
            setOldNumber(newNumber + input)
            setNewNumber(input)
        }
         else {
            setOldNumber(prevState => prevState + input)
            setNewNumber(input)
        }
    }
    function handleClear(){
        setOldNumber('')
        setNewNumber('')
        setIsNumberDisabled(false)
        setIsOPDisabled(false)
    }
    function handleMaxDigit(){
        if (newNumber.length >=17){
            setNewNumber('ERROR: DIGIT LIMIT')
        }
        if (oldNumber.length>= 35){
            setOldNumber('ERROR: DIGIT LIMIT')
            setIsNumberDisabled(true)
            setIsOPDisabled(true)
         }
    }
    function handleEqual(input){
        if(endWithOperator.test(oldNumber)){
            setOldNumber('NaN')
            setNewNumber('NaN')
            setIsNumberDisabled(true)
            setIsOPDisabled(true)
        } else if((oldNumber + '=' + Function(`'use strict';return (${input})`)()).length>=35) {
            setOldNumber('ERROR: DIGIT LIMIT')
            setNewNumber(Function(`'use strict';return (${input})`)())
            setIsNumberDisabled(true)
            setIsOPDisabled(true)
        } else {
            setOldNumber(prevState=> prevState + '=' + Function(`'use strict';return (${input})`)())
            setNewNumber(Function(`'use strict';return (${input})`)())
        }
    }
    // console.log(endWithOperator.test(oldNumber))
  return (
    <main>
        <div className='calculator'>
            <div className='number-container'>
                <div className='old-number number'>
                    {oldNumber}
                </div>
                <div className='new-number number'>   
                    {newNumber}
                </div>
            </div>
            
            <div className='buttons'>
                <button id='ac' onClick={handleClear}>AC</button>
                <button id='divide' onClick={()=>handleOperator('/')} disabled={isOPDisabled}>/</button>
                <button id='multiply' onClick={()=>handleOperator('*')} disabled={isOPDisabled}>x</button>
                <button id='seven' onClick={()=>handleNumber('7')} disabled={isNumberDisabled}>7</button>
                <button id='eight' onClick={()=>handleNumber('8')} disabled={isNumberDisabled}>8</button>
                <button id='nine' onClick={()=>handleNumber('9')} disabled={isNumberDisabled}>9</button>
                <button id='minus' onClick={()=>handleOperator('-')} disabled={isOPDisabled}>-</button>
                <button id='four' onClick={()=>handleNumber('4')} disabled={isNumberDisabled}>4</button>
                <button id='five' onClick={()=>handleNumber('5')} disabled={isNumberDisabled}>5</button>
                <button id='six' onClick={()=>handleNumber('6')} disabled={isNumberDisabled}>6</button>
                <button id='plus' onClick={()=>handleOperator('+')} disabled={isOPDisabled}>+</button>
                <button id='one' onClick={()=>handleNumber('1')} disabled={isNumberDisabled}>1</button>
                <button id='two' onClick={()=>handleNumber('2')} disabled={isNumberDisabled}>2</button>
                <button id='three' onClick={()=>handleNumber('3')} disabled={isNumberDisabled}>3</button>
                <button id='equal' onClick={()=>handleEqual(oldNumber)} disabled={isOPDisabled}>=</button>
                <button id='zero' onClick={()=>handleNumber('0')} disabled={isNumberDisabled}>0</button>
                <button id='decimal' onClick={()=>handleNumber('.')} disabled={isNumberDisabled}>.</button>
            </div>
        </div>
        
    </main>
    
  )
}

export default Buttons
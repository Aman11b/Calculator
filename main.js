//console.log("JS");
//CAPTURE BUTTON CLICKS

const button=document.querySelectorAll('button');
const display=document.getElementById('display');

// console.log(button);
button.forEach(button=>{
    button.addEventListener('click',()=>{
        const value=button.value;

        //if = is clicked perform calculation
        if(value==='='){
            const expression=display.textContent;

            if(expression){
                const result=simpleCalculation(expression);
                display.textContent=result;
            }
        }else if(value==='C'){
            //clear the display if "C" is clicked
            display.textContent='';
        }else{
            //update the display with clicked value
            //handle first input after clearing
            if(display.textContent==='0' && value!=='.' && value!=='C'){
                display.textContent=value;
            }else{
                //prevent multiple decimal points in a number
                if(value==='.'){
                    const currentDisplay=display.textContent;
                    const lastOperatorIndex=Math.max(
                        currentDisplay.lastIndexOf('+'),
                        currentDisplay.lastIndexOf('-'),
                        currentDisplay.lastIndexOf('*'),
                        currentDisplay.lastIndexOf('/')
                    );

                    const lastNumber=lastOperatorIndex===-1?currentDisplay:currentDisplay.substring(lastOperatorIndex+1);

                    if(lastNumber.includes('.')){
                        return;
                    }
                }
                display.textContent+=value;
            }
            
            
        }


        console.log('Current Display: ',display.textContent);
    });
});

const clearButton=document.querySelector('.clear');
clearButton.addEventListener('click',()=>{
    display.textContent='';
});

function simpleCalculation(expression){
    //THIS FUNCTION WILL EVALUATE THE XP AND RETURN THE VALUE
    const numbers=expression.split(/[+\-*/]/).map(Number);
    const operators=expression.match(/[+\-*/]/g)

    //start with first number
    let result=numbers[0];

    //loop through operator and numbers
    for(let i=0;i<operators.length;i++){
        const operator=operators[i];
        const nextNumber=numbers[i+1]; //get next num

        if(operator==='+'){
            result+=nextNumber;//addition
        }
        else if(operator==='-'){
            result-=nextNumber;//subtraction
        }
    }
    let finalResult=result;
    for(let i=0;i<operators.length;i++){
        const operator=operators[i];
        const nextNumber=numbers[i+1];

        if(operator==='*'){
            finalResult*=nextNumber;
        }else if(operator==='/'){
            if(nextNumber===0){
                console.log('Error');
                return 'Error'
            }
            finalResult/=nextNumber;
        }
    }

    console.log('Final Result:',finalResult);
    return finalResult;
}


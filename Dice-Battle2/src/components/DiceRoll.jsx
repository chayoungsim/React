import { useEffect, useState } from 'react'
import diceBlue1 from "../assets/images/dice-blue-1.svg"
import diceBlue2 from "../assets/images/dice-blue-2.svg"
import diceBlue3 from "../assets/images/dice-blue-3.svg"   
import diceBlue4 from "../assets/images/dice-blue-4.svg"   
import diceBlue5 from "../assets/images/dice-blue-5.svg"   
import diceBlue6 from "../assets/images/dice-blue-6.svg" 
import diceRed1 from "../assets/images/dice-red-1.svg"
import diceRed2 from "../assets/images/dice-red-2.svg"  
import diceRed3 from "../assets/images/dice-red-3.svg"  
import diceRed4 from "../assets/images/dice-red-4.svg"  
import diceRed5 from "../assets/images/dice-red-5.svg"  
import diceRed6 from "../assets/images/dice-red-6.svg"  

const DiceImages = {
    blue :[diceBlue1, diceBlue2, diceBlue3, diceBlue4, diceBlue5, diceBlue6],
    red :[diceRed1, diceRed2, diceRed3, diceRed4, diceRed5, diceRed6]
}

function DiceRoll({color="blue", num="1", gameHistory=[]}) {

    const [rolling, setRolling] = useState(false);
    const [currentNum, setCurrentNum] = useState(num);

    useEffect(() => {
        if(gameHistory.length > 0) {
            setRolling(true);
            const interval = setInterval(() => {
                const randomNum = Math.floor(Math.random() * 6) + 1;
                setCurrentNum(randomNum);            
            },100);
            
            const timeout = setTimeout(() => {
                clearInterval(interval);
                setRolling(false);
                setCurrentNum(num);
            },1000)

            return () =>{
                clearInterval(interval);
                clearTimeout(timeout);
            }
        }

    },[gameHistory.length,num])


    const src = DiceImages[color][currentNum - 1];
    const alt = `${color} ${currentNum}`;
    const rollingClass = rolling ? 'dice-image rolling' : 'dice-image';


    return (
        <div className={rollingClass}>
            <img src={src} alt={alt} />
        </div>
    )
}
export default DiceRoll;
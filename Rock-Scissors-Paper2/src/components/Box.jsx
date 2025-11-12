
import RockImg from "../assets/images/hand-rock.png";

function Box(props){
    
    let result;
    if(
        props.title === "Computer" &&
        props.result !== "tie" &&
        props.result !== ""
    ) {

        result = props.result === "win" ? "lose" : "win";
    } else {
        result = props.result;
    }


    return(
        <div className={`box ${result}`}>
            <h2>{props.title}</h2>
            <img src={props.item ? props.item.img : RockImg} alt={props.item ? props.item.name : "Ready"} />
            <p>{result}</p>
        </div>
    )
}

export default Box;
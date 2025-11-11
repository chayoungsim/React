import React from 'react';
import rockImg from '../assets/images/hand-rock.png'; // 기본 주먹 이미지 import

function Box(props) {
    // props.result는 사용자 기준이므로 Computer의 승패는 반대로 계산
    let result;
    if (

        // 카드가 computer카드인가? && 결과가 비긴건 아닌가? && props.result에 값이 있는가?
        props.title === "Computer" &&
        props.result !== "tie" &&
        props.result !== ""
    ) {
        result = props.result === "win" ? "lose" : "win";
    } else {
        result = props.result;
    }

    return (
        // 결과에 따라 className을 동적으로 추가
        <div className={`rps-box ${result}`}>
            <h3>{props.title}</h3>
            <div className="rps-act">
                {/* item이 있으면 해당 아이템 이미지를, 없으면 기본 주먹 이미지를 보여줌 */}
                <img className="item-img" src={props.item ? props.item.img : rockImg} alt={props.item ? props.item.name : "Ready"} />
                <h2>{props.item && props.item.name}</h2>
            </div>
            {/* props로 받은 result를 표시 */}
            <div className="rps-result">{result}</div>
        </div>
    )
}

export default Box;

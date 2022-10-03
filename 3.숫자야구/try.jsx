import React, { Component } from "react";

// class Try extends Component {
//     render() {
//         return (
//             <li key = {this.props.value.tries + this.props.value.result}>
//                 {this.props.index + 1}번째 시도 : {this.props.value.tries} // {this.props.value.result}
//             </li>
//         );
//     }
// }

const Try = (props) => {
    return (
        <li key={props.value.tries + props.value.result}>
            {props.index + 1}번째 시도 : {props.value.tries} // {props.value.result}
        </li>
    );
}

export default Try;
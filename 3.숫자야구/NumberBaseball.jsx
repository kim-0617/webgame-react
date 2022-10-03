import React, { Component } from 'react';
import Try from './try';

function getNumbers() { // 숫자 4개를 랜덤하게 뽑는 함수
    const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return Array.from(Array(4).keys(), x => x + 1).map((y) => {
        return candidate.splice(Math.floor(Math.random() * candidate.length), 1);
    });
}

// class NumberBaseball extends Component {
//     state = {
//         result: '',
//         value: '',
//         tries: [],
//         answer: getNumbers().join(''),
//     };

//     input;
//     onInputRef = (c) => {
//         this.input = c;
//     }

//     onSubmit = (e) => {
//         e.preventDefault();
//         if (this.state.answer === e.target[0].value) {
//             this.setState({
//                 result: '홈런!',
//                 tries: [...this.state.tries, { tries: this.state.value, result: "홈런!" },],
//             });
//             alert("홈런! 게임을 다시 시작합니다.");
//             this.setState({
//                 value: '',
//                 tries: [],
//                 answer: getNumbers().join(''),
//             });
//             this.input.focus();
//         }
//         else {
//             const myInput = this.state.value.split('').map(x => parseInt(x));
//             let ball = 0, strike = 0;

//             if (this.state.tries.length >= 9) { // 10번 이상 틀렸을 때
//                 this.setState({
//                     result : '실패!',
//                     value: '',
//                     tries: [],
//                     answer: getNumbers().join(''),
//                 });
//                 alert("기회가 소진 되었습니다. 다시 시작합니다.");
//                 this.input.focus();
//             }
//             else {
//                 this.state.answer.split('').map((x, idx) => {
//                     if(parseInt(x) === myInput[idx]) strike++;
//                     else if(myInput.includes(parseInt(x))) ball++;
//                 });
//                 this.setState({
//                     result : '',
//                     value: '',
//                     tries: [...this.state.tries, { tries: this.state.value, result: `${ball}볼 ${strike}스트라이크` }],
//                 });
//                 this.input.focus();
//             }
//         }
//     }

//     onChange = (e) => {
//         console.log(this.state.answer)
//         this.setState({ value: e.target.value });
//     }

//     render() {
//         return (
//             <>
//                 <h1>{this.state.result}</h1>
//                 <form onSubmit={this.onSubmit}>
//                     <input type="text" maxLength={4} ref={this.onInputRef} value={this.state.value} onChange={this.onChange} />
//                     <input type="submit" value="제출" style={{ marginLeft: "20px" }} />
//                 </form>
//                 <div>시도 : {this.state.tries.length}</div>
//                 <ul>
//                     {
//                         this.state.tries.map((v, i) => {
//                             return <Try key={v.tries + v.result + i} value={v} index={i} />;
//                         })
//                     }
//                 </ul>
//             </>
//         );
//     }
// }

// const { useState, useRef } = React;
import { useState, useRef } from 'react';
const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [tries, setTries] = useState([]);
    const [answer, setAnswer] = useState(getNumbers().join(''));
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (answer === e.target[0].value) {
            setResult('홈런!');
            setTries([...tries, { tries: value, result: "홈런!" },]);

            setTimeout(() => {
                alert("홈런! 게임을 다시 시작합니다.");
                setValue('');
                setTries([]);
                setAnswer(getNumbers().join(''));
                inputRef.current.focus();
            }, 500);
        }
        else {
            const myInput = value.split('').map(x => parseInt(x));
            let ball = 0, strike = 0;

            if (tries.length >= 5) { // 10번 이상 틀렸을 때
                setResult('실패!');

                setTimeout(() => {
                    alert("기회가 소진 되었습니다. 다시 시작합니다.");
                    setResult('');
                    setValue('');
                    setTries([]);
                    setAnswer(getNumbers().join(''));
                    inputRef.current.focus();
                }, 500);
            }
            else {
                answer.split('').map((x, idx) => {
                    if (parseInt(x) === myInput[idx]) strike++;
                    else if (myInput.includes(parseInt(x))) ball++;
                });
                setResult('');
                setValue('');
                setTries([...tries, { tries: value, result: `${ball}볼 ${strike}스트라이크` },]);
                inputRef.current.focus();
            }
        }
    }

    const onChange = (e) => {
        console.log(answer)
        setValue(e.target.value);
    }

    return (
        <>
            <h1>{result}</h1>
            <form onSubmit={onSubmit}>
                <input type="text" maxLength={4} ref={inputRef} value={value} onChange={onChange} />
                <input type="submit" value="제출" style={{ marginLeft: "20px" }} />
            </form>
            <div>시도 : {tries.length}</div>
            <ul>
                {
                    tries.map((v, i) => {
                        return <Try key={v.tries + v.result + i} value={v} index={i} />;
                    })
                }
            </ul>
        </>
    );
}

export default NumberBaseball;
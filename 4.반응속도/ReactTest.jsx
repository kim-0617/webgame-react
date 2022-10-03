const React = require('react');

const { useState, useRef } = React;
const WordRelay = () => {
    const [word, setWord] = useState('제로초');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (e.target[0].value.startsWith(word.at(-1))) { // input의 value의 첫글자가 word의 끝글자와 같으면
            setWord(value);
            setValue('');
            setResult('딩동댕!');
            inputRef.current.focus();
        }
        else {
            setValue('');
            setResult('땡!');
            inputRef.current.focus();
        }
    }

    const onChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <p>{word}</p>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} ref={inputRef} value={value} />
                <input type="submit" value="입력" />
            </form>
            <p>{result}</p>
        </>
    );
}
module.exports = WordRelay;
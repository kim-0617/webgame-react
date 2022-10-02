const React = require('react');
const {Component} = React;

'use strict';

class GuGuDan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first: Math.ceil(Math.random() * 9),
            second: Math.ceil(Math.random() * 9),
            value: '',
            result: '',
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
        if (this.state.first * this.state.second === parseInt(this.state.value)) {
            this.setState((prev) => {
                return {
                    first: Math.ceil(Math.random() * 9),
                    second: Math.ceil(Math.random() * 9),
                    value: '',
                    result: `정답! : ${prev.first} * ${prev.second}는 ${prev.first * prev.second} 입니다.`,
                }
            });
            this.input.focus();
        }
        else {
            this.setState({
                value: '',
                result: '땡',
            });
            this.input.focus();
        }
    }

    onChange = (e) => {
        this.setState({ value: e.target.value });
    }

    input;

    render() {
        return (
            <React.Fragment>
                <div>{this.state.first}곱하기 {this.state.second}는?</div>
                <form onSubmit={this.onSubmit}>
                    <input ref={(c) => { this.input = c; }} type="number" value={this.state.value} onChange={this.onChange} />
                    <button>입력!</button>
                </form>
                <div>{this.state.result}</div>
            </React.Fragment>
        );
    }
}

module.exports = GuGuDan;
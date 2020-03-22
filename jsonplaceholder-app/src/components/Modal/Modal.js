import React from "react";
import ReactDOM from "react-dom";

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        document.querySelector('.modal').appendChild(this.el)
    }

    componentWillUnmount() {
        document.querySelector('.modal').removeChild(this.el)
    }

    render() {
        return (
            ReactDOM.createPortal(
                this.props.children,
                this.el,
            )
        )
    }
}
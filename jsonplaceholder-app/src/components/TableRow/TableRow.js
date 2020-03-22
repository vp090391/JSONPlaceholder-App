import React from "react";
import './TableRow.css';

export default class TableRow extends React.Component {
    render() {
        const {post, onOpenModal} = this.props;
        return (
            <tr className={"tableRow-id-" + post.id} onClick={() => onOpenModal(post)}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>{post.title}</td>
            </tr>
        )
    }
}
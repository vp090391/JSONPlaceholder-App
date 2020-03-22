import React from "react";


export default class TableRow extends React.Component {
    render() {
        const {post, onOpenModal} = this.props;
        return (
            <tr className={"tableRow-id-" + post.id}>
                <td>{post.id}</td>
                <td>{post.userId}</td>
                <td>
                    <div>
                        <span>{post.title}</span>
                        <button
                            className={"tableRow-button-id-" + post.id}
                            onClick={() => onOpenModal(post)}>
                            Open full info
                        </button>
                    </div>
                </td>
            </tr>
        )
    }
}
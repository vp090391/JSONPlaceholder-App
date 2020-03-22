import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';
import TableRow from "./components/TableRow/TableRow";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            isLoading: true,
            posts: [],
            postInfo: {},
        };
    }

    handleOpenModal = (post) => {
        this.setState({
            isModalOpen: true,
            postInfo: post,
        })
    };

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
            postInfo: {}
        })
    };

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log("Fetch for post data failed");
                document.getElementById('root').innerHTML = 'Sorry, server is not available now';
                this.setState({isLoading: false});
            });
    }

    render() {
        const {isLoading, isModalOpen, posts, postInfo,} = this.state;
        return (
            <>
                {isLoading ?
                    <div>Loading...</div> :

                    <div className='main'>
                        <table className='table'>
                            <caption>Post information</caption>

                            <thead>
                            <tr>
                                <th>id</th>
                                <th>userId</th>
                                <th>title</th>
                            </tr>
                            </thead>

                            <tbody>
                            {posts.map((post) => (
                                <TableRow
                                    key={post.id}
                                    post={post}
                                    onOpenModal={this.handleOpenModal}
                                />))
                            }
                            </tbody>
                        </table>

                        <div className="modal">
                            {isModalOpen &&
                            <Modal>
                                <PostInfo
                                    onCloseModal={this.handleCloseModal}
                                    postInfo={postInfo}
                                />
                            </Modal>
                            }
                        </div>
                    </div>}
            </>
        )
    }
}

class TableRow extends React.Component {
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

class Modal extends React.Component {
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

class PostInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            userInfo: {},
        }
    }

    componentDidMount() {
        fetch(`https://jsonplaceholder.typicode.com/users/${this.props.postInfo.userId}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isLoading: false,
                    userInfo: data,
                })
            })
            .catch(err => {
                console.log('Fetch for users data failed');
                document.querySelector('.postInfo').innerHTML = 'Sorry, server is not available now';
                this.setState({ isLoading: false })
            })
    }

    render() {
        const {isLoading, userInfo} = this.state;
        const {postInfo, onCloseModal} = this.props;
        return (
            <div className="postInfo">
                {isLoading ?
                    <div>Loading...</div> :

                    <>
                    <div className='postInfo-content'>
                        <div>Post information</div>
                        <div>Post body: {postInfo.body}</div>
                        <div>User name: {userInfo.name}</div>
                    </div>
                    <button onClick={onCloseModal}>Close</button>
                    </>
                }
            </div>
        )
    }
}

export default App;

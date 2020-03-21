import React from 'react';
import ReactDOM from 'react-dom'
import './App.css';

//TODO хранить ли state в App и передавать в пропсы или в каждой компоненты сохранять инфу от запроса
//TODO check isLoading and for what it

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            clickedPostId: '',
            posts: [],
            users: [],
        };
        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState(state => ({isModalOpen: !state.isModalOpen}))
    };

    rowOnClicked() {
        document.onclick = (event) => {
            if (event.target.getAttribute('class') === null) {
                return
            }
            if (event.target.getAttribute('class').includes('tableRow-button-id')) {
                this.setState(state => ({clickedPostId: event.target.getAttribute('class').split('-')[3]}));
            }
        };
    }

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
                this.setState({isLoading: false});
            });

        fetch(`https://jsonplaceholder.typicode.com/users`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    users: data,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log("Fetch for users data failed");
                this.setState({isLoading: false});
            });
    }

    render() {
        return (
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
                    <TableRow
                        posts={this.state.posts}
                        toggleModal={this.toggleModal}
                        rowOnClicked={this.rowOnClicked()}/>
                    </tbody>
                </table>

                <div className="modal">
                    {this.state.isModalOpen &&
                    <Modal>
                        <PostInfo
                            toggleModal={this.toggleModal}
                            postInfo={this.state.posts[this.state.clickedPostId - 1]}
                            userInfo={this.state.users[this.state.posts[this.state.clickedPostId - 1].userId - 1]}/>
                    </Modal>
                    }
                </div>
            </div>
        )
    }
}

class TableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO to know for what isLoading
            isLoading: true,
        };
    }

    render() {
        return (
            this.props.posts.map((post) =>
                <tr key={post.id}
                    className={"tableRow-id-" + post.id}
                >
                    <td>{post.id}</td>
                    <td>{post.userId}</td>
                    <td>
                        {post.title}
                        <button
                            className={"tableRow-button-id-" + post.id}
                            onClick={this.props.toggleModal}>
                            Open full info
                        </button>
                    </td>
                </tr>
            )
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
        this.state = {}
    }

    render() {
        return (
            <div className="postInfo">
                <div className='postInfo-content'>
                    <div>Post information</div>
                    <div>Post body: {this.props.postInfo.body}</div>
                    <div>User name: {this.props.userInfo.name}</div>
                </div>
                <button onClick={this.props.toggleModal}>Close</button>
            </div>
        )
    }
}

export default App;

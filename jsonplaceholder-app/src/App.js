import React from 'react';
import './App.css';
import TableRow from "./components/TableRow/TableRow";
import Modal from "./components/Modal/Modal";
import PostInfo from "./components/PostInfo/PostInfo";

export default class App extends React.Component {
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
                    <div className='main-loading'>Loading...</div> :

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

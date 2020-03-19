import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            posts: [],
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    posts: data,
                    isLoading: false
                });
            })
            .catch(err => {
                console.log("Fetch for posts data failed");
                this.setState({ isLoading: false });
            });
    }

    render() {
        return (
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
                    <TableRow posts={this.state.posts}/>
                </tbody>
            </table>
        )
    }
}

let TableRow = (props) => {
    return(
        //TODO onclick on row
        props.posts.map((post) =>
        <tr key={post.id} className="tableRow">
            <td>{post.id}</td>
            <td>{post.userId}</td>
            <td>{post.title}</td>
        </tr>
        )
    )
};

export default App;

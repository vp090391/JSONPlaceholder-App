import React from "react";
import "./PostInfo.css"

export default class PostInfo extends React.Component {
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
                    <div className='postInfo-loading'>Loading...</div> :
                    <>
                        <table className='postInfo-table'>
                            <caption>Post information</caption>

                            <thead>
                            <tr>
                                <th>Property</th>
                                <th>Value</th>
                            </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td colSpan='2' className='postInfo-table-separator'>Post</td>
                                </tr>
                                <tr>
                                    <td>id</td>
                                    <td>{postInfo.id}</td>
                                </tr>
                                <tr>
                                    <td>title</td>
                                    <td>{postInfo.title}</td>
                                </tr>
                                <tr>
                                    <td>body</td>
                                    <td>{postInfo.body}</td>
                                </tr>
                                <tr>
                                    <td colSpan='2' className='postInfo-table-separator'>User</td>
                                </tr>
                                <tr>
                                    <td>id</td>
                                    <td>{userInfo.id}</td>
                                </tr>
                                <tr>
                                    <td>name</td>
                                    <td>{userInfo.name}</td>
                                </tr>
                                <tr>
                                    <td>username</td>
                                    <td>{userInfo.username}</td>
                                </tr>
                                <tr>
                                    <td>email</td>
                                    <td>{userInfo.email}</td>
                                </tr>
                                <tr>
                                    <td>address</td>
                                    <td><span>street:</span> {userInfo.address.street}<br/>
                                        <span>suite:</span> {userInfo.address.suite}<br/>
                                        <span>city:</span> {userInfo.address.city}<br/>
                                        <span>zipcode:</span> {userInfo.address.zipcode}<br/>
                                        <span>geo:</span> latitude: {userInfo.address.geo.lat}, longitude: {userInfo.address.geo.lng}<br/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>phone</td>
                                    <td>{userInfo.phone}</td>
                                </tr>
                                <tr>
                                    <td>website</td>
                                    <td>{userInfo.website}</td>
                                </tr>
                                <tr>
                                    <td>company</td>
                                    <td><span>name:</span> {userInfo.company.name}<br/>
                                        <span>catchPhrase:</span> {userInfo.company.catchPhrase}<br/>
                                        <span>bs:</span> {userInfo.company.bs}<br/>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className='postInfo-button' onClick={onCloseModal}>Close</button>
                    </>
                }
            </div>
        )
    }
}

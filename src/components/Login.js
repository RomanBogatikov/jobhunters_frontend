import React from 'react'
// import { Redirect } from 'react-router-dom'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom"


class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.username,
            password: this.props.password,
        }
        this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    // handleSubmit(event) {
    //     event.preventDefault()
    //     // send to login route on server
    //         //fetch
    //             // on success, go to index page
    //     // clear values after submit
    //     console.log('submitted!')

    //     fetch('http://localhost:3003' + '/users', {
    //         method: 'POST',
    //         body:JSON.stringify({
    //             username: this.state.username,
    //             password: this.state.password,
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then(res => {
    //         if (res.status === 200) {
    //             // console.log('ready to redirect');
    //             // this.props.history.push('/');
    //             this.setState({
    //                 redirect: true,
    //             })
    //             // redirect = true;
    //         } else {
    //             const error = new Error(res.error);
    //             throw error;
    //         }
    //     }).catch(err => {
    //         console.error(err);
    //         alert('Error logging in. Please, try again.')
    //     })
    // }

    // renderRedirect = () => {
    //     console.log('renderRedirect');
    //     if (this.state.redirect) {
    //         return <Redirect to='/' />
    //     }
    // }

    render() {
        return (
            <div>


            <form onSubmit={(event) => this.props.handleSubmit(event, this.state.username, this.state.password)}>
            {/* put handleSubmit in form tag */}
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input type="submit"/>
            </form>

            </div>
        )
    }
}

export default Login

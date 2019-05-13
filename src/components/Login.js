import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            redirect: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        // send to login route on server
            //fetch
                // on success, go to index page
        // clear values after submit
        console.log('submitted!')

        fetch('http://localhost:3003' + '/users', {
            method: 'POST',
            body:JSON.stringify({
                username: this.state.username,
                password: this.state.password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                this.props.history.push('/');
            } else {
                const error = new Error(res.error);
                throw error;
            }
        }).catch(err => {
            console.error(err);
            alert('Error logging in. Please, try again.')
        })
        //   .then(resJSON => {
        //     console.log('res.json=', resJSON);
        //     //   this.props.handleAddJob(resJSON)
        //   }).catch(error => console.error({'Error': error}))

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
        )
    }
}

export default Login

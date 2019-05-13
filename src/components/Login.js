import React from 'react'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
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
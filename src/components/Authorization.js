import React from 'react'
import '../css/Authorization.css'

class Authorization extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            signup: {
                username: '',
                password: '',
            },
            login: {
                username: '',
                password: '',
            }
        }
        this.handleChangeSignup = this.handleChangeSignup.bind(this);
        this.handleChangeLogin = this.handleChangeLogin.bind(this);
    }

    handleChangeSignup(event) {
        this.setState({
            signup: {...this.state.signup, [event.currentTarget.id]: event.currentTarget.value},

        })
    }

    handleChangeLogin(event) {
        this.setState({
            login: {...this.state.login, [event.currentTarget.id]: event.currentTarget.value},
        })
    }

    render() {
        return (
            <div className="AuthView">
                <div className="TitleContent">
                    <h1>JobHunters</h1>
                    <h5>A centralized platform for building your future.</h5>
                </div>
                <div className="AlertMessage">
                    <h3>
                        {this.props.resMessage}
                    </h3>
                </div>
                <div className="FormContainer">
                    <form onSubmit={(event) => this.props.handleSubmit(event, this.state.signup.username, this.state.signup.password)} id="signup">
                        <fieldset>
                            <legend>Sign Up</legend>
                            <div className="input-field">
                                <label className="active" htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={this.state.signup.username}
                                    placeholder="Enter Username"
                                    onChange={this.handleChangeSignup}
                                />
                            </div>
                            <div className="input-field">
                                <label className="active" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.signup.password}
                                    placeholder="Enter Password"
                                    onChange={this.handleChangeSignup}
                                />
                            </div>
                            <input type="submit" className="btn green accent-4"/>
                        </fieldset>
                    </form>
                </div>

                <div className="FormContainer">
                    <form onSubmit={(event) => this.props.handleSubmit(event, this.state.login.username, this.state.login.password)} id="login">
                        <fieldset>
                            <legend>Log In</legend>
                            <div className="input-field">
                                <label className="active" htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={this.state.login.username}
                                    placeholder="Enter Username"
                                    onChange={this.handleChangeLogin}
                                />
                            </div>
                            <div className="input-field">
                                <label className="active" htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    value={this.state.login.password}placeholder="Enter Password"
                                    onChange={this.handleChangeLogin}
                                />
                            </div>
                            <input type="submit" className="btn green accent-4"/>
                        </fieldset>
                    </form>
                </div>
            </div>
        )
    }
}

export default Authorization

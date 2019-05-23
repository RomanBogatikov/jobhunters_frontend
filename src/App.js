import React from 'react';
import Authorization from './components/Authorization'
import CreateForm from './components/CreateForm'
import NavBar from './components/NavBar'
import Show from './components/Show'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'
import { Row, Col } from 'react-materialize';

let baseURL = process.env.REACT_APP_BASEURL

if (process.env.NODE_ENV === 'development') {
  // set baseURL in both cases the same because of problems with heroku deployment
  baseURL = 'https://evening-crag-28742.herokuapp.com'
  // baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://evening-crag-28742.herokuapp.com'
}

console.log('current base URL:', baseURL)

class App extends React.Component {
  // ADDED CONSTRUCTOR
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      job: '',
      username: '',
      isAuthenticated: false,
      resMessage: '',
    }
    this.deleteJob = this.deleteJob.bind(this)
    this.getJobs = this.getJobs.bind(this)
    this.getSingleJob = this.getSingleJob.bind(this)
    this.handleAddJob = this.handleAddJob.bind(this)
    this.toggleApplied = this.toggleApplied.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }


  // to delete job from user's job list
  deleteJob(id) {
    // remove selected job from database and rerender state
    fetch(baseURL + '/jobs/' + id, {
      method: 'DELETE',
      body: JSON.stringify({
        username: this.state.username
      }),
    }).then(res => {
      const findIndex = this.state.jobs.findIndex(job => job._id === id)
      const copyJobs = [...this.state.jobs]
      copyJobs.splice(findIndex, 1)
      this.setState({
        jobs: copyJobs
      })
    })
  }

  // to display jobs for current user
  getJobs(username) {
    console.log(username)
    fetch(baseURL + '/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => this.setState({
        jobs: parsedData,
        username: username,
        isAuthenticated: true
      }),
        err => console.log(err))
    console.log('current base URL:', baseURL)
  }

  // show job (when clicked)
  getSingleJob(job) {
    // sets this.state.job to selected job for Show component
    this.setState({
      job: job
    })
  }

  // to add a new job to user job list
  handleAddJob(job) {
    // adds created job to this.state.jobs
    const copyJobs = [job, ...this.state.jobs]
    this.setState({
      jobs: copyJobs
    })
  }

  // to toggle apply/applied button
  toggleApplied(job) {
    // updates applied prop in selected job
    fetch(baseURL + '/jobs/' + job._id, {
      method: 'PUT',
      body: JSON.stringify({ applied: !job.applied }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(resJSON => {
        const copyJobs = [...this.state.jobs]
        const findIndex = this.state.jobs.findIndex(job => job._id === resJSON._id)
        copyJobs[findIndex].applied = resJSON.applied
        this.setState({ jobs: copyJobs })
      })
  }

  // handles login/signup
  handleSubmit(event, username, password) {
    event.preventDefault()
    let route;
    if (event.currentTarget.id === 'signup') {
      route = '/users';
    }

    if (event.currentTarget.id === 'login') {
      route = '/sessions'
    }
    // check if the user exists in the database
    fetch(baseURL + route, {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      // if yes, display user jobs
      if (res.status === 200) {
        this.getJobs(username)
      } else {
        // else display response from server
        return res.text();
      }
    })
      .then(resMessage => this.setState({
        resMessage: resMessage,
      }))
      .catch(err => {
        alert('Error logging in. Please, try again.')
      })
  }

  // handles user log out
  handleLogout() {
    fetch(baseURL + '/sessions/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        this.setState({
          isAuthenticated: false,
          username: '',
        })
      } else {
        const error = new Error(res.error);
        throw error;
        // return res;
      }
    }).catch(err => {
      console.error(err);
      alert('Error logging in. Please, try again.')
    })
  }


  render() {
    console.log('render of App.js fired')
    if (this.state.isAuthenticated) {
      return (

        <div >

          <NavBar handleLogout = {this.handleLogout} />

          <div className="container ">

            <h2>Welcome, {this.state.username}!</h2>

            <div className="grey lighten-4">

            <h4 className=" green accent-4 center white-text">Add jobs</h4>

            <CreateForm
              handleAddJob={this.handleAddJob}
              baseURL={baseURL}
              username={this.state.username}
            />
            </div>
            <Row>
              <Col s={9}>

                  <h4 className="green accent-4 center white-text center white-text">Jobs Inbox</h4>
                   <table>
                    <tbody>
                      {this.state.jobs.map(jobs => {
                        return (

                          // SHOW ROUTE IN TABLE
                          <tr
                            key={jobs._id}
                            onClick={() => this.getSingleJob(jobs)}
                          >
                            <td> {jobs.agency}</td>
                            <td> {jobs.business_title}</td>
                            {/* END OF SHOW ROUTE */}
                            <button className= { jobs.applied ? "btn disabled" : "btn green accent-4" } onClick={() => this.toggleApplied(jobs)}>
                              {(jobs.applied) ?
                              "Applied"
                              :
                              "Apply"}

                      </button>
                            <td onClick={() => this.deleteJob(jobs._id)}>
                              &times;
                      </td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>

              </Col>
              <Col s={3} >
                {(this.state.job)
                  ? <Show job={this.state.job} />
                  : null
                }
              </Col>
            </Row>
          </div>
        </div>
      )
    } else {
      return (
        <>
          <Authorization
            handleSubmit={this.handleSubmit}
            resMessage={this.state.resMessage}
          />
        </>
      )
    }

  }
}

export default App;


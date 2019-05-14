import React from 'react';
import Authorization from './components/Authorization'
import CreateForm from './components/CreateForm'
import Show from './components/Show'
import NavBar from './components/NavBar'
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css/dist/js/materialize.min.js'


// import { BrowserRouter as Router, Route, Link } from "react-router-dom"

// START OF REACT MATERILIZE

let baseURL = process.env.REACT_APP_BASEURL

//alternate baseURL = 'https://enigmatic-beach-40420.herokuapp.com/'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://enigmatic-beach-40420.herokuapp.com/'
}

console.log('current base URL:', baseURL)

class App extends React.Component {
  // ADDED CONSTRUCTOR
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      job: '', // prop for show route obj
      username: '',
      isAuthenticated: false,
    }
    this.deleteJob = this.deleteJob.bind(this)
    this.getJobs = this.getJobs.bind(this)
    this.getSingleJob = this.getSingleJob.bind(this)
    this.handleAddJob = this.handleAddJob.bind(this)
    this.toggleApplied = this.toggleApplied.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.getJobs()
  }

  deleteJob(id) {
    // remove selected job from database and rerender state
    fetch(baseURL + '/jobs/' + id, {
      method: 'DELETE'
    }).then(res => {
      const findIndex = this.state.jobs.findIndex(job => job._id === id)
      const copyJobs = [...this.state.jobs]
      copyJobs.splice(findIndex, 1)
      this.setState({
        jobs: copyJobs
      })
    })
  }

  getJobs() {
    fetch(baseURL + '/jobs')
      .then(data => {
        return data.json()
      },
        err => console.log(err))
      .then(parsedData => this.setState({ jobs: parsedData }),
        err => console.log(err))

    console.log('current base URL:', baseURL)

  }

  getSingleJob(job) {
    // sets this.state.job to selected job for Show component
    this.setState({
      job: job
    })
  }

  handleAddJob(job) {
    // adds created job to this.state.jobs
    const copyJobs = [job, ...this.state.jobs]
    this.setState({
      jobs: copyJobs
    })
  }

  toggleApplied(job) {
    // updates applied prop in selected job
    fetch(baseURL + '/jobs/' + job._id, {
      method: 'PUT',
      body: JSON.stringify({applied: !job.applied}),
      headers: {
        'Content-Type' : 'application/json'
      }
    }).then(res => res.json())
    .then(resJSON => {
        const copyJobs = [...this.state.jobs]
        const findIndex = this.state.jobs.findIndex(job => job._id === resJSON._id)
        copyJobs[findIndex].applied = resJSON.applied
        this.setState({jobs: copyJobs})
    })
  }

  handleSubmit(event, username, password) {
    event.preventDefault()
    // send to login route on server
        //fetch
            // on success, go to index page
    // clear values after submit
    console.log('submitted!')
    console.log('username=', username);
    console.log('password=', password);
    console.log('event=', event.currentTarget.id);
    let route;
    if (event.currentTarget.id === 'signup') {
      route = '/users';
    }

    if (event.currentTarget.id === 'login') {
      route = '/sessions'
    }

    fetch('http://localhost:3003' + route, {
        method: 'POST',
        body:JSON.stringify({
            username: username,
            password: password,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => {
        if (res.status === 200) {
            // console.log('ready to isAuthenticated');
            // this.props.history.push('/');
            this.setState({
                isAuthenticated: true,
                username: username,
            })
            // isAuthenticated = true;
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
    if (this.state.isAuthenticated) {
      return (

        <div >
        
      <NavBar className="orange" />
        
        <div className="container">
       
          <h1>Jobs Hunter frontend!</h1>
          <h4 className="orange lighten-2 center white-text">Add jobs</h4>
          { /* logout goes here */ }
          
          <CreateForm
            handleAddJob={this.handleAddJob}
            baseURL={baseURL}
          />

<div className="grey lighten-5">
  <h4 className="orange lighten-2 center white-text">Jobs Inbox</h4>


          <table>
            <tbody>
              { this.state.jobs.map(jobs => {
                  return (
                    <tr
                    key={jobs._id}
                    onMouseOver={() => this.getSingleJob(jobs)}
                    >
                      <td> {jobs.business_title }</td>
                      <td> {jobs.url }</td>
                      <td onClick={() => this.deleteJob(jobs._id)}>
                        &times;
                      </td>
                      <td>
                        {(jobs.applied)
                        ? "applied"
                        : "not applied"}
                      </td>
                      <button className="floating orange white-text"onClick={() => this.toggleApplied(jobs)}>
                        Applied
                      </button>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>

          </div>

          {(this.state.job)
            ? <Show job={this.state.job}/>
            : null
          }

        </div>

        </div>
      )
    } else {
      return (
        <Authorization
          handleSubmit={this.handleSubmit}
        />)
    }

  }
}

export default App;


import React from 'react';
import Authorization from './components/Authorization'
import CreateForm from './components/CreateForm'
import NavBar from './components/NavBar'
import Show from './components/Show'
import 'materialize-css/dist/css/materialize.min.css'
import './App.css'


// import M from 'materialize-css/dist/js/materialize.min.js'
import { Row, Col } from 'react-materialize';




// import { BrowserRouter as Router, Route, Link } from "react-router-dom"


let baseURL = process.env.REACT_APP_BASEURL

//alternate baseURL = 'https://enigmatic-beach-40420.herokuapp.com/'

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://localhost:3003'
} else {
  baseURL = 'https://enigmatic-beach-40420.herokuapp.com'
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

  // componentDidMount() {
  //   this.getJobs()
  // }

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

  // Needs to display jobs for current user
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

  // SHOW ROUTE
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
      if (res.status === 200) {
        // console.log('ready to isAuthenticated');
        // this.props.history.push('/');
        // this.setState({
        //     isAuthenticated: true,
        //     username: username,
        // })
        // isAuthenticated = true;
        this.getJobs(username)
      } else {
        // const error = new Error(res.error);
        // throw error;
        return res.text();
      }
    })
      .then(resMessage => this.setState({
        resMessage: resMessage,
      }))
      .catch(err => {
        console.error('err=', err);
        alert('Error logging in. Please, try again.')
      })
  }

  handleLogout() {
    fetch(baseURL + '/sessions/delete', {
      method: 'DELETE',
      // body:JSON.stringify({
      //     username: username,
      //     password: password,
      // }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        // console.log('ready to isAuthenticated');
        // this.props.history.push('/');
        this.setState({
          isAuthenticated: false,
          username: '',
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
    console.log('render of App.js fired')
    if (this.state.isAuthenticated) {
      return (

        <div >

          <NavBar handleLogout = {this.handleLogout} />

          <div className="container ">

            <h2>Welcome, {this.state.username}!</h2>

            <div className="grey lighten-4">

            <h4 className=" green accent-4
 center white-text">Add jobs</h4>
            { /* logout goes here */}

            <CreateForm
              handleAddJob={this.handleAddJob}
              baseURL={baseURL}
              username={this.state.username}
            />
            </div>
            <Row>
              <Col s={9}>
                {/* <div className="grey lighten-5"> */}
                  <h4 className="green accent-4
 center white-text center white-text">Jobs Inbox</h4>
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
                              {/* Applied */}
                      </button>
                            {/* <td>
                              {(jobs.applied)
                                ? "applied"
                                : "not applied"}
                            </td> */}
                            <td onClick={() => this.deleteJob(jobs._id)}>
                              &times;
                      </td>
                          </tr>
                        )
                      })
                      }
                    </tbody>
                  </table>
                {/* </div> */}

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


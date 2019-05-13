import React from 'react';
import Login from './components/Login'
import CreateForm from './components/CreateForm'
import Show from './components/Show'
let baseURL = 'http://localhost:3003'
// JUST TO RENDER THE DATA, I ADDED LOCALHOST:3003 TO BASEURL. WE CAN UPDATE TO THE BUILD PACK LATER ON.


class App extends React.Component {
  // ADDED CONSTRUCTOR
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      job: ''
    }
    this.deleteJob = this.deleteJob.bind(this)
    this.getJobs = this.getJobs.bind(this)
    this.getSingleJob = this.getSingleJob.bind(this)
    this.handleAddJob = this.handleAddJob.bind(this)
  }

  componentDidMount(){
    this.getJobs()
  }

  deleteJob(id) {
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
    fetch(baseURL+ '/jobs')
      .then(data => {
        return data.json()},
        err => console.log(err))
      .then(parsedData => this.setState({jobs: parsedData}),
       err=> console.log(err))

       console.log('current base URL:', baseURL)

  }

  getSingleJob(job) {
    this.setState({
      job: job
    })
  }

  handleAddJob(job) {
    const copyJobs = [job, ...this.state.jobs]
    // copyJobs.unshift(job)
    this.setState({
      jobs: copyJobs
    })
  }


  render() {

    return (
      <div className="container">
        <h1>This is the start of the frontend!</h1>
        <Login />

        <CreateForm 
          handleAddJob={this.handleAddJob}
          baseURL={baseURL}
        />

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
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        {(this.state.job)
          ? <Show job={this.state.job}/>
          : null
        }

      </div>
    )
  }
}

export default App;

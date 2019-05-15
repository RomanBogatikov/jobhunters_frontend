import React from 'react'

class CreateForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // agency, business_title, description are required in jobs schema
            agency: '',
            business_title: '',
            job_description: '',
            url: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        // this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this)
    }
    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        fetch(this.props.baseURL + '/jobs/create', {
            method: 'POST',
            body:JSON.stringify({
                agency: this.state.agency, business_title: this.state.business_title,
                job_description: this.state.job_description,
                url: this.state.url,
                username: this.props.username
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
          .then(resJSON => {
              console.log('ready to run handleAddJob')
              this.props.handleAddJob(resJSON)
          })
          .then(() => {
                console.log('setState if ready to fire')
                this.setState({
                    agency: '',
                    business_title: '',
                    job_description: '',
                    url: ''
                });
                console.log('setState fired')
            }
          )
          .catch(error => console.error({'Error': error}))

    }

    render() {
        console.log('render of CreatedForm.js fired')
        return(
            <form onSubmit={this.handleSubmit} className="grey lighten-5">
                <label htmlFor="agency">Company</label>
                <input
                    type="text"
                    id="agency"
                    name="agency"
                    placeholder="Posting Company"
                    value={this.state.agency}
                    onChange={this.handleChange}
                />
                <label htmlFor="business_title">Job Title</label>
                <input
                    type="text"
                    id="business_title"
                    name="business_title"
                    placeholder="Job title"
                    value={this.state.business_title}
                    onChange={this.handleChange}
                />
                <label htmlFor="job_description">Job Description</label>
                <input
                    type="text"
                    id="job_description"
                    name="job_description"
                    placeholder="Job description"
                    value={this.state.job_description}
                    onChange={this.handleChange}
                />
                <label htmlFor="url">Job URL</label>
                <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="job posting url"
                    value={this.state.url}
                    onChange={this.handleChange}
                />
                <input className="btn green accent-4" type="submit"/>
            </form>
        )
    }
}

export default CreateForm

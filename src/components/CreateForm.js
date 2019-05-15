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
    }
    handleChange(event) {
        this.setState({
            [event.currentTarget.id]: event.currentTarget.value
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        fetch(this.props.baseURL + '/jobs', {
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
              this.props.handleAddJob(resJSON)
          }).catch(error => console.error({'Error': error}))
    }
    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="agency">Company</label>
                <input
                    type="text"
                    id="agency"
                    name="agency"
                    placeholder="Posting Company"
                    onChange={this.handleChange}
                />
                <label htmlFor="business_title">Job Title</label>
                <input
                    type="text"
                    id="business_title"
                    name="business_title"
                    placeholder="Job title"
                    onChange={this.handleChange}
                />
                <label htmlFor="job_description">Job Description</label>
                <input
                    type="text"
                    id="job_description"
                    name="job_description"
                    placeholder="Job description"
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    id="url"
                    name="url"
                    placeholder="job posting url"
                    onChange={this.handleChange}
                />
                <input type="submit"/>
            </form>
        )
    }
}

export default CreateForm
import React from 'react'

class Show extends React.Component {
    render() {
        return (
            <>
                <div className="grey lighten-5 center">
                    <h4 className="grey lighten-1 center white-text"> Job Details</h4> 
                    <hr/>
                    <p>{this.props.job.agency}</p>
                    <p>{this.props.job.business_title}</p>
                    <p>{this.props.job.job_description}</p>
                     <a href ={this.props.job.url} target="-blank">Apply Here</a>
                </div>
            </>
        )
    }
}

export default Show
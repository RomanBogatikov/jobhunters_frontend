import React from 'react'

class Show extends React.Component {
    render() {
        return (
            <>
                <div className="grey lighten-5">
                    <h4 className="grey lighten-1 center white-text"> Role Details</h4> 
                    <hr/>
                    <p>{this.props.job.agency}</p>
                    <p>{this.props.job.business_title}</p>
                    <p>{this.props.job.job_description}</p>
                     {this.props.job.url}
                </div>
            </>
        )
    }
}

export default Show
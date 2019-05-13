import React from 'react'

class Show extends React.Component {
    render() {
        return (
            <>
                <div>
                    {this.props.job.business_title} |
                    {this.props.job.agency} |
                    {this.props.job.job_description}
                </div>
            </>
        )
    }
}

export default Show
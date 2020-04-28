import PrescriptionService from '../../api/PrescriptionService';

import React from 'react'

export default class PrescriptionComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            prescriptionID: this.props.match.params.prescriptionID,
            prescription: {},
            prescriptionLineItems: []
        }
    }

    componentDidMount() {
        PrescriptionService.fetchPrescriptionById(this.state.prescriptionID)
            .then(response => {
                console.log(response.data)
                this.setState({ prescription: response.data })
            })
    }

    render() {
        return <div className="container">
            <div class="row">
                <div className="col-8" style={{ backgroundColor: 'blue', height: '1900px' }}>
                    2 of 3 (wider)
                </div>
                <div className="col-4" style={{ backgroundColor: 'yellow' }}>
                    <img className="prescription-picture" src={this.state.prescription.prescriptionImageURI || "/images/sample-question-mark.png"} alt="prescription image" />
                </div>
            </div>
        </div>
    }
}  
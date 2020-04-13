import React from 'react';
import CovidService from "../../api/CovidService.js";
import CountUp from 'react-countup';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';

class Covid19MainComponent extends React.Component {


    state = {
        covid19GlobalCases: 0

    }


    async componentDidMount() {
        CovidService.retrieveGlobalTotals()
            .then(response => this.setState({ covid19GlobalCases: response.data.totalConfirmed }));
        // .then(response => console.log(response));

    }


    render() {
        return (
            <div className="container">
                <Grid container spacing={3} justift="center">
                    <Grid item component={Card}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                            <Typography variant="h5">
                                <CountUp
                                    start={0}
                                    end={this.state.covid19GlobalCases}
                                    duration={2.5}
                                    separator=","
                                />
                            </Typography>
                            <Typography color="textSecondary">REAL DATE 02:00 AM</Typography>
                            <Typography variant="body2">Number of confirmed Cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5" gutterBottom>REAL DATA</Typography>
                            <Typography color="textSecondary">REAL DATE 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Deaths</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5" gutterBottom>REAL DATA</Typography>
                            <Typography color="textSecondary">REAL DATE 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Recovories</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Covid19MainComponent;
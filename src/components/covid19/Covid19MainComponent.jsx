import React from 'react';
import CovidService from "../../api/CovidService.js";
import CountUp from 'react-countup';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';

class Covid19MainComponent extends React.Component {


    state = {
        covid19GlobalCases: 0,
        covid19GlobalDeaths: 0,
        covid19GlobalRecoveries: 0,
        todaysDate: new Date()
    }


    async componentDidMount() {
        CovidService.retrieveGlobalTotals()
            .then(response => this.setState({ covid19GlobalCases: response.data.totalConfirmed, covid19GlobalDeaths: response.data.totalDeaths, covid19GlobalRecoveries: response.data.totalRecovered }));
        // .then(response => console.log(response));

        CovidService.fetchDailyNumbersSampleAPI()
            .then(response => console.log(response))

    }


    render() {
        return (
            <div className="container">
                <Grid container spacing={3} justify="center" >
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={this.state.covid19GlobalCases} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of confirmed Cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-deaths"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={this.state.covid19GlobalDeaths} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Deaths</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-recovered"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5" >
                                <CountUp start={0} end={this.state.covid19GlobalRecoveries} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Recovories</Typography>
                        </CardContent>
                    </Grid>
                </Grid>
            </div>
        )
    }

}

export default Covid19MainComponent;
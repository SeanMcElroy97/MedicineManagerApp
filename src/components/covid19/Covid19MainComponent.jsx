import React from 'react';
import CovidService from "../../api/CovidService.js";
import CountUp from 'react-countup';
import { Line, Bar } from 'react-chartjs-2';

import { Card, CardContent, Typography, Grid } from '@material-ui/core';

class Covid19MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            covid19GlobalCases: 0,
            covid19GlobalDeaths: 0,
            covid19GlobalRecoveries: 0,
            dailyData: [],
            globalDailyData: [],
            todaysDate: new Date()
        }
        this.sortGlobalData = this.sortGlobalData.bind(this);
    }

    async componentDidMount() {
        CovidService.retrieveGlobalTotals()
            .then(response => this.setState({ covid19GlobalCases: response.data.totalConfirmed, covid19GlobalDeaths: response.data.totalDeaths, covid19GlobalRecoveries: response.data.totalRecovered }));
        // .then(response => console.log(response));

        CovidService.fetchDailyNumbersSampleAPI()
            .then(response => this.setState({ dailyData: response.data }))

        CovidService.fetchDailyNumbersSpring()
            .then(response => this.setState({ globalDailyData: this.sortGlobalData(response.data) }))
        //.then(response => this.setState({ globalDailyData: this.sortedGlobalData(response.data) }))


    }


    sortGlobalData(unsortedArr) {
        unsortedArr.sort((a, b) => {
            if (a.reportDate.split("/").reverse() > b.reportDate.split("/").reverse()) {
                return 1
            } else {
                return -1
            }
            // return (a.reportDate > b.reportDate) ? 1 : -1
        })

        return unsortedArr
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

                <div className={"mt-5"}>
                    <Line data={{
                        labels: this.state.globalDailyData.map((dataDay) => dataDay.reportDate),
                        //labels: this.state.dailyData.map((dataDay) => dataDay.reportDate),
                        datasets: [
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalCases), label: "confirmed", borderColor: '#3333ff', fill: true },
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalDeaths), label: "Deaths", borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.5)', fill: true },
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalRecoveries), label: "Recovered", borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.5)', fill: true }]
                    }}
                    />
                </div>


            </div>
        )
    }

}

export default Covid19MainComponent;
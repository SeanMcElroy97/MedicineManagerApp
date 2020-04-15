import React from 'react';
import CovidService from "../../api/CovidService.js";
import CountUp from 'react-countup';
import { Line, Bar } from 'react-chartjs-2';

import { Card, CardContent, Typography, Grid, NativeSelect, FormControl } from '@material-ui/core';

class Covid19MainComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            covid19SelectedCases: 0,
            covid19SelectedDeaths: 0,
            covid19SelectedRecoveries: 0,
            globalDailyData: [],
            todaysDate: new Date(),
            countryData: [],
            countryDailyData: [],
            countrySelected: "Global",
            specificCountryLineCases: [],
            specificCountryLineDeaths: [],
            specificCountryLineRecoveries: []

        }
        this.sortGlobalData = this.sortGlobalData.bind(this);
        this.sortCountryAlphabetically = this.sortCountryAlphabetically.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.formatDateString = this.formatDateString.bind(this);
        this.sortCountryArrayData = this.sortCountryArrayData.bind(this);
    }

    async componentDidMount() {
        CovidService.retrieveGlobalTotals()
            .then(response => this.setState({ covid19SelectedCases: response.data.totalConfirmed, covid19SelectedDeaths: response.data.totalDeaths, covid19SelectedRecoveries: response.data.totalRecovered }));
        // .then(response => console.log(response));


        CovidService.fetchDailyNumbersSpring()
            .then(response => this.setState({ globalDailyData: this.sortGlobalData(response.data) }))
        //.then(response => this.setState({ globalDailyData: this.sortedGlobalData(response.data) }))

        CovidService.fetchCountryDailyNumbersSpring()
            .then(response => this.setState({ countryData: this.sortCountryAlphabetically(response.data) }))
        //.then(response => this.setState({ globalDailyData: this.sortedGlobalData(response.data) }))


    }


    sortGlobalData(array) {
        array.sort((a, b) => {
            if (a.reportDate.split("/").reverse() > b.reportDate.split("/").reverse()) {
                return 1
            } else {
                return -1
            }
            // return (a.reportDate > b.reportDate) ? 1 : -1
        })

        return array
    }


    sortCountryArrayData(array) {
        array.sort((a, b) => {
            if (a[0].split("/").reverse() > b[0].split("/").reverse()) {
                return 1
            } else {
                return -1
            }
        })

        return array
    }


    sortCountryAlphabetically(array) {
        array.sort((a, b) => {
            if (a.countryName > b.countryName) {
                return 1
            } else {
                return -1
            }
            // return (a.reportDate > b.reportDate) ? 1 : -1
        })

        return array
    }

    formatDateString(dateAndNumbers) {

        //console.log(dateAndNumbers)
        let x = dateAndNumbers;

        var y = new Object;

        for (var property in x) {

            let oldproperty = property
            if (property.length < 8) {
                //console.log('less than 8')


                if (property.charAt(1) == '/') {
                    //console.log('less than 10th Month')
                    property = "0" + property
                }
                if (property.charAt(4) == "/") {
                    property = property.slice(0, 3) + '0' + property.slice(3);
                }



                property = property.slice(3, 5) + '/' + property.slice(0, 2) + property.slice(5)
            }

            y[property] = x[oldproperty]


        }



        Object.entries(y)

        return this.sortCountryArrayData(Object.entries(y))
    }

    handleSelectChange(event) {
        this.setState({ countrySelected: event.target.value })

        // console.log(this.state.globalDailyData)
        if (event.target.value == "Global") {
            CovidService.retrieveGlobalTotals()
                .then(response => this.setState({ covid19SelectedCases: response.data.totalConfirmed, covid19SelectedDeaths: response.data.totalDeaths, covid19SelectedRecoveries: response.data.totalRecovered }));
        }
        this.state.countryData.filter(countryX => {
            if (countryX.countryName == event.target.value) {
                this.setState({ covid19SelectedCases: countryX.countryTotalCases, covid19SelectedDeaths: countryX.countryTotalDeaths, covid19SelectedRecoveries: countryX.countryTotalRecoveries, specificCountryLineCases: this.formatDateString(countryX.dailyCountryCases), specificCountryLineDeaths: this.formatDateString(countryX.dailyCountryDeathCases), specificCountryLineRecoveries: this.formatDateString(countryX.dailyCountryRecoveryCases) })
                console.log('sample cases below')
                console.log(this.formatDateString(countryX.dailyCountryCases))
            }



        })

    }



    render() {
        return (
            <div className="container">
                <Grid container spacing={3} justify="center" >
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-confirmed"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Confirmed</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={this.state.covid19SelectedCases} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of confirmed Cases of COVID-19</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-deaths"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
                            <Typography variant="h5">
                                <CountUp start={0} end={this.state.covid19SelectedDeaths} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Deaths</Typography>
                        </CardContent>
                    </Grid>
                    <Grid item component={Card} xs={12} md={3} className={"covid-card-recovered"}>
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
                            <Typography variant="h5" >
                                <CountUp start={0} end={this.state.covid19SelectedRecoveries} duration={2.5} separator="," />
                            </Typography>
                            <Typography color="textSecondary">{this.state.todaysDate.toDateString()} 02:00 AM</Typography>
                            <Typography variant="body2">Number of COVID-19 Recovories</Typography>
                        </CardContent>
                    </Grid>
                </Grid>

                <div className="container mt-5" >
                    <select className="form-control" onChange={this.handleSelectChange}>

                        <option value="Global">Global</option>
                        {this.state.countryData.map((country, i) => <option key={i} value={country.countryName}>{country.countryName}</option>)}
                    </select>

                </div>

                <div className={"mt-5"}>
                    {this.state.countrySelected == "Global" && <Line data={{
                        labels: this.state.globalDailyData.map((dataDay) => dataDay.reportDate),
                        //labels: this.state.dailyData.map((dataDay) => dataDay.reportDate),
                        datasets: [
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalCases), label: "confirmed", borderColor: '#3333ff', fill: true },
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalDeaths), label: "Deaths", borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.5)', fill: true },
                            { data: this.state.globalDailyData.map((dataDay) => dataDay.numberOfGlobalRecoveries), label: "Recovered", borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.5)', fill: true }]
                    }}
                    />}

                    {this.state.countrySelected != "Global" && <Line data={{
                        labels: this.state.specificCountryLineCases.map((countryDataDay) => countryDataDay[0]),
                        //labels: this.state.dailyData.map((dataDay) => dataDay.reportDate),
                        datasets: [
                            { data: this.state.specificCountryLineCases.map((countryDataDay) => countryDataDay[1]), label: "confirmed", borderColor: '#3333ff', fill: true },
                            { data: this.state.specificCountryLineDeaths.map((countryDataDay) => countryDataDay[1]), label: "Deaths", borderColor: 'red', backgroundColor: 'rgba(255,0,0,0.5)', fill: true },
                            { data: this.state.specificCountryLineRecoveries.map((countryDataDay) => countryDataDay[1]), label: "Recovered", borderColor: 'green', backgroundColor: 'rgba(0,255,0,0.5)', fill: true }
                        ]
                    }}
                    />}
                </div>

                <pre>{this.state.countryDa}</pre>

            </div >
        )
    }

}

export default Covid19MainComponent;
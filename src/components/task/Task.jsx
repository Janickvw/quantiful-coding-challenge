import React, { Component } from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import ExchangeRateCard from "./ExchangeRateCard";
// import StoreDataTable from "./StoreDataTable";
import StoreDataMaterialTable from "./StoreDataMaterialTable";

// import data from "../../data";

// Use the following url to access the data for all stores
// http://www.mocky.io/v2/5d4caeb23100000a02a95477
// If you have trouble with this, you can access the data through the uncommenting import "data" file above
// console.log(data);

class Task extends Component {
  state = {
    conversionRates: {
      base: null,
      rates: {
        USD: null,
        AUD: null
      }
    },
    storeData: [
      {
        id: null,
        index: null,
        country: null,
        value: null,
        store: null,
        returned: null
      }
    ]
  };

  componentDidMount() {
    // fetch API to get base exchange rates for USD  / NZD / AUS
    fetch("http://www.mocky.io/v2/5d4cb480310000c503a95480")
      .then(response => response.json())
      .then(response => this.setState({ conversionRates: response }))
      .catch(error => console.log(error));

    // fetch API to access the data
    fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
      .then(response => response.json())
      .then(response => this.setState({ storeData: response }))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div>
        <Card>
          <CardContent>
            <Typography>
              <b>Fetch the following URL to access the data: </b>
            </Typography>

            <Typography>
              <i>http://www.mocky.io/v2/5d4caeb23100000a02a95477</i>
            </Typography>

            <Typography>
              If you have trouble with doing this, you can access the data
              through by importing the "data".
            </Typography>

            <Typography>
              A table with the exchange rates and an example table with some
              random data has been provided. Replace the example table with your
              solution below.
            </Typography>
          </CardContent>
        </Card>
        <Card />
        <ExchangeRateCard
          rates={this.state.conversionRates.rates}
          base={this.state.conversionRates.base}
        />
        {/* Replace this example table with your solution below. */}
        <StoreDataMaterialTable
          rates={this.state.conversionRates}
          data={this.state.storeData}
        />
      </div>
    );
  }
}

export default Task;

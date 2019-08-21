import React, { Component } from "react";
import MaterialTable from "material-table";

import { forwardRef } from "react";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

export default class StoreDataMaterialTable extends Component {
  render() {
    let currentlySelectedRate = 0;
    let storeData = this.props.data.map(elem => {
      return {
        ...elem,
        returned: elem.returned === true ? "Yes" : "No"
      };
    });

    let countryLookups = {};
    let storeLookups = {};
    let returnedLookups = {};
    let currencies = [];

    currencies.push(this.props.rates.base);
    Object.keys(this.props.rates.rates).forEach(value =>
      currencies.push(value)
    );

    storeData.forEach(elem => {
      let { country, store, returned } = elem;
      countryLookups[country] = country;
      storeLookups[store] = store;
      returnedLookups[returned] = returned;
    });

    return (
      <div style={{ maxWidth: "100%" }}>
        <MaterialTable
          icons={tableIcons}
          columns={[
            { title: "ID", field: "id" },
            { title: "Index", field: "index", filtering: false },
            {
              title: "Country",
              field: "country",
              lookup: countryLookups
            },
            { title: "Value", field: "value", filtering: false },
            { title: "Store", field: "store", lookup: storeLookups },
            {
              title: "Returned",
              field: "returned",
              lookup: returnedLookups
            }
          ]}
          data={storeData}
          title={`Store Data (${this.props.rates.base})`}
          options={{
            filtering: true
          }}
          actions={[
            {
              icon: AttachMoneyIcon,
              tooltip: "Toggle Currency",
              onClick: (event, rowData) => {
                currentlySelectedRate += 1;
                let title = document.querySelector(
                  "h6.MuiTypography-root.MuiTypography-h6"
                );
                let newCurrency = currencies[currentlySelectedRate % 3];
                title.innerText = `Store Data (${newCurrency})`;
              }
            }
          ]}
        />
      </div>
    );
  }
}

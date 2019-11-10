import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import 'react-table/react-table.css';
import {getUpcomingOrders, getUpcomingMeals} from './queries'

const mealColumns =  [{
  Header: "UPCOMING MEALS",
  columns:
  [
    {
      Header: "Order ID",
      accessor: "order_id",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Package",
      accessor: "package_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Meal",
      accessor: "meal_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Protein",
      accessor: "protein_type",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Category",
      accessor: "description_",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Add Protein",
      accessor: "additional_protein_oz",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
    },
    {
      Header: " Due Date ",
      accessor: "order_due_date",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
      width: 200
    },
    ]}
  ];  


const orderColumns = [{
  Header: "UPCOMING ORDERS",
  columns:
  [
    {
      Header: "Order ID",
      accessor: "order_id",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "First Name",
      accessor: "customer_first_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Last Name",
      accessor: "customer_last_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Phone",
      accessor: "customer_phone_number",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
      width: 150
    },
    {
      Header: "Spec Reqs ",
      accessor: "special_requirements",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
      width: 200
    },
    {
      Header: "Plan",
      accessor: "plan_type",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Pay Method",
      accessor: "order_payment_method",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Delivery/Pick-up",
      accessor: "order_fulfillement_method",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
      width: 150
    },
    {
      Header: "Delivery Street",
      accessor: "order_delivery_street",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
      width: 200
    },
    {
      Header: "Delivery City",
      accessor: "order_delivery_city",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
    },
    {
      Header: "Delivery Zip",
      accessor: "order_delivery_zipcode",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>,
    },
    {
      Header: "Due Date",
      accessor: "order_due_date",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Total",
      accessor: "order_total_price",
      Cell: row => <div style={{ textAlign: "right" }}>${row.value}</div>
    },
    ]}
  ];
const Upcoming = props => {

  const displayUpcomingInfo = () => {

    const orderData = props.getUpcomingOrders
    const mealData = props.getUpcomingMeals

    if (orderData.loading) {
      return <div>Loading Upcoming Order Info...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={orderData.upcomingOrderandPackage}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={orderColumns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
              
            />

            </div>

             <div>
            <ReactTable
                data={mealData.upcomingMealInfo}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={mealColumns}
                defaultPageSize={7}
                style={{height: "400px"}}
                className="-striped -highlight"
            />

            </div> 
            </div>
        )
    }
  }

    return (
        <>
         {displayUpcomingInfo()}
          
        </>
      );

}

export default compose(
    graphql(getUpcomingOrders, { name: "getUpcomingOrders" }),
    graphql(getUpcomingMeals, { name: "getUpcomingMeals" }),  
  )(Upcoming);
  
import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import 'react-table/react-table.css';
import {getLoyCustomer} from './queries'

const columns = [{
  Header: "LOYAL CUSTOMERS",
  columns:
  [
    {
      Header: "ID",
      accessor: "customer_id",
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
      Header: "Frequency",
      accessor: "frequency",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    ]}
  ];


const LoyalCustReport = props => {

  const displayCustomer = () => {

    const data = props.getLoyCustomer;
    if (data.loading) {
      return <div>Loading Loyal Customers...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={data.loyalCustomer}
                // filterable={true}
              //   defaultFilterMethod={(filter, row) =>
              //   String(row[filter.id]).indexOf(filter.value) > -1
              // }
                columns={columns}
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
         {displayCustomer()}
          
        </>
      );

}

export default compose(
    graphql(getLoyCustomer, { name: "getLoyCustomer" }),  
  )(LoyalCustReport);
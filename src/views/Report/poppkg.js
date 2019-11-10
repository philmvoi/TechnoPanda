import React, {useState} from "react";
import { graphql } from "react-apollo";
import ReactTable from 'react-table';
import { compose } from "recompose";
import 'react-table/react-table.css';
import {getPopPackages} from './queries';

const columns = [{
  Header: "PACKAGE FREQUENCY",
  columns:
  [
    {
      Header: "Package",
      accessor: "package_name",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    {
      Header: "Frequency",
      accessor: "frequency",
      Cell: row => <div style={{ textAlign: "center" }}>{row.value}</div>
    },
    ]}
  ];

const PopPkgReport = props => {

  const displayPopPkg = () => {

    const data = props.getPopPackages;
    if (data.loading) {
      return <div>Loading Popular Packages...</div>;
    } else {
        return (
          <div>
          <div>
            <ReactTable
                data={data.popularPackage}
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
         {displayPopPkg()}
          
        </>
      );


}

export default compose(
    graphql(getPopPackages, { name: "getPopPackages" }),  
  )(PopPkgReport);
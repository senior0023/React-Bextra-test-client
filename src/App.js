import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/Table';
import Axios from 'axios';

function App() {

  // set the columns of Table
  const columns = [
    { Header: "Name", accessor: "name" },
    { Header: "Company Domain", accessor: "company_domain" },
    { Header: "Industry Sector", accessor: "industry_sector" },
    { Header: "City", accessor: "city" },
    { Header: "Country", accessor: "country" }
  ];

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       // Build our expander column
  //       id: "expander", // Make sure it has an ID
  //       Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
  //         <span {...getToggleAllRowsExpandedProps()}>
  //           {isAllRowsExpanded ? "👇" : "👉"}
  //         </span>
  //       ),
  //       Cell: ({ row, rows, toggleRowExpanded }) =>
  //         // Use the row.canExpand and row.getToggleRowExpandedProps prop getter
  //         // to build the toggle for expanding a row
  //         row.canExpand ? (
  //           <span
  //             {...row.getToggleRowExpandedProps({
  //               style: {
  //                 // We can even use the row.depth property
  //                 // and paddingLeft to indicate the depth
  //                 // of the row
  //                 paddingLeft: `${row.depth * 2}rem`
  //               },
  //               onClick: () => {
  //                 const expandedRow = rows.find(row => row.isExpanded);

  //                 if (expandedRow) {
  //                   const isSubItemOfRow = Boolean(
  //                     expandedRow && row.id.split(".")[0] === expandedRow.id
  //                   );

  //                   if (isSubItemOfRow) {
  //                     const expandedSubItem = expandedRow.subRows.find(
  //                       subRow => subRow.isExpanded
  //                     );

  //                     if (expandedSubItem) {
  //                       const isClickedOnExpandedSubItem =
  //                         expandedSubItem.id === row.id;
  //                       if (!isClickedOnExpandedSubItem) {
  //                         toggleRowExpanded(expandedSubItem.id, false);
  //                       }
  //                     }
  //                   } else {
  //                     toggleRowExpanded(expandedRow.id, false);
  //                   }
  //                 }
  //                 row.toggleRowExpanded();
  //               }
  //             })}
  //           >
  //             {row.isExpanded ? "👇" : "👉"}
  //           </span>
  //         ) : null
  //     },
  //     { Header: "Name", accessor: "name" },
  //     { Header: "Company Domain", accessor: "company_domain" },
  //     { Header: "Industry Sector", accessor: "industry_sector" },
  //     { Header: "City", accessor: "city" },
  //     { Header: "Country", accessor: "country" }
  //   ],
  //   []
  // );

  // data state to store the Accounts data. Its initial value is an empty array
  const [ data, setData ] = useState([]);

  // Using useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await Axios('http://localhost:8080/api/accounts');
      console.log('result: ', result.data);
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="App-header-text">BEXTRA React</h2>
      </header>
      <div className="App-body">
        <Table columns={columns} data={data} />
      </div>
    </div>
  );
}

export default App;

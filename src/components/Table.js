// Table.js
import React, { useState } from 'react';
import { useTable, useFilters, useSortBy, useGroupBy, useExpanded } from 'react-table';
// get our fontawesome imports
import { faAngleDown, faAngleRight, faBars, faCheckCircle, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Table({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        headerGroups, // headerGropus, if the table has groupings
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
        setFilter, 
        state: { groupBy, expanded }
    } = useTable(
        {
            columns, 
            data,
        },
        useFilters,
        useGroupBy,
        useSortBy,
        useExpanded
    );

    const [ filterInput, setFilterInput ] = useState("");

    // update the filter state when input changes
    const handleFilterChange = e => {
        const value = e.target.value || "";
        setFilter("name", value);
        setFilterInput(value);
    };

    return (
        <div className="table-container">
            <div className="filter-container">
                <input
                    value={ filterInput }
                    onChange={handleFilterChange}
                    placeholder={"Search by name..."}
                    className="table-filter"
                />
                <span className="table-filter-addon"><FontAwesomeIcon icon={faSearch}/></span>
            </div>
            <table {...getTableProps()} className="styled-table">
                <thead>
                    {
                        headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th 
                                        {...column.getHeaderProps()}
                                        /* Uncomment below code to add 'sort'
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                                className={
                                                    column.isSorted ? (column.isSortedDesc ? "sort-desc" : "sort-asc") : ""
                                            }
                                        */
                                    >
                                        { column.render("Header") }
                                        {' '}
                                        {
                                            column.canGroupBy ? (
                                                <span {...column.getGroupByToggleProps()}>
                                                    {
                                                        column.isGrouped 
                                                            ? <FontAwesomeIcon icon={faCheckCircle} /> 
                                                            : <FontAwesomeIcon icon={faBars} />
                                                    }
                                                </span>
                                            ) : null
                                        }
                                    </th>
                                ))}
                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row, i) => {
                            prepareRow(row); // This line is necessary to prepare the rows and get the row props from react-table dynamically
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td 
                                                {...cell.getCellProps()}
                                                style={{
                                                    background: cell.isGrouped
                                                        ? 'rgba(186,187, 186,.28)'
                                                        : 'white',
                                                }}
                                            >
                                                {cell.isGrouped ? (
                                                    // If it's a grouped cell, add an expander and row count
                                                    <>
                                                    {cell.render('Cell')} ({row.subRows.length})
                                                    {' '}
                                                    <span {...row.getToggleRowExpandedProps()}>
                                                        { 
                                                            row.isExpanded 
                                                                ? <FontAwesomeIcon icon={faAngleDown} /> 
                                                                : <FontAwesomeIcon icon={faAngleRight} /> 
                                                        }
                                                    </span>
                                                    </>
                                                ) : cell.isAggregated ? (
                                                    // If the cell is aggregated, use the Aggregated
                                                    // renderer for cell
                                                    cell.render('Aggregated')
                                                ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                    // Otherwise, just render the regular cell
                                                    cell.render('Cell')
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
    );
}
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import jwt_decode from "jwt-decode";

const Table = ({ data, deleteProduct }) => {
  console.log(data);
  const [sortedBy, setSortedBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const { adminToken } = useSelector((state) => state.authReducer);
  const decoded = jwt_decode(adminToken);

  const handleSort = (column) => {
    const sortedOrder = sortOrder === "asc" ? "desc" : "asc";
    const sortedData = [...data].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];
      if (valueA < valueB) {
        return sortedOrder === "asc" ? -1 : 1;
      } else if (valueA > valueB) {
        return sortedOrder === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
    setSortedBy(column);
    setSortOrder(sortedOrder);
    setData(sortedData);
  };

  const [tableData, setData] = useState(data);
  console.log(tableData);

  const renderRows = () => {
    return tableData.map((row) => (
      <tr key={row._id}>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          {row.make}
        </td>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          {row.model}
        </td>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          {row.registerationNo}
        </td>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          {row.price}
        </td>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          {row.mileage}
        </td>
        <td className="p-3 capitalize text-sm font-normal text-gray-400">
          <img
            src={`/images/${row.image}`}
            alt="image name"
            className="w-20 h-20 rounded-md object-cover"
          />
        </td>
        {decoded.id === row.user && (
          <>
            <td className="p-3 capitalize text-sm font-normal text-gray-400">
              <Link
                to={`/dashboard/edit-product/${row._id}`}
                className="btn btn-warning"
              >
                edit
              </Link>
            </td>
            <td className="p-3 capitalize text-sm font-normal text-gray-400">
              <span
                className="btn btn-danger cursor-pointer"
                onClick={() => deleteProduct(row._id)}
              >
                delete
              </span>
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <table>
      <thead>
        <tr className="cursor-pointer">
          <th
            onClick={() => handleSort("make")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "make" ? (sortOrder === "asc" ? "▲" : "▼") : null}{" "}
            make
          </th>
          <th
            onClick={() => handleSort("model")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "model" ? (sortOrder === "asc" ? "▲" : "▼") : null}{" "}
            model
          </th>
          <th
            onClick={() => handleSort("registerationNo")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "registerationNo"
              ? sortOrder === "asc"
                ? "▲"
                : "▼"
              : null}{" "}
            Registeration No
          </th>
          <th
            onClick={() => handleSort("price")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "price" ? (sortOrder === "asc" ? "▲" : "▼") : null}{" "}
            Price
          </th>
          <th
            onClick={() => handleSort("mileage")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "mileage" ? (sortOrder === "asc" ? "▲" : "▼") : null}{" "}
            Mileage
          </th>
          <th
            onClick={() => handleSort("image")}
            className="p-3 uppercase text-sm font-medium text-gray-500"
          >
            {sortedBy === "image" ? (sortOrder === "asc" ? "▲" : "▼") : null}{" "}
            Image
          </th>
          <th className="p-3 uppercase text-sm font-medium text-gray-500">
            Edit
          </th>
          <th className="p-3 uppercase text-sm font-medium text-gray-500">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default Table;

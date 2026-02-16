import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    console.log(`your token is: ${token}`);
    console.log(`backendURL: ${backendUrl}/api/order/list`);
    if (!token) {
      return null;
    }

    try {
      const response = await axios.post(
        backendUrl + `/api/order/list`,
        {},
        { headers: { token } },
      );

      console.log(response.data.success);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    console.log("useEffect triggered with token:", token);
    if (token) {
      fetchAllOrders();
    } else {
      console.warn("fetchAllOrders skipped: No token provided.");
    }
  }, [token]);
  return (
    <div>
      <p>jshfjkhkdhk</p>
    </div>
  );
};

export default Orders;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return <div></div>;
};

export default List;

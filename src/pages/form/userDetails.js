import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from 'axios';
import Input from "./input";
import { useNavigate } from "react-router-dom";

const initialValue = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
};

export default function UserDetails() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { state } = useLocation();
  const parseId = parseInt(id);

  const [retrieveData, setRetrieveData] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  
  const BASE_URL = "http://127.0.0.1:8000/api/articles-new/"+parseId+"/";

  useEffect(() => {
    axios.get(BASE_URL).then((resp) => 
      {
        if(resp.data) {
          setData(resp.data);
        } else {
          setData({});
        }
      } );
    // if(state.redirect && state.redirect === 'axios') {
    //   axios.get(BASE_URL).then((resp) => 
    //   {
    //     if(resp.data) {
    //       setData(resp.data);
    //     } else {
    //       setData({});
    //     }
    //   } );
    // } else {
    //   const localData = localStorage.getItem("formData");
    //   const originalData = JSON.parse(localData);
    //   const userData = originalData.find((a) => {
    //     return a.id === parseId;
    //   });
    //   if(userData)
    //       setData(userData);
    // }
    // eslint-disable-next-line
  }, []);

  const validate = () => {
    const errors = {};
    const temp = {...data};
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!temp.email.toLowerCase().match(emailRegex)) {
      errors.email = "Email is not Valid.";
    } 
    if(temp.first_name.trim() === "") {
      errors.first_name = "Enter First Name.";
    }
    if(temp.last_name.trim() === "") {
      errors.last_name = "Enter Last Name.";
    }
    if(temp.mobile.trim() === "") {
      errors.mobile = "Enter Mobile Number.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if(error) return; 
    try {
        const {data: putData} = await axios.patch(BASE_URL, data);
        console.log("putData", putData);
        alert("Data Updation Successfully.");
        navigate("/formAxios/");
    } catch(e) {
        alert("Something went wrong");
    }
  };

  // const onUpdate = (id) => {
  //   setIsUpdateShow(true);
  //   const filteredData = retrieveData.find((data) => {
  //     return data.id === id;
  //   });
  //   if (filteredData) setData(filteredData);
  // };

  // const onDelete = async (id) => {
  //   const {data: deleteData} = await axios.delete(`${BASE_URL}${id}/`);
  //   console.log("deleteData", deleteData);
  //   const filteredData = retrieveData.filter((data) => {
  //     return data.id !== id;
  //   });
  //   setRetrieveData(filteredData);
  // };

  // const onTblRowClick = (id) => {
  //   // window.location = `/userDetails/${id}`;
  //   navigate("/userDetails/"+id+"/", {state: {redirect: 'axios'}});
  // }

  return (
    <React.Fragment>
      {/* <div>UserDetails</div>
      <div>First Name : {data.first_name}</div>
      <div>Last Name : {data.last_name}</div>
      <div>Email ID : {data.email}</div>
      <div>Mobile Number : {data.mobile}</div> */}

      <div className="container mx-auto py-[10px] lg:max-w-[50%] md:max-w-[75%] sm:max-w-[80%]">
        <form className="border border-gray-300 p-10 rounded-lg shadow-lg bg-white">
          <Input
            label="First Name"
            name="first_name"
            type="text"
            value={data.first_name}
            errors={errors.first_name}
            onChange={onChange}
          />
          <Input
            label="Last Name"
            name="last_name"
            type="text"
            value={data.last_name}
            errors={errors.last_name}
            onChange={onChange}
          />
          <Input
            label="Email ID"
            name="email"
            type="email"
            value={data.email}
            errors={errors.email}
            onChange={onChange}
          />
          <Input
            label="Mobile Number"
            name="mobile"
            type="number"
            value={data.mobile}
            errors={errors.mobile}
            onChange={onChange}
          />

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => onSubmit(e)}
          >
            Update
          </button>
        </form>
      </div>  
    </React.Fragment>
  );
}

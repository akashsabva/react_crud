// import { axios } from "axios";
import React, { useEffect, useState } from "react";
import Input from "./input";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000/api/articles-new/";

const initialValue = {
  first_name: "",
  last_name: "",
  email: "",
  mobile: "",
};

export default function FormAxios() {
  //   const [first_name, setfirst_name] = useState("");
  //   const [last_name, setlast_name] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [mobile, setmobile] = useState("");
  const [data, setData] = useState(initialValue);
  const [retrieveData, setRetrieveData] = useState([]);
  const [isUpdateShow, setIsUpdateShow] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(retrieveData));
      // const returnData = JSON.parse(localStorage.getItem("formData"));
      axios.get(BASE_URL).then((resp) => 
      { 
        if(resp.data) {
          setRetrieveData(resp.data);
        } else {
          setRetrieveData([]);
        }
      } );
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
        const filteredData = retrieveData.filter((singleData) => {
            return singleData.id === data.id;
        });
        if (filteredData.length > 0) {
            const formData = retrieveData.map((a) =>
                a.id === data.id ? (a = data) : a
            );
            const {data: putData} = await axios.patch(BASE_URL+data.id+"/", data);
            console.log("putData", putData);
            setRetrieveData(formData);
            setIsUpdateShow(false);
            alert("Data Updation Successfully.");
        } else {
            const {data: postData} = await axios.post(BASE_URL, data);
            const posts = [...retrieveData, postData];
            setRetrieveData(posts);
            alert("Data Insertion Successfully.");
        }
    } catch(e) {
        alert("Something went wrong");
    }
    setData(initialValue);
  };

  const onUpdate = (id) => {
    onTblRowClick(id);
    // setIsUpdateShow(true);
    // const filteredData = retrieveData.find((data) => {
    //   return data.id === id;
    // });
    // if (filteredData) setData(filteredData);
  };

  const onDelete = async (id) => {
    const {data: deleteData} = await axios.delete(`${BASE_URL}${id}/`);
    console.log("deleteData", deleteData);
    const filteredData = retrieveData.filter((data) => {
      return data.id !== id;
    });
    setRetrieveData(filteredData);
  };

  const onTblRowClick = (id) => {
    // window.location = `/userDetails/${id}`;
    navigate("/userDetails/"+id+"/", {state: {redirect: 'axios'}});
  }

  return (
    <React.Fragment>
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
            {isUpdateShow ? "Update" : "Submit"}
          </button>
        </form>

        <div className="overflow-x-auto relative border border-gray-300 my-5 py-5 rounded-lg shadow-lg bg-white">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="py-3 px-6">
                  ID
                </th>
                <th scope="col" className="py-3 px-6">
                  First Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Last Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Email ID
                </th>
                <th scope="col" className="py-3 px-6">
                  Mobile Number
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {retrieveData.length > 0 ? (
                retrieveData.map((data, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="py-4 px-6 cursor-pointer" onClick={() => onTblRowClick(data.id)}>{data.id}</td>
                    <td className="py-4 px-6">{data.first_name}</td>
                    <td className="py-4 px-6">{data.last_name}</td>
                    <td className="py-4 px-6">{data.email}</td>
                    <td className="py-4 px-6">{data.mobile}</td>
                    <td className="py-4 px-6 flex">
                      <button
                        type="submit"
                        className="font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-1"
                        onClick={() => onDelete(data.id)}
                      >
                        ❌
                      </button>
                      <button
                        type="submit"
                        className="font-medium rounded-lg text-sm w-full sm:w-auto text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-1"
                        onClick={() => onUpdate(data.id)}
                      >
                        🔄
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-center">
                  <td colSpan="6">No Data Found !</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </React.Fragment>
  );
}

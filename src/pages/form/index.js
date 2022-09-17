import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./input";

function checkUserData() {
  const returnData = JSON.parse(localStorage.getItem("formData"));
  if (returnData) {
    return returnData;
  } else {
    return [];
  }
}

const initialValue = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  mobileNumber: "",
};

export default function Form() {
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const [email, setEmail] = useState("");
  //   const [mobileNumber, setMobileNumber] = useState("");
  const [data, setData] = useState(initialValue);
  const [retrieveData, setRetrieveData] = useState(checkUserData());
  const [isUpdateShow, setIsUpdateShow] = useState(false);
  const [errors, setErrors] = useState({});
  const uniqueId = new Date().getUTCMilliseconds();
  const navigate = useNavigate();

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(retrieveData));
  }, [retrieveData]);

  const validate = () => {
    const errors = {};
    const temp = {...data};
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!temp.email.toLowerCase().match(emailRegex)) {
      errors.email = "Email is not Valid.";
    } 
    if(temp.firstName.trim() === "") {
      errors.firstName = "Enter First Name.";
    }
    if(temp.lastName.trim() === "") {
      errors.lastName = "Enter Last Name.";
    }
    if(temp.mobileNumber.trim() === "") {
      errors.mobileNumber = "Enter Mobile Number.";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const error = validate();
    setErrors(error || {});
    if(error) return; 
    const filteredData = retrieveData.filter((singleData) => {
      return singleData.id === data.id;
    });
    if (filteredData.length > 0) {
      const formData = retrieveData.map((a) =>
        a.id === data.id ? (a = data) : a
      );
      setRetrieveData(formData);
      setIsUpdateShow(false);
    } else {
      const formData = { ...data, id: uniqueId };
      setRetrieveData([...retrieveData, formData]);
    }
    setData(initialValue);
  };

  const onDelete = (id) => {
    const filteredData = retrieveData.filter((data) => {
      return data.id !== id;
    });
    setRetrieveData(filteredData);
  };

  const onUpdate = (id) => {
    setIsUpdateShow(true);
    const filteredData = retrieveData.find((data) => {
      return data.id === id;
    });
    if (filteredData) setData(filteredData);
  };

  const onTblRowClick = (id) => {
    navigate("/userDetails/"+id+"/", {state: {redirect: 'local'}});
    // window.location = `/userDetails/${id}`;
  }

  return (
    <React.Fragment>
      <div className="container mx-auto py-[10px] lg:max-w-[50%] md:max-w-[75%] sm:max-w-[80%]">
        <form className="border border-gray-300 p-10 rounded-lg shadow-lg bg-white">
          <Input
            label="First Name"
            name="firstName"
            type="text"
            value={data.firstName}
            errors={errors.firstName}
            onChange={onChange}
          />
          <Input
            label="Last Name"
            name="lastName"
            type="text"
            value={data.lastName}
            errors={errors.lastName}
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
            name="mobileNumber"
            type="number"
            value={data.mobileNumber}
            errors={errors.mobileNumber}
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
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                    onClick={() => onTblRowClick(data.id)}
                  >
                    <td className="py-4 px-6">{data.id}</td>
                    <td className="py-4 px-6">{data.firstName}</td>
                    <td className="py-4 px-6">{data.lastName}</td>
                    <td className="py-4 px-6">{data.email}</td>
                    <td className="py-4 px-6">{data.mobileNumber}</td>
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

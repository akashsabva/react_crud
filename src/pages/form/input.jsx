import React from 'react'

export default function Input({label, name, type, value, errors, onChange}) {
  return (
    <div className="mb-6">
        <label
            htmlFor={name}
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
            {label}
        </label>
        <input
            type={type}
            id={name}
            name={name}
            value={value}
            className={`bg-gray-50 border ${errors ? 'border-red-600' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none`}
            placeholder={label}
            required=""
            onChange={(e) => onChange(e)}
        />
        { errors && <div className='text-red-600'>{errors}</div> }
    </div>
  )
}



/* <div className="mb-6">
            <label
              htmlFor="first_name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              First Name
            </label>
            <input
              type="first_name"
              id="first_name"
              name="first_name"
              value={data.first_name}
              className={inputClass}
              placeholder="First Name"
              required=""
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Last Name
            </label>
            <input
              type="text"
              id="email"
              name="lastName"
              value={data.lastName}
              className={inputClass}
              placeholder="Last name"
              required=""
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Email ID
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              className={inputClass}
              placeholder="Email ID"
              required=""
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="number"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Mobile Number
            </label>
            <input
              type="number"
              id="number"
              name="mobileNumber"
              value={data.mobileNumber}
              className={` ${inputClass} text-blue-900`}
              required=""
              onChange={(e) => onChange(e)}
            />
          </div> */
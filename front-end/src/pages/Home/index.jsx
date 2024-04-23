import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [country, setCountry] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    async function getCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountry(data);
    }
    getCountries();
  }, []);

  React.useEffect(() => {
    async function getUsers() {
      const res = await fetch("http://localhost:5000/api/user");
      const data = await res.json();
      setUsers(data);
    }
    getUsers();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("profilePicture", file);

    Object.keys(data).forEach((key) => {
      if (data[key] && typeof data[key] === "object") {
        Object.keys(data[key]).forEach((subkey) => {
          formData.append(`${key}[${subkey}]`, data[key][subkey]);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      await axios.post("http://localhost:5000/api/user/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  console.log(errors);

  const province = [
    {
      id: 1,
      title: "Province 1",
    },
    {
      id: 2,
      title: "Province 2",
    },
    {
      id: 3,
      title: "Province 3",
    },
    {
      id: 4,
      title: "Province 4",
    },
    {
      id: 5,
      title: "Province 5",
    },
    {
      id: 6,
      title: "Province 6",
    },
    {
      id: 7,
      title: "Province 7",
    },
  ];

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setUsers((currentItems) =>
        currentItems.filter((item) => item._id !== id)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div>
      <h1 className=" text-center py-4">
        Enter following details to fill out the form
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col max-w-[1000px] m-auto gap-4"
      >
        <label htmlFor="name">Name*</label>
        <input
          id="name"
          type="text"
          {...register("name", { required: "name is a required field" })}
          placeholder="Name"
        />
        {errors.name ? (
          <span className=" text-error">
            <em>{errors.name.message}</em>{" "}
          </span>
        ) : null}
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          {...register("email", {
            required: "email is a required filed",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          placeholder="Email"
        />
        {errors.email ? (
          <span className=" text-error">{errors.email.message}</span>
        ) : null}
        <label htmlFor="phone_number">Phone number:</label>
        <input
          id="phone_number"
          type="text"
          {...register("phone_no", {
            required: "phone number is a required field",
          })}
          placeholder="Name"
        />
        {errors.phone_no ? (
          <span className=" text-error">{errors.phone_no.message}</span>
        ) : null}
        <label htmlFor="email">DOB:</label>
        <input
          id="email"
          type="date"
          {...register("DOB")}
          placeholder="Enter you date of birth"
        />

        <h2>Address:</h2>
        <label htmlFor="city">City</label>
        <input id="city" type="text" {...register("address.City")} />

        <label htmlFor="district">District</label>
        <input id="district" type="text" {...register("address.District")} />

        <label htmlFor="Province">Province</label>
        <select {...register("address.Province")} id="Province">
          {province.map((province) => {
            return (
              <option value={province.title} key={province.id}>
                {province.title}
              </option>
            );
          })}
        </select>
        <label htmlFor="Country">Country</label>
        <select {...register("address.Country")} id="Country">
          {country.map((c) => {
            return (
              <option key={c.name.common} value={c.name.common}>
                {c.name.common}
              </option>
            );
          })}
        </select>
        <label htmlFor="profile">Profile Pictures</label>
        <input
          type="file"
          name="profilePicture"
          onChange={handleFileChange}
          id="profile"
          accept="image/png"
        />
        <button type="submit">Submit</button>
      </form>

      <div className=" max-w-[1000px] m-auto py-3">
        <h1>Users list</h1>
        <table className=" table-auto w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-base text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th>Profile Picture</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr
                  key={user._id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td>
                    <img src={user.profilePicture} alt="" />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_no}</td>
                  <td className="flex gap-2 py-3">
                    <button
                      onClick={() => handleUserDelete(user._id)}
                      className=" bg-error"
                    >
                      <i className="ri-delete-bin-4-line"></i>
                    </button>
                    <button>
                      <i className="ri-edit-2-line"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;

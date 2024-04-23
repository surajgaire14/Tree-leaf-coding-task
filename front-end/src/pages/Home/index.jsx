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
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    async function getCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountry(data);
    }
    getCountries();
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
        {errors.email ? <span>{errors.email.message}</span> : null }
        <label htmlFor="phone_number">Phone number:</label>
        <input
          id="phone_number"
          type="text"
          {...register("phone_no", {
            required: "phone number is a required field",
          })}
          placeholder="Name"
        />
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
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Home;

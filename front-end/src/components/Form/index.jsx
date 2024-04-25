/* eslint-disable react/prop-types */
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";

const Form = ({ mode }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [file, setFile] = React.useState(null);
  const [country, setCountry] = React.useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  console.log(errors);

  // get the country during initial loading of the page
  React.useEffect(() => {
    async function getCountries() {
      const res = await fetch("https://restcountries.com/v3.1/all");
      const data = await res.json();
      setCountry(data);
    }
    getCountries();
  }, []);

  React.useEffect(() => {
    if (mode == "edit") {
      axios
        .get(`${import.meta.env.APP_URL}/api/user/${id}`)
        .then((response) => {
          console.log(response);
          const fields = ["name", "email", "phone_no", "DOB"];
          fields.forEach((field) => setValue(field, response.data[field]));
          setValue("address.Country", response.data.address.Country);
          setValue("address.City", response.data.address.City);
          setValue("address.Province", response.data.address.Province);
          setValue("address.District", response.data.address.District);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [mode, setValue, id]);

  const onSubmit = async (data) => {
    console.log(data);
    console.log(import.meta.env.APP_URL);
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

    const url = `/api/user/${
      mode === "edit" ? "update/" + id : "create"
    }`;
    console.log(url);
    const method = mode === "edit" ? "put" : "post";

    try {
      const res = await axios({
        method: method,
        url: url,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      if (res.status === 200) {
        navigate("/users");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const province = [
    {
      id: 1,
      title: "Koshi",
    },
    {
      id: 2,
      title: "Madhesh",
    },
    {
      id: 3,
      title: "Bagmati",
    },
    {
      id: 4,
      title: "Gandaki",
    },
    {
      id: 5,
      title: "Lumbini",
    },
    {
      id: 6,
      title: "Karnali",
    },
    {
      id: 7,
      title: "Sudurpaschim",
    },
  ];

  return (
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
          minLength: {
            value: 7,
            message: "minimum 7 character is required",
          },
          maxLength: {
            value: 10,
            max: "maximum 10 character",
          },
          valueAsNumber: true,
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
  );
};

export default Form;

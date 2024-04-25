import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "../../components/Pagination";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  const navigate = useNavigate();
  const [itemsPerPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);
  console.log(indexOfFirstItem);
  console.log(indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  React.useEffect(() => {
    async function getUsers() {
      const res = await fetch(`${import.meta.env.VITE_APP_URL}/api/user`);
      const data = await res.json();
      setUsers(data);
    }
    getUsers();
  }, []);
  console.log(import.meta.env.VITE_APP_URL);
  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_APP_URL}/api/user/${id}`);
      setUsers((currentItems) =>
        currentItems.filter((item) => item._id !== id)
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className=" max-w-[1200px] w-full ml-auto mr-auto py-3">
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
          {currentItems.map((user, index) => {
            return (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <td>
                  <img
                    src={user.profilePicture}
                    alt={`user-${index}`}
                    className=" w-[50px] h-[50px] object-cover px-2 py-2"
                  />
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
                  <button
                    onClick={() =>
                      navigate(`/users/edit/${user._id}`, {
                        state: {
                          user: user,
                        },
                      })
                    }
                  >
                    <i className="ri-edit-2-line"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {users.length >= 5 ? (
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={users.length}
          paginate={paginate}
        />
      ) : null}
    </div>
  );
};

export default Users;

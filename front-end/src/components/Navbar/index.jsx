import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-5 py-3">
      <h1 className=" cursor-pointer" onClick={() => navigate("/")}>
        Logo
      </h1>
      <div className="flex gap-4">
        <Link to={"/users"}>Users</Link>
        <Link to={"/profiles"}>Profiles</Link>
      </div>
    </div>
  );
};

export default Navbar;

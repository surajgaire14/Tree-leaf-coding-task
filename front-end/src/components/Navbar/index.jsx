import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-between px-5 py-3">
      <h1>Logo</h1>
      <div>
        <Link to={"/profiles"}>Profiles</Link>
      </div>
    </div>
  );
};

export default Navbar;

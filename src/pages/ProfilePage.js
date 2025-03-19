import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Welcome, {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Phone Number: {user.phone_number}</p>
      <button onClick={() => { handleLogout(); navigate("/login"); }}>Logout</button>
    </div>
  );
};

export default ProfilePage;

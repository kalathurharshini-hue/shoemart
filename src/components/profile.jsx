
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>My Profile</h1>

      <div className="profile-menu">
        <p>My Profile</p>

        <p onClick={() => navigate("/orders")}>
          My Orders
        </p>

        <p onClick={() => navigate("/login")}>
          Logout
        </p>
      </div>
    </div>
  );
}

export default Profile;
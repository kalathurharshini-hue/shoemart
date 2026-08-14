import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  return (
    <div className="profile-page">
      <h1>My Profile</h1>

      <div className="profile-card">
        <h2>{currentUser?.name || "Harshini"}</h2>

        <p>
          Email: {currentUser?.email || "your-email@example.com"}
        </p>

        <p>
          Phone: {currentUser?.phone || "Your Phone Number"}
        </p>

        <p>
          Location: {currentUser?.location || "India"}
        </p>
      </div>

      <button onClick={() => navigate("/orders")}>
        My Orders
      </button>
    </div>
  );
}

export default Profile;
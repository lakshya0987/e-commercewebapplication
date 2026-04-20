import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

function Profile({ user, handleUpdateProfile }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
        city: user.city || "",
        state: user.state || "",
        pincode: user.pincode || "",
        password: user.password || "",
      });
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleUpdateProfile({
      ...user,
      ...formData,
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="profile-top-row">
          <h1>My Profile</h1>
          <Link to="/" className="profile-back-btn">
            Back to Home
          </Link>
        </div>

        <p className="profile-subtitle">
          Update your personal details here.
        </p>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-grid">
            <div className="profile-field">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
              />
            </div>

            <div className="profile-field">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
              />
            </div>

            <div className="profile-field">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="profile-field">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
              />
            </div>

            <div className="profile-field">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter state"
              />
            </div>

            <div className="profile-field">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Enter pincode"
              />
            </div>
          </div>

          <div className="profile-field profile-field-full">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="4"
            />
          </div>

          <button type="submit" className="profile-save-btn">
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
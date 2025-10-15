import { useContext, useState, useEffect } from "react";
import { MyContext } from "../../App";
import { Box, Button, Paper, Typography, Divider, TextField, Avatar } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { editData, fetchDataFromApi, postData } from "../../utils/api";

const Account = () => {
  const { user, showAlert, setUser, isLogin } = useContext(MyContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [editUData, setEditData] = useState({ name: "", email: "", phone: "", avatar: "" });
  const [passwordData, setPasswordData] = useState({ current: "", newPass: "", confirm: "" });
  const [user1, setUser1] = useState({});
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if (localUser?.userId) {
      fetchDataFromApi(`/api/user/${localUser.userId}`).then((res) => {
        setUser1(res);
      });
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/signIn");
  }, [navigate]);

  useEffect(() => {
    setEditData({
      name: user1?.name || "",
      email: user1?.email || "",
      phone: user1?.phone || "",
      avatar: user1?.avatar || "",
    });
  }, [user1]);

  // ✅ Upload avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await postData("/api/user/upload/upload-avatar", formData)
      
      setEditData({ ...editUData, avatar: res.avatar });
      setPreview(URL.createObjectURL(file));
      showAlert("Avatar uploaded successfully!", "success");
    } catch (error) {
      console.error(error);
      showAlert("Failed to upload avatar", "error");
    }
  };

  // ✅ Cập nhật thông tin cá nhân
  const handleProfileUpdate = async () => {
    try {
      const res = await editData(`/api/user/${user1._id}`, editUData);
      showAlert("Profile updated successfully!", "success");
      setUser1(res.user);
      setUser(res.user);
    } catch (err) {
      console.error(err);
      showAlert("Profile update failed", "error");
    }
  };

  // ✅ Đổi mật khẩu
  const handleChangePassword = async () => {
    if (!passwordData.current || !passwordData.newPass || !passwordData.confirm) {
      showAlert("Please fill in all password fields", "warning");
      return;
    }

    if (passwordData.newPass !== passwordData.confirm) {
      showAlert("New password and confirm password do not match", "warning");
      return;
    }

    try {
      const resCheck = await postData(`/api/user/check-password/${user.userId}`, {
        password: passwordData.current,
      });

      if (!resCheck.valid) {
        showAlert("Current password is incorrect", "error");
        return;
      }

      if (passwordData.newPass.length < 6) {
        showAlert("Password must be at least 6 characters", "warning");
        return;
      }

      if (passwordData.newPass === passwordData.current) {
        showAlert("New password cannot be the same as current password", "warning");
        return;
      }

      await editData(`/api/user/${user1._id}`, { password: passwordData.newPass });
      showAlert("Password changed successfully!", "success");
      setPasswordData({ current: "", newPass: "", confirm: "" });
    } catch (err) {
      console.error(err);
      showAlert("Failed to change password", "error");
    }
  };

  if (!isLogin) return null;

  return (
    <Box sx={{ maxWidth: "900px", mx: "auto", mt: 5, mb: 5 }}>
      <Typography variant="h4" mb={3}>
        Account Page
      </Typography>

      {/* Tabs */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant={activeTab === "profile" ? "contained" : "outlined"} onClick={() => setActiveTab("profile")}>
          Edit Profile
        </Button>
        <Button variant={activeTab === "password" ? "contained" : "outlined"} onClick={() => setActiveTab("password")}>
          Change Password
        </Button>
        <Button variant={activeTab === "settings" ? "contained" : "outlined"} onClick={() => setActiveTab("settings")}>
          Other Settings
        </Button>
      </Box>

      <Divider />

      {/* 🧍 Profile Tab */}
      {activeTab === "profile" && (
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Typography variant="h6" mb={2}>Profile Info</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 3 }}>
            <Avatar
              src={preview ? preview : (editUData.avatar ? `http://localhost:4000/uploads/${editUData.avatar}` : "/default-avatar.png")}
              alt="User Avatar"
              sx={{ width: 100, height: 100 }}
            />
            <Button variant="outlined" component="label">
              Upload Avatar
              <input type="file" hidden accept="image/*" onChange={handleAvatarChange} />
            </Button>
          </Box>

          <TextField
            label="Name"
            fullWidth
            sx={{ mb: 2 }}
            value={editUData.name}
            onChange={(e) => setEditData({ ...editUData, name: e.target.value })}
          />
          <TextField
            label="Email"
            fullWidth
            sx={{ mb: 2 }}
            value={editUData.email}
            onChange={(e) => setEditData({ ...editUData, email: e.target.value })}
          />
          <TextField
            label="Phone"
            fullWidth
            sx={{ mb: 2 }}
            value={editUData.phone}
            onChange={(e) => setEditData({ ...editUData, phone: e.target.value })}
          />

          <Button variant="contained" onClick={handleProfileUpdate}>
            Save Changes
          </Button>
        </Paper>
      )}

      {/* 🔐 Password Tab */}
      {activeTab === "password" && (
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Typography variant="h6" mb={2}>Change Password</Typography>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={passwordData.current}
            onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
          />
          <TextField
            label="New Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={passwordData.newPass}
            onChange={(e) => setPasswordData({ ...passwordData, newPass: e.target.value })}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            sx={{ mb: 2 }}
            value={passwordData.confirm}
            onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
          />
          <Button variant="contained" onClick={handleChangePassword}>Change Password</Button>
        </Paper>
      )}

      {/* ⚙️ Other Settings */}
      {activeTab === "settings" && (
        <Paper sx={{ p: 3, mt: 3 }} elevation={3}>
          <Typography variant="h6" mb={2}>Other Settings</Typography>
          <Typography variant="body1">Here you can add other account-related settings, notifications, preferences, etc.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default Account;

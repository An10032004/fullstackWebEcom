import axios from "axios";

// https://fullstackecomserver.onrender.com
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get(`http://localhost:4000` + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  const { data } = await axios.post(`http://localhost:4000` + url, formData);
  return data;
};

export const editData = async (url, formData) => {
  const { data } = await axios.put(`http://localhost:4000${url}`, formData);
  return data;
};

export const deleteData = async (url, formData) => {
  const { res } = await axios.delete(`http://localhost:4000${url}`,formData);
  return res;
};
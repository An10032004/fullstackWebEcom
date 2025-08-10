import axios from "axios";
export const fetchDataFromApi = async (url) => {
  try {
    const { data } = await axios.get('http://localhost:4000' + url);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const postData = async (url, formData) => {
  const { res } = await axios.post("http://localhost:4000" + url, formData);
  return res;
};

export const editData = async (url, formData) => {
  const { res } = await axios.put(`http://localhost:4000${url}`, formData);
  return res;
};

export const deleteData = async (url, id) => {
  const { res } = await axios.delete(`http://localhost:4000${url}`);
  return res;
};
import axios from 'axios';

const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.post(baseUrl, newObject, config);
  return res.data;
};

const update = async (oldBlog) => {
  const config = {
    headers: { Authorization: token }
  };
  const newBlog = {
    user: oldBlog.user.id,
    likes: oldBlog.likes + 1,
    author: oldBlog.author,
    title: oldBlog.title,
    url: oldBlog.url,
  };
  const res = await axios.put(`${baseUrl}/${oldBlog.id}`, newBlog, config);
  return res.data;
};

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  };
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return res.status;
};

export default { getAll, create, setToken, update, deleteBlog };

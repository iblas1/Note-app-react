import axios from "axios";

const baseurl = "http://localhost:3001/api/notes";

const getAll = () => {
  const request = axios.get(baseurl);
  const nonExisting = {
    id: 10000,
    content: "This note is not saved to server",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  };
  return request.then((res) => res.data.concat(nonExisting));
};

const create = (obj) => {
  const request = axios.post(baseurl, obj);
  return request.then((res) => res.data);
};

const update = (obj, id) => {
  const request = axios.put(`${baseurl}/${id}`, obj);
  return request.then((res) => res.data);
};

export default {
  getAll,
  create,
  update,
};

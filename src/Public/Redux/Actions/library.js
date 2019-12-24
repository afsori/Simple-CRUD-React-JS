import Axios from "axios";

export const getLibrary = () => {
  return {
    type: "GET_LIBRARY",
    payload: Axios.get("http://localhost:7000/library")
  };
};

export const getById = id => {
  return {
    type: "GET_BYID",
    payload: Axios.get(
      `http://localhost:7000/library/library_id?library_id=${id}`
    )
  };
};

export const deleteId = id => {
  return {
    type: "DELETE",
    payload: Axios.delete(
      `http://localhost:7000/library/delete?library_id=${id}`
    )
  };
};

export const postLibrary = data => {
  return {
    type: "POST_LIBRARY",
    payload: Axios.post("http://localhost:7000/library/insert", data)
  };
};

export const editLibrary = (id, data) => {
  return {
    type: "EDIT_LIBRARY",
    payload: Axios.put(`http://192.168.6.122:9000/stay/edit/${id}`, data)
  };
};

export const search = id => {
  return {
    type: "SEARCH",
    payload: Axios.get(`http://localhost:7000/library/title/${id}`)
  };
};

// export const countUp = () => {
//   return {
//     type: 'COUNT_UP',
//     payload: 2,
//   };
// };

// export const countDown = () => {
//   return {
//     type: 'COUNT_DOWN',
//     payload: -1,
//   };
// };

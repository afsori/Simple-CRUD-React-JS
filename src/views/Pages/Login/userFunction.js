import axios from "axios";
// var jwtDecode = require("jwt-decode");

export const register = newUser => {
  return axios
    .post("http://localhost:7000/library/register", {
      username: newUser.username,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      console.log("Registered");
    });
};

export const login = user => {
  return axios
    .post("http://192.168.6.122:9000/admin/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("token", response.data.token);
      // localStorage.getItem("usertoken", response.data);

      return response.data.token;
      // console.log(response.data.token);
    })
    .catch(err => {
      console.log(err);
    });
};

export const transactions = user => {
  return axios
    .post("http://localhost:7000/library/transactions", {
      // library_id: user.library_id,
      // user_id: user.user_id,
      // date_borrow: user.date_borrow,
      // date_return: user.date_return
    })
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      console.log(error);
    });
};

export const getWishlist = id => {
  return axios
    .get(`http://localhost:7000/whishlist/${id}`)
    .then(response => {
      console.log("success get");
      return response.data.response;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getHistory = id => {
  return axios
    .get(`http://localhost:7000/library/history/${id}`)
    .then(response => {
      console.log("success get History");
      return response.data;
    })
    .catch(err => {
      return console.log(err);
    });
};
// export const postBorrow = user => {
//   return axios
//     .post("http://localhost:7000/library/transactions", {
//       library_id: user.library_id,
//       user_id: user.user_id,
//       date_borrow: user.date_borrow
//       // email: user.email,
//       // password: user.password
//     })
//     .then(response => {
//       console.log("Data Registered");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// };

// const jwtDecode = (req, res, next) => {
//   const token = req.token;
//   const jwtDecode = jwt.decode(token);
//   console.log("jwt decode", decode);
//   next();
// };

// module.exports = {
//   jwtDecode
// };

import { combineReducers } from "redux";

import library from "./library";
import postlibrary from "./library";
import getbyid from "./library";
import deleteId from "./library";
import editLibrary from "./library";
import search from "./library";

const appReducer = combineReducers({
  library,
  postlibrary,
  getbyid,
  deleteId,
  editLibrary,
  search
});

// const appReducer = combineReducers({
//   postlibrary // pokemons: pokemons // namaReducer: namaImport
// });

export default appReducer;

const initialState = {
  libraryData: [],
  counter: 0,
  isLoading: false,
  isRejected: false,
  isFulfilled: false
};

const library = (prevState = initialState, action) => {
  switch (action.type) {
    case "GET_LIBRARY_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_LIBRARY_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_LIBRARY_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response
      };

    case "GET_BYID_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "GET_BYID_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "GET_BYID_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response[0]
      };

    case "DELETE_BYID_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "DELETE_BYID_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "DELETE_BYID_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response[0]
      };

    case "POST_LIBRARY_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "POST_LIBRARY_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "POST_LIBRARY_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response
      };

    case "EDIT_LIBRARY_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "EDIT_LIBRARY_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "EDIT_LIBRARY_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response
      };

    case "SEARCH_PENDING":
      return {
        ...prevState,
        isFulfilled: false,
        isRejected: false,
        isLoading: true
      };
    case "SEARCH_REJECTED":
      return {
        ...prevState,
        isLoading: false,
        isRejected: true
      };
    case "SEARCH_FULFILLED":
      return {
        ...prevState,
        isLoading: false,
        isFulfilled: true,
        libraryData: action.payload.data.response
      };
    // case 'COUNT_DOWN_PENDING':
    //   return {
    //     ...prevState,
    //     isFulfilled: false,
    //     isRejected: false,
    //     isLoading: true,
    //   };
    // case 'COUNT_DOWN_REJECTED':
    //   return {
    //     ...prevState,
    //     isLoading: false,
    //     isRejected: true,
    //   };
    // case 'COUNT_DOWN_FULFILLED':
    //   return {
    //     ...prevState,
    //     isLoading: false,
    //     isFulfilled: true,
    //     counter: prevState.counter + action.payload,
    //   };

    default:
      return prevState;
  }
};

export default library;

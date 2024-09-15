export const regexList = {
  mobileNumber: /^(?=.*[0-9])[- +()0-9]+$/,
  alphabetString: /^[a-zA-Z]+$/,
  alphabetStringWithSpace: /^[a-zA-Z ]+$/,
  password: /^(?=.{7,20})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%]).*$/,
  numericString: /^[0-9]+$/,
  email: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
  addressString: /^[a-zA-Z0-9/(),.\- ]+$/,
  pincode: /^[4][0-9]{5}$/,
  pincodeAll: /^[1-9]{1}[0-9]{5}$/,
  adhaarNumber: /^\d{4}\s\d{4}\s\d{4}$/,
  alphabhetAndNumberOnlyWithSpace: /^[a-zA-Z0-9 ]+$/,
  url: /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g,
  weight: /^(500|[1-4]?[0-9]?[0-9])$/,
};

export const NO_INTERNET = "Check your internert connection.";
export const INTERNAL_SERVER_ERROR = "Something went wrong";

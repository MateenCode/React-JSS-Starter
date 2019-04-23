export default status => {
  switch (status) {
    case "0":
      return "Not Started";
    case "1":
      return "Picking Up";
    case "2":
      return "Picked Up";
    case "3":
      return "Delivering";
    case "4":
      return "Completed";
    case "5":
      return "Failed To Complete";
    case "6":
      return "Returned";
    default:
      return "Returned";
  }
};

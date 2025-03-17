import Swal from "sweetalert2";

export const showAlert = (type, message) => {
  return Swal.fire({
    icon: type,
    title: message,
    showConfirmButton: false,
    timer: 2500,
    width: "400px",
  });
};

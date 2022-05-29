import Swal from "sweetalert2/dist/sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export function alertSuccess(msg) {
  const swalSuccess = Swal.mixin({
    color: "#198754",
    confirmButtonColor: "#dc3545",
  });
  swalSuccess.fire({
    icon: "success",
    title: msg,
    // text: 'Something went wrong!',
  });
}

export function alertError(msg) {
  const swalError = Swal.mixin({
    color: "#495371",
    confirmButtonColor: "#dc3545",
  });
  swalError.fire({
    icon: "error",
    title: msg,
    // text: 'Something went wrong!',
  });
}

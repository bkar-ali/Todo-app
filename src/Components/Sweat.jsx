import "sweetalert2/dist/sweetalert2.min.css";
import Swal from "sweetalert2";

const Sweat = () => {
  return Swal.fire({
    title: "Task",
    html: `<input class="swal2-input title" placeholder="Task Title"/>
    <input class="swal2-input details" placeholder="Task Details"/>
    `,
    showCancelButton: true,
    confirmButtonText: "Add",
    focusConfirm: false,
    preConfirm: () => {
      const title = document.querySelector(".title").value;
      const details = document.querySelector(".details").value;

      if (!title || !details) {
        Swal.showValidationMessage("Please fill in both fields");
      }

      return { title, details };
    },

    customClass: {
      confirmButton: "bg-[#7066e0]",
      cancelButton: "bg-[#6e7881]",
    },
  });
  // }).then((result) => {
  //   if (result.isConfirmed) {
  //     console.log("New Task:", result.value);
  //     // تقدر هنا تبعتهم لـ setTodo وتضيفهم في اللستة
  //   }
  // });
};
export default Sweat;

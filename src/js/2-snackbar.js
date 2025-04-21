import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const numberInput = document.querySelector('input[name="delay"]');

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const delay = Number(document.querySelector('input[name="delay"]').value);
    const selectedState = document.querySelector('input[name="state"]:checked')?.value;
    
    if (!delay || !selectedState) {
        alert("Fill in delay and choose status");
        return;
    }

const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (selectedState ==="fulfilled") {
      resolve(`Fulfilled promise in ${delay}ms`);
    } else {
      reject(`Rejected promise in ${delay}ms`);
    }
  }, delay);
});

    promise
        .then(result => {
            iziToast.success({
                title: 'Ok',
                message: `Fulfilled promise in ${delay}ms, ${result}`,
                position: "topRight",
                backgroundColor: "#59a10d",
                messageColor: "#fff",
                timeout: 5000,
                progressBar: false,
                close: true,
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });
        })
        .catch(result => {
            iziToast.error({
                title: 'Error',
                message: `Rejected promise in ${delay}ms, ${result}`,
                position: "topRight",
                backgroundColor: "#ef4040",
                messageColor: "#fff",
                timeout: 5000,
                progressBar: false,
                close: true,
                transitionIn: 'fadeInDown',
                transitionOut: 'fadeOutUp',
            });
        });
    });
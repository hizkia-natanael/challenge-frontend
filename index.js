const grupForm = document.querySelectorAll(".form-group");
const elemenForm = document.querySelector("form");
const toast = document.querySelector(".toast");
let formValid = true;

elemenForm.setAttribute("novalidate", "");

// Fungsi untuk mengubah latar belakang radio yang dipilih
const ubahBgRadio = () => {
  document.querySelectorAll(".query-type").forEach(div => {
    div.classList.toggle("radio-selected", div.querySelector("input").checked);
  });
};

// Fungsi untuk menampilkan atau menyembunyikan pesan error
const tampilkanError = (grup, error, tampil) => {
  const pesanError = grup.querySelector(error);
  pesanError.classList.toggle("hidden", !tampil);
};

// Fungsi untuk validasi grup input
const validasiGrup = grup => {
  const input = grup.querySelector("input, textarea");
  const tipeInput = input.type || "text";
  const isValid = {
    radio: () => [...grup.querySelectorAll("input")].some(input => input.checked),
    checkbox: () => input.checked,
    text: () => input.value.trim() !== "",
    textarea: () => input.value.trim() !== "",
    email: () => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(input.value.trim())
  }[tipeInput]();

  if (!isValid) {
    tampilkanError(grup, ".error", true);
    formValid = false;
  } else {
    tampilkanError(grup, ".error", false);
  }
};

// Fungsi untuk menampilkan toast
const tampilkanToast = () => {
  toast.classList.remove("hidden");
  setTimeout(() => toast.classList.add("hidden"), 4000);
};

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('showToast') === 'true') {
    tampilkanToast();
    localStorage.removeItem('showToast');
  }
});

document.querySelectorAll(".query-type").forEach(div => {
  div.addEventListener("click", () => {
    div.querySelector("input").checked = true;
    ubahBgRadio();
    tampilkanError(div.parentElement.parentElement, ".error", false);
  });
});

elemenForm.addEventListener("submit", event => {
  event.preventDefault();
  formValid = true;
  grupForm.forEach(validasiGrup);
  if (formValid) {
    localStorage.setItem('showToast', 'true');
    elemenForm.submit();
  }
});

grupForm.forEach(grup => {
  grup.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("click", () => tampilkanError(grup, ".error", false));
    input.addEventListener("blur", () => validasiGrup(grup));
  });
});

toast.addEventListener("click", () => toast.classList.add("hidden"));

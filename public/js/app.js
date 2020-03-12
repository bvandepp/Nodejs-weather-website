const form = document.querySelector("form");
const search = document.querySelector("input");
const errorMsg = document.querySelector('#errorMsg')
const result = document.querySelector('#result')

form.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  errorMsg.textContent = "loading ...";
  result.textContent = '';

  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        errorMsg.textContent = data.error;
      } else {
        errorMsg.textContent = data.location;
        result.textContent = data.forecast;
      }
    });
  });
});

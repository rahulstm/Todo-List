let form = document.querySelector("form");
let input = document.querySelector("input");
let output = document.querySelector(".output");
let message = document.querySelector(".message-container");
let pdfButton = document.querySelector("#generate-pdf");

function getTodo(value) {
  let todo = document.createElement("div");
  let textEl = document.createElement("span");
  textEl.innerHTML = value;
  todo.appendChild(textEl);
  message.classList.toggle("success");
  message.textContent = "Item Added";

  setTimeout(() => {
    message.classList.toggle("success");
  }, 2000);

  let closeEl = document.createElement("span");
  closeEl.innerHTML = "&times;";
  closeEl.classList.add("delete");

  closeEl.addEventListener("click", () => {
    output.removeChild(todo);
    message.classList.toggle("error");
    message.textContent = "Item Deleted";

    setTimeout(() => {
      message.classList.toggle("error");
    }, 2000);
  });

  todo.appendChild(closeEl);
  todo.classList.add("todo");
  return todo;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let value = input.value;
  if (!value.trim()) return;
  output.appendChild(getTodo(value));
  input.value = "";
});

// PDF Generation Logic
pdfButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  let doc = new jsPDF();

  // Get all the to-do items
  let todos = document.querySelectorAll(".todo span:first-child");

  let yPosition = 10; // Starting y position for the text in the PDF
  todos.forEach((todo, index) => {
    doc.text(todo.innerText, 10, yPosition);
    yPosition += 10; // Adjust spacing between lines
  });

  // Save the PDF
  doc.save("todo-list.pdf");
});

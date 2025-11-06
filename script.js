const apiUrl = "http://localhost:8080/api/books";

async function loadBooks() {
  const response = await fetch(apiUrl);
  const books = await response.json();
  const list = document.getElementById("bookList");
  list.innerHTML = "";

  books.forEach(book => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <b>${book.title}</b> — ${book.author} — ₹${book.price} (${book.genre})
    `;
    list.appendChild(div);
  });
}

async function addBook() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const price = parseFloat(document.getElementById("price").value);
  const genre = document.getElementById("genre").value;

  const book = { title, author, price, genre };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  });

  loadBooks();
}

loadBooks();

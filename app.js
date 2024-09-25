const apiKey = "693b7922"; // Replace with your OMDB API key

// Handle login and signup (simple local storage for demo purposes)
// document.getElementById("loginBtn").addEventListener("click", () => {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Simple authentication
//   if (localStorage.getItem(username) === password) {
//     alert("Login successful!");
//     // Proceed to fetch trending movies
//   } else {
//     alert("Invalid credentials. Please signup or check your credentials.");
//   }
// });

// document.getElementById("signupBtn").addEventListener("click", () => {
//   const username = document.getElementById("username").value;
//   const password = document.getElementById("password").value;

//   // Simple signup
//   localStorage.setItem(username, password);
//   alert("Signup successful! You can now login.");
// });

fetchTrendingMovies();

// Fetch trending movies (for simplicity, using a fixed set)
async function fetchTrendingMovies() {
  const response = await fetch(
    `https://www.omdbapi.com/?s=batman&apikey=${apiKey}`
  );
  const data = await response.json();
  displayMovies(data.Search);
}

// Search for movies
document.getElementById("searchBtn").addEventListener("click", async () => {
  const query = document.getElementById("searchQuery").value;
  const response = await fetch(
    `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
  );
  const data = await response.json();
  displayMovies(data.Search);
});

// Display movies
function displayMovies(movies) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!movies) {
    resultsDiv.innerHTML = "<p>No movies found.</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.classList.add("bg-white", "p-4", "rounded", "shadow");
    movieDiv.innerHTML = `
            <h3 class="font-bold">${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="Poster" class="rounded">
        `;
    resultsDiv.appendChild(movieDiv);
  });
}

// Automatically fetch trending movies on page load
window.onload = fetchTrendingMovies;

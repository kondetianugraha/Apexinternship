
const images = [
  "https://picsum.photos/id/1015/600/400",
  "https://picsum.photos/id/1025/600/400",
  "https://picsum.photos/id/1035/600/400",
  "https://picsum.photos/id/1045/600/400"
];

let current = 0;
const imgEl = document.getElementById("carousel-img");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", () => {
  current = (current + 1) % images.length;
  imgEl.src = images[current];
});

prevBtn.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  imgEl.src = images[current];
});

const jokeBtn = document.getElementById("get-joke");
const jokeText = document.getElementById("joke-text");

jokeBtn.style.backgroundColor = "#007BFF"; 
jokeBtn.style.color = "#fff";
jokeBtn.style.border = "none";
jokeBtn.style.padding = "14px 28px";  
jokeBtn.style.fontSize = "1.2rem";
jokeBtn.style.borderRadius = "10px";
jokeBtn.style.cursor = "pointer";
jokeBtn.style.transition = "background 0.3s";

jokeBtn.addEventListener("mouseenter", () => {
  jokeBtn.style.backgroundColor = "#5d1de8ff"; 
});
jokeBtn.addEventListener("mouseleave", () => {
  jokeBtn.style.backgroundColor = "#7c9e85ff"; 
});

jokeBtn.addEventListener("click", async () => {
  jokeText.textContent = "Loading...";
  try {
    const response = await fetch("https://official-joke-api.appspot.com/random_joke");
    const data = await response.json();
    jokeText.textContent = `${data.setup} — ${data.punchline}`;
  } catch (error) {
    jokeText.textContent = "Failed to fetch joke";
  }
});

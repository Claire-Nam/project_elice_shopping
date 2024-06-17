const ourStory = document.getElementById("ourstory");
const best = document.getElementById("best");
const man = document.getElementById("men");
const women = document.getElementById("women");

document.addEventListener("DOMContentLoaded", () => {
  const allLink = document.getElementById("all");

  allLink.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("fds");

    const existingBorder = document.querySelector(".bordered");
    if (existingBorder) {
      existingBorder.classList.remove("bordered");
    }

    allLink.classList.add("bordered");
  });
});

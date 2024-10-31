const body = document.querySelector("body");
const skilsSec = document.querySelector(".skils");
const slide = document.querySelector(".slide");
const projectSec = document.querySelector(".project");
let btn = document.querySelectorAll(".btn i");
let circle;

// Text Write Animation For Wedsite

setTimeout(() => {
  const text = document.querySelector(".anime");
  const textAnime = () => {
    setTimeout(() => {
      text.textContent = "AbdElRahman";
    }, 0);
    setTimeout(() => {
      text.textContent = "Frontend ";
    }, 4000);
  };

  textAnime();
  setInterval(textAnime, 8000);
}, 2000);

// Control Json File Data

async function fetchData() {
  try {
    const response = await fetch("info.json");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    creatAbout(json["About"]);
    creatProject(json["Projects"]);
    creatSkils(json["Skils"]);
  } catch (error) {
    console.error("Error in:-", error);
  }
}
fetchData();

// Func To Creat My About Items

function creatAbout(about) {
  for (let i = 0; i < Object.keys(about).length; i++) {
    document.querySelector(
      ".about .container"
    ).innerHTML += `            <div class="info-card">
            <div class="info-field">
              <span class="label">${about[i].label}</span>
              <span class="value">${about[i].value}</span>
            </div>
          </div>`;
  }
}

// Func To Creat My Skils Items

function creatSkils(skils) {
  for (let i = 0; i < Object.keys(skils).length; i++) {
    document.querySelector(
      ".skils .container"
    ).innerHTML += `  <div class="proggers">
    <div class="circle" data-num="${skils[i].num}">
    <span class="num">0 %</span>
    </div>
    <span>${skils[i].name}</span>
    </div>
    </div>`;
  }
  circle = document.querySelectorAll(".circle");
}

// Func To Creat My Project Items

function creatProject(project) {
  for (let i = 0; i < Object.keys(project).length; i++) {
    slide.innerHTML += ` <div class="item">
              <img src="${project[i].img}" alt="" />
              <div class="text">
                <h3>${project[i].name}</h3>
                <a href="${project[i].link} "
                  >Open<i class="fa-solid fa-arrow-up-right-from-square"></i
                ></a>
              </div>
            </div>`;
  }
}

// Navigation Betwen My Projects

// Next Btn

btn[0].addEventListener("click", () => {
  let children = document.querySelectorAll(".item");
  document.querySelector(".slide").appendChild(children[0]);
});

// Prev Btn

btn[1].addEventListener("click", () => {
  let children = document.querySelectorAll(".item");
  document.querySelector(".slide").prepend(children[children.length - 1]);
});

// Control in My Projects Style

function width() {
  if (window.innerWidth >= 771) {
    slide.classList.add("show");
  } else {
    slide.classList.remove("show");
  }
}
window.addEventListener("resize", width);
window.addEventListener("load", width);

// Show My Skils And Poject

let hasAnimatedSkills = false;
let hasAnimatedProject = false;

function anime() {
  if (window.scrollY >= skilsSec.offsetTop - 300 && !hasAnimatedSkills) {
    hasAnimatedSkills = true;
    document.querySelector(".skils .container").style.transform = `scale(1)`;
    setTimeout(() => {
      count();
    }, 1000);
  }
}

function proAnime() {
  if (window.scrollY >= projectSec.offsetTop - 300 && !hasAnimatedProject) {
    hasAnimatedProject = true;
    document.querySelector(".project .container").style.transform = `scale(1)`;
  }
}

window.addEventListener("scroll", () => {
  anime();
  proAnime();
});

window.addEventListener("load", () => {
  anime();
  proAnime();
});

//  Counter My Skils Item
let num = 0;
let start = 0;

function count() {
  let count = setInterval(() => {
    num++;
    circle[start].children[0].innerHTML = `${num} %`;
    circle[start].style.backgroundImage = `conic-gradient(var(--main-color) ${
      num * 3.6
    }deg, #4949493d 0deg)`;

    if (start < circle.length && circle[start].dataset.num == num) {
      start++;
      num = 0;
    }
    if (start >= circle.length) {
      clearInterval(count);
    }
  }, 10);
}

// Button Control Scroll Window
let scrollBtn = document.querySelector("button");

window.onscroll = () => {
  if (window.scrollY >= 600) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }
};

scrollBtn.onclick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

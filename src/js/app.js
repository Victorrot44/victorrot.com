var popoverTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="popover"]')
);
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl);
});

const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll("#navbarCollapse ul li a");
const btnUp = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - sectionHeight / 4) {
      current = section.getAttribute("id");
    }
  });

  if (pageYOffset > 200) {
    btnUp.classList.add("d-block");
  } else {
    btnUp.classList.remove("d-block");
  }

  menuLinks.forEach((a) => {
    a.classList.remove("active");
    if (a.classList.contains(current)) {
      a.classList.add("active");
    }
  });

  btnUp.addEventListener("click", (e) => {
    e.preventDefault();
    document.body.scrollTop = 0;
    document.documentElement.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

$(document).ready(function () {
  Waves.init();

  var options = {
    animateClass: "animate__animated",
    animateThreshold: 50,
    scrollPollInterval: 20,
  };
  $(".aniview").AniView(options);

  const year = new Date();
  $("#year").html(year.getFullYear());
});

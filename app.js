let nextDom = document.getElementById("next");
let prevDom = document.getElementById("prev");

let carouselDom = document.querySelector(".carousel");
let SliderDom = carouselDom.querySelector(".carousel .list");
let thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
let timeDom = document.querySelector(".carousel .time");

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 2000;

nextDom.onclick = function () {
  showSlider("next");
};

prevDom.onclick = function () {
  showSlider("prev");
};

thumbnailItemsDom.forEach((thumbnail, index) => {
  thumbnail.onclick = function () {
    showSliderByIndex(index);
  };
});

let runTimeOut;
function showSlider(type) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  if (type === "next") {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    carouselDom.classList.add("next");
  } else {
    SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
    thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
    carouselDom.classList.add("prev");
  }
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
    carouselDom.classList.remove("prev");
  }, 500); // Mengurangi waktu tunggu agar tombol dapat digunakan terus
}

function showSliderByIndex(index) {
  let SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
  let thumbnailItemsDom = document.querySelectorAll(
    ".carousel .thumbnail .item"
  );

  while (index > 0) {
    SliderDom.appendChild(SliderItemsDom[0]);
    thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
    index--;
  }
  carouselDom.classList.add("next");
  clearTimeout(runTimeOut);
  runTimeOut = setTimeout(() => {
    carouselDom.classList.remove("next");
  }, 500);
}

// Menambahkan event listener untuk hide dan show thumbnail
thumbnailBorderDom.style.transition = "opacity 1s ease-in-out";
thumbnailBorderDom.style.opacity = "1";

let hideTimeout;
function hideThumbnails() {
  hideTimeout = setTimeout(() => {
    thumbnailBorderDom.style.opacity = "0.5"; // Semi transparan saat hide
  }, 2000);
}

function showThumbnails() {
  clearTimeout(hideTimeout);
  thumbnailBorderDom.style.opacity = "1";
  hideThumbnails();
}

thumbnailBorderDom.addEventListener("mouseenter", showThumbnails);
thumbnailBorderDom.addEventListener("mouseleave", hideThumbnails);
hideThumbnails();

// Menambahkan event listener untuk membesarkan thumbnail saat cursor menyentuh
thumbnailItemsDom.forEach((thumbnail) => {
  thumbnail.style.transition = "transform 0.3s ease-in-out";
  thumbnail.addEventListener("mouseenter", () => {
    thumbnail.style.transform = "scale(1.2)";
    clearTimeout(hideTimeout); // Menghentikan hide saat cursor menyentuh thumbnail
  });
  thumbnail.addEventListener("mouseleave", () => {
    thumbnail.style.transform = "scale(1)";
    hideThumbnails(); // Memulai kembali hide saat cursor meninggalkan thumbnail
  });
});

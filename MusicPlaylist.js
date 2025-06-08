const Icons = document.querySelectorAll(".icons .icon");
const Pages = document.querySelectorAll(".page");
const Container = document.querySelector(".sections");
const Sections = document.querySelectorAll(".sections section");
const Indicator = document.querySelector(".indicator");
const SettingsWindow = document.querySelector("#Settings");
const Back = document.querySelector("#Back");
const Play = document.querySelector("#Play");
const Pause = document.querySelector("#Pause");
const Audio = document.querySelector(".Audio");
const Prev = document.querySelector(".Prev");
const Next = document.querySelector(".Next");
const Progress = document.querySelector(".Progress");
const ToggleButton = document.querySelector(".ToggleButton");
const TBPlay = document.querySelector(".TBPlay");
const TBPause = document.querySelector(".TBPause");
const Favourite = document.querySelector(".favourites");
const Alert = document.querySelector(".alert");
const MaskCarousel = document.querySelector(".mask-carousel");
const Wrappers = document.querySelectorAll(".edit-panel .wrapper");
const Inputs = document.querySelectorAll(".edit-panel input");
const Errors = document.querySelectorAll(".edit-panel .error-message");
const Cover = document.querySelector(".Settings .Cover");
const Save = document.querySelector(".Settings .save");
const Background = document.querySelector(".Background");
const Add = document.querySelector(".Add");
const InsertDialog = document.querySelector(".insertDialog");
const InsertSave = document.querySelector("#insertSave");
const InsertCancel = document.querySelector("#insertCancel");
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".carousel .slide");
const settings = document.querySelector("#settings");
const container = document.querySelector(".Settings .container");
const pms = document.querySelectorAll(".pm");

const singers = document.querySelectorAll(".listContainer.num2 .item");
const albums = document.querySelectorAll(".listContainer.num3 .item");
const files = document.querySelectorAll(".listContainer.num4 .item");

let posters = ["song1.jpg", "song2.jpg", "song3.jpg", "song4.jpg"];
let Titles = ["البؤساء", "دو ري مي", "الحديقة السرية", "أنا وأخي"];
let Singers = ["رشا رزق", "رشا رزق", "هالة الصباغ", "هالة الصباغ"];
let Albums = ["البؤساء", "دو ري مي", "الحديقة السرية", "أنا وأخي"];
let titles = [];
let audios = ["Song1.mp3", "Song2.mp3", "Song3.mp3", "Song4.mp3"];
let Xs = ["X0", "X1", "X2", "X3"];


if ("ontouchstart" in document.documentElement) {document.body.classList.add("touch");document.body.classList.remove("mouse");}else{document.body.classList.add("mouse");document.body.classList.remove("touch");};


Xs.fill(0);

document.querySelector("#back").addEventListener("click", () => {

document.querySelector(".Controls").style.transition="0.3s ease-in-out";
setTimeout(() => {document.querySelector(".Controls").style.transition="none";document.querySelector(".Controls").scrollTop=0;},400);

document.querySelector(".Controls").classList.remove("active");
document.querySelector(".Body").style.overflowY="auto";});

document.querySelector(".ActiveItem .disk").addEventListener("click", () => {

document.querySelector(".Controls").style.transition="0.3s ease-in-out";
setTimeout(() => {document.querySelector(".Controls").style.transition="none";document.querySelector(".Controls").scrollTop=0;},400);

document.querySelector(".Controls").classList.add("active");
setTimeout(() => {document.querySelector(".Body").style.overflowY="hidden";},400);});

let alertTimeout; // Holds the timeout ID for Alert

function activateAlert() {

Alert.classList.add("active");
clearTimeout(alertTimeout); // Clear previous timeout
alertTimeout = setTimeout(() => {Alert.classList.remove("active");},1000);

}

// Play Options (Play - Autoplay - Replay - Random)
pms.forEach((pm, index) => {
  pm.addEventListener("click", () => {
    let A = index + 1;
    if (A == 4) A = 0;

    if (pms[index].classList.contains("active")) {
      pms[A].classList.add("active");
      pms[index].classList.remove("active");
    }

    // Set alert text based on the mode
    const modes = [
      "وضع التشغيل العادي",
      "وضع التشغيل التلقائي",
      "وضع التكرار",
      "وضع التشغيل العشوائي"
    ];

    Alert.innerHTML = modes[A];
    activateAlert();

  });
});

//Control the colors behind & after the thumb of slider
function calcValue() {

let valuePercentage = (Progress.value / Progress.max) * 100;

Progress.style.background = `linear-gradient(to right, rgba(252,252,252,1) ${valuePercentage}%, rgba(252,252,252,0.2) ${valuePercentage}%)`;}

Progress.value=0;
calcValue();

Progress.addEventListener("input",() => {
calcValue();
Audio.currentTime = Progress.value * Audio.duration;});

Progress.addEventListener("change",calcValue);

document.querySelector(".progress-section").addEventListener("click", () => {

if(Audio.paused){Audio.play();Play.style.display="flex";Pause.style.display="none";TBPlay.style.display="flex";TBPause.style.display="none";}
else{Audio.pause();Play.style.display="none";Pause.style.display="flex";TBPlay.style.display="none";TBPause.style.display="flex";}

});

ToggleButton.addEventListener("click", () => {

if(Audio.paused){Audio.play();Play.style.display="flex";Pause.style.display="none";TBPlay.style.display="flex";TBPause.style.display="none";}
else{Audio.pause();Play.style.display="none";Pause.style.display="flex";TBPlay.style.display="none";TBPause.style.display="flex";}

});

Icons.forEach((Icon, index) => {

Icon.addEventListener("click", () => {
document.querySelector(".icons .icon.active").classList.remove("active");
Icon.classList.add("active");
document.querySelector(".page.active").classList.remove("active");
Pages[index].classList.add("active");

});

});

let TotalWidth = 0;

for (let i = 0; i < Sections.length; i++) {
  TotalWidth += Sections[i].clientWidth + 50;
}

TotalWidth -= 30;

let X;


function scroll() {

setTimeout(() => {

  let offset = Sections[0].clientWidth + 60;
  let spacing = 50;
  
  for (let i = 2; i < Sections.length - 2; i++) {
    if (Sections[i].classList.contains("active")) {
      Container.scrollLeft = -offset;
      break;
    }
    offset += Sections[i].clientWidth + spacing;
    spacing += 0; // Optional if spacing increment stays constant
  }
  
  if (Sections[0].classList.contains("active") || Sections[1].classList.contains("active")) {
    Container.scrollLeft = 0;}

if (Sections[Sections.length - 2].classList.contains("active") || Sections[Sections.length - 1].classList.contains("active")) {

  Container.scrollLeft = -(Sections[0].clientWidth + Sections[1].clientWidth + Sections[2].clientWidth + Sections[3].clientWidth + 170);

}

},350);

}


let currentActiveIndex = -1;  // Keep track of the currently active section

// Handle scroll end (touchend)
const updateActiveSection = () => {
  const scrollPos = carousel.scrollLeft;
  const slideWidth = slides[0].offsetWidth;
  const index = Math.round(-scrollPos / slideWidth);

  Sections.forEach(sec => sec.classList.remove("active"));
  if (Sections[index]) Sections[index].classList.add("active");

  // Update indicator position
  let offset = 0;
  for (let i = 0; i < index; i++) {
    offset += Sections[i].clientWidth;
  }
  let padding = 50 * index;
  Indicator.style.right = `${Sections[index].clientWidth / 2 - 25 + X + padding + offset}px`;

  scroll();

  if (index === currentActiveIndex) {
    // Active section hasn't changed, no update needed
    return;
  }

  // Update current active index
  currentActiveIndex = index;
  document.querySelector(".delete-section .cancel").click();
  
};

updateActiveSection();

// Use touchend to detect when scroll ends
carousel.addEventListener("touchend", () => {
setTimeout(updateActiveSection, 100); // slight delay for inertia to settle
});


Sections.forEach((Section, index) => {

Section.addEventListener("click", () => {
document.querySelector(".sections .active").classList.remove("active");
Section.classList.add("active");
document.querySelector(".delete-section .cancel").click();

scroll();

Sections.forEach((section, index) => {
  if (section.classList.contains("active")) {
    let offset = 0;
    for (let i = 0; i < index; i++) {
      offset += Sections[i].clientWidth;
    }
    let padding = 50 * index; // adjust as needed
    Indicator.style.right = `${section.clientWidth / 2 - 25 + X + padding + offset}px`;
    carousel.scrollLeft = -index * slides[0].offsetWidth;
  }

});

});

});



function Resize() {

for (let i = 0; i < document.querySelectorAll(".mask").length; i++) {

if(document.querySelectorAll(".mask")[i].querySelector("span").offsetWidth >= 0.75*document.querySelectorAll(".mask")[0].offsetWidth){document.querySelectorAll(".mask")[i].querySelector("span").style.animation=`scroll-text ${document.querySelectorAll(".mask")[i].querySelector('span').offsetWidth / 30}s linear infinite`;}else{document.querySelectorAll(".mask")[i].querySelector("span").style.animation="none";document.querySelectorAll(".mask")[i].querySelector("span").style.transform="none";};

}

  const isMouse = document.body.classList.contains("mouse");
  const isShortScreen = window.innerHeight < 670;

  const rightImg = isMouse && isShortScreen ? "18px" : "10px";
  const rightText = isMouse && isShortScreen ? "78px" : "70px";

  // Slide 1
  document.querySelectorAll(".listContainer.num1 .item").forEach(item => {
    item.querySelector("img").style.right = rightImg;
    item.querySelector(".title").style.right = rightText;
  });


 // Slides 2 to 4
 document.querySelectorAll(".listContainer.num2 .item, .listContainer.num3 .item, .listContainer.num4 .item").forEach(item => {
  item.querySelector("img").style.right = rightImg;
  item.querySelector("h3").style.right = rightText;
});


if(window.innerWidth <= TotalWidth){
Container.style.justifyContent = "start";
X = 10;}

else{Container.style.justifyContent = "center";
X = (window.innerWidth - TotalWidth + 20)/2};

Indicator.style.right=`${Sections[0].clientWidth/2 - 25 + X}px`;

updateActiveSection();

}


Resize();

window.addEventListener("resize", Resize);

function empty() {

for (let i = 1; i <= 4; i++) {

  document.querySelector(`.slide:nth-child(${i}) .empty`).style.display = document.querySelectorAll(`.slide:nth-child(${i}) .item`).length === 0 ? "flex" : "none";
}

}



let pendingCoverImage = null;
let activeSettingIndex = null;
let dataChanged = false;
let isValid = true;
let isEditting = false;
let touchStartTime = 0;
let isSelecting = false;
let isScrolling = false;
let count = 0;

// Show loader initially
document.querySelector(".progress-loader").style.display="flex";
document.querySelector(".progress-section").style.display="none";
document.querySelector(".Controls .loading-container").style.opacity="1";

// When enough data is loaded to play, hide loader
  Audio.addEventListener('canplay', () => {
  document.querySelector(".progress-loader").style.display="none";
  document.querySelector(".progress-section").style.display="flex";
  document.querySelector(".Controls .loading-container").style.opacity="0";
  });

  // If Audio starts buffering later, show loader again
  Audio.addEventListener('waiting', () => {
  document.querySelector(".progress-loader").style.display="flex";
  document.querySelector(".progress-section").style.display="none";
  document.querySelector(".Controls .loading-container").style.opacity="1";
  });

  // When Audio resumes playing, hide loader
  Audio.addEventListener('playing', () => {
  document.querySelector(".progress-loader").style.display="none";
  document.querySelector(".progress-section").style.display="flex";
  document.querySelector(".Controls .loading-container").style.opacity="0";
  });


function PrevNext() {

if(document.querySelectorAll(".listContainer.num1 .item")[0].classList.contains("active")){Prev.style.opacity = "0.5";Prev.style.pointerEvents = "none";}else{Prev.style.opacity = "1";Prev.style.pointerEvents = "auto";};
if(document.querySelectorAll(".listContainer.num1 .item")[document.querySelectorAll(".listContainer.num1 .item").length - 1].classList.contains("active")){Next.style.opacity = "0.5";Next.style.pointerEvents = "none";}else{Next.style.opacity = "1";Next.style.pointerEvents = "auto";};

}


function activateText(index) {

  document.querySelector(".ActiveItem .disk img").src = posters[index];
  document.querySelector(".Controls img").src = posters[index];
  document.querySelector(".Controls h2").innerHTML = Titles[index];
  document.querySelector(".Controls .song-title").innerHTML = titles[index];
  
  }
  
  function activateTitle(index) {
  
  titles[index] = `${Albums[index]} | ${Singers[index]}`;
  document.querySelectorAll(".listContainer.num1 .item")[index].querySelector("h3").innerHTML = Titles[index];
  document.querySelectorAll(".listContainer.num1 .item")[index].querySelector("span").innerHTML = titles[index];
  document.querySelectorAll(".listContainer.num1 .item")[index].querySelector("img").src = posters[index];
  document.querySelectorAll(".mask")[index].querySelector("span").innerHTML = titles[index];
  if(document.querySelectorAll(".mask")[index].querySelector("span").offsetWidth >= 0.75*document.querySelectorAll(".mask")[0].offsetWidth){document.querySelectorAll(".mask")[index].querySelector("span").style.transform="translateX(-100%)";document.querySelectorAll(".mask")[index].querySelector("span").style.animation=`scroll-text ${document.querySelectorAll(".mask")[index].querySelector('span').offsetWidth / 30}s linear infinite`;}else{document.querySelectorAll(".mask")[index].querySelector("span").style.animation="none";document.querySelectorAll(".mask")[index].querySelector("span").style.transform="none";};
  
  }


function activateItem(index) {

// Show loader initially
document.querySelector(".progress-loader").style.display="flex";
document.querySelector(".progress-section").style.display="none";
document.querySelector(".Controls .loading-container").style.opacity="1";

  
//Check FavouriteIcon
if (document.querySelectorAll(".listContainer.num1 .item")[index].classList.contains("favourite")) {
    Favourite.classList.add("active");
  } else {
    Favourite.classList.remove("active");
  }

 
  // Update UI and audio playback
  document.querySelectorAll(".listContainer.num1 .item .PlayingNow").forEach(p => p.classList.remove("active"));
  document.querySelectorAll(".listContainer.num1 .item .PlayingNow")[index].classList.add("active");

  document.querySelector(".ActiveItem").style.bottom = "1px";
  activateText(index);

  Audio.pause(); // Stop any current playback
  Audio.src = audios[index]; // Set new source

// Remove previous event listener if necessary to avoid stacking
Audio.onloadedmetadata = () => {
  Audio.currentTime = Xs[index]; // Set the correct start time
  Progress.value = Audio.currentTime / Audio.duration;
  calcValue();

  // Now that metadata is loaded, attempt to play
  const playPromise = Audio.play();
  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.error('Playback error:', error);
    });
  }
};

  
  Play.style.display = "flex";
  Pause.style.display = "none";
  TBPlay.style.display = "flex";
  TBPause.style.display = "none";

  document.querySelector(".progress").style.transition = "none";
  document.querySelector(".progress").style.strokeDashoffset = "89";

  Audio.addEventListener("timeupdate", () => {
    if (!Audio.duration) return;

    document.querySelector(".progress").style.transition = "0.3s linear";
    document.querySelector(".progress").style.strokeDashoffset = `${89 * ((Audio.duration - Audio.currentTime) / Audio.duration)}`;

    Progress.value = Audio.currentTime / Audio.duration;
    calcValue();

    const timeDisplay = document.querySelector(".curtime");
    const Duration = document.querySelector(".durtime");

    const formatTime = (secondsTotal) => {
      const hours = Math.floor(secondsTotal / 3600);
      const minutes = Math.floor((secondsTotal % 3600) / 60);
      const seconds = Math.floor(secondsTotal % 60);
      let time = '';
      if (hours > 0) time += `${hours < 10 ? hours : String(hours).padStart(2, '0')}:`;
      if (hours > 0 || minutes >= 10) time += `${String(minutes).padStart(2, '0')}:`;
      else time += `${minutes}:`;
      time += String(seconds).padStart(2, '0');
      return time;
    };

    timeDisplay.textContent = formatTime(Audio.currentTime);
    Duration.textContent = formatTime(Audio.duration || 0);

    // Save current time to Xs
    for (let i = 0; i < document.querySelectorAll(".listContainer.num1 .item").length; i++) {
      if (document.querySelectorAll(".listContainer.num1 .item")[i].classList.contains("active")) {
        Xs[i] = Audio.ended ? 0 : Audio.currentTime;
      }
    }

    if (Audio.ended) {
      Play.style.display = "none";
      Pause.style.display = "flex";
      TBPlay.style.display = "none";
      TBPause.style.display = "flex";
      document.querySelector(".progress").style.strokeDashoffset = "90";
      document.querySelector(".progress").style.transition = "none";
    }
  });

  // Update button state
  Prev.style.opacity = index === 0 ? "0.5" : "1";
  Prev.style.pointerEvents = index === 0 ? "none" : "auto";
  Next.style.opacity = index === document.querySelectorAll(".listContainer.num1 .item").length - 1 ? "0.5" : "1";
  Next.style.pointerEvents = index === document.querySelectorAll(".listContainer.num1 .item").length - 1 ? "none" : "auto";

}


function load() {

document.querySelectorAll(".listContainer.num1 .item").forEach((Item, index) => {

Item.querySelector(".block").addEventListener("click", () => {


if(isSelecting) return;

document.querySelectorAll(".listContainer.num1 .item").forEach(Item => {
Item.classList.remove("active");});

Item.classList.add("active");

MaskCarousel.scrollLeft=-index*document.querySelectorAll(".mask")[0].offsetWidth
currentIndex = index;
activateItem(index);

});

activateTitle(index);

});


// Handle scroll end (touchend)
const updateActiveMask = () => {
  const scrollPos = MaskCarousel.scrollLeft;
  const MaskWidth = document.querySelectorAll(".mask")[0].offsetWidth;
  const index = Math.round(-scrollPos / MaskWidth);

  document.querySelectorAll(".listContainer.num1 .item").forEach(Item => Item.classList.remove("active"));
  if (document.querySelectorAll(".listContainer.num1 .item")[index]){
  document.querySelectorAll(".listContainer.num1 .item")[index].classList.add("active");
  activateItem(index);

}

};

MaskCarousel.addEventListener('touchend', () => {
  setTimeout(() => {
    const scrollPos = MaskCarousel.scrollLeft;
    const maskWidth = document.querySelectorAll(".mask")[0].offsetWidth;
    const index = Math.round(-scrollPos / maskWidth);

    if (index !== currentIndex && document.querySelectorAll(".listContainer.num1 .item")[index]) {
      currentIndex = index;
      document.querySelectorAll(".listContainer.num1 .item").forEach(Item => Item.classList.remove("active"));
      document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.add("active");
      activateItem(currentIndex);
      updateActiveMask();
    }
  },100); // slight delay for inertia to settle

});


//Settings Panel
document.querySelectorAll(".listContainer.num1 .item .settings").forEach((Setting,index) => {
  Setting.addEventListener("click", () => {
    Setting.querySelector(".circle").classList.add("active");
    setTimeout(() => {Setting.querySelector(".circle").classList.remove("active");document.querySelector(".Body").style.overflowY="hidden";}, 600);
    setTimeout(() => {
      
    SettingsWindow.style.transition="0.3s ease-in-out";
    setTimeout(() => {SettingsWindow.style.transition="none";},400);
    SettingsWindow.classList.add("active");}, 300);

    container.classList.remove("active");

    Cover.src = posters[index];
    Inputs[0].value = Titles[index];
    Inputs[1].value = Singers[index];
    Inputs[2].value = Albums[index];

    pendingCoverImage = null;
    activeSettingIndex = index;
    dataChanged = false;
    Save.classList.remove("active");
    clearErrors();

  });

});

// Monitor input changes for data and live error hiding
Inputs.forEach((input, i) => {
  input.addEventListener("input", () => {
    if (Errors[i].style.display === "flex" && input.value.trim() !== "") {
      Errors[i].style.display = "none";
    }

    if (activeSettingIndex !== null) {
      const value = input.value.trim();
      const changed =
        (i === 0 && value !== Titles[activeSettingIndex]) ||
        (i === 1 && value !== Singers[activeSettingIndex]) ||
        (i === 2 && value !== Albums[activeSettingIndex]);

      if (changed) {
        dataChanged = true;
        Save.classList.add("active");
      }
    }
  });
});

function clearErrors() {
  Errors.forEach(error => error.style.display = "none");
}


// Confirmation Dialog Elements
const confirmDialog = document.querySelector("#confirmDialog");
const confirmSaveBtn = document.querySelector("#confirmSave");
const confirmCancelBtn = document.querySelector("#confirmCancel");
const coverInput = document.querySelector("#coverInput");

settings.addEventListener("click", () => {
  settings.querySelector(".circle").classList.add("active");
  setTimeout(() => {settings.querySelector(".circle").classList.remove("active");}, 500);
  setTimeout(() => {document.querySelector(".Controls").style.overflowY="hidden";}, 1000);
  
  setTimeout(() => {

    SettingsWindow.style.transition="0.3s ease-in-out";
    setTimeout(() => {SettingsWindow.style.transition="none";},400);
    SettingsWindow.classList.add("active");
    document.querySelector(".Body").style.overflowY="hidden";}
  
  ,300);

  container.classList.remove("active");

  Cover.src = posters[currentIndex];
  Inputs[0].value = Titles[currentIndex];
  Inputs[1].value = Singers[currentIndex];
  Inputs[2].value = Albums[currentIndex];

  pendingCoverImage = null;
  activeSettingIndex = currentIndex;
  dataChanged = false;
  Save.classList.remove("active");
  clearErrors();
});

Save.addEventListener("click", () => {
  if (activeSettingIndex === null) return;

  let newSong = Inputs[0].value.trim();
  let newSinger = Inputs[1].value.trim();
  let newAlbum = Inputs[2].value.trim();

  isValid = true; // Reset before validation

  if (!newSong) {
    Errors[0].style.display = "flex";
    isValid = false;
  }
  if (!newSinger) {
    Errors[1].style.display = "flex";
    isValid = false;
//newSinger = "فنان غير معروف";
  }
  if (!newAlbum) {
    Errors[2].style.display = "flex";
    isValid = false;
//newAlbum = "ألبوم غير معروف";
  }

  if (!isValid) return;

  Titles[activeSettingIndex] = newSong;
  Singers[activeSettingIndex] = newSinger;
  Albums[activeSettingIndex] = newAlbum;
  titles[activeSettingIndex] = `${newAlbum} | ${newSinger}`;

  if (pendingCoverImage) {
    posters[activeSettingIndex] = pendingCoverImage;
    pendingCoverImage = null;
  }

activateText(currentIndex);
activateTitle(activeSettingIndex);

setTimeout(() => {SettingsWindow.style.transition="0.3s ease-in-out";
    setTimeout(() => {SettingsWindow.style.transition="none";SettingsWindow.scrollTop = 0;},400);
    SettingsWindow.classList.remove("active");}, 300);

  Alert.innerHTML = "تم حفظ التغييرات";
  activateAlert();
  dataChanged = false;
  setTimeout(() => {Save.classList.remove("active");},500);

if(document.querySelector(".Controls").classList.contains("active")){

document.querySelector(".Body").style.overflowY="hidden";
document.querySelector(".Controls").style.overflowY="auto";}else{

document.querySelector(".Body").style.overflowY="auto";

};
  clearErrors();
  Wrappers.forEach((Wrapper) => Wrapper.classList.remove("active"));

});

// Back button with change check
Back.addEventListener("click", () => {
  // Revalidate inputs before deciding to show confirm dialog
  let song = Inputs[0].value.trim();
  let singer = Inputs[1].value.trim();
  let album = Inputs[2].value.trim();
  let localValid = true;

  if (!song) localValid = false;
  if (!singer) localValid = false;
  if (!album) localValid = false;

  if (dataChanged && localValid) {
    confirmDialog.classList.add("active");
  } else {

    SettingsWindow.style.transition="0.3s ease-in-out";
    setTimeout(() => {SettingsWindow.style.transition="none";SettingsWindow.scrollTop = 0;},400);
    SettingsWindow.classList.remove("active");

    if(document.querySelector(".Controls").classList.contains("active")){

    document.querySelector(".Body").style.overflowY="hidden";
    document.querySelector(".Controls").style.overflowY="auto";}else{

    document.querySelector(".Body").style.overflowY="auto";

};

  }

  Wrappers.forEach((Wrapper) => Wrapper.classList.remove("active"));
  clearErrors();
});


// Confirmation dialog actions
confirmSaveBtn.addEventListener("click", () => {
  Save.click();
  confirmDialog.classList.remove("active");
});

confirmCancelBtn.addEventListener("click", () => {

  setTimeout(() => {SettingsWindow.classList.remove("active");
  SettingsWindow.style.transition="0.3s ease-in-out";
  setTimeout(() => {SettingsWindow.style.transition="none";SettingsWindow.scrollTop = 0;},400);
  SettingsWindow.classList.remove("active");
  },400);

  confirmDialog.classList.remove("active");
});

Wrappers.forEach((Wrapper) => {
  Wrapper.addEventListener("click", () => {
    Wrappers.forEach((w) => w.classList.remove("active"));
    Wrapper.classList.add("active");
  });
});

Background.addEventListener("click", () => {  Wrappers.forEach((Wrapper) => Wrapper.classList.remove("active"));});

//Initialize edit handlers for existing items on page load
const slideTypes = {
  2: "singer",
  3: "album",
  4: "file"
};

Object.entries(slideTypes).forEach(([num, type]) => {
  document.querySelectorAll(`.slide:nth-child(${num}) .item`).forEach((item, index) => {
    attachSettingsHandler(item, { type, slideIndex: index + 1 });
  });
});


empty();

  
}



let currentIndex = 0;

// Get the current active item index
currentIndex = Array.from(document.querySelectorAll(".listContainer.num1 .item")).findIndex(item => item.classList.contains("active"));


Audio.addEventListener("ended", () => {
 
  // Autoplay Mode
  if (autoplay.classList.contains("active")) {
    currentIndex++;
    if (currentIndex === document.querySelectorAll(".listContainer.num1 .item").length) {
      currentIndex = 0;
    }
  }

  // Replay Mode
  else if (replay.classList.contains("active")) {
     currentIndex = currentIndex; }

  // Random Mode
  else if (random.classList.contains("active")) {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * document.querySelectorAll(".listContainer.num1 .item").length);
    } while (newIndex === currentIndex && document.querySelectorAll(".listContainer.num1 .item").length > 1); // Avoid same track
    currentIndex = newIndex;
  }

  // No mode active
  else return;
  MaskCarousel.scrollLeft=-currentIndex*document.querySelectorAll(".mask")[0].offsetWidth
  document.querySelectorAll(".listContainer.num1 .item").forEach(Item => {
  Item.classList.remove("active");});

  document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.add("active");
  activateItem(currentIndex);

});

Next.addEventListener("click", () => {

if (currentIndex < document.querySelectorAll(".listContainer.num1 .item").length - 1) {
    currentIndex++;
    MaskCarousel.scrollLeft=-currentIndex*document.querySelectorAll(".mask")[0].offsetWidth;

document.querySelectorAll(".listContainer.num1 .item").forEach(Item => {
Item.classList.remove("active");});

document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.add("active");
activateItem(currentIndex);

}

});

Prev.addEventListener("click", () => {

if (currentIndex > 0) {
    currentIndex--;
    MaskCarousel.scrollLeft=-currentIndex*document.querySelectorAll(".mask")[0].offsetWidth;
   
document.querySelectorAll(".listContainer.num1 .item").forEach(Item => {
Item.classList.remove("active");});

document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.add("active");
activateItem(currentIndex);
  }

});



//Click on Favourite Icon
Favourite.addEventListener("click", () => {
 
  if (document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.contains("favourite")) {
  
  document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.remove("favourite");
  Favourite.classList.remove("active");
  Alert.innerHTML="تمت الإزالة من المفضلة";
  
  } else {
  
  document.querySelectorAll(".listContainer.num1 .item")[currentIndex].classList.add("favourite");
  Favourite.classList.add("active");
  Alert.innerHTML="تمت الإضافة للمفضلة";
  
  }
  
  activateAlert();
  
  });

  load();



document.querySelector(".Controls .List").addEventListener("click", () => {

document.querySelector(".Controls").classList.add("scrollbar");
document.querySelector(".Controls-background").classList.add("active");
document.querySelector(".Controls .MusicList").style.bottom = "20px";
document.querySelector(".music-container").appendChild(document.querySelector(".listContainer.num1"));

});

document.querySelector(".MusicList button").addEventListener("click", () => {

document.querySelector(".Controls").classList.remove("scrollbar");
document.querySelector(".Controls-background").classList.remove("active");
document.querySelector(".Controls .MusicList").style.bottom = "-300px";

setTimeout(() => {
document.querySelector(".slide:nth-child(1)").appendChild(document.querySelector(".listContainer.num1"));
},400);

});

document.querySelector(".Controls-background").addEventListener("click", () => {
document.querySelector(".MusicList button").click();

});

// Only run ONCE
coverInput.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file && file.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = () => {
      pendingCoverImage = reader.result;
      Cover.src = pendingCoverImage;
      dataChanged = true;
      Save.classList.add("active");
    };
    reader.readAsDataURL(file);
  }
  container.classList.add("active");
});

// Trigger file input when user clicks the cover
Cover.addEventListener("click", () => {
  coverInput.value = ""; // Reset so re-selecting the same image works
  coverInput.click();
});


// General setup function for slide groups
function setupSlideGroup(slideIndex) {

document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`).forEach(item => {

let touchStartX = 0;
let touchStartY = 0;


// Start event
const handleStart = (e) => {
  const touch = e.touches ? e.touches[0] : e;
  touchStartTime = Date.now();
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  isScrolling = false;
};

// Move event – detect scroll by measuring move distance
const handleMove = (e) => {
  const touch = e.touches ? e.touches[0] : e;
  const deltaX = Math.abs(touch.clientX - touchStartX);
  const deltaY = Math.abs(touch.clientY - touchStartY);

  if (deltaX > 10 || deltaY > 10) {
    isScrolling = true;
  }
};

// End event
const handleEnd = () => {
  if (isScrolling) return;

  const duration = Date.now() - touchStartTime;
  if (duration > 400) {
    isSelecting = true;
    if (Sections[0].classList.contains("active")) {
      document.querySelector(".ActiveItem").style.bottom = "-100px";
    }
    Add.classList.add("delete");
    item.classList.add("selected");
    item.querySelector(".check").style.animation = "Scale 0.3s";
    count++;
    updateDeleteUI(slideIndex);
  }
};

// Event listeners
item.addEventListener("touchstart", handleStart);
item.addEventListener("mousedown", handleStart);
item.addEventListener("touchmove", handleMove);
item.addEventListener("touchend", handleEnd);
item.addEventListener("mouseup", handleEnd);
    
    // Circle check click (toggle selection)
    item.querySelector(".check .circle").addEventListener("click", () => {
      if (!isSelecting) return;
      item.classList.toggle("selected");
      count += item.classList.contains("selected") ? 1 : -1;
      updateDeleteUI(slideIndex);
    });
  });

}

// Update delete UI and check visibility
function updateDeleteUI(slideIndex) {
  document.querySelector(".delete-section").style.display = "flex";
  document.querySelector(".delete-section span").textContent = `تم تحديد ${count} عناصر`;
  document.querySelector(".delete-section .delete").classList.toggle("active", count > 0);

  document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`).forEach(item => {

    item.querySelector(".check").style.transition = "0.3s";
    item.querySelector(".check").style.opacity = "1";
    item.querySelector(".check").style.pointerEvents = "auto";
    item.querySelector(".settings").style.display = "none";
  });
}

// Cancel selection for a specific slide group
function cancelSelection(slideIndex) {
  document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`).forEach(item => {
    item.classList.remove("selected");
    item.querySelector(".settings").style.display = "flex";
    item.querySelector(".check").style.animation = "none";
    item.querySelector(".check").style.transition = "none";
    item.querySelector(".check").style.opacity = "0";
    item.querySelector(".check").style.pointerEvents = "none";
  });

  document.querySelector(".delete-section").style.display = "none";
  document.querySelector(".delete-section .delete").classList.add("active");
  count = 0;
}

// Delete selected items in a slide group
function deleteSelected(slideIndex) {
  
  for (let i = document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`).length - 1; i >= 0; i--) {
    if (document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`)[i].classList.contains("selected")) {
      document.querySelectorAll(`.slide:nth-child(${slideIndex}) .item`)[i].remove();
      if (slideIndex === 1) {
        document.querySelectorAll(".mask")[i].remove();
        Titles.splice(i, 1);
        Singers.splice(i, 1);
        Albums.splice(i, 1);
        audios.splice(i, 1);
        posters.splice(i, 1);
        Xs.splice(i, 1);
   
      }
    }
  }

  cancelSelection(slideIndex);

}

// Set up all slide groups
[1, 2, 3, 4].forEach(slideIndex => setupSlideGroup(slideIndex));

// Handle Cancel button
document.querySelector(".delete-section .cancel").addEventListener("click", () => {
  isSelecting = false;
  [1, 2, 3, 4].forEach(cancelSelection);
  Add.classList.remove("delete");

  if (Sections[0].classList.contains("active")){

  document.querySelectorAll(".listContainer.num1 .item").forEach((Item,index) => {

  if (document.querySelectorAll(".listContainer.num1 .item")[index].classList.contains("active")){document.querySelector(".ActiveItem").style.bottom = "1px";};

});

}

});

// Handle Delete button
document.querySelector(".delete-section .delete").addEventListener("click", () => {
 
document.querySelector("#DeleteDialog").classList.add("active");

});

document.querySelector("#confirm-Cancel").addEventListener("click", () => {

document.querySelector(".delete-section .cancel").click();
document.querySelector("#DeleteDialog").classList.remove("active");

}); 

// Handle Delete button
document.querySelector("#confirm-Delete").addEventListener("click", () => {

PrevNext();

  document.querySelectorAll(".listContainer.num1 .item").forEach((Item,index) => {

    if (document.querySelectorAll(".listContainer.num1 .item")[index].classList.contains("selected") && document.querySelectorAll(".listContainer.num1 .item")[index].classList.contains("active")){Audio.src = null;};
  
  });

  [1, 2, 3, 4].forEach(deleteSelected);

  isSelecting = false;

  Add.classList.remove("delete");

  if (Sections[0].classList.contains("active")){

    document.querySelectorAll(".listContainer.num1 .item").forEach((Item,index) => {

      if (document.querySelectorAll(".listContainer.num1 .item")[index].classList.contains("active")){document.querySelector(".ActiveItem").style.bottom = "1px";};
    
    });
  }


  load();
  
  document.querySelector("#DeleteDialog").classList.remove("active");

});

let SlideIndex = 1;

function initializeItemEvents(Item) {

let touchStartX = 0;
let touchStartY = 0;


// Start event
const handleStart = (e) => {
  const touch = e.touches ? e.touches[0] : e;
  touchStartTime = Date.now();
  touchStartX = touch.clientX;
  touchStartY = touch.clientY;
  isScrolling = false;
};

// Move event – detect scroll by measuring move distance
const handleMove = (e) => {
  const touch = e.touches ? e.touches[0] : e;
  const deltaX = Math.abs(touch.clientX - touchStartX);
  const deltaY = Math.abs(touch.clientY - touchStartY);

  if (deltaX > 10 || deltaY > 10) {
    isScrolling = true;
  }
};

// End event
const handleEnd = () => {
  if (isScrolling) return;

  const duration = Date.now() - touchStartTime;
  if (duration > 400) {
    isSelecting = true;
    if (Sections[0].classList.contains("active")) {
      document.querySelector(".ActiveItem").style.bottom = "-100px";
    }
    Add.classList.add("delete");
    Item.classList.add("selected");
    Item.querySelector(".check").style.animation = "Scale 0.3s";
    count++;
    updateDeleteUI(SlideIndex);
    
  }
};

// Event listeners
Item.addEventListener("touchstart", handleStart);
Item.addEventListener("mousedown", handleStart);
Item.addEventListener("touchmove", handleMove);
Item.addEventListener("touchend", handleEnd);
Item.addEventListener("mouseup", handleEnd);
  

  // Handle tap to select/deselect in selection mode
  Item.querySelector(".check .circle").addEventListener("click", () => {
    if (isSelecting) {
      Item.classList.toggle("selected");
      count += Item.classList.contains("selected") ? 1 : -1;
      const deleteBtn = document.querySelector(".delete-section .delete");
      deleteBtn.classList.toggle("active", count > 0);
      document.querySelector(".delete-section span").innerHTML = `تم تحديد ${count} عناصر`;
    }
  });
}


let currentInsertType = null;
let editingElement = null;

// Add button click
Add.addEventListener("click", () => {
  // Section 0 - Upload audio
  if (Sections[0].classList.contains("active")) {
    SlideIndex = 1;
    const audioUpload = document.createElement("input");
    audioUpload.type = "file";
    audioUpload.accept = "audio/*";

    audioUpload.addEventListener("change", (event) => {
      const file = event.target.files[0];
      if (file) {
        const audioUrl = URL.createObjectURL(file);
        audios.push(audioUrl);

        const Item = document.createElement("li");
        const Mask = document.createElement("li");

        Item.className = "item";
        Mask.className = "mask";

        Item.innerHTML = `
          <img src="">
          <section class="title"><h3>New Song</h3><span>${file.name}</span></section>
          <div class="block"></div>
          <div class="settings">
            <div class="circle"></div>
            <svg style="position:absolute;" width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M20 23.75C20.8284 23.75 21.5 24.4216 21.5 25.25C21.5 26.0785 20.8285 26.75 20 26.75C19.1716 26.75 18.5 26.0784 18.5 25.25C18.5 24.4216 19.1716 23.75 20 23.75ZM20 18.5C20.8284 18.5 21.5 19.1716 21.5 20C21.5 20.8285 20.8285 21.5 20 21.5C19.1716 21.5 18.5 20.8284 18.5 20C18.5 19.1716 19.1716 18.5 20 18.5ZM20 13.25C20.8284 13.25 21.5 13.9216 21.5 14.75C21.5 15.5785 20.8285 16.25 20 16.25C19.1716 16.25 18.5 15.5784 18.5 14.75C18.5 13.9216 19.1716 13.25 20 13.25Z" fill="#A3A3A3"/>
            </svg>
          </div>
          <div class="PlayingNow">
            <section class="rect"></section>
            <section class="rect"></section>
            <section class="rect"></section>
            <section class="rect"></section>
          </div>

          <div class="check">
          <div class="circle">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 10.5L8.47487 12.9749C8.53996 13.04 8.64549 13.04 8.71058 12.9749L14.2496 7.43587" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          </div>
          </div>
        `;

        Mask.innerHTML = `<span></span>`;
        document.querySelector(".listContainer.num1 .list").appendChild(Item);
        document.querySelector(".mask-carousel").appendChild(Mask);
        Titles.push(audioUrl);
        Singers.push("فنان غير معروف");
        Albums.push("ألبوم غير معروف");
        posters.push("default.jpg");
        Xs.push(0);
        PrevNext();
        load();
        Resize();
        initializeItemEvents(Item);
      }
     empty();
    });

    audioUpload.click();
    return;
  }

  // Section 1 - Add singer
  if (Sections[1].classList.contains("active")) {
    SlideIndex = 2;
    openInsertDialog("اسم الفنان", "الرجاء إدخال اسم الفنان", "singer", 2);
  }
  // Section 2 - Add album
  else if (Sections[2].classList.contains("active")) {
    SlideIndex = 3;
    openInsertDialog("اسم الألبوم", "الرجاء إدخال اسم الألبوم", "album", 3);
  }
  // Section 3 - Add file/folder
  else if (Sections[3].classList.contains("active")) {
    SlideIndex = 4;
    openInsertDialog("اسم المجلد", "الرجاء إدخال اسم المجلد", "file", 4);
  }


});

// Attach settings button handler
function attachSettingsHandler(item, insertType) {
  const settings = item.querySelector(".settings");

  // Remove any existing click listener (prevent stacking)
  const newSettings = settings.cloneNode(true);
  settings.parentNode.replaceChild(newSettings, settings);

  newSettings.addEventListener("click", () => {
    newSettings.querySelector(".circle").classList.add("active");

    setTimeout(() => {
      newSettings.querySelector(".circle").classList.remove("active");

      openInsertDialog(
        insertType.type === "singer" ? "اسم الفنان" :
        insertType.type === "album" ? "اسم الألبوم" :
        "اسم المجلد",
        insertType.type === "singer" ? "الرجاء إدخال اسم الفنان" :
        insertType.type === "album" ? "الرجاء إدخال اسم الألبوم" :
        "الرجاء إدخال اسم المجلد",
        insertType.type,
        insertType.slideIndex,
        item
      );

      InsertDialog.querySelector(".wrapper").classList.add("active");
    }, 400);
  });
}

// Open insert dialog
function openInsertDialog(labelText, errorText, type, slideIndex, element = null) {
  currentInsertType = { type, slideIndex };
  editingElement = element;

  const input = InsertDialog.querySelector("input");
  const label = InsertDialog.querySelector("label");
  const error = InsertDialog.querySelector("span");
  const wrapper = InsertDialog.querySelector(".wrapper");

  input.value = element ? element.querySelector("h3").textContent : "";
  label.textContent = labelText;
  error.textContent = errorText;
  error.style.display = "none";
  wrapper.classList.remove("active");

  InsertDialog.classList.add("active");

  wrapper.addEventListener("click", () => {
    wrapper.classList.add("active");
  }, { once: true });

  input.addEventListener("input", () => {
    if (error.style.display === "flex" && input.value.trim() !== "") {
      error.style.display = "none";
    }
  });
}

// Insert save button
InsertSave.addEventListener("click", () => {
  if (isEditting) return;

  const input = InsertDialog.querySelector("input");
  const error = InsertDialog.querySelector("span");
  const name = input.value.trim();
  const wrapper = InsertDialog.querySelector(".wrapper");

  if (!name) {
    error.style.display = "flex";
    return;
  }

  if (editingElement) {
    editingElement.querySelector("h3").textContent = name;
  } else {
    const Item = document.createElement("li");
    Item.className = "item";

    let imgSrc = {
      singer: "Singer.jpg",
      album: "Album.jpg",
      file: "File.svg"
    }[currentInsertType.type];

    Item.innerHTML = `
      <img src="${imgSrc}">
      <h3>${name}</h3>
      <div class="block"></div>
      <div class="settings">
        <div class="circle"></div>
        <svg style="position:absolute;" width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M20 23.75C20.8284 23.75 21.5 24.4216 21.5 25.25C21.5 26.0785 20.8285 26.75 20 26.75C19.1716 26.75 18.5 26.0784 18.5 25.25C18.5 24.4216 19.1716 23.75 20 23.75ZM20 18.5C20.8284 18.5 21.5 19.1716 21.5 20C21.5 20.8285 20.8285 21.5 20 21.5C19.1716 21.5 18.5 20.8284 18.5 20C18.5 19.1716 19.1716 18.5 20 18.5ZM20 13.25C20.8284 13.25 21.5 13.9216 21.5 14.75C21.5 15.5785 20.8285 16.25 20 16.25C19.1716 16.25 18.5 15.5784 18.5 14.75C18.5 13.9216 19.1716 13.25 20 13.25Z" fill="#A3A3A3"/>
        </svg>
      </div>

      <div class="check">
      <div class="circle">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 10.5L8.47487 12.9749C8.53996 13.04 8.64549 13.04 8.71058 12.9749L14.2496 7.43587" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      </svg>
      </div>
      </div>
    `;

    document.querySelector(`.slide:nth-child(${currentInsertType.slideIndex}) .list`).appendChild(Item);
    Resize();
    attachSettingsHandler(Item, currentInsertType);
    initializeItemEvents(Item);
    empty();
  }

  InsertDialog.classList.remove("active");
  editingElement = null;
  setTimeout(() => {wrapper.classList.remove("active");},400);
 
});

// Insert cancel button
InsertCancel.addEventListener("click", () => {
  editingElement = null;

  const input = InsertDialog.querySelector("input");
  const error = InsertDialog.querySelector("span");
  const wrapper = InsertDialog.querySelector(".wrapper");

  input.value = "";
  error.style.display = "none";
  InsertDialog.classList.remove("active");
  wrapper.classList.remove("active");
});

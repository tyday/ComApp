/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fncBtnDropClick(eleID) {
  document.getElementById(eleID).classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (
    !event.target.matches(".toggleDropdown") &&
    // !event.target.matches(".dropbtn") &&
    !event.target.matches(".rt-buttons")
  ) {
    var dropdowns = document.getElementsByClassName("dropdown-toggle");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function getScrollToPosition(previousSection, newSection) {
  // returns scroll position
  if (previousSection == newSection) {
    // This happens on reload. -1 allows browser to define scroll position
    return -1;
  }
  localStorage[previousSection + "ScrollPosition"] = window.pageYOffset;
  if (localStorage.hasOwnProperty(newSection + "ScrollPosition")) {
    return localStorage[newSection + "ScrollPosition"];
  } else {
    return 0;
  }
}

/**********
 * open tabs that correspond to menu name or front page button
 * https://www.w3schools.com/howto/howto_js_tab_header.asp
 */
function openSection(sctName) {
  previousSection = localStorage.currentSection;
  scrollToPosition = getScrollToPosition(previousSection, sctName);

  localStorage.currentSection = sctName;
  localStorage.time_of_last_section_selection = Date.now();
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  if ((sctName == "sctSchedule") | (sctName == "sctFavorites") |(sctName == "sctSpeakers_&_Workshops")) {
    // document.getElementById('filterButton').style.visibility = "visible";
    document.getElementById("filterButton").classList.add("show");
    document.getElementById("filterButton").classList.remove("hide");
    if (sctName == "sctSchedule") {
      document.getElementById("btn-return").classList.add("remove");
      document.getElementById("btn-return").classList.remove("show");
      document.getElementById("btn-favorites").classList.add("show");
      document.getElementById("btn-favorites").classList.remove("remove");
    } else {
      document.getElementById("btn-favorites").classList.add("remove");
      document.getElementById("btn-favorites").classList.remove("show");
      document.getElementById("btn-return").classList.add("show");
      document.getElementById("btn-return").classList.remove("remove");
    }
  } else {
    // document.getElementById('filterButton').style.visibility = "hidden";
    document.getElementById("filterButton").classList.remove("show");
    document.getElementById("filterButton").classList.add("hide");
  }
  // Show the specific tab content
  try {
    document.getElementById(sctName).style.display = "block";
    history.pushState({ section: sctName }, sctName, `?page=${sctName}`);
  } catch (e) {
    console.error(`Failed to display page: ${sctName}\n${e}`);
  }
  document.getElementById("pagetitle").innerHTML = sctName
    .slice(3)
    .replace(/_/g, " ");

  // Set scroll position to saved value
  // unless this is a reload which returns -1
  if (scrollToPosition > -1) {
    window.scrollTo(0, scrollToPosition);
  }
}

function findCommonality(list_one, list_two) {
  return list_one.some(function(list_one_val) {
    return list_two.contains(list_one_val);
  });
}

function toggleSlot(showstage) {
  var stage = "stage-" + showstage.slice(5);
  var elementID = "btn-" + showstage.slice(5);
  var show = "show-" + showstage.slice(5);
  var slots = document.getElementsByClassName(showstage);
  var button = document.getElementById(elementID);
  let filteredList = JSON.parse(localStorage.filteredList);
  //
  //if(!card.className.includes(stage))
  //
  // Toggles filter button on
  if (button.dataset.visible === "false") {
    var index = filteredList.indexOf(show);
    if (index > -1) {
      filteredList.splice(index, 1);
    }
    var setDisplay = "grid";
    button.dataset.visible = "true";
    button.classList.add(stage);
  } else {
    // Toggles filter button off
    var setDisplay = "none";
    button.dataset.visible = "false";
    button.classList.remove(stage);
    if (!filteredList.includes(show)) {
      filteredList.push(show);
    }
  }
  localStorage.filteredList = JSON.stringify(filteredList);
  for (i = 0; i < slots.length; i++) {
    if (setDisplay == "none") {
      slots[i].style.display = "none";
    } else {
      /// Check to see if card has other filters
      if (!findCommonality(filteredList, slots[i].classList)) {
        slots[i].style.display = setDisplay;
      }
    }
  }
  searchActs_2()
}

/***************
 * Grab the Band data from PHP file
 * findBandInfo.php
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 *
 */
function getBandData(data) {
  var url = "api/findBandInfo.php";
  return fetch(url, {
    body: JSON.stringify(data),
    cache: "default",
    credentials: "same-origin",
    headers: {
      "user-agent": "Mozilla/4.0",
      "content-type": "application/json"
    },
    method: "POST",
    mode: "cors",
    redirect: "follow",
    referrer: "no-referrer"
  }).then(response => response.json());
}
function addOrRemoveFavoriteFromStorage(performer) {
  favoriteList = JSON.parse(localStorage.favorites);
  if (favoriteList.includes(performer)) {
    favoriteList = favoriteList.filter(item => item != performer);
    localStorage.favorites = JSON.stringify(favoriteList);
  } else {
    favoriteList.push(performer);
    localStorage.favorites = JSON.stringify(favoriteList);
  }
}
function toggleFavorite(event) {
  // console.log(event);
  event.stopPropagation();
  // console.log("toggleFavorite Fired");
  // this.parentElement.classList.add('card-favorite')
  const card = this.parentElement;
  addOrRemoveFavoriteFromStorage(this.parentElement.dataset.performer);
  if (card.classList.contains("show-favorite")) {
    if (card.parentElement == "sctSchedule") {
      card.classList.remove("show-favorite");
    } else {
      performancelist = document.getElementById("performancelist");
      cardList = performancelist.childNodes;
      for (item of cardList) {
        if (item.isEqualNode(card)) {
          item.classList.remove("show-favorite");
        }
      }
    }

    // Remove card from sctFavorites
    sctFavorites = document.getElementById("sctFavorites");
    cardList = sctFavorites.childNodes;
    for (favorite_card of cardList) {
      if (card.isEqualNode(favorite_card)) {
        sctFavorites.removeChild(favorite_card);
      }
    }
  } else {
    card.classList.add("show-favorite");
    // Add to sctFavorites
    copyCardToFavorites(card);
  }
}
function copyCardToFavorites(card) {
  sctFavorites = document.getElementById("sctFavorites");
  newCard = card.cloneNode(true);
  newCard.style.display = "grid";
  eleFavorite = newCard.getElementsByClassName("card-favorite-icon");
  eleFavorite[0].addEventListener("click", toggleFavorite);
  sctFavorites.appendChild(newCard);
}

function register_serviceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").then(function() {
      // console.log("Service Worker Registered");
    });
  }
}

/*****
 * Events to download performer list
 * Set to happen after window loads to prevent slow load
 */
window.addEventListener("load", afterLoadEvents);

/****
 * Add android/chrome install listener
 */
window.addEventListener("beforeinstallprompt", e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  androidCallout = document.getElementById("android-callout");
  if (!localStorage.hasOwnProperty("canceledAndroidInstall")) {
    androidCallout.style.display = "flex";
  }
});
function button_listeners() {
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  btnReload = document.getElementById("app_reload_page");
  btnReload.addEventListener("click", e => {
    // window.location.reload(true);
    if (isIos()) {
      console.log("reload");
      location.href = location.href;
    } else {
      window.location.reload(true);
    }
  });
  btnReset = document.getElementById("app_reset_app");
  btnReset.addEventListener("click", e => {
    localStorage.clear();
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      // https://stackoverflow.com/questions/33704791/how-do-i-uninstall-a-service-worker
      for (let registration of registrations) {
        registration.unregister();
      }
    });
    if (isIos()) {
      console.log("reload");
      location.href = location.href;
    } else {
      window.location.reload(true);
    }
  });
  android_add_buttons = document.getElementsByClassName(
    "android-callout-button-add"
  );
  for (var i = 0; i < android_add_buttons.length; i++) {
    android_add_buttons[i].addEventListener("click", e => {
      // hide our user interface that shows our A2HS button
      // btnAdd.style.display = 'none';
      // Show the prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      deferredPrompt.userChoice.then(choiceResult => {
        androidCallout = document.getElementById("android-callout");
        androidCallout.style.display = "none";
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the A2HS prompt");
        } else {
          console.log("User dismissed the A2HS prompt");
        }
        deferredPrompt = null;
      });
    });
  }

  document
    .getElementById("android-callout-button-cancel")
    .addEventListener("click", e => {
      const cancelAndroidInstall = () => {
        if (localStorage.hasOwnProperty("canceledAndroidInstall")) {
          return true;
        } else {
          localStorage.canceledAndroidInstall = "true";
          return false;
        }
      };
      cancelAndroidInstall();
      // Remove the parent element
      e.srcElement.parentElement.style.display = "none";
    });
}

function clearFilter() {
  document.getElementById('searchDropDown').value = ""
  searchActs_2()
  if (localStorage.hasOwnProperty("filteredList")) {
    localStorage.filterList = JSON.stringify([]);
    initializeScheduleFilter();
  }
}
async function initializeScheduleFilter() {
  if (!localStorage.hasOwnProperty("filteredList")) {
    localStorage.filteredList = JSON.stringify([]);
    // console.log(localStorage.filteredList);
  } else {
    // console.log("attempt to run initialize schedule filter");
    for (let listItem of JSON.parse(localStorage.filteredList)) {
      // console.log(listItem);
      toggleSlot(listItem);
    }
  }
}
function initializeApp() {
  // Opens app to the last page user was on
  // resets to first page after 24 hours
  if (!localStorage.hasOwnProperty("currentSection")) {
    localStorage.currentSection = "sctCOMFEST";
  }
  if (!localStorage.hasOwnProperty("time_of_last_section_selection")) {
    localStorage.time_of_last_section_selection = Date.now();
  }

  const milliseconds_since_last_selection =
    Date.now() - localStorage.time_of_last_section_selection;
  const milliseconds_in_a_day = 86400000; //10000;
  if (milliseconds_since_last_selection < milliseconds_in_a_day) {
    openSection(localStorage.currentSection);
  } else {
    openSection("sctCOMFEST");
  }
}

function initializeFavorites() {
  // console.log("initialize favorites fired");
  if (!localStorage.hasOwnProperty("favorites")) {
    localStorage.favorites = JSON.stringify([]);
  } else {
    favorites = JSON.parse(localStorage.favorites);
    // console.log(favorites);
    cardList = document.getElementsByClassName("slot-card");
    // filterList = Array.prototype.filter(cardList => favorites.includes(cardList.dataset.performer))
    filterList = Array.prototype.filter.call(cardList, function(card) {
      return favorites.includes(card.dataset.performer);
    });
    filterList.forEach(card => {
      // console.log("this should add cards to favorite");
      card.classList.add("show-favorite");
      copyCardToFavorites(card);
    });
    // console.log(filterList);
  }

  // Detects if device is on iOS
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test(userAgent);
  };
  // Detects if device is in standalone mode
  const isInStandaloneMode = () =>
    "standalone" in window.navigator && window.navigator.standalone;
  // Detects if device has seen this user before
  const isRepeatVisitor = () => {
    if (localStorage.hasOwnProperty("visitedBefore")) {
      return true;
    } else {
      localStorage.visitedBefore = "true";
      return false;
    }
  };
  // Checks if should display install popup notification:
  if (!isRepeatVisitor() && isIos() && !isInStandaloneMode()) {
    iOSCallout = document.getElementById("iOS-callout");
    iOSCallout.style.display = "flex";
  }
}

// Stops propogation of events
function stopEvent(e) {
  e.stopPropagation();
}

async function afterLoadEvents() {
  // Initializing app before fetching performer list should solve loading problem
  // Nope, initializing app before fetching prevents favorite lists to be built correctly
  register_serviceWorker();
  initializeApp();
  try {
    await getPerformerList(
      "https://api.comfest.com/api/performers/?ordering=performance_time",
      "performancelist"
    );
  } catch (e) {
    console.error(`Failed to get band schedule\n${e}`);
  }
  try {
    await getPerformerList(
      "https://api.comfest.com/api/workshops/?ordering=performance_time",
      "speakerslist"
    );
  } catch (e) {
    console.error(`Failed to get speaker schedule\n${e}`);
  }
  initializeFavorites();
  button_listeners();
  initializeScheduleFilter();
  window.onpopstate = function(event) {
    popEvent(event);
  };
}
function popEvent(event) {
  // console.log(
  //   "location: " + document.location + ", state: " + JSON.stringify(event.state)
  // );
  openSection(event.state.section);
}

async function getPerformerList(scheduleURL, category) {
  // console.log(`fetching: ${scheduleURL}`);
  settings = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json"
    }
  };
  band_data = await fetch(scheduleURL, settings);
  await placePerformanceList(await band_data.json(), category);
}

function placePerformanceList(data, save_location) {
  var card;
  var performerList = document.getElementById(save_location);
  // for(performance in data){
  //   card = createPerformanceCard(performance.StartTime, performance.Day,performance.Stage,performance.Performer,performance.ThreeWordDesc);
  //   performerList.appendChild(card);
  data.forEach(function(performance) {
    try {
      // showFavoriteIcon hides favoriting abilit from Speakers section
      showFavoriteIcon = save_location == "performancelist" ? true : false;
      card = createPerformanceCard(
        performance.start_time,
        performance.day,
        performance.stage,
        performance.performer,
        performance.three_word_desc,
        performance.description,
        performance.image_400,
        performance.website,
        showFavoriteIcon
      );
      performerList.appendChild(card);
    } catch (e) {
      console.log(`Error during card creation: ${e}`);
      // console.log(performance.start_time, performance.day,performance.stage,performance.performer,performance.three_word_desc,performance.description, performance.image, performance.website)
    }
  });
}
function createPerformanceCard(
  vTime,
  vDay,
  vStage,
  vPerformer,
  vThreeWords,
  vDescription,
  vImage,
  vWebsite,
  hasFavorites
) {
  var stageColors = {
    Bozo: ["stage-bozo", "show-bozo"],
    Gazebo: ["stage-gazebo", "show-gazebo"],
    "Off Ramp": ["stage-offramp", "show-offramp"],
    "I Wish You Jazz": ["stage-jazz", "show-jazz"],
    "Live Arts": ["stage-livearts", "show-livearts"],
    Solar: ["stage-solar", "show-solar"],
    "Peace & Healing Pavilion": ["stage-peace", "show-peace"],
    // "Peace Tent" :["stage-peace", "show-peace"],
    KiDSART: ["stage-kidsart", "show-kidsart"],
    Friday: "show-friday",
    Saturday: "show-saturday",
    Sunday: "show-sunday"
  };
  // favClass prevents sctSpeakers from having favoriting ability
  var favClass = hasFavorites ? "slot-card" : "slot-card-small";
  // var favoritelist = localStorage.getItem('favorites')
  // var favorited = favoritelist.includes(vPerformer)  ? "show-favorite" : ""
  // console.log(hasFavorites, favClass)
  // add this to card.className if favoriting doesnt work
  // + " " + favorited
  var card = document.createElement("li");
  card.className =
    favClass + " " + stageColors[vStage][1] + " " + stageColors[vDay] + " ";
  var eleTime = document.createElement("div");
  card.dataset.performer = vPerformer;
  card.dataset.description = vDescription;
  card.dataset.image = vImage;
  card.dataset.website = vWebsite;
  // card.onclick =  "toggleExtendedCard(card);";
  // card.addEventListener("click",toggleExtendedCard(card),false);
  card.setAttribute("onclick", "toggleExtendedCard(this)");
  var subTime = document.createTextNode(vTime);
  eleTime.appendChild(subTime);
  eleTime.className = "card-time " + stageColors[vStage][0];

  var eleDay = document.createElement("div");
  var subDay = document.createTextNode(vDay);
  eleDay.appendChild(subDay);
  eleDay.className = "card-day " + stageColors[vStage][0];

  var eleStage = document.createElement("div");
  var subStage = document.createTextNode(vStage);
  eleStage.appendChild(subStage);
  eleStage.className = "card-stage " + stageColors[vStage][0];

  var eleFavorite = document.createElement("div");
  var subFavorite = document.createElement("img");
  eleFavorite.addEventListener("click", toggleFavorite);
  // subFavorite.src = "images/star.svg";
  // eleFavorite.appendChild(subFavorite);
  eleFavorite.className = "card-favorite-icon " + stageColors[vStage][0];

  var elePerformer = document.createElement("div");
  var subPerformer = document.createTextNode(vPerformer);
  elePerformer.appendChild(subPerformer);
  elePerformer.className = "card-band";

  var ele3Words = document.createElement("div");
  var sub3Words = document.createTextNode(vThreeWords);
  ele3Words.appendChild(sub3Words);
  ele3Words.className = "card-description";

  card.appendChild(eleTime);
  card.appendChild(eleDay);
  card.appendChild(eleStage);
  card.appendChild(eleFavorite);
  card.appendChild(elePerformer);
  card.appendChild(ele3Words);

  return card;
}

/************
 * Toggle extended performance card
 *
 */
function toggleExtendedCard(card) {
  if (!card.className.includes("extended-card")) {
    //   fill out extended card info
    card.classList.add("extended-card");
    // Grab photo info/ description/ website from server
    //
    // var data = {"Description":"Words about the band", "Image":"http://t2.ftcdn.net/jpg/00/43/60/13/400_F_43601359_7i5eXOlvXVmMms2NudQ7e3uykHuSV8PS.jpg","Website":"https://www.facebook.com/Blue-Spectrum-1439630629605363/"};
    // var query = {'Performer': card.children[3].innerHTML}
    //var data = getBandData(query);
    var getDescription = card.dataset.description;
    if (getDescription == "null") {
      getDescription = "";
    }
    var getImage = card.dataset.image;
    var getWebsite = card.dataset.website;
    var cardExtension = document.createElement("div");
    var bandImage = document.createElement("img");
    var bandDescription = document.createElement("p");
    var subBandDescription = document.createTextNode(getDescription);
    var bandWebsite = document.createElement("a");
    bandWebsite.setAttribute("href", getWebsite);
    bandWebsite.setAttribute("target", "_blank");
    bandWebsite.setAttribute("rel", "external");
    bandWebsite.setAttribute("onClick", "stopEvent(event);");
    bandWebsite.innerHTML = getWebsite;
    bandWebsite.className = "card-website";
    cardExtension.className = "card-extension";
    bandDescription.appendChild(subBandDescription);
    bandDescription.className = "card-extendedDescription";
    bandImage.src = getImage;
    bandImage.onerror = "imageError(this)";
    bandImage.className = "card-photo";
    cardExtension.appendChild(bandImage);
    cardExtension.appendChild(bandDescription);
    cardExtension.appendChild(bandWebsite);

    card.appendChild(cardExtension);
  } else {
    // toggle card on or off
    if (card.children[6].style.display === "none") {
      card.children[6].style.display = "flex";
    } else {
      card.children[6].style.display = "none";
    }
  }
}
function searchActs(seaker_id, search_id){
  var input = document.getElementById(seaker_id)
  console.log(input)
  var filter = input.value.toUpperCase();
  var ul = document.getElementById(search_id);
  var li = ul.getElementsByTagName('li')
  console.log(filter)
  for(i=0;i<li.length;i++){
    performer = li[i].dataset['performer']
    if(performer.toUpperCase().indexOf(filter)>-1){
      li[i].style.display = "";
    } else {
      li[i].style.display = "none"
    }
  }
}
function searchActs_2(){
  var input = document.getElementById('searchDropDown')
  // console.log(input)
  var filter = input.value.toUpperCase();
  // var ul = document.getElementById(search_id);
  // var li = ul.getElementsByTagName('li')
  var workshopList = document.getElementById('speakerslist').getElementsByTagName('li')
  var performanceList = document.getElementById('performancelist').getElementsByTagName('li')
  // console.log(filter)
  for(i=0;i<workshopList.length;i++){
    performer = workshopList[i].dataset['performer']
    // dont_display = workshopList[i].getAttribute('style') == "display: none;"
    // console.log(dont_display)

    let filteredList = JSON.parse(localStorage.filteredList)
    dont_display = findCommonality(filteredList,workshopList[i].classList)
    
    if(performer.toUpperCase().indexOf(filter)>-1 && !dont_display){
      workshopList[i].style.display = "";
    } else {
      workshopList[i].style.display = "none"
    }
  }
  for(i=0;i<performanceList.length;i++){
    performer = performanceList[i].dataset['performer']
    let filteredList = JSON.parse(localStorage.filteredList)
    dont_display = findCommonality(filteredList,performanceList[i].classList)

    if(performer.toUpperCase().indexOf(filter)>-1 && !dont_display){
      performanceList[i].style.display = "";
    } else {
      performanceList[i].style.display = "none"
    }
  }
}

function getPostsFromWebsite(url='https://www.comfest.com/wp-json/wp/v2/posts?_embed', numberOfPosts =6){
  // this retrieves the posts from the wordpress site and returns them as a list
  // defaults to 4 posts
  fetch(url)
    .then(res =>  res.json())
    
    // .then(res => console.log(res))
    // .then(data => data)
    .then(res => createPostsFromWebsite(res.slice(0,numberOfPosts)))
}
function createPostsFromWebsite(postList){
  const root = document.getElementsByClassName('menu-alternate')[0]

  postList.forEach(post=> {
    let container = document.createElement('div')
    container.classList = "blogItem"
    const title = document.createElement('div')
    title.innerHTML = post.title.rendered
    const link = document.createElement('a')
    link.href = post.link
    // link.innerHTML = post.title.rendered
    
    let image_url = null
    try{
      image_url = post._embedded['wp:featuredmedia'][0].source_url
    }
    catch{
      image_url = 'https://www.comfest.com/wp-content/uploads/2017/04/Title-Image-1.jpg'
    }
    if(image_url){
      let image = document.createElement('img')
      image.src = image_url
      container.appendChild(image)
    }
    container.appendChild(title)
    link.appendChild(container)
    root.appendChild(link)
  })
}
getPostsFromWebsite()

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fncBtnDropClick(eleID) {
    document.getElementById(eleID).classList.toggle("show");
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-toggle");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      };
    };
  };
}

function getScrollToPosition(previousSection,newSection){
  // returns scroll position
  if (previousSection == newSection){
    // This happens on reload. -1 allows browser to define scroll position
    return -1
  }
  localStorage[previousSection+'ScrollPosition'] = window.pageYOffset
  if (localStorage.hasOwnProperty(newSection+'ScrollPosition')){
    return localStorage[newSection+'ScrollPosition']
  } else {
    return 0
  }
}
/**********
 * open tabs that correspond to menu name or front page button
 * https://www.w3schools.com/howto/howto_js_tab_header.asp
 */
function openSection(sctName) {
  previousSection = localStorage.currentSection
  scrollToPosition = getScrollToPosition(previousSection,sctName)
  
  localStorage.currentSection = sctName;
  localStorage.time_of_last_section_selection = Date.now();
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
  }
  if(sctName=='sctSchedule' | sctName=='sctFavorites'){
    // document.getElementById('filterButton').style.visibility = "visible";
    document.getElementById('filterButton').classList.add('show')
    document.getElementById('filterButton').classList.remove('hide')
    if(sctName=='sctSchedule'){
      document.getElementById('btn-return').classList.add('remove')
      document.getElementById('btn-return').classList.remove('show')
      document.getElementById('btn-favorites').classList.add('show')
      document.getElementById('btn-favorites').classList.remove('remove')
    } else {
      document.getElementById('btn-favorites').classList.add('remove')
      document.getElementById('btn-favorites').classList.remove('show')
      document.getElementById('btn-return').classList.add('show')
      document.getElementById('btn-return').classList.remove('remove')
    }
  } else {
    // document.getElementById('filterButton').style.visibility = "hidden";
    document.getElementById('filterButton').classList.remove('show')
    document.getElementById('filterButton').classList.add('hide')
  };
  // Show the specific tab content
  document.getElementById(sctName).style.display = "block";
  document.getElementById('pagetitle').innerHTML = sctName.slice(3);
  
  // Set scroll position to saved value
  // unless this is a reload which returns -1
  if(scrollToPosition>-1){
    window.scrollTo(0,scrollToPosition)
  }
}

function findCommonality(list_one, list_two){
  return list_one.some (function(list_one_val){
    return list_two.contains(list_one_val);
  });
}

function toggleSlot(showstage){
  var stage = "stage-" + showstage.slice(5);
  var elementID = "btn-" + showstage.slice(5);
  var show = "show-" + showstage.slice(5); 
  var slots = document.getElementsByClassName(showstage);
  var button = document.getElementById(elementID);
  let filteredList = JSON.parse(localStorage.filteredList)
  //
  //if(!card.className.includes(stage))
  //
  // Toggles filter button on
  if(button.dataset.visible === 'false'){
    var index = filteredList.indexOf(show);
    if (index > -1){
      filteredList.splice(index,1);
    }
    var setDisplay = 'grid';
    button.dataset.visible = 'true';
    button.classList.add(stage);
  } else {
    // Toggles filter button off
    var setDisplay = 'none';
    button.dataset.visible = 'false';
    button.classList.remove(stage);
    if(!filteredList.includes(show)){
      filteredList.push(show);
    }
    
  }
  localStorage.filteredList = JSON.stringify(filteredList)
  for(i=0;i<slots.length;i++){
    if (setDisplay == 'none'){
      slots[i].style.display = 'none';
    } else {
      /// Check to see if card has other filters
      if (!findCommonality(filteredList,slots[i].classList)){
        slots[i].style.display = setDisplay;
      };
    };
  };
}


/***************
 * Grab the Band data from PHP file
 * findBandInfo.php
 * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * 
 */
function getBandData(data){
  var url = "api/findBandInfo.php"
  return fetch(url, {
    body: JSON.stringify(data),
    cache: 'default',
    credentials: 'same-origin',
    headers: {'user-agent': 'Mozilla/4.0',
              'content-type': 'application/json'
    },
    method: 'POST',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer',
    })
    .then(response => response.json())
}
function addOrRemoveFavoriteFromStorage(performer){
  favoriteList = JSON.parse(localStorage.favorites)
  if (favoriteList.includes(performer)){
    favoriteList = favoriteList.filter(item => item != performer)
    localStorage.favorites = JSON.stringify(favoriteList)
  } else {
    favoriteList.push(performer)
    localStorage.favorites = JSON.stringify(favoriteList)
  }
}
function toggleFavorite(event){
  console.log(event)
  event.stopPropagation();
  console.log('toggleFavorite Fired');
  // this.parentElement.classList.add('card-favorite')
  const card = this.parentElement
  addOrRemoveFavoriteFromStorage(this.parentElement.dataset.performer)
  if (card.classList.contains('show-favorite')){
    if (card.parentElement == 'sctSchedule'){
      card.classList.remove('show-favorite')
    } else{
      performancelist = document.getElementById('performancelist')
      cardList = performancelist.childNodes
      for(item of cardList){
        if (item.isEqualNode(card)){
          item.classList.remove('show-favorite')
        }
      }
    }
    
    // Remove card from sctFavorites
    sctFavorites = document.getElementById('sctFavorites')
    cardList = sctFavorites.childNodes
    for(favorite_card of cardList){
      if (card.isEqualNode(favorite_card)){
        sctFavorites.removeChild(favorite_card)
      }
    }
  } else {
    card.classList.add('show-favorite')
    // Add to sctFavorites
    copyCardToFavorites(card)
    // sctFavorites = document.getElementById('sctFavorites')
    // newCard = card.cloneNode(true)
    // eleFavorite = newCard.getElementsByClassName("card-favorite-icon")
    // eleFavorite[0].addEventListener("click",toggleFavorite)
    // sctFavorites.appendChild(newCard)

  }
}
function copyCardToFavorites(card){
  sctFavorites = document.getElementById('sctFavorites')
  newCard = card.cloneNode(true)
  newCard.style.display = 'grid'
  eleFavorite = newCard.getElementsByClassName("card-favorite-icon")
  eleFavorite[0].addEventListener("click",toggleFavorite)
  sctFavorites.appendChild(newCard)
}
/************
 * Toggle extended performance card
 * 
 */
function toggleExtendedCard(card){
  if(!card.className.includes("extended-card")){
  //   fill out extended card info
    card.classList.add("extended-card");
    // Grab photo info/ description/ website from server
    //
    // var data = {"Description":"Words about the band", "Image":"http://t2.ftcdn.net/jpg/00/43/60/13/400_F_43601359_7i5eXOlvXVmMms2NudQ7e3uykHuSV8PS.jpg","Website":"https://www.facebook.com/Blue-Spectrum-1439630629605363/"};
    // var query = {'Performer': card.children[3].innerHTML}
    //var data = getBandData(query);
    var getDescription = card.dataset.description;
    if(getDescription == "null"){getDescription = ""};
    var getImage = card.dataset.image;
    var getWebsite = card.dataset.website;
    var cardExtension = document.createElement("div");
    var bandImage = document.createElement('img');
    var bandDescription = document.createElement('p');
    var subBandDescription = document.createTextNode(getDescription);
    var bandWebsite = document.createElement("a");
    bandWebsite.setAttribute('href', getWebsite);
    bandWebsite.setAttribute('target', '_blank');
    bandWebsite.setAttribute('rel', 'external')
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
    if (card.children[6].style.display === 'none'){
      card.children[6].style.display = 'flex';
    } else {
      card.children[6].style.display = 'none';
    }    
  }
}

function register_serviceWorker(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
            //  .register('service-worker.original.js') // works with localhost
            //  .register('./service-worker.js')
            .register('sw.js')
             .then(function() { console.log('Service Worker Registered'); });
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
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI notify the user they can add to home screen
  androidCallout = document.getElementById("android-callout")
  if (!localStorage.hasOwnProperty('canceledAndroidInstall')){
    androidCallout.style.display = 'flex';
  } 
  
});
function button_listeners(){
  btnReload = document.getElementById('app_reload_page')
  btnReload.addEventListener('click', (e) => {
    window.location.reload(true);
  })
  btnReset = document.getElementById('app_reset_app')
  btnReset.addEventListener('click', (e) =>{
    localStorage.clear()
    navigator.serviceWorker.getRegistrations().then(function(registrations) {
      // https://stackoverflow.com/questions/33704791/how-do-i-uninstall-a-service-worker
      for(let registration of registrations) {
       registration.unregister()
     } })
     window.location.reload(true)
  })
  android_add_buttons = document.getElementsByClassName('android-callout-button-add');
  for (var i = 0; i < android_add_buttons.length; i++){
    android_add_buttons[i].addEventListener('click', (e) => {
      // hide our user interface that shows our A2HS button
    // btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
      .then((choiceResult) => {
        androidCallout = document.getElementById("android-callout")
        androidCallout.style.display = 'none'
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });    
    });
  }

  document.getElementById('android-callout-button-cancel').addEventListener('click', (e) => {
    const cancelAndroidInstall = () => {
      if (localStorage.hasOwnProperty('canceledAndroidInstall')){
        return true;
      } else {
        localStorage.canceledAndroidInstall = 'true'
        return false }
      }
    cancelAndroidInstall();
    // Remove the parent element
    e.srcElement.parentElement.style.display = 'none';
        
  });
}


function clearFilter(){
  if(localStorage.hasOwnProperty('filteredList')){
    localStorage.filterList = JSON.stringify([])
    initializeScheduleFilter()
  }
}
async function initializeScheduleFilter(){
  if (!localStorage.hasOwnProperty('filteredList')){
    localStorage.filteredList = JSON.stringify([]);
    console.log(localStorage.filteredList)
  } else {
    console.log('attempt to run initialize schedule filter')
    for(let listItem of JSON.parse(localStorage.filteredList)){
      console.log(listItem)
      toggleSlot(listItem)
    }
  }
}
function initializeApp(){
  // Opens app to the last page user was on
  // resets to first page after 24 hours
  if (!localStorage.hasOwnProperty('currentSection')){
    localStorage.currentSection = 'sctComFest';
  }
  if (!localStorage.hasOwnProperty('time_of_last_section_selection')){
    localStorage.time_of_last_section_selection = Date.now()
  }
  if (!localStorage.hasOwnProperty('favorites')){
    localStorage.favorites = JSON.stringify([]);
  } else {
    favorites = JSON.parse(localStorage.favorites)
    console.log(favorites)
    cardList = document.getElementsByClassName("slot-card")
    // filterList = Array.prototype.filter(cardList => favorites.includes(cardList.dataset.performer)) 
    filterList = Array.prototype.filter.call(cardList, function(card){
       return favorites.includes(card.dataset.performer)
    });
    filterList.forEach((card)=> {
      card.classList.add('show-favorite');
      copyCardToFavorites(card)})
    console.log(filterList)   
  }
  const milliseconds_since_last_selection = Date.now() - localStorage.time_of_last_section_selection;
  const milliseconds_in_a_day = 86400000; //10000; 
  if(milliseconds_since_last_selection < milliseconds_in_a_day){
    openSection(localStorage.currentSection)
  } else {
    openSection('sctComfest')
  }
  
  // Detects if device is on iOS 
  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);
  // Detects if device has seen this user before
  const isRepeatVisitor = () => {
    if (localStorage.hasOwnProperty('visitedBefore')){
      return true;
    } else {
      localStorage.visitedBefore = 'true'
      return false }}
  // Checks if should display install popup notification:
  if (!isRepeatVisitor() && isIos() && !isInStandaloneMode()) {
    iOSCallout = document.getElementById("iOS-callout")
    iOSCallout.style.display = 'flex'
  }
}

async function afterLoadEvents() {
// function afterLoadEvents() {
  // getPerformerList();
  // initializeApp();
  register_serviceWorker()
  await getPerformerListTwo()
  console.log('waiting')
  initializeApp()
  button_listeners()
}

async function getPerformerList(){
  //https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  console.log('fetch started');
  var a = new Date;
  a = a.getTime()
  // fetch('api/findSchedule1.php?'+a)
  fetch('test_data.json')//('http://localhost:3000/performers'))
    .then(
      function(response){
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " +
            response.status);
          return;
        }
        // Examine the text in the response
        response.json().then(function(data){
          console.log(data);
          placePerformanceList(data);
          // return 'success'
        }).then(function (){
          console.log('when did this get run?')
          initializeScheduleFilter()
          return 'success'
        })
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    }); 
}
async function getPerformerListTwo(){
  console.log('fetching..')
  settings = {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
        "Content-Type": "application/json",
        // "Content-Type": "application/x-www-form-urlencoded",
    }
}
  // band_data = await fetch('test_data.json')
  band_data = await fetch('http://192.168.1.12:8000/api/performers/', settings)
  await placePerformanceList( await band_data.json())
  await initializeScheduleFilter()
}

function placePerformanceList(data){
  var card;
  var performerList = document.getElementById("performancelist")
  // for(performance in data){
  //   card = createPerformanceCard(performance.StartTime, performance.Day,performance.Stage,performance.Performer,performance.ThreeWordDesc);
  //   performerList.appendChild(card);
  data.forEach(function(performance){
    try{
      card = createPerformanceCard(performance.start_time, performance.day,performance.stage,performance.performer,performance.three_word_desc,performance.description, performance.image, performance.website);
      performerList.appendChild(card);
    }
    catch(e){
      console.log(`Error during card creation: ${e}`)
      // console.log(performance.start_time, performance.day,performance.stage,performance.performer,performance.three_word_desc,performance.description, performance.image, performance.website)
    }
  })
  

}
function createPerformanceCard(vTime,vDay,vStage,vPerformer,vThreeWords, vDescription, vImage, vWebsite){
  var stageColors = {
    "Bozo":["stage-bozo", "show-bozo"],
    "Gazebo":["stage-gazebo", "show-gazebo"],
    "Off Ramp":["stage-offramp", "show-offramp"],
    "I Wish You Jazz":["stage-jazz", "show-jazz"],
    "Live Arts":["stage-livearts", "show-livearts"],
    "Solar":["stage-solar", "show-solar"],
    "Peace & Healing Pavilion":["stage-peace", "show-peace"],
    // "Peace Tent" :["stage-peace", "show-peace"],
    "KiDSART":["stage-kidsart","show-kidsart"],
    "Friday":"show-friday",
    "Saturday":"show-saturday",
    "Sunday":"show-sunday"
   }
  var card = document.createElement("li");
  card.className="slot-card " + stageColors[vStage][1] +" "+ stageColors[vDay];
  var eleTime = document.createElement("div");
  card.dataset.performer = vPerformer;
  card.dataset.description = vDescription;
  card.dataset.image = vImage;
  card.dataset.website = vWebsite;
  // card.onclick =  "toggleExtendedCard(card);";
  // card.addEventListener("click",toggleExtendedCard(card),false);
  card.setAttribute("onclick","toggleExtendedCard(this)")
  var subTime = document.createTextNode(vTime);
  eleTime.appendChild(subTime);
  eleTime.className="card-time "+stageColors[vStage][0];

  var eleDay = document.createElement("div");
  var subDay = document.createTextNode(vDay);
  eleDay.appendChild(subDay);
  eleDay.className="card-day "+stageColors[vStage][0];

  var eleStage = document.createElement("div");
  var subStage = document.createTextNode(vStage);
  eleStage.appendChild(subStage);
  eleStage.className="card-stage "+stageColors[vStage][0];

  var eleFavorite = document.createElement("div");
  var subFavorite = document.createElement("img");
  eleFavorite.addEventListener("click",toggleFavorite)
  // subFavorite.src = "images/star.svg";
  // eleFavorite.appendChild(subFavorite);
  eleFavorite.className="card-favorite-icon "+stageColors[vStage][0];

  var elePerformer = document.createElement("div");
  var subPerformer = document.createTextNode(vPerformer);
  elePerformer.appendChild(subPerformer);
  elePerformer.className="card-band";

  var ele3Words = document.createElement("div");
  var sub3Words = document.createTextNode(vThreeWords);
  ele3Words.appendChild(sub3Words);
  ele3Words.className="card-description";
  
  card.appendChild(eleTime);
  card.appendChild(eleDay);
  card.appendChild(eleStage);
  card.appendChild(eleFavorite);
  card.appendChild(elePerformer);
  card.appendChild(ele3Words);

  return card;
}


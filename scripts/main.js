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
      }
    }
  }
  if (event.target.parentNode.matches('.slot-card')) {
    toggleExtendedCard(event.target.parentNode);
  }
}

/**********
 * open tabs that correspond to menu name or front page button
 * https://www.w3schools.com/howto/howto_js_tab_header.asp
 */
function openSection(sctName) {
    // Hide all elements with class="tabcontent" by default */
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    if(sctName=='sctSchedule'){
      document.getElementById('filterButton').style.visibility = "visible";
    } else {
      document.getElementById('filterButton').style.visibility = "hidden";
    };
    // Show the specific tab content
    document.getElementById(sctName).style.display = "block";
    document.getElementById('pagetitle').innerHTML = sctName.slice(3);
}
function toggleSlot(showstage){
  var stage = "stage-" + showstage.slice(5);
  var elementID = "btn-" + showstage.slice(5); 
  var slots = document.getElementsByClassName(showstage);
  for(i=0;i<slots.length;i++){
    if (slots[i].style.display === 'none'){
      slots[i].style.display = 'grid';
      if(i==0){
        document.getElementById(elementID).classList.add(stage);
      }
    } else {
      slots[i].style.display = 'none';
      if(i==0){
        document.getElementById(elementID).classList.remove(stage);
      }
    }
  }
}
function imageError(image){
  image.onerror = "";
  image.src = "images/ComfestLogo-Basic-48.png";

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
    cardExtension.className = "card-extension";
    bandDescription.appendChild(subBandDescription);
    bandDescription.className = "card-extendedDescription";
    bandImage.src = getImage;
    bandImage.onerror = "imageError(this)";
    bandImage.className = "card-photo";
    cardExtension.appendChild(bandImage);
    cardExtension.appendChild(bandDescription);
    card.appendChild(cardExtension);

  } else {
    // toggle card on or off
    if (card.children[5].style.display === 'none'){
      card.children[5].style.display = 'flex';
    } else {
      card.children[5].style.display = 'none';
    }    
  }
}

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('./service-worker.js')
             .then(function() { console.log('Service Worker Registered'); });
  }

/*****
 * Events to download performer list
 * Set to happen after window loads to prevent slow load
 */
window.addEventListener("load", afterLoadEvents());

function afterLoadEvents() {
  getPerformerList();
  // placePerformanceList();
}
function getPerformerList(){
  //https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  console.log('fetch started');
  fetch('api/findSchedule1.php')
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
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    }); 
}


function placePerformanceList(data){
  var card;
  var performerList = document.getElementById("performancelist")
  // for(performance in data){
  //   card = createPerformanceCard(performance.StartTime, performance.Day,performance.Stage,performance.Performer,performance.ThreeWordDesc);
  //   performerList.appendChild(card);
  data.forEach(function(performance){
    card = createPerformanceCard(performance.StartTime, performance.Day,performance.Stage,performance.Performer,performance.ThreeWordDesc,performance.Description, performance.Image, performance.WebSite);
    performerList.appendChild(card);
  });
  

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
    "KiDSART":["stage-kidsart","show-kidsart"],
    "Friday":"show-friday",
    "Saturday":"show-saturday",
    "Sunday":"show-sunday"
   }
  var card = document.createElement("li");
  card.className="slot-card " + stageColors[vStage][1] +" "+ stageColors[vDay];
  var eleTime = document.createElement("div");
  card.dataset.description = vDescription;
  card.dataset.image = vImage;
  card.dataset.website = vWebsite;
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
  card.appendChild(elePerformer);
  card.appendChild(ele3Words);

  return card;
}


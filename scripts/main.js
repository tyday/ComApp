// var filteredList = [];

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

/**********
 * open tabs that correspond to menu name or front page button
 * https://www.w3schools.com/howto/howto_js_tab_header.asp
 */
function openSection(sctName) {
  localStorage.currentSection = sctName;
  localStorage.time_of_last_section_selection = Date.now();
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
    filteredList.push(show);
  }
  localStorage.filteredList = JSON.stringify(filteredList)
  for(i=0;i<slots.length;i++){
    if (setDisplay == 'none'){
      slots[i].style.display = 'none';
    } else {
      /// Check to see if card has other filters
      // if(!slots[i].classList.some(inFilteredList)){
      //   slots[1].style.display = setDisplay;

      // }
      if (!findCommonality(filteredList,slots[i].classList)){
        slots[i].style.display = setDisplay;
      };
    };
  };
}
// function initializeScheduleFilter(){
//   // runs through the locally saved filter list on reload 
//   // and sets the buttons to off and the correct cards to setDisplay none
//   let filteredList = JSON.parse(localStorage.filteredList)
//   // let stage = "stage-" + showstage.slice(5);
//   // let elementID = "btn-" + showstage.slice(5);
//   // let show = "show-" + showstage.slice(5); 
//   // let slots = document.getElementsByClassName(showstage);
//   // let button = document.getElementById(elementID);

//   for(let showstage of filteredList){
//     toggleSlot(showstage)
//   }
// }

  //   if (button.dataset.visible === 'false'){
  //     slots[i].style.display = 'grid';
  //     if(i==0){
  //       button.dataset.visible = 'true';
  //       button.classList.add(stage);
  //     }
  //   } else {
  //     slots[i].style.display = 'none';
  //     if(i==0){
  //       button.dataset.visible = 'false';
  //       button.classList.remove(stage);
  //     }
  //   }
  // }


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

function initializeScheduleFilter(){
  if (!localStorage.hasOwnProperty('filteredList')){
    localStorage.filteredList = JSON.stringify([]);
    console.log(localStorage.filteredList)
  } else {
    console.log('attempt to run initialize schedule filter')
    initializeScheduleFilter()
  }
}
function afterLoadEvents() {
  getPerformerList().then(result => {
      console.log('result: ' + result)
      initializeScheduleFilter()
    })
    .catch(error =>{
      console.log('failure'+error)
    })
  
  // Check to see app has been initialized
  console.log('timing check')
  
  
  if (!localStorage.hasOwnProperty('currentSection')){
    localStorage.currentSection = 'sctComfest';
  }
  if (!localStorage.hasOwnProperty('time_of_last_section_selection')){
    localStorage.time_of_last_section_selection = Date.now()
  }
  const milliseconds_since_last_selection = Date.now() - localStorage.time_of_last_section_selection;
  const milliseconds_in_a_day = 86400000; //10000; 
  if(milliseconds_since_last_selection < milliseconds_in_a_day){
    openSection(localStorage.currentSection)
  } else {
    openSection('sctComfest')
  }
}

function getPerformerList(){
  //https://developers.google.com/web/updates/2015/03/introduction-to-fetch
  console.log('fetch started');
  var a = new Date;
  a = a.getTime()
  fetch('http://localhost:3000/performers')//('api/findSchedule1.php?'+a)
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
          return 'success'
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


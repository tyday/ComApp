/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function fncBtnDropClick() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
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
    // Show the specific tab content
    document.getElementById(sctName).style.display = "block";
    document.getElementById('pagetitle').innerHTML = sctName.slice(3);
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
  fetch('api/findSchedule.php')
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

  card = createPerformanceCard('7:00 AM','Tuesday','Off-Ramp','T-Rex','Fictional,Delusional,Tempremental');
  performerList.appendChild(card);

  for(performance in data){
    card = createPerformanceCard(performance.StartTime, performance.Day,performance.Stage,performance.Performer,performance.ThreeWordDesc);
    performerList.appendChild(card);
  }

}
function createPerformanceCard(vTime,vDay,vStage,vPerformer,vThreeWords){
  var card = document.createElement("li");
  card.className="slot-card";
  var eleTime = document.createElement("div");
  var subTime = document.createTextNode(vTime);
  eleTime.appendChild(subTime);
  eleTime.className="card-time";

  var eleDay = document.createElement("div");
  var subDay = document.createTextNode(vDay);
  eleDay.appendChild(subDay);
  eleDay.className="card-day";

  var eleStage = document.createElement("div");
  var subStage = document.createTextNode(vStage);
  eleStage.appendChild(subStage);
  eleStage.className="card-stage";

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


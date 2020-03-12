// Reusables:
function elementMaker(elementType, elementText = '', elementClass = '') {
  if (!elementType) throw "Missing element type parameter!";
  try {
    let e = document.createElement(elementType);
    if (elementText) e.textContent = elementText;
    if (elementClass) e.classList.add(elementClass);
    return e;
  }
  catch(e) {
    throw "Invalid element type!";
  } 
}


/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
// create a new axios HTTP client instance and configure default request url

const github = axios.create({
  baseURL: 'https://api.github.com'
});

// make a GET request using a relative uri path
// github.get('/antonyk')
// .then(response => {
//   document.querySelector('.test').append(elementMaker('p', response.data));
// })
// .catch(error => {
//   document.querySelector('.test').append(elementMaker('p', 'ERROR: ' + error.toJSON()));
//   // console.log(error.toJSON());
// });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];

function createCard(data) {

  // element = elementMaker(type [, text, class])
  let card = elementMaker('div', '', 'card');

  let img = elementMaker('img');
  img.src = data.image;

  let info = elementMaker('div', '', 'card-info');
  let name = elementMaker('h3', data.name, 'name');
  let uname = elementMaker('p', data.uname, 'username');
  let loc = elementMaker('p', `Location: ${data.location}`);
  let prof = elementMaker('p', `Profile: `);
  let profLink = elementMaker('a', data.url);
  let followers = elementMaker('p', `Followers: ${data.followers}`);
  let following = elementMaker('p', `Following: ${data.following}`);
  let bio = elementMaker('p', `Bio: ${data.bio}`);

  // nest
  


  card = document.createElement('div');
  card.classList.add('card');

}

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:




<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

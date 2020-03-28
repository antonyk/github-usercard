// Globals
const BASE_USER = 'antonyk';

// Static Test Data
const sample =
{
  "login": "antonyk",
  "id": 2497571,
  "node_id": "MDQ6VXNlcjI0OTc1NzE=",
  "avatar_url": "https://avatars1.githubusercontent.com/u/2497571?v=4",
  "gravatar_id": "",
  "url": "https://api.github.com/users/antonyk",
  "html_url": "https://github.com/antonyk",
  "followers_url": "https://api.github.com/users/antonyk/followers",
  "following_url": "https://api.github.com/users/antonyk/following{/other_user}",
  "gists_url": "https://api.github.com/users/antonyk/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/antonyk/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/antonyk/subscriptions",
  "organizations_url": "https://api.github.com/users/antonyk/orgs",
  "repos_url": "https://api.github.com/users/antonyk/repos",
  "events_url": "https://api.github.com/users/antonyk/events{/privacy}",
  "received_events_url": "https://api.github.com/users/antonyk/received_events",
  "type": "User",
  "site_admin": false,
  "name": null,
  "company": null,
  "blog": "",
  "location": null,
  "email": null,
  "hireable": null,
  "bio": null,
  "public_repos": 19,
  "public_gists": 0,
  "followers": 9,
  "following": 1,
  "created_at": "2012-10-06T00:15:47Z",
  "updated_at": "2020-03-09T19:54:58Z"
};

// REUSABLES
// 1. generic html element maker
function elementMaker(elementType, elementText = '', elementClass = '') {
  if (!elementType) throw "Missing element type parameter!";
  try {
    let element = document.createElement(elementType);
    if (elementText) element.textContent = elementText;
    if (elementClass) element.classList.add(elementClass);
    return element;
  }
  catch(e) {
    throw "Invalid element type!";
  } 
}

// 2. GitHub card maker
function createGitHubCard(data, parent) {

  // element = elementMaker(type [, text, class])
  let card = elementMaker('div', '', 'card');

  let img = elementMaker('img');
  img.src = data.avatar_url;
  img.addEventListener('click', () => buildCards(data.login, parent));

  let info = elementMaker('div', '', 'card-info');
  let name = elementMaker('h3', data.name, 'name');
  let uname = elementMaker('p', data.login, 'username');
  let loc = elementMaker('p', `Location: ${data.location}`);
  let prof = elementMaker('p', `Profile: `);
  let link = elementMaker('a', data.html_url);
  link.href = data.html_url;
  let followers = elementMaker('p', `Followers: ${data.followers}`);
  let following = elementMaker('p', `Following: ${data.following}`);
  let bio = elementMaker('p', `Bio: ${data.bio}`);

  // nest
  prof.append(link);
  info.append(name, uname, loc, prof, followers, following, bio);
  card.append(img, info);

  return card;
}

function createErrorCard(data, id = 'base') {
  let card = elementMaker('div');
  let title = elementMaker('h2', `ERROR (${id})`);
  let txt = elementMaker('p', data);

  // nest
  card.append(title, txt);

  return card;
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
function getReqUrl(username) { return `https://api.github.com/users/${username}` };
const followersArray = [];

function buildCards(username, node) {

  // clear all current cards
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }

  github.get(getReqUrl(username))
  .then(response => {
      // build and display card
      node.append(createGitHubCard(response.data, node));
  
    // build followers array
    github.get(response.data.followers_url)
    .then(response => {
      // console.log(response.data.length);
      followersArray.length = 0;
      response.data.forEach(item => followersArray.push(item.login));
  
      // console.log(followersArray.length);
      // request follower details and build their cards
      followersArray.forEach(item => {
        // console.log(getReqUrl(item));
        github.get(getReqUrl(item))
        .then(response => {
          // build and display card
          node.append(createGitHubCard(response.data, node));
      
        })
        .catch(error => {
          document.querySelector('.errors').append(createErrorCard(error, item));
        });
      });
    
    })
    .catch(error => {
      document.querySelector('.errors').append(createErrorCard(error, `list for ${username}`));
    });
  })
  .catch(error => {
    let orig = document.querySelector('.cards').cloneNode(true);

    document.querySelector('.errors').append(createErrorCard(error, username));
  });
}

buildCards(BASE_USER, document.querySelector('.cards'));



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

// document.querySelector('.cards').append(createCard(data2));

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

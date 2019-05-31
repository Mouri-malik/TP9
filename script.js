//1

let users;

let container2 = document.createElement("div");
document.body.appendChild(container2);

let container3 = document.createElement("div");
document.body.appendChild(container3);
container3.style.margin = "auto"
container3.style.width = "50%"

container3.style.border = "solid 1px black";
container3.style.padding = "5px";
container3.style.backgroundColor = "silver";
container3.style.display = "none";

let container4 = document.createElement("div");
document.body.appendChild(container4);
container4.style.margin = "auto"
container4.style.width = "50%"
container4.style.border = "solid 1px black";
container4.style.padding = "5px";
container4.style.backgroundColor = "silver";
container4.style.display = "none";

function getUsersData() {
  let req = new XMLHttpRequest();
  let road = "https://jsonplaceholder.typicode.com/users"; //route de la requête
  let httpMethod = "GET"; //GET est une Méthode http
  req.overrideMimeType("application/JSON");
  req.open(httpMethod, road, true);
  //Ecouteur d'événement qui réagit lorsque la requete change d'état(ex: la requete passe de l'état Loading à DONE);
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText); //Récupère un fichier JSON et le transforme en objet Javascript.
        console.log(data);
        displayUsers(data); // Appel la fonction displayUsers

      } else {
        console.log("status de la reponse :%d (%S)", req.status, req.statusText)
      }
    }

  }
  req.send(null)
}
getUsersData();


function displayUsers(data) {
  let container = document.createElement("div");
  document.body.appendChild(container);
  container.style.position = "fixed"

  for (let i = 0; i < data.length; i++) {
    let currentElmt = data[i];

    let paragraphe = document.createElement("p");
    container.appendChild(paragraphe);

    let label = document.createElement("label");
    label.textContent = currentElmt.name;
    paragraphe.appendChild(label);

    label.addEventListener("click", function() {
      if (users != null) {
        users.style.fontWeight = "normal";
      }
      users = this;
      this.style.fontWeight = "bold";
      container2.innerHTML = "";
      getUserData(currentElmt.id);
      container3.innerHTML = "";
      container3.style.display = "block"
      getUserPostsData(currentElmt.id);
      container4.innerHTML = "";
      container4.style.display = "block";
      getCommentsData(currentElmt.id)
    }, false);
  }
}

//2
function getUserData(id) {
  let req = new XMLHttpRequest();
  let route = "https://jsonplaceholder.typicode.com/users/" + id;
  let httpMethod = "GET";
  req.overrideMimeType("application/JSON");
  req.open(httpMethod, route, true);
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) {
      if (req.status === 200) {
        let data = JSON.parse(req.responseText);
        console.log(data);

        displayUser(data);
      }
    } else {
      console.log("status de la reponse :%d (%S)", req.status, req.statusText)
    }
  }
  req.send(null);
}

function displayUser(data) {
  container2.style.position = "fixed";
  container2.style.right = "5px";

  console.log(data);

  let name = document.createElement("p");
  container2.appendChild(name);
  name.textContent = data.name;

  let mail = document.createElement("p");
  mail.textContent = data.email;
  container2.appendChild(mail);

  let city = document.createElement("p");
  city.textContent = data.address.city;
  container2.appendChild(city);

  let website = document.createElement("p");
  website.textContent = data.website;
  container2.appendChild(website);
}


function getUserPostsData(userId) {
  let req = new XMLHttpRequest(); //Création d'un objet de type XMLHttpRequest
  let route = "https://jsonplaceholder.typicode.com/posts/?userId=" + userId;
  let httpMethod = "GET"; //Définition de la méthode HTTP
  req.overrideMimeType("application/json"); //On indique la nature et le format des données attendu
  req.open(httpMethod, route, true); //On "prépare" la requête
  //Ecouteur d'évenement qui réagit lorsque la requête change d'état (exemple : la requête passe de l’état LOADING à DONE) :
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) { //Si l'état de la requête est "DONE", cela indique que la requête est terminée
      if (req.status === 200) { //Si le code de la réponse est 200, cela veut dire que tout s'est bien passé
        let data = JSON.parse(req.responseText); //On transforme les données JSON en objet JavaScript
        console.log(data); //On affiche l'objet JavaScript en console
         displayUserPosts(data)
      } else { //S'il y a eu un problème lors de la requête, on affiche le status de celle-ci
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null); //On envoie la requête sans transmettre de paramètres
}


function displayUserPosts(data){
  for(let i = 0; i <= data.length-1; i++){
    let currentElmt = data[i];

          let titre = document.createElement("h4");
          titre.textContent = currentElmt.title;
          container3.appendChild(titre);

          let body = document.createElement("p");
          body.textContent = currentElmt.body;
          container3.appendChild(body);
  }
}

function getCommentsData(postId) {
  let req = new XMLHttpRequest(); //Création d'un objet de type XMLHttpRequest
  let route = "https://jsonplaceholder.typicode.com/comments/?postId="+ postId;
  let httpMethod = "GET"; //Définition de la méthode HTTP
  req.overrideMimeType("application/json"); //On indique la nature et le format des données attendu
  req.open(httpMethod, route, true); //On "prépare" la requête
  //Ecouteur d'évenement qui réagit lorsque la requête change d'état (exemple : la requête passe de l’état LOADING à DONE) :
  req.onreadystatechange = function() {
    if (req.readyState === XMLHttpRequest.DONE) { //Si l'état de la requête est "DONE", cela indique que la requête est terminée
      if (req.status === 200) { //Si le code de la réponse est 200, cela veut dire que tout s'est bien passé
        let data = JSON.parse(req.responseText); //On transforme les données JSON en objet JavaScript
        console.log(data); //On affiche l'objet JavaScript en console
          displayComments(data);

      } else { //S'il y a eu un problème lors de la requête, on affiche le status de celle-ci
        console.log("Status de la réponse: %d (%s)", req.status, req.statusText);
      }
    }
  };
  req.send(null); //On envoie la requête sans transmettre de paramètres
}


function displayComments(data){

  for (let i = 0; i < data.length; i++) {
    let total = 0;

    let currentElmt = data[i];

    total += currentElmt.name;

    total = document.createElement("p");
    container4.appendChild(total);



    let nameComment = document.createElement("h5");
    nameComment.textContent = currentElmt.name;
    container4.appendChild(nameComment);

    let comment = document.createElement("p");
    comment.textContent = currentElmt.body;
    container4.appendChild(comment);
  }
}

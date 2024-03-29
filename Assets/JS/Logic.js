var Wallpaper = document.getElementById("Wallpaper");
Wallpaper.style.height = window.innerHeight + "px";

window.addEventListener("resize", function() {
  Wallpaper.style.height = window.innerHeight + "px";
});
///

const grid = document.getElementById('grid');

fetch('https://digimon-api.vercel.app/api/digimon')
  .then(response => response.json())
  .then(data => {
    data.forEach(digimon => {
      const name = digimon.name;
      const image = digimon.img;
      const level = digimon.level;

      const card = document.createElement('div');
      card.classList.add('card');

      const img = document.createElement('img');
      img.setAttribute('src', image);

      // Agregamos el event listener al elemento img
      img.addEventListener('click', () => {
        const popup = document.createElement('div');
        popup.classList.add('popup');

        const close = document.createElement('span');
        close.textContent = 'X';
        close.classList.add('close');
        close.addEventListener('click', () => {
          document.body.removeChild(popup);
        });

        const nameElement = document.createElement('h2');
        nameElement.textContent = name;

        const levelElement = document.createElement('p');
        levelElement.textContent = `Nivel: ${level}`;

        popup.appendChild(close);
        popup.appendChild(img.cloneNode());
        popup.appendChild(nameElement);
        popup.appendChild(levelElement);
        document.body.appendChild(popup);
      });

      const nameElement = document.createElement('h2');
      nameElement.textContent = name;

      const levelElement = document.createElement('p');
      levelElement.textContent = `Nivel: ${level}`;

      card.appendChild(img);
      card.appendChild(nameElement);
      card.appendChild(levelElement);

      grid.appendChild(card);
    });
  })
  .catch(error => console.error(error));

  ///

  const input = document.getElementById('digimon-name');
  const datalist = document.getElementById('digimon-list');

  input.addEventListener('input', () => {
    const inputValue = input.value.trim().toLowerCase();

    if (inputValue.length < 2) {
      // Si el usuario ha escrito menos de 2 caracteres, no mostramos sugerencias
      datalist.innerHTML = '';
      return;
    }

    fetch(`https://digimon-api.vercel.app/api/digimon?q=${inputValue}`)
      .then(response => response.json())
      .then(data => {
        // Creamos un array con los nombres de los Digimon que hemos obtenido de la API
        const digimonNames = data.map(digimon => digimon.name.toLowerCase());

        // Creamos una lista de sugerencias
        const suggestions = digimonNames
          .filter(name => name.startsWith(inputValue))
          .map(name => `<option value="${name}"></option>`)
          .join('');

        // Mostramos las sugerencias en la lista desplegable
        datalist.innerHTML = suggestions;
      })
      .catch(error => console.error(error));
  });



///

  function buscarDigimon() {
    let digimonName = document.getElementById("digimon-name").value;
    let apiUrl = "https://digimon-api.vercel.app/api/digimon/name/" + digimonName;
  
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.length > 0) {
        let digimon = data[0];
        document.getElementById("digimon-name-modal").innerHTML = digimon.name;
        document.getElementById("digimon-img-modal").src = digimon.img;
        document.getElementById("digimon-level-modal").innerHTML = "Nivel: " + digimon.level;
        
       
  
        let modal = document.getElementById("digimon-info");
        modal.style.display = "block";
        let span = document.getElementsByClassName("close")[0];
        span.onclick = function() {
          modal.style.display = "none";
        }
        window.onclick = function(event) {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        }
      } else {
        alert("No se encontró ningún Digimon con ese nombre.");
      }
    })
    .catch(error => alert("Ocurrió un error al buscar el Digimon."));
  }
  
///



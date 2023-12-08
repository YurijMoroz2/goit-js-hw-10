import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select'
import Notiflix from 'notiflix';

axios.defaults.headers.common['x-api-key'] =
'live_9UcesGtnKmfImPZIVdsn9jaE06B2NVdrx6zoBqhZiZP51aCrMBz3NJ95TYWHsigt';
// -----------------------------------------------------------------------------
const elementsToHide = document.querySelectorAll(
  'select, p.error, breed-select'
  );
  const selectEl = document.querySelector('select')
  const selectBox = document.querySelector('.breed-select');
  const loader = document.querySelector('.loaders');
  const errorText = document.querySelector('.error');
  const cat = document.querySelector('.cat-info');
  
  selectBox.id = 'single';
  selectEl.id = 'single';
  elementsToHide.forEach(element => {
    element.style.display = 'none';
  });
  // ---------------------------------------------------------------------------------
fetchBreeds()
  // console.log(fetchBreeds());
  .then(data => {
    hideLoader();
    setTimeout(() => {
      selectBox.style.display = 'block';
    }, 500);
    const breeds = [];
    // console.log('data', data);
    data.forEach(item => {
      breeds.push({
        id: item.id,
        name: item.name,
      });
    });
    breeds.forEach(breed => {
      const optionElement = document.createElement('option');
      // console.log(optionElement);
      optionElement.textContent = breed.name;
      optionElement.value = breed.id;
      selectBox.appendChild(optionElement);
      
    });
    new SlimSelect({
      select: '#single'    
    })
    // console.log(selectBox);
  })
  .catch(error =>{
    // console.error("heiio");
    errorText.style.display = "block"
    hideLoader()
    selectBox.style.display = 'none';
    Notiflix.Report.failure('Oops! Something went wrong! Try reloading the page!');
  });
//  ---------------------------------------------------------------------------------
// 1111111111111111111111111111111111111111111111111111111111111111111
selectBox.addEventListener('change', handleChange);

function handleChange(event) {
  const breedId = event.target.value;
  hideElementsAndShowLoader();
  // console.log(breedId);
  fetchCatByBreed(breedId)
  .then(catData => {
    setTimeout(() => {
      showElementsAndHideLoader();
    },500);
    // console.log('Cat information:', catData);    
    cat.innerHTML = '';
    cat.insertAdjacentHTML('beforeend', createMarkup(catData));
    
    function createMarkup(arr) {
      return arr
        .map(
          ({ breeds, url }) => `           
             <img src="${url}" alt="${breeds[0].name}" class="imeg" style="width: 500px";>
             <div>
             <h2 class="name">${breeds[0].name}</h2>
             <p class="descr" >${breeds[0].description}</p>
             <p class="temperam"> <span style="font-size:24px;">Temperament:</span>${breeds[0].temperament}</p>
             </div>
             `
        )
        .join('');

    }
  })
  .catch(error =>{
    // console.error("hello");
    errorText.style.display = "block"
       setTimeout(()=> {
      showElementsAndHideLoader()
      errorText.style.display = 'none';      
    },2000)
        Notiflix.Notify.failure();
});
}
// ------------------------------------------------------------------------------
function showLoader() {
  loader.style.display = 'block';
}

function hideLoader() {
  loader.style.display = 'none';
}

function hideElementsAndShowLoader() {
  selectBox.style.display = 'none';
  cat.style.display = 'none';
  showLoader();
}

function showElementsAndHideLoader() {
  selectBox.style.display = 'block';
  cat.style.display = 'flex';
  hideLoader();
}
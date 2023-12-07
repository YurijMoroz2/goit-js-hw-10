import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9UcesGtnKmfImPZIVdsn9jaE06B2NVdrx6zoBqhZiZP51aCrMBz3NJ95TYWHsigt";
// -------------------------------------------------------
function fetchBreeds(){
    console.log("hello !");
    const BASE_URL= "https://api.thecatapi.com/v1/breeds";

  return axios.get(BASE_URL)
  .then(response =>
    {
      return response.data
  }
    )
      .catch(error => {
      // console.error(error);
      throw new Error(error);
  });
  };
// ---------------------------------------------------------------------------
function fetchCatByBreed(breedId){
  const BASE_URL1= "https://api.thecatapi.com/v1/images/search";
  const catUrl = `${BASE_URL1}?limit=1&breed_ids=${breedId}`;

  return axios.get(catUrl)
  .then(response => {return response.data})
  
             .catch(error => {
        // console.error(error);
        throw new Error(error);
    });
    }
      
    
  export {fetchBreeds, fetchCatByBreed}
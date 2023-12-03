import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_9UcesGtnKmfImPZIVdsn9jaE06B2NVdrx6zoBqhZiZP51aCrMBz3NJ95TYWHsigt";
console.log(axios.isCancel('something'));

// // Make a request for a user with a given ID
// axios.get('live_9UcesGtnKmfImPZIVdsn9jaE06B2NVdrx6zoBqhZiZP51aCrMBz3NJ95TYWHsigt')
//   .then(function (response) {
//     // handle success
//     console.log(response);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });

// // Optionally the request above could also be done as
// axios.get('/user', {
//     params: {
//       ID: 12345
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   })
//   .finally(function () {
//     // always executed
//   });
const container = document.querySelector('.cat-info');
// Want to use async/await? Add the `async` keyword to your outer function/method.
async function getUser() {
    // const API_KEY = 'live_9UcesGtnKmfImPZIVdsn9jaE06B2NVdrx6zoBqhZiZP51aCrMBz3NJ95TYWHsigt';
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    console.log(response);
    return await response.data
  } catch (error) {
    console.error(error);
  }
}
getUser()

async function render(){
    try {
        const data = await getUser();
        console.log(data[1].image.url);
        
        container.insertAdjacentHTML('beforeend', createMarcap(data[1].image))
    }catch (error) {
        console.log(error);}
}
render()
function createMarcap (arr){
    return arr.map(()=>(`
    <li class = "jk">
        <img src = "https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg" alt = "hjhjhj" width="320">
    </li>
    
    `).join("")
    )
}
// -----------------------------------------------------------------------

// var myHeaders = new Headers();
// myHeaders.append("Content-Type", "application/json");
// myHeaders.append("x-api-key", "DEMO-API-KEY");

// var requestOptions = {
//   method: 'GET',
//   headers: myHeaders,
//   redirect: 'follow'
// };
// // fetch(" https://api.thecatapi.com/v1/breeds", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
// =======================================================
{/* <option value="1">Перший елемент</option>
  <option value="2">Другий елемент</option>
  <option value="3">Третій елемент</option>         */}
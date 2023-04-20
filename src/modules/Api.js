const mealApi = 'https://api.tvmaze.com/shows';
const involvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/'
import {givelike , getLike} from './GetPostApi.js'

const fetchdata = () => {
  fetch(mealApi)
    .then((Response) => Response.json())
    .then((data) => {
        console.log(data);
        const movieCards = data.map((user) => `
            <div class="movie-card">
              <img class="img" src="${user.image.original}">
              <div class="UserName">${user.name}</div>
              <div class="likeComment-div">
                <div class="comment">Comment</div>
                <button class='like-btn'><i class='fa-regular fa-heart'></i></button>
                <p class="likescounter" id="${user.id}" >${0}</p>  
              </div>
            </div>
          `);
      document.getElementById('Movie').innerHTML = `
          <div class="show-card">${movieCards.join('')}</div>
        `  
          
        const likeButtons = document.querySelectorAll('.like-btn')
        const likescounter = document.querySelectorAll('.likescounter')
        
        likeButtons.forEach( async (likeButton , index)=>{
            likeButton.addEventListener('click' , (e)=>{
                console.log(e);
                // givelike(id)
                 let likes = parseInt(likescounter[index].textContent);
                 likes++
                 likescounter[index].textContent = likes
        
                 if (parseInt(likescounter[index].textContent) !== 0) {
                         likeButton.classList.add('liked');
                    }
                })
            })
    });
};
export default fetchdata;

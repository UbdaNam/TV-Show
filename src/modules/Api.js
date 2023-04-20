import { givelike } from './GetPostApi.js';

const movieApi = 'https://api.tvmaze.com/shows';
const involvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appID = '3NoZNOXzRHTLQKFS7tlo';

const fetchdata = async () => {
  const likesResponse = await fetch(`${involvementAPI}apps/${appID}/likes/`);
  const likesArray = await likesResponse.json();
  const movieResponse = await fetch(movieApi);
  const moviesArray = await movieResponse.json();
  const movies = document.getElementById('movie');
  movies.innerHTML = '';
  moviesArray.forEach((movie) => {
    let likeCounter = 0;
    const like = likesArray.find((like) => Number(like.item_id) === movie.id);
    if (like) {
      likeCounter = like.likes;
    }
    const movieCard = document.createElement('div');
    const movieImg = document.createElement('img');
    const movieName = document.createElement('h3');
    const buttonContainer = document.createElement('div');
    const commentBtn = document.createElement('button');
    const likeBtn = document.createElement('button');
    const likeCount = document.createElement('p');

    movieImg.src = movie.image.original;
    movieImg.classList.add('img');
    movieName.textContent = movie.name;
    movieName.classList.add('UserName');
    commentBtn.textContent = 'Comment';
    commentBtn.classList.add('comment-btn');
    likeBtn.innerHTML = '<span class="material-symbols-outlined">favorite</span>';
    likeBtn.classList.add('like-btn');
    likeCount.textContent = likeCounter;
    likeCount.classList.add('likescounter');
    buttonContainer.classList.add('button-container');
    buttonContainer.appendChild(commentBtn);
    buttonContainer.appendChild(likeBtn);
    buttonContainer.appendChild(likeCount);
    movieCard.classList.add('movie-card');
    movieCard.appendChild(movieImg);
    movieCard.appendChild(movieName);
    movieCard.appendChild(buttonContainer);

    movies.appendChild(movieCard);

    likeBtn.addEventListener('click', async () => {
      likeCounter += 1;
      const response = await givelike(movie.id);
      if (response.status === 201) {
        const likesResponse = await fetch(`${involvementAPI}apps/${appID}/likes/`);
        const likesArray = await likesResponse.json();
        const like = likesArray.find((like) => Number(like.item_id) === movie.id);
        if (like) {
          likeCount.textContent = like.likes;
          likeBtn.classList.add('liked');
        }
      }
    });
  });
};
export default fetchdata;
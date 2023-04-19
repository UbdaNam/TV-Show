const mealApi = 'https://api.tvmaze.com/shows';

const fetchdata = () => {
  fetch(mealApi)
    .then((Response) => Response.json())
    .then((data) => {
      const movieCards = data.map((user) => `
            <div class="movie-card">
              <img class="img" src="${user.image.original}">
              <div class="moveName">${user.name}</div>
              <div class="likeComment-div">
                <div class="comment">Comment</div>
                <button class='like-btn'><i class='fa-regular fa-heart'></i></button>  
              </div>
            </div>
          `);
      document.getElementById('Movie').innerHTML = `
          <div class="show-card">${movieCards.join('')}</div>
        `;
    });
};

export default fetchdata;

import { giveComment, getComments } from './commentApi.js';
import itemCounter from './itemCounter.js';

const detailApi = 'https://api.tvmaze.com/shows';

const detailPopup = async (id) => {
  const movieResponse = await fetch(`${detailApi}/${id}`);
  const movieData = await movieResponse.json();
  const commentData = await getComments(id);
  const commentCount = commentData ? itemCounter(commentData) : 0;

  const detilContainer = document.querySelector('.details');
  detilContainer.innerHTML = '';
  const detailEle = document.createElement('div');
  detailEle.classList.add('modal');
  detailEle.innerHTML = `
  <i class="material-symbols-outlined close">
close
</i>
  <div class="info-container">
  <div class="img-container">
  <img src="${movieData.image.medium}" alt="${movieData.name} logo">
</div>
<div class="movie-detail">
  <h2>${movieData.name}</h2>
  <ul class="movie-info">
    <li>
    <ul class='genres'>
    ${movieData.genres.map((genre) => `<li>${genre}</li>`).join('\n')
}
    </ul>
    </li>
    <li>Rating: ${movieData.rating.average}</li>
    <li class='summary'>${movieData.summary}</li>
  </ul>
</div>
</div>
<div class="comment-container">
<div class="comment-detail">
  <h3>Comments (${commentCount})</h3>
  ${!commentCount ? '<div>Comments not found</div>'
    : `<div class="comment-list">
  ${commentData.map((comment) => `<p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>`).join('\n')
}
  </div>`
}
</div>
<div class="form-container">
  <h3>
    Add a comment
  </h3>    
  <form action="#">
    <input type="text" name="userName" id="nameInput" placeholder="Your name" required>
    <textarea name="userComment" id="commentInput" placeholder="Your insights" required cols="30" rows="6"></textarea>
    <button class = 'commentBtn'>
      Comment
    </button>
  </form>
</div>
</div>
  `;
  detilContainer.appendChild(detailEle);
  const form = document.querySelector('form');
  const nameInp = document.getElementById('nameInput');
  const commentInp = document.getElementById('commentInput');
  const closeBtn = document.querySelector('.close');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    await giveComment(id, nameInp.value, commentInp.value);
    detailPopup(id);
  });

  closeBtn.addEventListener('click', () => {
    detilContainer.classList.remove('visible');
    detilContainer.innerHTML = '';
  });
};

export default detailPopup;
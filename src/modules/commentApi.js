const baseURL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps';
const appID = '3NoZNOXzRHTLQKFS7tlo';
export const giveComment = async (id, username, comment) => {
  const response = await fetch(`${baseURL}/${appID}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: `${id}`, username: `${username}`, comment: `${comment}` }),
  });

  return response;
};

export const getComments = async (id) => {
  const response = await fetch(`${baseURL}/${appID}/comments?item_id=${id}`);
  if (response.ok) {
    const data = await response.json();

    return data;
  }
  return [];
};
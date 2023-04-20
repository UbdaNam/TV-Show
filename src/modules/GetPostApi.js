const involvementAPI = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
const appID = '3NoZNOXzRHTLQKFS7tlo';

export const givelike = async (id) => {
  const response = await fetch(`${involvementAPI}apps/${appID}/likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: `${id}` }),
  });

  return response;
};

export const getLike = async () => {
  try {
    const response = await fetch(`${involvementAPI}apps/${appID}/likes`, {
      method: 'GET',
    });
    const data = await response.json();
    return data.likes;
  } catch (error) {
    throw new Error('Something went wrong!');
  }
};
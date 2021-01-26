export const fetchCurrentComic = () => {
 return fetchJSON('https://csb-h0sec-7oihd68l0.vercel.app/api/')
};

export const fetchComics = (id: string) => {
  return fetchJSON(`https://csb-h0sec-7oihd68l0.vercel.app/api/${id}`)
};

const fetchJSON = (url: string) => fetch(url).then(res => res.json())
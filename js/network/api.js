import { itemEndPoint, categoryEndPoint } from './config';
import fetch from 'isomorphic-fetch';

export function getItem(id) {
  return fetch(itemEndPoint(id))
    .then(response => response.json())
    .then(story => {
      return story;
    });
}

export function getStories(category) {
  return fetch(categoryEndPoint(category))
    .then(response => response.json())
    .then(stories => {
      return stories;
    });
}

export const getComment = id => {
  return new Promise((resolve, reject) => {
    getItem(id)
      .then(item => {
        if (item.kids && item.kids.length > 0) {
          let results = Promise.all(item.kids.map(getComment));
          results.then(kids => {
            resolve({ ...item, kids: kids });
          });
          results.catch(() => resolve(item));
        } else {
          resolve(item);
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

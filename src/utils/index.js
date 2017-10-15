export const shuffle = array => {
  let current = array.length, random;
  while (current--) {
    random = Math.floor(Math.random() * (current+1));
    [array[random], array[current]] = [array[current], array[random]];
  }
  return array;
};

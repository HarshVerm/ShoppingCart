function getToken(key) {
  try {
    let data = localStorage.getItem(key);
    data = JSON.parse(data);
    return data;
  } catch (err) {}
}
function saveData(key, data) {
  window.localStorage.setItem(key, JSON.stringify(data));
}
export { getToken, saveData };

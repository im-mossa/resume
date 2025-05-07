import Swal from "sweetalert2";

/**
 * Retrieves the value of a query parameter from the URL.
 * @param {string} name - Parameter name.
 * @param {string} [url=window.location.href] - URL to parse.
 * @returns {string|null} Parameter value or null if not present.
 */
export function getParameterByName(name, url = typeof window !== 'undefined' ? window.location.href : '') {
  name = name.replace(/[\[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Sets a cookie.
 * @param {string} cname - Cookie name.
 * @param {string} cvalue - Cookie value.
 * @param {number} exdays - Days until expiration.
 */
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

/**
 * Deletes a cookie by setting its expiration in the past.
 * @param {string} cname - Cookie name.
 */
export function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

/**
 * Retrieves a cookie's value.
 * @param {string} cname - Cookie name.
 * @returns {string} Cookie value or empty string if not found.
 */
export function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(name) === 0) {
      return c.substring(name.length);
    }
  }
  return '';
}

/**
 * Displays a loading modal and hides action buttons.
 */
export function showLoading() {
  let timerInterval;
  Swal.fire({
    title: 'Please Wait...!',
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => Swal.showLoading(),
    willClose: () => clearInterval(timerInterval),
  }).then((result) => {
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer');
    }
  });
  document.querySelector('.action-btn').style.display = 'none';
  const btn2 = document.querySelector('.action-btn2');
  if (btn2) btn2.style.display = 'none';
  document.querySelector('.please-wait').style.display = 'block';
}

/**
 * Hides loading modal and shows action buttons.
 */
export function showButton() {
  document.querySelector('.action-btn').style.display = 'block';
  const btn2 = document.querySelector('.action-btn2');
  if (btn2) btn2.style.display = 'block';
  document.querySelector('.please-wait').style.display = 'none';
}

/**
 * Checks if a user is logged in and redirects accordingly.
 */
export function checkUser() {
  const currentUser = getCookie('currentUser');
  if (!currentUser) {
    window.location.href = '/resume/online%20shoe%20store/login.html';
  } else {
    window.location.href = '/resume/online%20shoe%20store/src/panel/panel.html';
  }
}

/**
 * Logs out the user by deleting cookies and redirecting to login page.
 */
export function logOutSystem() {
  deleteCookie('currentUser');
  deleteCookie('token');
  window.location.href = '/resume/online%20shoe%20store/login.html';
}

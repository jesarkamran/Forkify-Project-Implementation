import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, upladData) {
  try {
    const fetchPro = upladData
      ? fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(upladData),
        })
      : fetch(url);
    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message}: ${resp.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

/* 
export const getJSON = async function (url) {
  try {
    const resp = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);

    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message}: ${resp.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export const sendJSON = async function (url, upladData) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(upladData),
    });
    const resp = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);

    const data = await resp.json();

    if (!resp.ok) throw new Error(`${data.message}: ${resp.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
*/

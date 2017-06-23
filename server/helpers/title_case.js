/* eslint arrow-body-style: ["error", "always"]*/
/* eslint-env es6*/
const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

module.exports = toTitleCase;

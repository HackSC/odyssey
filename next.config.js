const withTypescript = require("next-with-typescript");
const withImages = require("next-images");
const withCSS = require("@zeit/next-css");

module.exports = withTypescript(withImages(withCSS()));

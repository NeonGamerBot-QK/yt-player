//const withImages = require("next-images");
//const withTM = require("next-transpile-modules")(["@madzadev/audio-player"]);
//const extra_config = withImages(withTM())
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
// console.log(extra_config, new String(extra_config.webpack).toString())
module.exports = {};

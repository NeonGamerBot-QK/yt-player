// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import ytdl from "ytdl-core";
import yts from "yt-search";
import fetch from "node-fetch";
import {FormData} from "formdata-node"
const url_regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
export default async function handler(req, res) {
const url = req.query.url
console.debug("URL DOWNLOAD ", url, url_regex.test(url))
    if(req.method !== "GET") return res.status(405).json({ error: "Invalid method, only 'GET' is allowed" })
 if(!url) return res.status(400).json({ error: "No URL supplied, supply one by using the ?url= parameter" });
if(!url_regex.test(url)) return res.status(400).json({ error: "The url is invalid!, this is not a valid youtube video link"})
 const stream = ytdl(url, {
    quality: "highestaudio",
    filter: 'audioonly',
    dlChunkSize: 0
 })
 stream.pipe(res)

 stream.on("end", () => {
   console.log("STREAM END")

})
stream.on("data", (chunk) => {
   console.log("DATA", chunk)
}) 
//  const fdata = new FormData()
//   fdata.append("file", stream)
//  fetch("http://n1.saahild.com:2014/upload", {
//    method: "POST",
//    headers: { 'Content-Type': 'multipart/form-data' },
// body: fdata,
// }).then(r=>r.text()).then(e=>{
//    console.log(e)
//    res.json({ ...e })
// })
}
  
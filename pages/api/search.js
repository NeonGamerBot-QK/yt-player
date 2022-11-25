// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import yts from "yt-search";
const url_regex =
  /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:playlist|list|embed)(?:\.php)?(?:\?.*list=|\/))([a-zA-Z0-9\-_]+)/;
export default async function handler(req, res) {
  const url = req.query.url;
  if (req.method !== "GET")
    return res
      .status(405)
      .json({ error: "Invalid method, only 'GET' is allowed" });
  if (!url)
    return res
      .status(400)
      .json({
        error: "No URL supplied, supply one by using the ?url= parameter",
      });
  if (!url_regex.test(url))
    return res
      .status(400)
      .json({
        error: "The url is invalid!, this is not a valid youtube playlist link",
      });
  const list = await yts({ listId: new URL(url).searchParams.get("list") });
  res.status(200).json(list);
}

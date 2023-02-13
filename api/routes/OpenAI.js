const { Configuration, OpenAIApi } = require("openai");
const env = require("dotenv")
const router = require('express').Router();

env.config();


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/', async (req, res) => {
  try {
    const response = await openai.createImage({
      prompt: req.body.prompt,
      n: 1,
      size: "256x256",
      response_format: 'b64_json',
    });
    const image_url0 = response.data.data[0].b64_json;
    const data = {
      photo0: image_url0,
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
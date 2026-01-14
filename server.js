import fs from "fs";

app.post("/generate-video", async (req, res) => {
  const { prompt, style } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // 1️⃣ Generate IMAGE from text
    const image = await replicate.run(
      "stability-ai/sdxl",
      {
        input: {
          prompt: `${prompt}, ${style || "cinematic"} style`,
        },
      }
    );

    // 2️⃣ Convert IMAGE → VIDEO
    const video = await replicate.run(
      "stability-ai/stable-video-diffusion",
      {
        input: {
          input_image: image[0],
          motion_bucket_id: 127,
          frames_per_second: 6,
        },
      }
    );

    res.json({ video: video[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

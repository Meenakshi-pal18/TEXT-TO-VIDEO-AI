const generateBtn = document.getElementById("generate");
const promptInput = document.getElementById("prompt");
const styleSelect = document.getElementById("style");
const videoElement = document.getElementById("video");
const loader = document.getElementById("loader");

generateBtn.addEventListener("click", async () => {
  const prompt = promptInput.value.trim();
  const style = styleSelect.value;

  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  loader.innerText = "Generating video...";
  videoElement.src = "";

  try {
    const response = await fetch("http://localhost:6000/generate-video", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, style }),
    });

    const data = await response.json();

    if (data.video) {
      videoElement.src = data.video;
      loader.innerText = "";
    } else {
      loader.innerText = "Video generation failed.";
    }
  } catch (err) {
    console.error(err);
    loader.innerText = "Video generation failed.";
  }
});

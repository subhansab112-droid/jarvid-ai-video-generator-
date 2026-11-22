import { Client } from "@gradio/client";

const MODEL_ID = "black-forest-labs/FLUX.1-schnell";

let client = null;

// Connect to Hugging Face
async function connectToFlux() {
  if (!client) {
    client = await Client.connect(MODEL_ID);
  }
  return client;
}

// Generate image for Jarvis AI
export async function generateCharacterImage(prompt) {
  try {
    if (!prompt || !prompt.trim()) {
      throw new Error("Please enter an image prompt.");
    }

    console.log("Jarvis: Connecting to FLUX AI...");

    const flux = await connectToFlux();

    console.log("Jarvis: Generating your image...");

    const result = await flux.predict("/infer", {
      prompt: prompt.trim(),
      seed: 0,
      randomize_seed: true,
      width: 512,
      height: 512,
      num_inference_steps: 4
    });

    if (!result.data || !result.data.length) {
      throw new Error("No image was returned.");
    }

    const imageData = result.data[0];

    console.log("Jarvis: Image generated successfully!");

    return imageData;

  } catch (error) {
    console.error("Jarvis Image Generation Error:", error);
    throw error;
  }
}

// Test function
export async function testImageGeneration() {
  const image = await generateCharacterImage(
    "A futuristic AI robot named Jarvis, cinematic lighting"
  );

  return image;
}

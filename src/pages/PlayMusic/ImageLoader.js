// utils/imageLoader.js
export async function loadImage(image) {
    try {
        console.log(image);
      const imageModule = await import(`../images/${image}.jpeg`);
      return imageModule.default;
    } catch (error) {
      console.error(`Error loading image "${image}":`, error);
      return null;
    }
  }
  
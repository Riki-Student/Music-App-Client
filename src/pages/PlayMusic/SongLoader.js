// utils/songLoader.js
export async function loadSong(songName) {
    try {
      const songModule = await import(`../songs/${songName}`);
      return songModule.default;
    } catch (error) {
      console.error(`Error loading song "${songName}":`, error);
      return null;
    }
  }
  
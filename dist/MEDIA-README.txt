Video and background music

VIDEOS (public/video/ folder)
  Put all your wedding videos in:  public/video/
  Then list the filenames in:      src/config.js  →  VIDEO_FILES

  Example: if you have public/video/1.mp4 and public/video/2.mp4, set in config.js:
    export const VIDEO_FILES = ['1.mp4', '2.mp4'];

  They will play one after another in order, then repeat. Full-screen, muted.

MUSIC
  Add one file:  public/music.mp3  (romantic background music)
  Guests turn it on/off with the "Music" button at the bottom-right.

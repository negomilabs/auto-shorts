export const textClip = (text, length, position = "center") => ({
  asset: {
    type: "html",
    width: 800,
    height: 1000,
    position,
    html: `<p data-html-type=\"text\">${text}</p>`,
    css: "p { color: #ffffff; font-size: 80px; font-family: 'Montserrat SemiBold'; text-align: center; text-scale: shrink; }",
  },
  start: 0,
  length,
  fit: "none",
  scale: 1,
  offset: {
    x: 0,
    y: 0,
  },
  position: "center",
});

export const videoClip = (url, length) => ({
  asset: {
    type: "video",
    src: url,
    volume: 0,
  },
  start: 0,
  length,
  offset: {
    x: 0,
    y: 0,
  },
  position: "center",
  opacity: 0.8,
});

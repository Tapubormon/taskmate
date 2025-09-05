const usedColors = new Set();

export const getRandomColor = () => {
  let color;
  let attempts = 0;
  do {
    const hue = Math.floor(Math.random() * 360);
    color = `hsl(${hue}, 70%, 60%)`;
    attempts++;
    if (attempts > 500) break;
  } while (usedColors.has(color));
  usedColors.add(color);
  return color;
};

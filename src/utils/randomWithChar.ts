export const randomWithChar = (character: string, grid: string) => {
  for (let i = 0; i < 20; i++) {
    const randomIndex = Math.floor(Math.random() * 100);
    grid =
      grid.substring(0, randomIndex) +
      character +
      grid.substring(randomIndex + 1);
  }
  return grid;
};

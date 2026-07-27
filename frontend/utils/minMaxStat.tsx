export const minMaxStat = (base: number, level: number) => {
  const [minIV, maxIV] = [0, 31];
  const [minEV, maxEV] = [0, 63];
  const [lowNature, highNature] = [0.9, 1.1];

  const minHP = ((2 * base + minIV + minEV) * level) / 100 + level + 10;
  const maxHP = ((2 * base + maxIV + maxEV) * level) / 100 + level + 10;
  const minStat = Math.floor(
    (((2 * base + minIV + minEV) * level) / 100 + 5) * lowNature,
  );
  const maxStat = Math.floor(
    (((2 * base + maxIV + maxEV) * level) / 100 + 5) * highNature,
  );

  return { minHP, maxHP, minStat, maxStat };
};

export default minMaxStat;

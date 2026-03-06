/**
 * predictNextMonth - a Function that predicts next month spemding using a combinatiom
 * moving weighted average and aggfessive average
 * @data: An array of current and prvious expense
 *
 * Return: The presiction: a nimber
 */

export const predictNextMonth = async (data: any[]) => {
  if (!data)
    return 0;
  if (data.length === 1)
    return Number(data[0]);

  data.forEach((item, idx) => {
    data[idx] = Number(item);
  });

  const avgData = data.reduce((a, b) => a + b, 0) / data.length;
  const filteredData = data.filter((value) => value < avgData * 3);
  const finalData = filteredData.length > 1 ? filteredData : data;

   const growthRate: number[] = [];

   for (let k = 1; k < finalData.length; k++) {
     const curr = finalData[k];
     const prev = finalData[k - 1];
     const weight = k / finalData.length;
     const change = (curr - prev) / (prev || 1);
     growthRate.push(change * weight);
   }
   const avgWeightedRate = growthRate.reduce((a, b) => a + b, 0);
   const lastMonth = finalData[finalData.length - 1];
   const prediction = lastMonth * (1 + avgWeightedRate);

   return Math.max(0, Math.round(prediction * 100) / 100);
}

// console.log(`${await predictNextMonth([120, 110, 270, 500])}`);

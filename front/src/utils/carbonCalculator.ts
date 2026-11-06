export const calculateCarbonFootprint = (distanceKm: number, weightKg: number) => {
  // Average truck emission factor: 0.15 kg CO2 per tonne-km
  const weightTonne = weightKg / 1000;
  const estimatedCo2Kg = +(distanceKm * weightTonne * 0.15).toFixed(1);
  
  // Baseline traditional untracked supply chain waste saving: ~15%
  const co2SavedKg = +(estimatedCo2Kg * 0.25).toFixed(1);
  const foodMiles = distanceKm;

  return {
    estimatedCo2Kg,
    co2SavedKg,
    foodMiles,
    treesEquivalent: +(co2SavedKg / 20).toFixed(1)
  };
};

// src/utils/calculations.ts
interface Seed {
  "Seed Type": string;
  "Seeds/lb": string;
  "Seeds/Unit": string;
  "Lbs/Unit": number;
}

interface Product {
  "Product Name": string;
  "Package Size": number;
  "Package Units": string;
  "Product Packaging": string;
  "Product Cost per Package": string;
  "Product Cost per oz": string;
  "Application Rate in Ounces": number;
}

export interface CalculationResult {
  [key: string]: string | number;
}

export function calculateMetrics(
  seed: Seed,
  product: Product,
  acres: number,
  seedingRate: number,
  rateType: "seeds" | "lbs",
  overrideSeeds?: number
): CalculationResult {
  const seedsPerLb = overrideSeeds ? overrideSeeds : parseFloat(seed["Seeds/lb"]);
  let totalSeeds: number;
  let totalWeight: number;

  if (rateType === "lbs") {
    totalWeight = acres * seedingRate;
    totalSeeds = totalWeight * seedsPerLb;
  } else {
    totalSeeds = acres * seedingRate;
    totalWeight = totalSeeds / seedsPerLb;
  }

  const totalUnits = totalWeight / seed["Lbs/Unit"];
  const appRate = product["Application Rate in Ounces"];
  const totalProductOz = totalUnits * appRate;
  const totalPackages = Math.ceil(totalProductOz / product["Package Size"]);
  const costPerOz = parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""));
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  const costPerUnit = costPerOz * appRate;
  const costPerAcre = (costPerUnit * totalUnits) / acres;
  const totalGrowerCost = totalPackages * costPerPackage;

  return {
    "Total Number of Seeds to be Treated": Math.round(totalSeeds),
    "Total Weight of Seeds to be Treated": totalWeight,
    "Total Number of Units to be Treated": totalUnits,
    "Number of Seeds per Unit": parseFloat(seed["Seeds/Unit"]),
    "Application Rate": `${appRate.toFixed(2)} oz per unit of seed`,
    "Total Amount of Product Needed": `${totalProductOz.toFixed(2)} oz`,
    "Total Number of Product Packages": `${totalPackages} ${product["Product Packaging"].toLowerCase()}`,
    "Product Cost per Package": `$${costPerPackage.toFixed(2)}`,
    "Total Cost to the Grower": `$${totalGrowerCost.toFixed(2)}`,
    "Product Cost per Ounce": `$${costPerOz.toFixed(2)}`,
    "Product Cost per Unit of Treated Seed": `$${costPerUnit.toFixed(2)}`,
    "Product Cost per Acre": `$${costPerAcre.toFixed(2)}`,
  };
}

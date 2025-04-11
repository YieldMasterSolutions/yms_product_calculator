// src/utils/calculations.ts

// Define the Product interface matching your products array.
interface Product {
  "Product Name": string;
  "Package Size": number;
  "Package Units": string;
  "Product Packaging": string;
  "Product Cost per Package": string;
  "Product Cost per fl oz"?: string;
  "Product Cost per oz"?: string;
  "Product Cost per gram"?: string;
  "Application Rate in Fluid Ounces"?: number;
  "Application Rate in Grams"?: number;
}

// This interface defines the calculated data for an individual product.
export interface ProductCalculation {
  productName: string;
  packagesNeeded: number;
  productPackageString: string;
  totalCostToGrower: number;
  individualCostPerAcre: number;
}

// Calculate detailed data for one product based on the number of acres.
export function calculateProductData(acres: number, product: Product): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;
  
  // Determine the application rate and the cost per unit from available fields.
  if (product["Application Rate in Fluid Ounces"]) {
    applicationRate = product["Application Rate in Fluid Ounces"];
    if (product["Product Cost per fl oz"]) {
      costPerUnit = parseFloat(product["Product Cost per fl oz"].replace(/[^\d.-]/g, ""));
    } else if (product["Product Cost per oz"]) {
      costPerUnit = parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""));
    }
  } else if (product["Application Rate in Grams"]) {
    applicationRate = product["Application Rate in Grams"];
    if (product["Product Cost per gram"]) {
      costPerUnit = parseFloat(product["Product Cost per gram"].replace(/[^\d.-]/g, ""));
    }
  }
  
  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  
  // Calculate the total amount of product required based on acres and application rate.
  const requiredTotal = acres * (applicationRate || 0);
  // Determine the number of packages needed (round up).
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  // Total cost to grower is calculated by the number of packages multiplied by the package cost.
  const totalCostToGrower = packagesNeeded * costPerPackage;
  // Individual cost per acre is the application rate times the cost per unit.
  const individualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  
  // Build a string showing packaging details with dashes.
  // e.g.: "32 fl oz - Jugs"
  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;
  
  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    totalCostToGrower,
    individualCostPerAcre,
  };
}

// Calculate costs for an array of selected products.
export function calculateProductCosts(
  acres: number,
  selectedProducts: Product[]
): { productsData: ProductCalculation[]; totalCostPerAcre: number; totalCost: number } {
  const productsData = selectedProducts.map(product => calculateProductData(acres, product));
  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalCost = productsData.reduce((sum, p) => sum + p.totalCostToGrower, 0);
  return { productsData, totalCostPerAcre, totalCost };
}

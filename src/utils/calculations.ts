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

// For one product, calculate cost data using the combined discount.
// The discountFactor is computed as 1 - ((dealerDiscount + growerDiscount) / 100).
export function calculateProductData(
  acres: number,
  product: Product,
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): ProductCalculation {
  let applicationRate: number | undefined;
  let costPerUnit: number | undefined;
  
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
  
  // Calculate total product required (in the same unit as the application rate)
  const requiredTotal = acres * (applicationRate || 0);
  // Number of packages needed (round up)
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  // Total cost to grower before discounts:
  const totalCostToGrower = packagesNeeded * costPerPackage;
  // Individual cost per acre before discount
  const individualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  
  // Build product packaging string with dashes.
  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;
  
  // Calculate discount factor from dealer and grower percentages.
  const discountFactor = 1 - ((dealerDiscount + growerDiscount) / 100);
  
  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    totalCostToGrower: totalCostToGrower * discountFactor,
    individualCostPerAcre: individualCostPerAcre * discountFactor,
  };
}

// Calculate costs for an array of selected products.
export function calculateProductCosts(
  acres: number,
  selectedProducts: Product[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): { productsData: ProductCalculation[]; totalCostPerAcre: number; totalCost: number } {
  const productsData = selectedProducts.map(product =>
    calculateProductData(acres, product, dealerDiscount, growerDiscount)
  );
  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalCost = productsData.reduce((sum, p) => sum + p.totalCostToGrower, 0);
  return { productsData, totalCostPerAcre, totalCost };
}

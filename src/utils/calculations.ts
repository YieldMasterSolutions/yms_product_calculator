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
  originalTotalCostToGrower: number;
  discountedTotalCostToGrower: number;
  individualCostPerAcre: number; // This is the discounted cost per acre.
}

// Calculate detailed data for one product given the number of acres and discount percentages.
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
  
  // Calculate the total product required (in the same unit as application rate).
  const requiredTotal = acres * (applicationRate || 0);
  // Calculate number of packages needed (round up).
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  
  // Original (undiscounted) Total Cost to Grower:
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  
  // Combine discounts to get a discount factor.
  const discountFactor = 1 - ((dealerDiscount + growerDiscount) / 100);
  
  // Discounted Total Cost to Grower:
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;
  
  // Individual Cost per Acre (discounted) is based on application rate times cost per unit.
  const originalIndividualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  const discountedIndividualCostPerAcre = originalIndividualCostPerAcre * discountFactor;
  
  // Build the packaging string with dashes (e.g., "32 fl oz - Jugs").
  const productPackageString = `${packageSize} ${product["Package Units"]} - ${product["Product Packaging"]}`;
  
  return {
    productName: product["Product Name"],
    packagesNeeded,
    productPackageString,
    originalTotalCostToGrower,
    discountedTotalCostToGrower,
    individualCostPerAcre: discountedIndividualCostPerAcre,
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
  // Sum each product's discounted individual cost per acre.
  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  // Sum each product's discounted total cost to grower.
  const totalCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);
  return { productsData, totalCostPerAcre, totalCost };
}

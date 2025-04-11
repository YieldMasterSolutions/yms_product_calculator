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

// Calculate detailed data for one product.
export function calculateProductData(acres: number, product: Product): ProductCalculation {
  // Determine application rate and cost per unit by checking preferred fields (fluid ounces first).
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
  
  // Use the package size and cost per package from the product.
  const packageSize = product["Package Size"];
  const costPerPackage = parseFloat(product["Product Cost per Package"].replace(/[^\d.-]/g, ""));
  
  // Calculate the total product amount required (in the same unit as application rate):
  const requiredTotal = acres * (applicationRate || 0);
  // Determine the number of packages needed (round up):
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  // Total cost to grower, based on how many packages must be purchased:
  const totalCostToGrower = packagesNeeded * costPerPackage;
  // Individual cost per acre is determined from the rate and cost per unit.
  const individualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  
  // Construct a string that combines package size, unit, and packaging.
  const productPackageString = `${packageSize} ${product["Package Units"]} ${product["Product Packaging"]}`;
  
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
): { productsData: ProductCalculation[]; totalCostPerAcre: number } {
  const productsData = selectedProducts.map(product => calculateProductData(acres, product));
  // Sum each product's individual cost per acre.
  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  return { productsData, totalCostPerAcre };
}

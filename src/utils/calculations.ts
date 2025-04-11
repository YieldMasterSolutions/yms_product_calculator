// src/utils/calculations.ts

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

export interface ProductCalculation {
  productName: string;
  packagesNeeded: number;
  productPackageString: string;
  originalTotalCostToGrower: number;
  discountedTotalCostToGrower: number;
  individualCostPerAcre: number; // discounted cost per acre.
}

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
  
  const requiredTotal = acres * (applicationRate || 0);
  const packagesNeeded = Math.ceil(requiredTotal / packageSize);
  
  const originalTotalCostToGrower = packagesNeeded * costPerPackage;
  
  // Calculate discount factor.
  const discountFactor = 1 - ((dealerDiscount + growerDiscount) / 100);
  const discountedTotalCostToGrower = originalTotalCostToGrower * discountFactor;
  
  const originalIndividualCostPerAcre = (applicationRate || 0) * (costPerUnit || 0);
  const discountedIndividualCostPerAcre = originalIndividualCostPerAcre * discountFactor;
  
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

export function calculateProductCosts(
  acres: number,
  selectedProducts: Product[],
  dealerDiscount: number = 0,
  growerDiscount: number = 0
): { productsData: ProductCalculation[]; totalCostPerAcre: number; totalUndiscountedCost: number; totalDiscountedCost: number } {
  const productsData = selectedProducts.map(product =>
    calculateProductData(acres, product, dealerDiscount, growerDiscount)
  );
  const totalCostPerAcre = productsData.reduce((sum, p) => sum + p.individualCostPerAcre, 0);
  const totalUndiscountedCost = productsData.reduce((sum, p) => sum + p.originalTotalCostToGrower, 0);
  const totalDiscountedCost = productsData.reduce((sum, p) => sum + p.discountedTotalCostToGrower, 0);
  return { productsData, totalCostPerAcre, totalUndiscountedCost, totalDiscountedCost };
}

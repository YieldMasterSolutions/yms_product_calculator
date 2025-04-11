// src/utils/calculations.ts

// Define the Product interface to match the structure used in your products array.
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

// This interface defines the structure for individual product cost results.
export interface ProductCostResult {
  productName: string;
  costPerAcre: number;
}

// Export the calculateProductCosts function so that it is available for import.
export function calculateProductCosts(
  acres: number,
  selectedProducts: Product[]
): { individualCosts: ProductCostResult[]; totalCostPerAcre: number } {
  const individualCosts: ProductCostResult[] = selectedProducts.map((product) => {
    let costPerUnit: number | null = null;
    // Check for cost per fluid ounce, per ounce, or per gram.
    if (product["Product Cost per fl oz"]) {
      costPerUnit = parseFloat(product["Product Cost per fl oz"].replace(/[^\d.-]/g, ""));
    } else if (product["Product Cost per oz"]) {
      costPerUnit = parseFloat(product["Product Cost per oz"].replace(/[^\d.-]/g, ""));
    } else if (product["Product Cost per gram"]) {
      costPerUnit = parseFloat(product["Product Cost per gram"].replace(/[^\d.-]/g, ""));
    }
    
    let applicationRate: number | null = null;
    // Check for application rate in fluid ounces or in grams.
    if (product["Application Rate in Fluid Ounces"]) {
      applicationRate = product["Application Rate in Fluid Ounces"];
    } else if (product["Application Rate in Grams"]) {
      applicationRate = product["Application Rate in Grams"];
    }
    
    // If any required value is missing, return zero cost.
    if (costPerUnit === null || applicationRate === null) {
      return { productName: product["Product Name"], costPerAcre: 0 };
    }
    
    // Calculate cost per acre for the product.
    const costPerAcre = costPerUnit * applicationRate;
    return { productName: product["Product Name"], costPerAcre };
  });

  // Total cost per acre is the sum of the individual costs.
  const totalCostPerAcre = individualCosts.reduce((sum, item) => sum + item.costPerAcre, 0);
  return { individualCosts, totalCostPerAcre };
}

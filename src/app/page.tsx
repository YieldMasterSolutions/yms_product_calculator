// src/app/page.tsx
"use client";
import React, { useState } from "react";
import { CalculatorForm } from "../components/CalculatorForm";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { calculateProductCosts } from "../utils/calculations";
import { ProductCalculation } from "../utils/calculations";

// Define the complete seedTypes array (for aesthetics)
const seedTypes = [
  { "Seed Type": "Corn", "Seeds/lb": "1778", "Seeds/Unit": "80000", "Lbs/Unit": 45 },
  { "Seed Type": "Soybeans", "Seeds/lb": "2800", "Seeds/Unit": "140000", "Lbs/Unit": 50 },
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Seeds/Unit": "10500000", "Lbs/Unit": 50 },
  { "Seed Type": "Wheat", "Seeds/lb": "18000", "Seeds/Unit": "750000", "Lbs/Unit": 50 },
  { "Seed Type": "Barley", "Seeds/lb": "14500", "Seeds/Unit": "725000", "Lbs/Unit": 50 },
  { "Seed Type": "Canola", "Seeds/lb": "130000", "Seeds/Unit": "6500000", "Lbs/Unit": 50 },
  { "Seed Type": "Flax", "Seeds/lb": "85000", "Seeds/Unit": "4250000", "Lbs/Unit": 50 },
  { "Seed Type": "Lentils", "Seeds/lb": "16500", "Seeds/Unit": "825000", "Lbs/Unit": 50 },
  { "Seed Type": "Peas", "Seeds/lb": "4000", "Seeds/Unit": "200000", "Lbs/Unit": 50 },
  { "Seed Type": "Sorghum", "Seeds/lb": "15500", "Seeds/Unit": "775000", "Lbs/Unit": 50 },
  { "Seed Type": "Sugarbeets", "Seeds/lb": "2000", "Seeds/Unit": "100000", "Lbs/Unit": 50 },
  { "Seed Type": "Sunflowers", "Seeds/lb": "6500", "Seeds/Unit": "325000", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Medium)", "Seeds/lb": "650", "Seeds/Unit": "32500", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Small)", "Seeds/lb": "1100", "Seeds/Unit": "55000", "Lbs/Unit": 50 },
  { "Seed Type": "Potatoes", "Seeds/lb": "6", "Seeds/Unit": "600", "Lbs/Unit": 100 },
  
];

// Define the complete products array with updated names if needed.
const products = [
  { "Product Name": "SoyFX", "Package Size": 320, "Package Units": "fl oz", "Product Packaging": "Jugs", "Product Cost per Package": "$240.60", "Product Cost per fl oz": "$0.75", "Application Rate in Fluid Ounces": 16 },
  { "Product Name": "PodFX", "Package Size": 320, "Package Units": "fl oz", "Product Packaging": "Jugs", "Product Cost per Package": "$240.60", "Product Cost per fl oz": "$0.75", "Application Rate in Fluid Ounces": 16 },
  { "Product Name": "N-Physis WG", "Package Size": 200, "Package Units": "gram", "Product Packaging": "Boxes", "Product Cost per Package": "$598.00", "Product Cost per gram": "$2.99", "Application Rate in Grams": 5 },
  { "Product Name": "Envita SC", "Package Size": 320, "Package Units": "fl oz", "Product Packaging": "Jugs", "Product Cost per Package": "$598.00", "Product Cost per oz": "$18.69", "Application Rate in Fluid Ounces": 0.8 },
  { "Product Name": "Nutriquire Liquid", "Package Size": 320, "Package Units": "fl oz", "Product Packaging": "Jugs", "Product Cost per Package": "$139.50", "Product Cost per oz": "$0.44", "Application Rate in Fluid Ounces": 32 },
  // Renamed to make it unique:
  { "Product Name": "Nutriquire Liquid Tote", "Package Size": 35200, "Package Units": "fl oz", "Product Packaging": "Totes", "Product Cost per Package": "$15,345.00", "Product Cost per oz": "$0.44", "Application Rate in Fluid Ounces": 32 },
  { "Product Name": "NueNutri Liquid", "Package Size": 320, "Package Units": "fl oz", "Product Packaging": "Jugs", "Product Cost per Package": "$107.50", "Product Cost per oz": "$0.34", "Application Rate in Fluid Ounces": 32 }
];

export default function HomePage() {
  const [productsData, setProductsData] = useState<ProductCalculation[]>([]);
  const [totalCostPerAcre, setTotalCostPerAcre] = useState<number | null>(null);
  const [totalCost, setTotalCost] = useState<number | null>(null);

  const handleFormSubmit = (formData: {
    selectedSeedType: string;
    acres: string;
    selectedProducts: string[];
    dealerDiscount: string;
    growerDiscount: string;
  }) => {
    const acresNum = parseFloat(formData.acres);
    // Filter products that match the selected product names.
    const selectedProductObjects = products.filter(p =>
      formData.selectedProducts.includes(p["Product Name"])
    );
    if (selectedProductObjects.length === 0 || isNaN(acresNum)) {
      console.log("Missing required input", formData);
      return;
    }
    const dealer = formData.dealerDiscount ? parseFloat(formData.dealerDiscount) : 0;
    const grower = formData.growerDiscount ? parseFloat(formData.growerDiscount) : 0;
    const { productsData, totalCostPerAcre, totalCost } = calculateProductCosts(acresNum, selectedProductObjects, dealer, grower);
    setProductsData(productsData);
    setTotalCostPerAcre(totalCostPerAcre);
    setTotalCost(totalCost);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-gradient-to-b from-zinc-950 to-zinc-900 text-white min-h-screen">
      <div className="text-center mb-6">
        <h1 className="text-5xl font-bold text-yellow-400 tracking-tight">YieldMaster Solutions</h1>
        <p className="text-3xl font-bold text-zinc-400">Biological Product Calculator</p>
      </div>
      <div className="flex justify-end">
        <button
          className="text-sm text-zinc-400 hover:text-white border border-zinc-600 px-3 py-1 rounded"
          onClick={() => document.documentElement.classList.toggle("dark")}
        >
          Toggle Theme
        </button>
      </div>
      <CalculatorForm seedTypes={seedTypes} products={products} onSubmit={handleFormSubmit} />
      {productsData.length > 0 && totalCostPerAcre !== null && totalCost !== null && (
        <ResultsDisplay 
          productsData={productsData} 
          totalCostPerAcre={totalCostPerAcre}
          totalCost={totalCost}
        />
      )}
    </div>
  );
}

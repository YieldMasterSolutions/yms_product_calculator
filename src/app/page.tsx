"use client";
import React, { useState } from "react";
import { CalculatorForm } from "../components/CalculatorForm";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { calculateMetrics, CalculationResult } from "../utils/calculations";

// Define the complete seedTypes array
const seedTypes = [
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Seeds/Unit": "10500000", "Lbs/Unit": 50 },
  { "Seed Type": "Barley", "Seeds/lb": "14500", "Seeds/Unit": "725000", "Lbs/Unit": 50 },
  { "Seed Type": "Canola", "Seeds/lb": "130000", "Seeds/Unit": "6500000", "Lbs/Unit": 50 },
  { "Seed Type": "Corn", "Seeds/lb": "1778", "Seeds/Unit": "80000", "Lbs/Unit": 45 },
  { "Seed Type": "Flax", "Seeds/lb": "85000", "Seeds/Unit": "4250000", "Lbs/Unit": 50 },
  { "Seed Type": "Lentils", "Seeds/lb": "16500", "Seeds/Unit": "825000", "Lbs/Unit": 50 },
  { "Seed Type": "Peas", "Seeds/lb": "4000", "Seeds/Unit": "200000", "Lbs/Unit": 50 },
  { "Seed Type": "Sorghum", "Seeds/lb": "15500", "Seeds/Unit": "775000", "Lbs/Unit": 50 },
  { "Seed Type": "Soybeans", "Seeds/lb": "2800", "Seeds/Unit": "140000", "Lbs/Unit": 50 },
  { "Seed Type": "Sugarbeets", "Seeds/lb": "2000", "Seeds/Unit": "100000", "Lbs/Unit": 50 },
  { "Seed Type": "Sunflower", "Seeds/lb": "6500", "Seeds/Unit": "325000", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Medium)", "Seeds/lb": "650", "Seeds/Unit": "32500", "Lbs/Unit": 50 },
  { "Seed Type": "Peanuts (Small)", "Seeds/lb": "1100", "Seeds/Unit": "55000", "Lbs/Unit": 50 },
  { "Seed Type": "Wheat", "Seeds/lb": "18000", "Seeds/Unit": "750000", "Lbs/Unit": 50 }
];

// Define the complete products array
const products = [
  { "Product Name": "DUST Pail", "Package Size": 112.0, "Package Units": "oz", "Product Packaging": "Pails", "Product Cost per Package": "$60.00", "Product Cost per oz": "$1.87", "Application Rate in Ounces": 0.5 },
  { "Product Name": "DUST Pail", "Package Size": 224.0, "Package Units": "oz", "Product Packaging": "Pails", "Product Cost per Package": "$120.00", "Product Cost per oz": "$1.87", "Application Rate in Ounces": 0.5 },
  { "Product Name": "DUST Pouch", "Package Size": 16.0, "Package Units": "oz", "Product Packaging": "Pouches", "Product Cost per Package": "$15.50", "Product Cost per oz": "$0.97", "Application Rate in Ounces": 0.5 },
  { "Product Name": "OmniSync Pail", "Package Size": 320.0, "Package Units": "oz", "Product Packaging": "Pails", "Product Cost per Package": "$952.00", "Product Cost per oz": "$2.98", "Application Rate in Ounces": 2.0 },
  { "Product Name": "Nutriquire + Terrasym450 + DUST Corn", "Package Size": 12.5, "Package Units": "oz", "Product Packaging": "Pouches", "Product Cost per Package": "$882.05", "Product Cost per oz": "$70.56", "Application Rate in Ounces": 0.5 },
  { "Product Name": "Nutriquire + Terrasym401 + DUST Soybean", "Package Size": 20.0, "Package Units": "oz", "Product Packaging": "Pouches", "Product Cost per Package": "$598.00", "Product Cost per oz": "$29.90", "Application Rate in Ounces": 0.5 },
  { "Product Name": "Terrasym 450 + DUST + TS201 for Corn Root Worm", "Package Size": 25.0, "Package Units": "oz", "Product Packaging": "Pouches", "Product Cost per Package": "$1,740.50", "Product Cost per oz": "$69.62", "Application Rate in Ounces": 0.5 }
];

export default function HomePage() {
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleFormSubmit = (formData: {
    selectedSeedType: string;
    acres: string;
    selectedProduct: string;
    seedingRate: string;
    rateType: "seeds" | "lbs";
    overrideSeeds: string;
  }) => {
    const seed = seedTypes.find((s) => s["Seed Type"] === formData.selectedSeedType);
    const product = products.find((p) => p["Product Name"] === formData.selectedProduct);
    if (!seed || !product || !formData.acres || !formData.seedingRate) {
      console.log("Missing required input", formData);
      return;
    }

    const acresNum = parseFloat(formData.acres);
    const seedingRateNum = parseFloat(formData.seedingRate);
    const overrideSeedsNum = formData.overrideSeeds ? parseFloat(formData.overrideSeeds) : undefined;

    const calcResult = calculateMetrics(seed, product, acresNum, seedingRateNum, formData.rateType, overrideSeedsNum);
    setResult(calcResult);
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
      {result && <ResultsDisplay result={result} />}
    </div>
  );
}

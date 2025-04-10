// src/app/page.tsx
"use client";
import React, { useState } from "react";
import { CalculatorForm } from "../components/CalculatorForm";
import { ResultsDisplay } from "../components/ResultsDisplay";
import { calculateMetrics, CalculationResult } from "../utils/calculations";

// Define your seedTypes and products arrays here (or import them if you have them in another module)
const seedTypes = [
  { "Seed Type": "Alfalfa", "Seeds/lb": "210000", "Seeds/Unit": "10500000", "Lbs/Unit": 50 },
  // ... other seed types
];
const products = [
  { "Product Name": "DUST Pail", "Package Size": 112.0, "Package Units": "oz", "Product Packaging": "Pails", "Product Cost per Package": "$60.00", "Product Cost per oz": "$1.87", "Application Rate in Ounces": 0.5 },
  // ... other products
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

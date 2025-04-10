// src/components/CalculatorForm.tsx
"use client";
import React, { useState } from "react";

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

interface CalculatorFormProps {
  seedTypes: Seed[];
  products: Product[];
  onSubmit: (formData: {
    selectedSeedType: string;
    acres: string;
    selectedProduct: string;
    seedingRate: string;
    rateType: "seeds" | "lbs";
    overrideSeeds: string;
  }) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ seedTypes, products, onSubmit }) => {
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [seedingRate, setSeedingRate] = useState("");
  const [rateType, setRateType] = useState<"seeds" | "lbs">("seeds");
  const [overrideSeeds, setOverrideSeeds] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      selectedSeedType,
      acres,
      selectedProduct,
      seedingRate,
      rateType,
      overrideSeeds,
    });
  };

  return (
    <div className="bg-zinc-800 shadow-lg border border-zinc-700 p-4 rounded">
      <h2 className="text-green-300 text-xl font-semibold mb-4">Calculator Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1">Seed Type</label>
          <select
            value={selectedSeedType}
            onChange={(e) => setSelectedSeedType(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">Select Seed Type</option>
            {seedTypes.map((s, i) => (
              <option key={i} value={s["Seed Type"]}>
                {s["Seed Type"]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">How many acres to be planted?</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">Product</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="">Select Product</option>
            {products.map((p, i) => (
              <option key={i} value={p["Product Name"]}>
                {`${p["Product Name"]} - ${p["Package Size"]} ${p["Package Units"]} - ${p["Product Packaging"]}`}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1">Seeding Rate</label>
          <input
            type="number"
            value={seedingRate}
            onChange={(e) => setSeedingRate(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Rate Type</label>
          <select
            value={rateType}
            onChange={(e) => setRateType(e.target.value as "seeds" | "lbs")}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          >
            <option value="seeds">Seeds/Acre</option>
            <option value="lbs">Lbs/Acre</option>
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">Override Seeds per Pound (optional)</label>
          {selectedSeedType && (
            <div className="text-sm text-zinc-400 mb-1">
              Default Seeds/lb for {selectedSeedType}:{" "}
              {seedTypes.find((s) => s["Seed Type"] === selectedSeedType)?.["Seeds/lb"]}
            </div>
          )}
          <input
            type="number"
            value={overrideSeeds}
            onChange={(e) => setOverrideSeeds(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        <div className="md:col-span-2 text-center">
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 rounded-full text-lg"
          >
            Calculate
          </button>
        </div>
      </form>
    </div>
  );
};

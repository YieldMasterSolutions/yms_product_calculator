// src/components/CalculatorForm.tsx
"use client";
import React, { useState } from "react";

// Define explicit types for the seed and product objects.
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
  "Product Cost per fl oz"?: string;
  "Product Cost per oz"?: string;
  "Product Cost per gram"?: string;
  "Application Rate in Fluid Ounces"?: number;
  "Application Rate in Grams"?: number;
}

interface CalculatorFormProps {
  seedTypes: Seed[];
  products: Product[];
  onSubmit: (formData: {
    selectedSeedType: string;
    acres: string;
    selectedProducts: string[]; // Array of product names (up to three)
  }) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ seedTypes, products, onSubmit }) => {
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");
  const [selectedProduct3, setSelectedProduct3] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Combine the three product selections and filter out empty strings.
    const selectedProducts = [selectedProduct1, selectedProduct2, selectedProduct3].filter(p => p !== "");
    onSubmit({
      selectedSeedType,
      acres,
      selectedProducts,
    });
  };

  return (
    <div className="bg-zinc-800 shadow-lg border border-zinc-700 p-4 rounded">
      <h2 className="text-green-300 text-xl font-semibold mb-4">Calculator Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Seed type (aesthetic only) */}
        <div>
          <label className="block mb-1">Seed Type (Aesthetic)</label>
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
        {/* Acres input */}
        <div>
          <label className="block mb-1">How many acres to be treated?</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        {/* Product selectors */}
        <div>
          <label className="block mb-1">Select Product 1</label>
          <select
            value={selectedProduct1}
            onChange={(e) => setSelectedProduct1(e.target.value)}
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
          <label className="block mb-1">Select Product 2 (optional)</label>
          <select
            value={selectedProduct2}
            onChange={(e) => setSelectedProduct2(e.target.value)}
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
          <label className="block mb-1">Select Product 3 (optional)</label>
          <select
            value={selectedProduct3}
            onChange={(e) => setSelectedProduct3(e.target.value)}
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
        <div className="text-center">
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

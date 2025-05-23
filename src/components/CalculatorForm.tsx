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
    cropPrice: string;
    cropPriceUnit: string;
    selectedProducts: string[];
    selectedApplicationTypes: string[];
    dealerDiscount: string;
    growerDiscount: string;
  }) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ seedTypes, products, onSubmit }) => {
  // Use props seedTypes/products only for populating drop-downs.
  // State for form inputs:
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  const [cropPrice, setCropPrice] = useState("");
  const [cropPriceUnit, setCropPriceUnit] = useState("bushel");
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");
  const [selectedProduct3, setSelectedProduct3] = useState("");
  const [selectedProduct1App, setSelectedProduct1App] = useState("In-Furrow");
  const [selectedProduct2App, setSelectedProduct2App] = useState("In-Furrow");
  const [selectedProduct3App, setSelectedProduct3App] = useState("In-Furrow");
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create arrays for product names and their corresponding application type if provided.
    const selectedProducts = [selectedProduct1, selectedProduct2, selectedProduct3].filter(p => p !== "");
    const selectedApplicationTypes = [selectedProduct1App, selectedProduct2App, selectedProduct3App].filter((_, i) => {
      const productVal = [selectedProduct1, selectedProduct2, selectedProduct3][i];
      return productVal !== "";
    });
    
    onSubmit({
      selectedSeedType,
      acres,
      cropPrice,
      cropPriceUnit,
      selectedProducts,
      selectedApplicationTypes,
      dealerDiscount,
      growerDiscount,
    });
  };

  return (
    <div className="bg-zinc-800 shadow-lg border border-zinc-700 p-4 rounded">
      <h2 className="text-green-300 text-xl font-semibold mb-4">Calculator Form</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
        {/* Seed Type (Aesthetic Only) */}
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
        {/* Acres Input */}
        <div>
          <label className="block mb-1">How many acres to be treated?</label>
          <input
            type="number"
            value={acres}
            onChange={(e) => setAcres(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
          />
        </div>
        {/* Crop Price Input */}
        <div className="flex items-center space-x-2">
          <div className="flex-1">
            <label className="block mb-1">Price Being Paid for Crop ($USD)</label>
            <input
              type="number"
              value={cropPrice}
              onChange={(e) => setCropPrice(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              placeholder="e.g., 5.00"
            />
          </div>
          <div>
            <label className="block mb-1">&nbsp;</label>
            <div className="flex items-center space-x-1">
              <span>per</span>
              <select
                value={cropPriceUnit}
                onChange={(e) => setCropPriceUnit(e.target.value)}
                className="p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="bushel">bushel</option>
                <option value="lb">lb</option>
                <option value="cwt">cwt</option>
                <option value="U.S. ton">U.S. ton</option>
              </select>
            </div>
          </div>
        </div>
        {/* Product 1 */}
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
          {selectedProduct1 && (
            <div className="mt-2">
              <label className="block mb-1">Application Type</label>
              <select
                value={selectedProduct1App}
                onChange={(e) => setSelectedProduct1App(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>
            </div>
          )}
        </div>
        {/* Product 2 */}
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
          {selectedProduct2 && (
            <div className="mt-2">
              <label className="block mb-1">Application Type</label>
              <select
                value={selectedProduct2App}
                onChange={(e) => setSelectedProduct2App(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>
            </div>
          )}
        </div>
        {/* Product 3 */}
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
          {selectedProduct3 && (
            <div className="mt-2">
              <label className="block mb-1">Application Type</label>
              <select
                value={selectedProduct3App}
                onChange={(e) => setSelectedProduct3App(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
              >
                <option value="In-Furrow">In-Furrow</option>
                <option value="Foliar">Foliar</option>
              </select>
            </div>
          )}
        </div>
        {/* Dealer Discount */}
        <div>
          <label className="block mb-1">Dealer Discount (%) (optional)</label>
          <input
            type="number"
            value={dealerDiscount}
            onChange={(e) => setDealerDiscount(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="e.g., 2"
          />
        </div>
        {/* Grower Discount */}
        <div>
          <label className="block mb-1">Grower Discount (%) (optional)</label>
          <input
            type="number"
            value={growerDiscount}
            onChange={(e) => setGrowerDiscount(e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded"
            placeholder="e.g., 3"
          />
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

export default CalculatorForm;

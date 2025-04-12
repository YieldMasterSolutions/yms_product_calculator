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
    cropPrice: string;
    cropPriceUnit: string;
    selectedProducts: string[];
    selectedApplicationTypes: string[];
    dealerDiscount: string;
    growerDiscount: string;
  }) => void;
}

export const CalculatorForm: React.FC<CalculatorFormProps> = ({ seedTypes, products, onSubmit }) => {
  // ... rest of your component code (inputs for seedTypes, acres, cropPrice, cropPriceUnit, product selectors, application types, and discounts) ...
  
  const [selectedSeedType, setSelectedSeedType] = useState("");
  const [acres, setAcres] = useState("");
  // New crop price fields:
  const [cropPrice, setCropPrice] = useState("");
  const [cropPriceUnit, setCropPriceUnit] = useState("bushel");
  
  // Product selectors.
  const [selectedProduct1, setSelectedProduct1] = useState("");
  const [selectedProduct2, setSelectedProduct2] = useState("");
  const [selectedProduct3, setSelectedProduct3] = useState("");
  
  // Application types.
  const [selectedProduct1App, setSelectedProduct1App] = useState("In-Furrow");
  const [selectedProduct2App, setSelectedProduct2App] = useState("In-Furrow");
  const [selectedProduct3App, setSelectedProduct3App] = useState("In-Furrow");
  
  // Discount fields.
  const [dealerDiscount, setDealerDiscount] = useState("");
  const [growerDiscount, setGrowerDiscount] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedProducts = [selectedProduct1, selectedProduct2, selectedProduct3].filter(p => p !== "");
    const selectedApplicationTypes = [selectedProduct1App, selectedProduct2App, selectedProduct3App]
      .filter((_, i) => [selectedProduct1, selectedProduct2, selectedProduct3][i] !== "");
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

  // Render form UI (omitted here for brevity; use your existing markup)
  return (
    <div className="bg-zinc-800 shadow-lg border border-zinc-700 p-4 rounded">
      {/* Render inputs for seed type, acres, crop price, crop price unit, product selectors, application types, discounts */}
      <form onSubmit={handleSubmit}>
        {/* ... form content ... */}
      </form>
    </div>
  );
};

// src/components/ResultsDisplay.tsx
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { ProductCalculation } from "../utils/calculations";

interface ResultsDisplayProps {
  productsData: ProductCalculation[];
  totalCostPerAcre: number;
  totalCost: number;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  productsData,
  totalCostPerAcre,
  totalCost,
}) => {
  const resultRef = useRef<HTMLDivElement>(null);

  const downloadPDF = () => {
    if (!resultRef.current) return;
    html2canvas(resultRef.current, { scale: window.devicePixelRatio || 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "pt", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight);
      pdf.save("YieldMaster_Calculation.pdf");
    });
  };

  return (
    <div ref={resultRef} className="mt-6 space-y-6">
      {/* Heading for individual product costs */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
        <strong className="block text-2xl font-bold text-yellow-400 mb-1">Individual Product Costs</strong>
      </div>
      {/* Render a box for each product */}
      {productsData.map((product, i) => (
        <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-3">
          <strong className="block text-xl font-bold text-yellow-400 mb-1">{product.productName}</strong>
          <p className="mb-1">
            Total Product Units Needed = {product.packagesNeeded} - {product.productPackageString}
          </p>
          <p className="mb-1">
            Total Cost to Grower = ${product.totalCostToGrower.toFixed(2)}
          </p>
          <p>
            Individual Cost per Acre = ${product.individualCostPerAcre.toFixed(2)}
          </p>
        </div>
      ))}
      {/* Summary box for total program costs */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-3">
        <strong className="block text-xl font-bold text-yellow-400 mb-1">Total Program Costs</strong>
        <p>Total Cost = ${totalCost.toFixed(2)}</p>
        <p>Total Program Cost per Acre = ${totalCostPerAcre.toFixed(2)}</p>
      </div>
      {/* Download PDF Button */}
      <div className="text-center my-4">
        <button
          onClick={downloadPDF}
          className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-full text-white"
        >
          Download PDF
        </button>
      </div>
    </div>

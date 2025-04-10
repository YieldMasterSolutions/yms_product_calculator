// src/components/ResultsDisplay.tsx
"use client";
import React, { useRef } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ResultsDisplayProps {
  result: { [key: string]: string | number };
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result }) => {
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
    <div ref={resultRef} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {Object.entries(result).map(([label, value], i) => (
        <div key={i} className="bg-gray-900 border border-gray-700 rounded-xl p-3">
          <strong className="block text-xl font-bold text-yellow-400 mb-1">{label}</strong>
          <span className="text-base">{value}</span>
        </div>
      ))}
      <div className="md:col-span-2 text-center my-4">
        <button
          onClick={downloadPDF}
          className="bg-green-700 hover:bg-green-600 px-6 py-2 rounded-full text-white"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

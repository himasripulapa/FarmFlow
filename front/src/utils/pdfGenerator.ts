import jsPDF from 'jspdf';
import { Batch } from '../types';

export const generateBatchCertificatePDF = (batch: Batch) => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  // Header Banner (FarmFlow Green)
  doc.setFillColor(46, 125, 50); // #2E7D32
  doc.rect(0, 0, 210, 35, 'F');

  // Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('FarmFlow Quality Certificate', 15, 18);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('From Farm to Fork, Tracked. | Digital Supply Chain Passport', 15, 26);

  // Verification Badge Box
  doc.setFillColor(249, 168, 37); // #F9A825
  doc.rect(150, 8, 45, 18, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.text('VERIFIED BATCH', 154, 15);
  doc.text(batch.batchId, 154, 21);

  // Reset text color
  doc.setTextColor(40, 40, 40);

  // Section 1: Batch Identification
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Crop & Origin Specifications', 15, 47);

  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(15, 50, 195, 50);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`Batch ID: ${batch.batchId}`, 15, 58);
  doc.text(`Crop Name: ${batch.crop.name} (${batch.crop.variety})`, 15, 65);
  doc.text(`Category: ${batch.crop.category.toUpperCase()}`, 15, 72);
  doc.text(`Quantity: ${batch.quantity} ${batch.unit}`, 15, 79);
  doc.text(`Organic Certified: ${batch.organic ? 'YES (100% Organic)' : 'No (Standard Cultivation)'}`, 15, 86);

  doc.text(`Farmer Name: ${batch.farmer.name}`, 110, 58);
  doc.text(`Village/District: ${batch.farmer.village}, ${batch.farmer.district}`, 110, 65);
  doc.text(`State: ${batch.farmer.state}`, 110, 72);
  doc.text(`Harvest Date: ${batch.harvestDate}`, 110, 79);
  doc.text(`Current Status: ${batch.status}`, 110, 86);

  // Section 2: Quality Inspection Results
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Laboratory & Quality Parameters', 15, 100);
  doc.line(15, 103, 195, 103);

  // Grade Box
  doc.setFillColor(241, 248, 233);
  doc.rect(15, 108, 180, 22, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(46, 125, 50);
  doc.text(`Quality Grade Assigned: Grade ${batch.qualityGrade}`, 20, 117);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(60, 60, 60);
  doc.text(`Moisture Content: ${batch.moisture}% | Expiry Date: ${batch.expiryDate}`, 20, 124);

  doc.setFontSize(10);
  doc.text(`Quality Notes: ${batch.qualityNotes}`, 15, 138);

  // Section 3: Traceability Timeline & History
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(40, 40, 40);
  doc.text('3. Chain of Custody & Timeline', 15, 152);
  doc.line(15, 155, 195, 155);

  let y = 163;
  batch.stageHistory.forEach((stage, idx) => {
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.text(`${idx + 1}. Stage: ${stage.stage.toUpperCase()} - ${stage.status}`, 15, y);
    doc.setFont('helvetica', 'normal');
    doc.text(`Handler: ${stage.handlerName} (${stage.handlerRole})`, 15, y + 5);
    doc.text(`Location: ${stage.location.name} | Time: ${new Date(stage.timestamp).toLocaleString()}`, 15, y + 10);
    if (stage.notes) {
      doc.text(`Notes: ${stage.notes}`, 15, y + 15);
      y += 22;
    } else {
      y += 17;
    }
  });

  // Footer
  doc.setFillColor(245, 245, 240);
  doc.rect(0, 275, 210, 22, 'F');
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text('FarmFlow Digital Ledger | Verified Cryptographic Record', 15, 282);
  doc.text('Scan the QR code on the physical package or visit FarmFlow portal to re-verify in real time.', 15, 287);

  // Save PDF
  doc.save(`FarmFlow_Certificate_${batch.batchId}.pdf`);
};

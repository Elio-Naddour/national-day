import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import certificateBg from "../images/Screenshot 2025-08-27 210649.png";

export function Certificate() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = (userName) => {
    const doc = new jsPDF("p", "mm", "a4");

    const img = new Image();
    img.src = certificateBg; // use imported image
    img.onload = () => {
      doc.addImage(img, "PNG", 0, 0, 210, 297);

      doc.setFontSize(22);
      doc.setTextColor("#000000");
      doc.text(`Awarded to: ${userName}`, 105, 150, { align: "center" });
      
      const blob = doc.output("blob");
      const url = URL.createObjectURL(blob);
      setPdfUrl(url);
      
      doc.save("certificate.pdf");
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={() => generatePdf("Elio Naddour")}>
        Generate Certificate
      </button>

      {pdfUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Scan QR to open on phone</h3>
          <QRCodeCanvas value={pdfUrl} size={200} />
        </div>
      )}
    </div>
  );
}

// export function generatePdf(userName) {
//   const doc = new jsPDF("p", "mm", "a4");

//   // Add background image
//   const imgUrl = "../images/Screenshot 2025-08-27 210649.png"; // put your background image in public/
//   doc.addImage(imgUrl, "PNG", 0, 0, 210, 297); // Full A4 size

//   // Add text on top
//   doc.setFontSize(22);
//   doc.setTextColor("#000000");
//   doc.text(`Awarded to: ${userName}`, 105, 150, { align: "center" });

//   // Return PDF blob/url
//   return doc;
// }

// export const handleDownload = () => {
//   const doc = generatePdf("Elio Naddour");
//   doc.save("certificate.pdf");
// };

// const getBase64FromUrl = async (url) => {
//   const response = await fetch(url);
//   const blob = await response.blob();

//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.onloadend = () => resolve(reader.result);
//     reader.onerror = reject;
//     reader.readAsDataURL(blob);
//   });
// };

// // --- helpers ---
// const loadImage = (src) =>
//   new Promise((resolve, reject) => {
//     const img = new Image();
//     img.crossOrigin = "anonymous";
//     img.onload = () => resolve(img);
//     img.onerror = (e) => reject(new Error("Failed to load image: " + src));
//     img.src = src;
//   });

// const urlToPngDataUrl = async (url) => {
//   // 1) fetch to catch 404s / wrong content
//   const res = await fetch(url, { cache: "no-store" });
//   if (!res.ok) throw new Error(`Image HTTP ${res.status} for ${url}`);
//   const ct = res.headers.get("content-type") || "";
//   if (!ct.startsWith("image/")) {
//     throw new Error(`URL did not return an image. Content-Type: ${ct}`);
//   }
//   // 2) turn blob -> <img> -> canvas -> PNG dataURL (guarantees PNG signature)
//   const blob = await res.blob();
//   const objUrl = URL.createObjectURL(blob);
//   try {
//     const img = await loadImage(objUrl);
//     const canvas = document.createElement("canvas");
//     canvas.width = img.naturalWidth;
//     canvas.height = img.naturalHeight;
//     const ctx = canvas.getContext("2d");
//     ctx.drawImage(img, 0, 0);
//     return canvas.toDataURL("image/png"); // <-- valid PNG for jsPDF
//   } finally {
//     URL.revokeObjectURL(objUrl);
//   }
// };
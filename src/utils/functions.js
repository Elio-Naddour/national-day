import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import certificateBg from "../public/images/DnaBg.jpeg";
import ArabicReshaper from 'arabic-reshaper';
import { FrutigerLTArabic } from "./base64font";
import {supabase} from '../database/supabaseClient'
import { v4 as uuidv4 } from "uuid";

export function Certificate() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = async (userName) => {
    const doc = new jsPDF("p", "mm", "a4");

    // Load custom Arabic font
    doc.addFileToVFS("FrutigerLTArabic.ttf", FrutigerLTArabic);
    doc.addFont("FrutigerLTArabic.ttf", "FrutigerLTArabic", "normal");
    doc.setFont("FrutigerLTArabic", "normal");

    // Add background
    const img = new Image();
    img.src = certificateBg;
    img.onload = async () => {
      doc.addImage(img, "PNG", 0, 0, 210, 297);

      // Add Arabic text
      doc.setFontSize(22);
      doc.setTextColor("#fff");
      const raw = `مُنِحَت إلى: ${userName}`;
      const shaped = ArabicReshaper.convertArabic(raw);
      doc.text(shaped, 105, 150, { align: "center" });

      // Convert PDF to Blob
      const blob = doc.output("blob");

      // Upload to Supabase Storage
      const filePath = `${uuidv4()}.pdf`;
      const pdfBlob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });

      const { error, data: uploadRes } = await supabase.storage
        .from("NDpdf")
        .upload(`${uuidv4()}.pdf`, pdfBlob, {
          contentType: "application/pdf",
          upsert: true,
        });

      if (error) {
        console.error("Upload failed:", error.message);
        return;
      }

      // Get public download link
      const { data } = supabase.storage
        .from("NDpdf")
        .getPublicUrl(uploadRes.path);

      setPdfUrl(data.publicUrl);

      // doc.autoPrint()
      // doc.output("dataurlnewwindow") // open the pdf in new tab and print
      // doc.save("certificate.pdf"); // download the pdf
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={() => generatePdf("إليو ندور")}>
        Generate & Upload Certificate
      </button>

      {pdfUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>📥 Download Link:</h3>
          <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
            {pdfUrl}
          </a>

          <h3 style={{ marginTop: 20 }}>📱 Scan QR:</h3>
          <QRCodeCanvas value={pdfUrl} size={200} />
        </div>
      )}
    </div>
  );
}


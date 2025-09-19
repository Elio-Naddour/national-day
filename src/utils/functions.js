import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import certificateBg from "../public/images/DNA.jpeg";
import ArabicReshaper from "arabic-reshaper";
import { FrutigerLTArabic } from "./base64font";
import { supabase } from "../database/supabaseClient";
import { v4 as uuidv4 } from "uuid";
import { LargeSpinner } from "../components/patterns/patterns";

export function GenerateCertificate({ text, rows }) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [document, setDocument] = useState(null);

  const generatePdf = async () => {
    const doc = new jsPDF("p", "mm", "a5");

    // Load custom Arabic font
    doc.addFileToVFS("FrutigerLTArabic.ttf", FrutigerLTArabic);
    doc.addFont("FrutigerLTArabic.ttf", "FrutigerLTArabic", "normal");
    doc.setFont("FrutigerLTArabic", "normal");

    // Add background
    const img = new Image();
    img.src = certificateBg;
    img.onload = async () => {
      doc.addImage(img, "JPEG", 0, 0, 148, 210); // A5 size in mm (portrait)

      // // Title text
      // doc.setFontSize(22);
      // doc.setTextColor("#fff");
      // const shapedTitle = ArabicReshaper.convertArabic(text);
      // doc.text(shapedTitle, 74, 30, { align: "center" }); // centered title

      // Region percentages (rows)
      doc.setFontSize(20);
      doc.setTextColor("#fff");
      const pageWidth = doc.internal.pageSize.getWidth();
      const startY = 110; // vertical starting point
      const lineHeight = 12;

      const nameX = pageWidth - 70; // right-aligned names
      const sepX = nameX - 35; // separator position
      const percX = sepX - 26; // left-aligned percentage

      rows.forEach((row, i) => {
        const y = startY + i * lineHeight;

        const shapedName = ArabicReshaper.convertArabic(row.name);

        // Percentage left
        doc.text(`% ${row.percentage}`, percX, y, { align: "left" });

        // Separator
        doc.text("|", sepX, y, { align: "center" });

        // Region name right-aligned
        doc.text(shapedName, nameX, y, { align: "right" });
      });

      // Convert PDF to Blob
      const pdfBlob = new Blob([doc.output("arraybuffer")], {
        type: "application/pdf",
      });

      const filePath = `${uuidv4()}.pdf`;
      const { error, data: uploadRes } = await supabase.storage
        .from("NDpdf")
        .upload(filePath, pdfBlob, {
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
      setDocument(doc);
    };
  };

  const print = () => {
    document.autoPrint();
    document.output("dataurlnewwindow"); // open the pdf in new tab and print
  };

  useEffect(() => {
    generatePdf();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      {pdfUrl ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3>امسح الرمز</h3>
          <QRCodeCanvas value={pdfUrl} size={200} />
          <button className="generic-button" onClick={print}>
            افتح للطباعة
          </button>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LargeSpinner />
        </div>
      )}
    </div>
  );
}

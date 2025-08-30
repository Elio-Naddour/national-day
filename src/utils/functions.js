import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import certificateBg from "../public/images/DnaBg.jpeg";
import ArabicReshaper from 'arabic-reshaper';
import { FrutigerLTArabic } from "./base64font";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../App";

export function Certificate() {
  const [pdfUrl, setPdfUrl] = useState(null);

  const generatePdf = async (userName) => {
    const doc = new jsPDF("p", "mm", "a4");

    // 🔹 Register Arabic font
    doc.addFileToVFS("FrutigerLTArabic.ttf", FrutigerLTArabic);
    doc.addFont("FrutigerLTArabic.ttf", "FrutigerLTArabic", "normal");
    doc.setFont("FrutigerLTArabic", "normal");

    const img = new Image();
    img.src = certificateBg;

    img.onload = async () => {
      doc.addImage(img, "PNG", 0, 0, 210, 297);

      doc.setFontSize(22);
      doc.setTextColor("#fff");

      // 🔹 Arabic reshaping
      const raw = `مُنِحَت إلى: ${userName}`;
      const shaped = ArabicReshaper.convertArabic(raw);

      // 🔹 Add text (centered)
      doc.text(shaped, 105, 150, { align: "center" });

      // 🔹 Export as Blob
      const pdfBlob = doc.output("blob");

      // 🔹 Upload to Firebase Storage
      const uniqueName = `certificates/${Date.now()}-${uuidv4()}.pdf`;
      const fileRef = ref(storage, uniqueName);
      await uploadBytes(fileRef, pdfBlob);

      // 🔹 Get public download URL
      const downloadURL = await getDownloadURL(fileRef);
      setPdfUrl(downloadURL);

      // Optional: also auto download locally
      doc.save("certificate.pdf");
    };
  };

  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <button onClick={() => generatePdf("إليو ندور")}>
        Generate Certificate
      </button>

      {pdfUrl && (
        <div style={{ marginTop: 20 }}>
          <h3>Scan QR to open certificate</h3>
          <QRCodeCanvas value={pdfUrl} size={200} />
          <div style={{ marginTop: 10 }}>
            <a href={pdfUrl} target="_blank" rel="noreferrer">
              Open Certificate
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

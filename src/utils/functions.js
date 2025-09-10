import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { jsPDF } from "jspdf";
import certificateBg from "../public/images/DnaBg.jpeg";
import ArabicReshaper from 'arabic-reshaper';
import { FrutigerLTArabic } from "./base64font";
import {supabase} from '../database/supabaseClient'
import { v4 as uuidv4 } from "uuid";
import { LargeSpinner } from "../components/patterns/patterns";

export function GenerateCertificate({text}) {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [document, setDocument] = useState(null);

  const generatePdf = async (pdfText) => {
    const doc = new jsPDF("p", "mm", "a5");

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
      const raw = pdfText;
      const shaped = ArabicReshaper.convertArabic(raw);
      doc.text(shaped, 70, 20, { align: "center" });

      // Convert PDF to Blob
      const blob = doc.output("blob");

      // Upload to Supabase Storage
      const filePath = `${uuidv4()}.pdf`;
      const pdfBlob = new Blob([doc.output("arraybuffer")], { type: "application/pdf" });

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
      setDocument(doc)

    };
  };

  const print=()=>{
      document.autoPrint()
      document.output("dataurlnewwindow") // open the pdf in new tab and print
  }

  useEffect(()=>{
    generatePdf(text)
  },[])

  return (
    <div style={{ textAlign: "center" }}>

      {pdfUrl ? (
        <div style={{ display: 'flex', flexDirection:'column',alignItems:'center'}}>
          <h3>امسح الرمز</h3>
          <QRCodeCanvas value={pdfUrl} size={200} />
          <button className="generic-button" onClick={print}>افتح للطباعة</button>
        </div>
      ):<div style={{height:'100%',display:'flex',alignItems:'center',justifyContent:'center'}}><LargeSpinner /></div>}
    </div>
  );
}


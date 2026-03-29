"use client";

import React, { ChangeEvent, useMemo, useState } from "react";

type CardPackage = {
  thickness: string;
  price: number;
  label: string;
  min: number;
  colors: string[];
};

export default function HomePage() {
  const OWNER = "Iezekiel Haley";
  const PHONE = "(832) 871-0186";
  const PHONE_RAW = "8328710186";
  const EMAIL = "Iezekielcustoms@yahoo.com";

  const packages: CardPackage[] = useMemo(
    () => [
      { thickness: "0.2mm", price: 1, label: "$1/card", min: 50, colors: ["Violet","Black","Green","Blue","Red","Rose Gold","Golden Bronze"] },
      { thickness: "0.5mm", price: 2.25, label: "$2.25/card", min: 50, colors: ["Blue","Black"] },
      { thickness: "0.8mm", price: 2.5, label: "$2.50/card", min: 50, colors: ["Black","Silver"] },
    ],
    []
  );

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedColor, setSelectedColor] = useState(packages[0].colors[0]);
  const [companyName, setCompanyName] = useState("Your Company");
  const [tagline, setTagline] = useState("Premium Metal Cards");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [quantityInput, setQuantityInput] = useState(String(packages[0].min));
  const [hasOwnLogo, setHasOwnLogo] = useState(false);
  const [needLogoCreated, setNeedLogoCreated] = useState(false);

  const quantity = Math.max(Number(quantityInput) || packages[0].min, selectedPackage.min);

  const total = (
    quantity * selectedPackage.price +
    (hasOwnLogo ? 25 : 0) +
    (needLogoCreated ? 50 : 0)
  ).toFixed(2);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => typeof reader.result === "string" && setLogoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  return (
    <main className="pageBg">
      <div className="wrap">

        <section className="hero">
          {/* LEFT */}
          <div>
            <h1>{OWNER} Custom Metal Cards</h1>
            <p>
              Premium metal business cards with clear pricing, strong presentation,
              and fast ordering. Text or email to inquire about orders.
            </p>

            <div className="actions">
              <a href={`sms:${PHONE_RAW}`} className="btn primary">Text {PHONE}</a>
              <a href={`mailto:${EMAIL}`} className="btn">{EMAIL}</a>
            </div>
          </div>

          {/* RIGHT (CARD) */}
          <div className="heroRight">
            <div className="cardPreview">
              <div className="cardInner">
                <div className="logoArea">
                  {logoPreview ? (
                    <img src={logoPreview} className="logoImage" />
                  ) : (
                    <div className="logoPlaceholder">LOGO</div>
                  )}
                </div>

                <div className="cardText">
                  <div className="companyName">{companyName}</div>
                  <div className="tagline">{tagline}</div>
                </div>

                <div className="cardBottom">
                  <span>{selectedPackage.thickness}</span>
                  <span>{selectedColor}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BUILDER */}
        <section className="builder">
          <input value={companyName} onChange={(e)=>setCompanyName(e.target.value)} placeholder="Company Name"/>
          <input value={tagline} onChange={(e)=>setTagline(e.target.value)} placeholder="Tagline"/>
          <input type="file" onChange={handleLogoUpload}/>
          <input value={quantityInput} onChange={(e)=>setQuantityInput(e.target.value)} />

          <label>
            <input type="checkbox" checked={hasOwnLogo}
              onChange={()=>{setHasOwnLogo(!hasOwnLogo); setNeedLogoCreated(false);}}/>
            Own Logo (+$25)
          </label>

          <label>
            <input type="checkbox" checked={needLogoCreated}
              onChange={()=>{setNeedLogoCreated(!needLogoCreated); setHasOwnLogo(false);}}/>
            Create Logo (+$50)
          </label>

          <h2>Total: ${total}</h2>
        </section>

      </div>

      <style jsx>{`
        .pageBg {
          min-height: 100vh;
          background: linear-gradient(135deg,#0a1f44,#1e4fd6,#3b82f6);
        }

        .wrap {
          max-width: 1100px;
          margin: auto;
          padding: 40px;
          color: white;
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        .heroRight {
          display: flex;
          justify-content: center;
          padding-top: 60px;
        }

        @media (min-width: 980px) {
          .heroRight {
            position: sticky;
            top: 80px;
          }
        }

        .cardPreview {
          width: 100%;
          max-width: 450px;
          aspect-ratio: 1.65/1;
          border-radius: 20px;
          background: black;
          padding: 20px;
        }

        .logoPlaceholder {
          width: 140px;
          height: 140px;
          background: rgba(255,255,255,.2);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logoImage {
          max-width:180px;
        }

        .actions {
          margin-top:20px;
          display:flex;
          gap:10px;
        }

        .btn {
          padding:10px 15px;
          border:1px solid white;
          border-radius:10px;
        }

        .btn.primary {
          background:white;
          color:black;
        }

      `}</style>
    </main>
  );
}

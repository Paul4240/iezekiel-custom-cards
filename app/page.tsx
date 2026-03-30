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
      {
        thickness: "0.2mm",
        price: 1,
        label: "$1/card",
        min: 50,
        colors: ["Violet", "Black", "Green", "Blue", "Red", "Rose Gold", "Golden Bronze"],
      },
      {
        thickness: "0.5mm",
        price: 2.25,
        label: "$2.25/card",
        min: 50,
        colors: ["Blue", "Black"],
      },
      {
        thickness: "0.8mm",
        price: 2.5,
        label: "$2.50/card",
        min: 50,
        colors: ["Black", "Silver"],
      },
    ],
    []
  );

  const [selectedPackage, setSelectedPackage] = useState<CardPackage>(packages[0]);
  const [selectedColor, setSelectedColor] = useState(packages[0].colors[0]);
  const [companyName, setCompanyName] = useState("Your Company");
  const [tagline, setTagline] = useState("Premium Metal Cards");
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [quantityInput, setQuantityInput] = useState<string>(String(packages[0].min));
  const [hasOwnLogo, setHasOwnLogo] = useState(false);
  const [needLogoCreated, setNeedLogoCreated] = useState(false);

  const currentQuantity = Math.max(Number(quantityInput) || 50, selectedPackage.min);

  const total = (
    currentQuantity * selectedPackage.price +
    (hasOwnLogo ? 25 : 0) +
    (needLogoCreated ? 50 : 0)
  ).toFixed(2);

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogoPreview(reader.result);
    };
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
              <a href={`sms:${PHONE_RAW}`} className="btn primary">
                Text {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="btn">
                {EMAIL}
              </a>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="heroRight">
            <div className="cardGlow" />

            <div className="card">
              <div className="logoBox">
                {logoPreview ? <img src={logoPreview} /> : <span>LOGO</span>}
              </div>

              <div className="cardText">
                <h3>{companyName}</h3>
                <p>{tagline}</p>
              </div>

              <div className="meta">
                {selectedPackage.thickness} • {selectedColor}
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
          background: linear-gradient(135deg, #0f2d6b, #1e4fd8, #3b82f6);
          color: white;
        }

        .wrap {
          max-width: 1100px;
          margin: auto;
          padding: 40px 20px;
        }

        .hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
          min-height: 650px;
        }

        .heroRight {
          position: relative;
          display: flex;
          justify-content: center;
          padding-top: 260px; /* 🔥 THIS DROPS IT LOWER */
        }

        .cardGlow {
          position: absolute;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255,255,255,.2), transparent 70%);
          filter: blur(40px);
        }

        .card {
          width: 460px;
          height: 260px;
          background: linear-gradient(135deg,#111,#333);
          border-radius: 20px;
          padding: 20px;
          position: relative;

          transform: translateY(200px) rotateX(8deg) rotateY(-10deg);
          box-shadow: 0 40px 100px rgba(0,0,0,.5);
          transition: .3s;
        }

        .card:hover {
          transform: translateY(180px) rotateX(5deg) rotateY(-5deg);
        }

        .logoBox {
          width: 150px;
          height: 150px;
          background: rgba(255,255,255,.2);
          display:flex;
          align-items:center;
          justify-content:center;
        }

        .logoBox img {
          max-width:100%;
        }

        .cardText {
          position:absolute;
          bottom:20px;
          left:20px;
        }

        .meta {
          position:absolute;
          bottom:10px;
          right:20px;
          font-size:12px;
        }

        .actions {
          margin-top:20px;
          display:flex;
          gap:10px;
        }

        .btn {
          padding:10px 15px;
          border-radius:10px;
          border:1px solid white;
        }

        .btn.primary {
          background:white;
          color:black;
        }

        .builder {
          margin-top:200px; /* space for overlap */
          display:flex;
          flex-direction:column;
          gap:12px;
          max-width:400px;
        }

        input {
          padding:10px;
          border-radius:8px;
          border:none;
        }
      `}</style>
    </main>
  );
}

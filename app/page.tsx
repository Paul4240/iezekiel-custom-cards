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

  const changePackage = (pkg: CardPackage) => {
    setSelectedPackage(pkg);
    setSelectedColor(pkg.colors[0]);
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setLogoPreview(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const cardStyle = useMemo(() => {
    switch (selectedColor.toLowerCase()) {
      case "violet":
        return {
          background: "linear-gradient(135deg, #2e1748 0%, #6b3fa0 55%, #b58cff 100%)",
          color: "#ffffff",
          border: "rgba(210,190,255,.45)",
        };
      case "black":
        return {
          background: "linear-gradient(135deg, #0d1014 0%, #1a1f28 55%, #313846 100%)",
          color: "#ffffff",
          border: "rgba(255,255,255,.16)",
        };
      case "green":
        return {
          background: "linear-gradient(135deg, #103322 0%, #1e6c49 55%, #49bb81 100%)",
          color: "#ffffff",
          border: "rgba(155,236,197,.36)",
        };
      case "blue":
        return {
          background: "linear-gradient(135deg, #0d2a58 0%, #1850af 55%, #6ca8ff 100%)",
          color: "#ffffff",
          border: "rgba(170,204,255,.38)",
        };
      case "red":
        return {
          background: "linear-gradient(135deg, #4f1017 0%, #a31e2d 55%, #e25261 100%)",
          color: "#ffffff",
          border: "rgba(255,184,191,.34)",
        };
      case "rose gold":
        return {
          background: "linear-gradient(135deg, #6a433d 0%, #b7756b 55%, #e7b8ae 100%)",
          color: "#fffaf8",
          border: "rgba(255,226,217,.4)",
        };
      case "golden bronze":
        return {
          background: "linear-gradient(135deg, #4e361d 0%, #9f6d2f 55%, #ddb270 100%)",
          color: "#fffaf2",
          border: "rgba(255,226,181,.36)",
        };
      case "silver":
        return {
          background: "linear-gradient(135deg, #7f858f 0%, #cfd4dc 50%, #f7f9fc 100%)",
          color: "#111827",
          border: "rgba(255,255,255,.62)",
        };
      default:
        return {
          background: "linear-gradient(135deg, #0d1014 0%, #1a1f28 55%, #313846 100%)",
          color: "#ffffff",
          border: "rgba(255,255,255,.16)",
        };
    }
  }, [selectedColor]);

  return (
    <main className="wrap">
      <section className="hero">
        <div className="heroText">
          <div className="eyebrow">Premium Metal Business Cards</div>
          <h1>{OWNER} Custom Metal Cards</h1>
          <p>
            Premium metal business cards with clean pricing, strong presentation,
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

        <div className="heroCard">
          <div
            className="cardPreview"
            style={{
              background: cardStyle.background,
              color: cardStyle.color,
              borderColor: cardStyle.border,
            }}
          >
            <div className="shine" />
            <div className="cardInner">
              <div className="logoArea">
                {logoPreview ? (
                  <img src={logoPreview} alt="Uploaded logo preview" className="logoImage" />
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

      <section className="builder">
        <h2>Card Preview Builder</h2>
        <p className="sectionText">
          Add company info and upload a logo to preview how the card can look.
        </p>

        <div className="builderGrid">
          <div className="builderPanel">
            <label className="field">
              <span>Company Name</span>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
              />
            </label>

            <label className="field">
              <span>Text Under Logo / Main Line</span>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter text"
              />
            </label>

            <label className="field">
              <span>Upload Logo</span>
              <input type="file" accept="image/*" onChange={handleLogoUpload} />
            </label>

            <div className="builderNote">
              Uploaded logo and text will display live on the card preview.
            </div>
          </div>

          <div className="builderPreview">
            <div
              className="cardPreview large"
              style={{
                background: cardStyle.background,
                color: cardStyle.color,
                borderColor: cardStyle.border,
              }}
            >
              <div className="shine" />
              <div className="cardInner">
                <div className="logoArea">
                  {logoPreview ? (
                    <img src={logoPreview} alt="Uploaded logo preview" className="logoImage" />
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
        </div>
      </section>

      <section className="packages">
        <h2>Select Thickness</h2>

        <div className="grid">
          {packages.map((pkg) => (
            <button
              key={pkg.thickness}
              type="button"
              className={`card ${selectedPackage.thickness === pkg.thickness ? "active" : ""}`}
              onClick={() => changePackage(pkg)}
            >
              <h3>{pkg.thickness}</h3>
              <p>{pkg.label}</p>
              <span>Min {pkg.min}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="colors">
        <h2>Choose Color</h2>

        <div className="colorGrid">
          {selectedPackage.colors.map((color) => (
            <button
              type="button"
              key={color}
              className={selectedColor === color ? "active" : ""}
              onClick={() => setSelectedColor(color)}
            >
              {color}
            </button>
          ))}
        </div>
      </section>

      <section className="summary">
        <h2>Order Summary</h2>

        <div className="box">
          <p>
            <strong>Thickness:</strong> {selectedPackage.thickness}
          </p>
          <p>
            <strong>Price:</strong> {selectedPackage.label}
          </p>
          <p>
            <strong>Color:</strong> {selectedColor}
          </p>
          <p>
            <strong>Minimum:</strong> {selectedPackage.min} cards
          </p>
        </div>

        <div className="actions">
          <a href={`sms:${PHONE_RAW}`} className="btn primary">
            Text to Order
          </a>
          <a href={`mailto:${EMAIL}`} className="btn">
            {EMAIL}
          </a>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          padding: 40px 20px 80px;
          max-width: 1180px;
          margin: 0 auto;
          color: #eef2f7;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 28px;
          align-items: center;
          padding: 30px 0 10px;
        }

        .eyebrow {
          display: inline-block;
          margin-bottom: 14px;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #c8d3e5;
        }

        h1 {
          font-size: clamp(40px, 6vw, 68px);
          line-height: 0.98;
          margin: 0 0 14px;
        }

        h2 {
          font-size: clamp(28px, 4vw, 40px);
          margin: 0 0 18px;
        }

        h3 {
          margin: 0 0 8px;
        }

        p {
          margin: 0;
          line-height: 1.7;
          color: #b8c5d6;
        }

        .sectionText {
          margin-bottom: 24px;
        }

        .actions {
          margin-top: 22px;
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn {
          display: inline-flex;
          justify-content: center;
          align-items: center;
          min-height: 48px;
          padding: 0 18px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: #eef2f7;
          background: rgba(255, 255, 255, 0.05);
          font-weight: 700;
          text-decoration: none;
        }

        .btn.primary {
          background: linear-gradient(135deg, #ffffff 0%, #dce7f5 100%);
          color: #0a1220;
          border-color: transparent;
        }

        .heroCard,
        .builderPanel,
        .box,
        .card,
        .builderPreview {
          background: rgba(12, 19, 30, 0.82);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
          border-radius: 24px;
        }

        .heroCard {
          padding: 22px;
        }

        .builder,
        .packages,
        .colors,
        .summary {
          margin-top: 60px;
        }

        .builderGrid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 22px;
          align-items: start;
        }

        .builderPanel {
          padding: 22px;
        }

        .builderNote {
          margin-top: 14px;
          color: #9fb0c4;
          font-size: 14px;
        }

        .field {
          display: block;
          margin-bottom: 16px;
        }

        .field span {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: #dce7f5;
        }

        .field input[type="text"],
        .field input[type="file"] {
          width: 100%;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.05);
          color: #eef2f7;
          padding: 12px 14px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }

        .card {
          text-align: left;
          padding: 22px;
          cursor: pointer;
          color: #eef2f7;
        }

        .card.active {
          border: 2px solid rgba(255, 255, 255, 0.36);
        }

        .card p {
          margin-bottom: 10px;
        }

        .colorGrid {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .colorGrid button {
          padding: 10px 16px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          background: rgba(255, 255, 255, 0.05);
          color: #eef2f7;
          cursor: pointer;
          font-weight: 700;
        }

        .colorGrid .active {
          background: #ffffff;
          color: #0a1220;
        }

        .box {
          padding: 24px;
        }

        .box p + p {
          margin-top: 10px;
        }

        .cardPreview {
          position: relative;
          width: 100%;
          aspect-ratio: 1.65 / 1;
          border-radius: 24px;
          border: 1px solid;
          overflow: hidden;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
        }

        .cardPreview.large {
          max-width: 100%;
        }

        .shine {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0) 28%),
            radial-gradient(circle at top right, rgba(255,255,255,0.18), transparent 28%);
          pointer-events: none;
        }

        .cardInner {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .logoArea {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .logoPlaceholder {
          width: 84px;
          height: 84px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.18);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.08em;
        }

        .logoImage {
          max-width: 120px;
          max-height: 90px;
          object-fit: contain;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          padding: 6px;
        }

        .cardText {
          display: grid;
          gap: 6px;
        }

        .companyName {
          font-size: clamp(24px, 3vw, 34px);
          font-weight: 900;
          line-height: 1.05;
        }

        .tagline {
          font-size: 15px;
          font-weight: 600;
          opacity: 0.92;
        }

        .cardBottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        @media (max-width: 920px) {
          .hero,
          .builderGrid,
          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 640px) {
          .wrap {
            padding: 28px 16px 64px;
          }

          .actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }

          .cardInner {
            padding: 18px;
          }

          .logoPlaceholder {
            width: 68px;
            height: 68px;
          }

          .companyName {
            font-size: 22px;
          }

          .tagline,
          .cardBottom {
            font-size: 13px;
          }
        }
      `}</style>
    </main>
  );
}

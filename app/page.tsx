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

  const currentQuantity = useMemo(() => {
    const parsed = Number(quantityInput);
    if (quantityInput.trim() === "" || Number.isNaN(parsed)) {
      return selectedPackage.min;
    }
    return Math.max(parsed, selectedPackage.min);
  }, [quantityInput, selectedPackage.min]);

  const changePackage = (pkg: CardPackage) => {
    setSelectedPackage(pkg);
    setSelectedColor(pkg.colors[0]);

    const parsed = Number(quantityInput);
    if (quantityInput.trim() === "" || Number.isNaN(parsed) || parsed < pkg.min) {
      setQuantityInput(String(pkg.min));
    }
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

  const handleQuantityChange = (value: string) => {
    if (value === "") {
      setQuantityInput("");
      return;
    }

    if (/^\d+$/.test(value)) {
      setQuantityInput(value);
    }
  };

  const handleQuantityBlur = () => {
    const parsed = Number(quantityInput);

    if (quantityInput.trim() === "" || Number.isNaN(parsed) || parsed < selectedPackage.min) {
      setQuantityInput(String(selectedPackage.min));
      return;
    }

    setQuantityInput(String(parsed));
  };

  const logoSetupFee = hasOwnLogo ? 25 : 0;
  const logoCreationFee = needLogoCreated ? 50 : 0;

  const total = useMemo(() => {
    const base = currentQuantity * selectedPackage.price;
    return (base + logoSetupFee + logoCreationFee).toFixed(2);
  }, [currentQuantity, selectedPackage.price, logoSetupFee, logoCreationFee]);

  const quickbooksMessage = useMemo(() => {
    const logoOption = hasOwnLogo
      ? "Customer has own logo (+$25 startup fee)"
      : needLogoCreated
      ? "Create logo for customer (+$50)"
      : "No logo add-on selected";

    return encodeURIComponent(
      `Hi, I want to order metal cards.

Thickness: ${selectedPackage.thickness}
Color: ${selectedColor}
Quantity: ${currentQuantity}
Company name: ${companyName}
Text on card: ${tagline}
Logo option: ${logoOption}
Estimated total: $${total}

Please send me the QuickBooks invoice.`
    );
  }, [
    selectedPackage.thickness,
    selectedColor,
    currentQuantity,
    companyName,
    tagline,
    hasOwnLogo,
    needLogoCreated,
    total,
  ]);

  const cardStyle = useMemo(() => {
    switch (selectedColor.toLowerCase()) {
      case "violet":
        return {
          background: "linear-gradient(135deg, #2d124c 0%, #6a38b3 55%, #a97dff 100%)",
          color: "#ffffff",
          border: "rgba(214,197,255,.38)",
        };
      case "black":
        return {
          background: "linear-gradient(135deg, #0b0d12 0%, #1c2230 55%, #31394a 100%)",
          color: "#ffffff",
          border: "rgba(255,255,255,.14)",
        };
      case "green":
        return {
          background: "linear-gradient(135deg, #0e3425 0%, #1f7250 55%, #48bf83 100%)",
          color: "#ffffff",
          border: "rgba(170,241,205,.28)",
        };
      case "blue":
        return {
          background: "linear-gradient(135deg, #0a2a63 0%, #1652c4 58%, #5aa0ff 100%)",
          color: "#ffffff",
          border: "rgba(179,211,255,.3)",
        };
      case "red":
        return {
          background: "linear-gradient(135deg, #4b0e16 0%, #ad1d30 55%, #ef5566 100%)",
          color: "#ffffff",
          border: "rgba(255,184,191,.28)",
        };
      case "rose gold":
        return {
          background: "linear-gradient(135deg, #684038 0%, #b87367 56%, #efc3ba 100%)",
          color: "#fffaf8",
          border: "rgba(255,231,223,.32)",
        };
      case "golden bronze":
        return {
          background: "linear-gradient(135deg, #4f3418 0%, #a56e2c 55%, #ddb473 100%)",
          color: "#fffaf1",
          border: "rgba(255,227,181,.28)",
        };
      case "silver":
        return {
          background: "linear-gradient(135deg, #7f8792 0%, #d4d9df 52%, #f8fbff 100%)",
          color: "#111827",
          border: "rgba(255,255,255,.5)",
        };
      default:
        return {
          background: "linear-gradient(135deg, #0b0d12 0%, #1c2230 55%, #31394a 100%)",
          color: "#ffffff",
          border: "rgba(255,255,255,.14)",
        };
    }
  }, [selectedColor]);

  return (
    <main className="pageBg">
      <div className="ambient ambientOne" />
      <div className="ambient ambientTwo" />
      <div className="wrap">
        <section className="hero">
          <div className="heroLeft">
            <div className="eyebrow">Premium Metal Business Cards</div>
            <h1>{OWNER} Custom Metal Cards</h1>
            <p className="heroText">
              Premium metal business cards with clear pricing, strong presentation,
              and fast ordering. Text or email to inquire about orders.
            </p>

            <div className="heroActions">
              <a href={`sms:${PHONE_RAW}`} className="cta primary">
                Text {PHONE}
              </a>
              <a href={`mailto:${EMAIL}`} className="cta secondary">
                {EMAIL}
              </a>
            </div>

            <div className="heroStats">
              <div>
                <span>QuickBooks</span>
                <strong>Invoice Ready</strong>
              </div>
              <div>
                <span>Minimum Order</span>
                <strong>{selectedPackage.min} Cards</strong>
              </div>
              <div>
                <span>Current Total</span>
                <strong>${total}</strong>
              </div>
            </div>
          </div>

          <div className="heroRight">
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
                <div className="cardTop">
                  <div className="logoArea">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Uploaded logo preview" className="logoImage" />
                    ) : (
                      <div className="logoPlaceholder">LOGO</div>
                    )}
                  </div>
                </div>

                <div className="cardMiddle">
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

        <section className="builderSection">
          <div className="sectionTitle">
            <span>Build Your Card</span>
            <h2>Choose the package, color, logo option, and quantity.</h2>
          </div>

          <div className="selectorBlock">
            <div className="selectorLabel">Thickness</div>
            <div className="chipRow">
              {packages.map((pkg) => (
                <button
                  key={pkg.thickness}
                  type="button"
                  className={`chip packageChip ${
                    selectedPackage.thickness === pkg.thickness ? "active" : ""
                  }`}
                  onClick={() => changePackage(pkg)}
                >
                  <span className="chipTop">{pkg.thickness}</span>
                  <span className="chipBottom">
                    {pkg.label} · Min {pkg.min}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="selectorBlock">
            <div className="selectorLabel">Color</div>
            <div className="chipRow">
              {selectedPackage.colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`chip colorChip ${selectedColor === color ? "active" : ""}`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="builderGrid">
            <div className="formArea">
              <div className="inputGrid">
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
              </div>

              <div className="inputGrid twoCols">
                <label className="field">
                  <span>Upload Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} />
                </label>

                <label className="field">
                  <span>Quantity</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={quantityInput}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    onBlur={handleQuantityBlur}
                    placeholder={`Minimum ${selectedPackage.min}`}
                  />
                </label>
              </div>

              <div className="optionLine">
                <label className={`toggle ${hasOwnLogo ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={hasOwnLogo}
                    onChange={() => {
                      const next = !hasOwnLogo;
                      setHasOwnLogo(next);
                      if (next) setNeedLogoCreated(false);
                    }}
                  />
                  <span>I have my own logo</span>
                  <strong>+$25</strong>
                </label>

                <label className={`toggle ${needLogoCreated ? "active" : ""}`}>
                  <input
                    type="checkbox"
                    checked={needLogoCreated}
                    onChange={() => {
                      const next = !needLogoCreated;
                      setNeedLogoCreated(next);
                      if (next) setHasOwnLogo(false);
                    }}
                  />
                  <span>Create logo for me</span>
                  <strong>+$50</strong>
                </label>
              </div>

              <div className="microNote">
                Minimum order for this package is {selectedPackage.min} cards.
              </div>
            </div>

            <div className="summaryArea">
              <div className="summaryLines">
                <div className="summaryLine">
                  <span>Package</span>
                  <strong>{selectedPackage.thickness}</strong>
                </div>
                <div className="summaryLine">
                  <span>Price Per Card</span>
                  <strong>{selectedPackage.label}</strong>
                </div>
                <div className="summaryLine">
                  <span>Color</span>
                  <strong>{selectedColor}</strong>
                </div>
                <div className="summaryLine">
                  <span>Quantity</span>
                  <strong>{currentQuantity}</strong>
                </div>
                {hasOwnLogo && (
                  <div className="summaryLine">
                    <span>Own Logo Startup Fee</span>
                    <strong>$25.00</strong>
                  </div>
                )}
                {needLogoCreated && (
                  <div className="summaryLine">
                    <span>Logo Creation Fee</span>
                    <strong>$50.00</strong>
                  </div>
                )}
                <div className="summaryLine total">
                  <span>Estimated Total</span>
                  <strong>${total}</strong>
                </div>
              </div>

              <div className="summaryFoot">
                Final payment can be sent by QuickBooks invoice.
              </div>

              <div className="heroActions">
                <a href={`sms:${PHONE_RAW}?body=${quickbooksMessage}`} className="cta primary">
                  Text to Order
                </a>
                <a
                  href={`mailto:${EMAIL}?subject=Metal Card Order Request&body=${quickbooksMessage}`}
                  className="cta secondary"
                >
                  {EMAIL}
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      <style jsx>{`
        .pageBg {
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(circle at 15% 20%, rgba(118, 189, 255, 0.26), transparent 22%),
            radial-gradient(circle at 85% 18%, rgba(255, 255, 255, 0.1), transparent 14%),
            linear-gradient(135deg, #041536 0%, #0f3fa8 48%, #2f7df7 100%);
        }

        .ambient {
          position: absolute;
          border-radius: 999px;
          filter: blur(80px);
          pointer-events: none;
          opacity: 0.5;
        }

        .ambientOne {
          width: 260px;
          height: 260px;
          background: rgba(115, 205, 255, 0.26);
          top: 120px;
          left: -70px;
        }

        .ambientTwo {
          width: 280px;
          height: 280px;
          background: rgba(255, 255, 255, 0.14);
          top: 40px;
          right: -100px;
        }

        .wrap {
          position: relative;
          z-index: 1;
          width: min(1180px, calc(100% - 32px));
          margin: 0 auto;
          padding: 42px 0 80px;
          color: #eef4ff;
        }

        .hero {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 36px;
          align-items: center;
          padding: 24px 0 48px;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          padding: 9px 14px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #e5f0ff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
        }

        h1,
        h2,
        h3,
        p {
          margin: 0;
        }

        h1 {
          margin-top: 18px;
          font-size: clamp(42px, 6vw, 74px);
          line-height: 0.96;
          letter-spacing: -0.04em;
        }

        .heroText {
          margin-top: 18px;
          max-width: 640px;
          font-size: 18px;
          line-height: 1.8;
          color: #e3ecff;
        }

        .heroActions {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 24px;
        }

        .cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 50px;
          padding: 0 18px;
          border-radius: 14px;
          font-weight: 800;
          text-decoration: none;
          transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
        }

        .cta:hover {
          transform: translateY(-1px);
        }

        .cta.primary {
          background: linear-gradient(135deg, #ffffff 0%, #dbe8ff 100%);
          color: #071327;
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.16);
        }

        .cta.secondary {
          color: #f3f7ff;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.16);
        }

        .heroStats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-top: 26px;
        }

        .heroStats div {
          padding: 14px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.18);
        }

        .heroStats span {
          display: block;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #d4e2ff;
          margin-bottom: 6px;
        }

        .heroStats strong {
          font-size: 15px;
          font-weight: 800;
          color: #ffffff;
        }

        .heroRight {
          display: flex;
          justify-content: center;
        }

        .cardPreview {
          position: relative;
          width: min(100%, 520px);
          aspect-ratio: 1.65 / 1;
          border-radius: 30px;
          border: 1px solid;
          overflow: hidden;
          box-shadow: 0 28px 80px rgba(0, 0, 0, 0.3);
        }

        .shine {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(120deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 30%),
            radial-gradient(circle at top right, rgba(255,255,255,0.2), transparent 30%);
          pointer-events: none;
        }

        .cardInner {
          position: relative;
          z-index: 1;
          height: 100%;
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .cardTop {
          display: flex;
          justify-content: center;
        }

        .logoArea {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .logoPlaceholder {
          width: 148px;
          height: 148px;
          border-radius: 24px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255, 255, 255, 0.16);
          border: 1px solid rgba(255, 255, 255, 0.22);
          font-size: 16px;
          font-weight: 800;
          letter-spacing: 0.08em;
          backdrop-filter: blur(6px);
        }

        .logoImage {
          max-width: 190px;
          max-height: 145px;
          object-fit: contain;
          border-radius: 18px;
          background: rgba(255, 255, 255, 0.12);
          padding: 8px;
        }

        .cardMiddle {
          text-align: center;
        }

        .companyName {
          font-size: clamp(26px, 3vw, 36px);
          font-weight: 900;
          line-height: 1.02;
        }

        .tagline {
          margin-top: 8px;
          font-size: 15px;
          font-weight: 700;
          opacity: 0.95;
        }

        .cardBottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .builderSection {
          margin-top: 22px;
          padding-top: 12px;
        }

        .sectionTitle span {
          display: inline-block;
          font-size: 12px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #dbe7ff;
          margin-bottom: 10px;
        }

        .sectionTitle h2 {
          font-size: clamp(30px, 4vw, 46px);
          line-height: 1.02;
          letter-spacing: -0.03em;
          max-width: 760px;
        }

        .selectorBlock {
          margin-top: 30px;
        }

        .selectorLabel {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #dce7ff;
          margin-bottom: 14px;
        }

        .chipRow {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .chip {
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: #eef4ff;
          border-radius: 999px;
          cursor: pointer;
          transition: transform 0.18s ease, border-color 0.18s ease, background 0.18s ease;
          backdrop-filter: blur(10px);
        }

        .chip:hover {
          transform: translateY(-1px);
        }

        .chip.active {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.26);
        }

        .packageChip {
          padding: 14px 18px;
          text-align: left;
          border-radius: 22px;
        }

        .chipTop {
          display: block;
          font-size: 18px;
          font-weight: 900;
          margin-bottom: 4px;
        }

        .chipBottom {
          display: block;
          font-size: 12px;
          color: #dce7ff;
          letter-spacing: 0.04em;
        }

        .colorChip {
          min-height: 46px;
          padding: 0 18px;
          font-weight: 800;
        }

        .builderGrid {
          display: grid;
          grid-template-columns: 1.02fr 0.98fr;
          gap: 28px;
          margin-top: 30px;
          align-items: start;
        }

        .formArea,
        .summaryArea {
          padding: 0;
        }

        .inputGrid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        .inputGrid.twoCols {
          grid-template-columns: 1fr 1fr;
          margin-top: 16px;
        }

        .field span {
          display: block;
          margin-bottom: 8px;
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #e7efff;
        }

        .field input[type="text"],
        .field input[type="file"] {
          width: 100%;
          min-height: 52px;
          padding: 0 16px;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          color: #f6f9ff;
          outline: none;
        }

        .field input[type="file"] {
          padding: 12px 16px;
        }

        .field input::placeholder {
          color: rgba(240, 246, 255, 0.62);
        }

        .optionLine {
          display: grid;
          gap: 12px;
          margin-top: 18px;
        }

        .toggle {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 18px;
          border: 1px solid rgba(255, 255, 255, 0.14);
          background: rgba(255, 255, 255, 0.08);
          cursor: pointer;
        }

        .toggle.active {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.24);
        }

        .toggle input {
          width: 16px;
          height: 16px;
          margin-right: 8px;
          accent-color: #ffffff;
        }

        .toggle span {
          flex: 1;
          font-weight: 700;
        }

        .toggle strong {
          font-size: 15px;
          font-weight: 900;
        }

        .microNote {
          margin-top: 16px;
          font-size: 14px;
          color: #d8e6ff;
        }

        .summaryLines {
          display: grid;
          gap: 10px;
        }

        .summaryLine {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 10px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
        }

        .summaryLine span {
          color: #dce8ff;
        }

        .summaryLine strong {
          font-weight: 900;
          color: #ffffff;
          text-align: right;
        }

        .summaryLine.total {
          padding-top: 16px;
          font-size: 19px;
        }

        .summaryFoot {
          margin-top: 18px;
          color: #dbe8ff;
          line-height: 1.7;
        }

        @media (max-width: 980px) {
          .hero,
          .builderGrid {
            grid-template-columns: 1fr;
          }

          .heroStats {
            grid-template-columns: 1fr;
          }

          .inputGrid.twoCols {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 720px) {
          .wrap {
            width: min(100% - 24px, 1180px);
            padding: 30px 0 64px;
          }

          h1 {
            font-size: 44px;
          }

          .heroActions {
            flex-direction: column;
          }

          .cta {
            width: 100%;
          }

          .chipRow {
            gap: 10px;
          }

          .packageChip,
          .colorChip {
            width: 100%;
          }

          .logoPlaceholder {
            width: 120px;
            height: 120px;
          }

          .logoImage {
            max-width: 150px;
            max-height: 110px;
          }

          .cardInner {
            padding: 20px;
          }

          .companyName {
            font-size: 24px;
          }

          .tagline,
          .cardBottom {
            font-size: 12px;
          }
        }
      `}</style>
    </main>
  );
}

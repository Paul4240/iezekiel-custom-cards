"use client";

import React, { useState, ChangeEvent } from "react";

export default function HomePage() {
  const PHONE = "(832) 871-0186";
  const PHONE_RAW = "8328710186";
  const EMAIL = "Iezekielcustoms@yahoo.com";

  const [company, setCompany] = useState("Your Company");
  const [tagline, setTagline] = useState("Premium Metal Cards");
  const [quantity, setQuantity] = useState("50");
  const [logo, setLogo] = useState<string | null>(null);
  const [ownLogo, setOwnLogo] = useState(false);
  const [createLogo, setCreateLogo] = useState(false);

  const pricePerCard = 1;

  const total =
    (Number(quantity) || 0) * pricePerCard +
    (ownLogo ? 25 : 0) +
    (createLogo ? 50 : 0);

  const handleLogo = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") setLogo(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <main className="page">
      <div className="wrap">
        {/* HERO */}
        <section className="hero">
          <div>
            <h1>Iezekiel Haley Custom Metal Cards</h1>
            <p>
              Premium metal business cards with clear pricing, strong
              presentation, and fast ordering. Text or email to inquire about
              orders.
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

          {/* CARD */}
          <div className="heroRight">
            <div className="card">
              <div className="logoBox">
                {logo ? (
                  <img src={logo} />
                ) : (
                  <span>LOGO</span>
                )}
              </div>

              <div className="cardText">
                <h3>{company}</h3>
                <p>{tagline}</p>
              </div>
            </div>
          </div>
        </section>

        {/* BUILDER */}
        <section className="builder">
          <h2>Card Builder</h2>

          <div className="field">
            <label>Company Name</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>

          <div className="field">
            <label>Tagline</label>
            <input value={tagline} onChange={(e) => setTagline(e.target.value)} />
          </div>

          <div className="field">
            <label>Upload Logo</label>
            <input type="file" onChange={handleLogo} />
          </div>

          <div className="field">
            <label>Quantity</label>
            <input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>

          <div className="checks">
            <label>
              <input
                type="checkbox"
                checked={ownLogo}
                onChange={() => {
                  setOwnLogo(!ownLogo);
                  setCreateLogo(false);
                }}
              />
              Own Logo (+$25)
            </label>

            <label>
              <input
                type="checkbox"
                checked={createLogo}
                onChange={() => {
                  setCreateLogo(!createLogo);
                  setOwnLogo(false);
                }}
              />
              Create Logo (+$50)
            </label>
          </div>

          <h2 className="total">Total: ${total.toFixed(2)}</h2>
        </section>
      </div>

      <style jsx>{`
        .page {
          min-height: 100vh;
          background: linear-gradient(135deg, #1e40af, #2563eb, #3b82f6);
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
        }

        .heroRight {
          padding-top: 60px;
          display: flex;
          justify-content: center;
        }

        @media (min-width: 900px) {
          .heroRight {
            position: sticky;
            top: 80px;
          }
        }

        .card {
          width: 420px;
          height: 250px;
          background: black;
          border-radius: 18px;
          padding: 20px;
        }

        .logoBox {
          width: 160px;
          height: 160px;
          background: #444;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .logoBox img {
          max-width: 100%;
          max-height: 100%;
        }

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 10px 16px;
          border-radius: 10px;
          border: 1px solid white;
        }

        .btn.primary {
          background: white;
          color: black;
        }

        .builder {
          margin-top: 60px;
          max-width: 500px;
        }

        .field {
          margin-bottom: 16px;
          display: flex;
          flex-direction: column;
        }

        .field input {
          padding: 10px;
          border-radius: 8px;
          border: none;
        }

        .checks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .total {
          margin-top: 20px;
        }
      `}</style>
    </main>
  );
}

"use client";

import React, { useMemo, useState } from "react";

export default function HomePage() {
  const OWNER = "Iezekiel Haley";
  const PHONE = "(832) 871-0186";
  const PHONE_RAW = "8328710186";
  const EMAIL = "Iezekielcustoms@yahoo.com";

  const packages = useMemo(() => [
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
  ], []);

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [selectedColor, setSelectedColor] = useState(packages[0].colors[0]);

  const changePackage = (pkg: any) => {
    setSelectedPackage(pkg);
    setSelectedColor(pkg.colors[0]);
  };

  return (
    <main className="wrap">
      <section className="hero">
        <h1>{OWNER} Custom Metal Cards</h1>
        <p>
          Premium metal business cards with clean pricing, strong presentation,
          and fast ordering.
        </p>

        <div className="actions">
          <a href={`tel:${PHONE_RAW}`} className="btn primary">Call {PHONE}</a>
          <a href={`mailto:${EMAIL}`} className="btn">Email</a>
        </div>
      </section>

      <section className="packages">
        <h2>Select Thickness</h2>

        <div className="grid">
          {packages.map((pkg) => (
            <div
              key={pkg.thickness}
              className={`card ${selectedPackage.thickness === pkg.thickness ? "active" : ""}`}
              onClick={() => changePackage(pkg)}
            >
              <h3>{pkg.thickness}</h3>
              <p>{pkg.label}</p>
              <span>Min {pkg.min}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="colors">
        <h2>Choose Color</h2>

        <div className="colorGrid">
          {selectedPackage.colors.map((color) => (
            <button
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
          <p><strong>Thickness:</strong> {selectedPackage.thickness}</p>
          <p><strong>Price:</strong> {selectedPackage.label}</p>
          <p><strong>Color:</strong> {selectedColor}</p>
          <p><strong>Minimum:</strong> {selectedPackage.min} cards</p>
        </div>

        <div className="actions">
          <a href={`tel:${PHONE_RAW}`} className="btn primary">Call to Order</a>
          <a href={`mailto:${EMAIL}`} className="btn">Email Order</a>
        </div>
      </section>

      <style jsx>{`
        .wrap {
          padding: 40px;
          max-width: 1000px;
          margin: auto;
        }

        h1 {
          font-size: 40px;
          margin-bottom: 10px;
        }

        h2 {
          margin-top: 40px;
        }

        .actions {
          margin-top: 20px;
          display: flex;
          gap: 10px;
        }

        .btn {
          padding: 10px 16px;
          border: 1px solid #ccc;
          border-radius: 8px;
        }

        .primary {
          background: white;
          color: black;
        }

        .grid {
          display: flex;
          gap: 15px;
          margin-top: 20px;
        }

        .card {
          padding: 20px;
          border: 1px solid #333;
          cursor: pointer;
        }

        .card.active {
          border: 2px solid white;
        }

        .colorGrid {
          display: flex;
          gap: 10px;
          margin-top: 20px;
        }

        .colorGrid button {
          padding: 8px 14px;
          border: 1px solid #444;
        }

        .colorGrid .active {
          background: white;
          color: black;
        }

        .box {
          margin-top: 20px;
          padding: 20px;
          border: 1px solid #444;
        }
      `}</style>
    </main>
  );
}

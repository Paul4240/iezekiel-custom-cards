* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: system-ui, -apple-system, sans-serif;
  background: linear-gradient(135deg, #0f2d6b, #1f4ed8);
  color: #fff;
}

.page {
  padding: 60px 24px;
  max-width: 1200px;
  margin: auto;
}

/* HERO */
.hero {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 36px;
  align-items: stretch;
  position: relative;
}

/* LEFT */
.heroLeft h1 {
  font-size: 44px;
  line-height: 1.1;
  margin-bottom: 16px;
}

.heroLeft p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 20px;
}

/* BUTTONS */
.ctaRow {
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
}

.btn {
  padding: 12px 18px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
}

.btnPrimary {
  background: #fff;
  color: #000;
}

.btnSecondary {
  border: 1px solid rgba(255,255,255,0.4);
  color: #fff;
}

/* INFO */
.infoRow {
  display: flex;
  gap: 40px;
  margin-top: 20px;
}

.infoItem span {
  font-size: 12px;
  opacity: 0.7;
}

.infoItem h4 {
  margin-top: 4px;
}

/* RIGHT SIDE */
.heroRight {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: relative;
}

/* 🔥 FLOATING CARD */
.cardPreview {
  width: 420px;
  height: 240px;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  background: linear-gradient(135deg, #6d28d9, #9333ea);

  transform: translateY(120px); /* THIS CREATES OVERLAP */
  box-shadow: 0 25px 60px rgba(0,0,0,0.4);
  z-index: 5;
}

/* LOGO */
.logoBox {
  width: 110px;
  height: 110px;
  background: rgba(255,255,255,0.2);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

/* TEXT */
.cardText {
  position: absolute;
  bottom: 20px;
  left: 20px;
}

.cardText h2 {
  font-size: 22px;
}

.cardText p {
  font-size: 14px;
  opacity: 0.8;
}

.cardMeta {
  position: absolute;
  bottom: 10px;
  right: 20px;
  font-size: 12px;
  opacity: 0.7;
}

/* BUILDER SECTION */
.builder {
  margin-top: 140px; /* MORE SPACE because card overlaps */
}

.builder h2 {
  font-size: 36px;
  margin-bottom: 20px;
}

/* INPUTS */
.formRow {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: none;
}

/* TOTAL */
.total {
  margin-top: 20px;
  font-size: 22px;
  font-weight: bold;
}

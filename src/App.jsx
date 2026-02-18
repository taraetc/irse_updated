import { Routes, Route, Link, Navigate } from "react-router-dom";
import TermsRulebook from "./pages/TermsRulebook";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AboutUs from "./pages/AboutUs";
import DonorFaqs from "./pages/DonorFaqs";
import NonProfitOrgFaqs from "./pages/NonProfitOrgFaqs";
import ContactUs from "./pages/ContactUs";
import "./App.css";

function Home() {
  return (
    <main className="legal-page">
      <h1>Impakrintas Legal Pages</h1>
      <p>
        <Link to="/about">About Us</Link>
      </p>
      <p>
        <Link to="/donor-faqs">Donor FAQs</Link>
      </p>
      <p>
        <Link to="/npo-faqs">NPO FAQs</Link>
      </p>
      <p>
        <Link to="/rulebook">Terms of Use and Rulebook</Link>
      </p>
      <p>
        <Link to="/privacy-policy">Privacy Policy</Link>
      </p>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/donor-faqs" element={<DonorFaqs />} />
      <Route path="/npo-faqs" element={<NonProfitOrgFaqs />} />
      <Route path="/rulebook" element={<TermsRulebook />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

import Link from "next/link";

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="footer-grid">
      <div className="footer-brand"><div className="brand brand-light"><span className="brand-mark"><img src="/alpine/mountain-light.svg" alt="" /></span><span>Alpine Craft</span></div><p>Structured mountaineering and alpine rescue technical education designed for modern alpinists.</p></div>
      <div className="footer-links"><h3>Curriculum</h3><Link href="/knots">All Knots</Link><Link href="/techniques">Snow Anchors</Link><Link href="/techniques">Rope Systems</Link></div>
      <div className="footer-links"><h3>Guides</h3><span>Instructors</span><span>Certifications</span><span>Safety Standards</span></div>
      <div className="newsletter"><h3>Join the Alpine Dispatch</h3><p>Get technical diagrams, weather window studies, and gear reviews directly.</p><form><input aria-label="Email address" type="email" placeholder="Email address" /><button type="submit">Subscribe</button></form></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Alpine Craft Education. Certified AMGA Partner Program.</span><span>Privacy Policy &nbsp;&nbsp;&nbsp; Terms of Training</span></div>
  </footer>;
}

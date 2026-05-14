import React from "react";

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer__inner">
        <div className="footer__top">
         
          <div>
            <div className="footer__brand-name">Devaccto</div>
            <p className="footer__brand-desc">
              Mendorong batas inovasi rekayasa perangkat lunak melalui
              keunggulan teknis dan komitmen terhadap kualitas kode.
            </p>
            <div className="footer__socials">
            
              <a href="#" className="footer__social-link" aria-label="Website">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </a>
            
              <a href="#" className="footer__social-link" aria-label="Terminal">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="18" rx="2" />
                  <path d="m8 10 3 3-3 3" />
                  <line x1="14" y1="16" x2="18" y2="16" />
                </svg>
              </a>
            
              <a href="#" className="footer__social-link" aria-label="Network">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="3" />
                  <circle cx="5" cy="19" r="3" />
                  <circle cx="19" cy="19" r="3" />
                  <line x1="12" y1="8" x2="5" y2="16" />
                  <line x1="12" y1="8" x2="19" y2="16" />
                </svg>
              </a>
            </div>
          </div>

         
          <div>
            <h4 className="footer__col-title">Resources</h4>
            <a href="#" className="footer__col-link">
              GitHub
            </a>
            <a href="#" className="footer__col-link">
              Documentation
            </a>
            <a href="#" className="footer__col-link">
              Tech Blog
            </a>
            <a href="#" className="footer__col-link">
              Open Source
            </a>
          </div>

         
          <div>
            <h4 className="footer__col-title">Company</h4>
            <a href="#" className="footer__col-link">
              About Us
            </a>
            <a href="#" className="footer__col-link">
              LinkedIn
            </a>
            <a href="#" className="footer__col-link">
              Privacy Policy
            </a>
            <a href="#" className="footer__col-link">
              Contact
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">
            © {new Date().getFullYear()} Software Engineering. All rights
            reserved.
          </p>

          {/* <div className="footer__status">
            <span className="footer__status-dot"></span>
            System Operational
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

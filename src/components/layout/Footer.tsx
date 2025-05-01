import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 py-16 relative">
      <div className="container mx-auto px-4">
        <div className="border-t border-gray-300 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">© 2025 Klikx. Tous droits réservés.</p>
          <div className="flex gap-4">
            <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 2.163c-3.142 0-3.521.012-4.774.069-2.366.108-3.414 1.151-3.522 3.522-.057 1.253-.069 1.631-.069 4.773 0 3.143.012 3.521.069 4.774.108 2.369 1.151 3.413 3.522 3.522 1.253.058 1.632.069 4.774.069 3.143 0 3.521-.012 4.774-.069 2.366-.108 3.413-1.152 3.522-3.522.058-1.253.069-1.631.069-4.774 0-3.142-.012-3.521-.069-4.773-.108-2.371-1.151-3.414-3.522-3.522-1.254-.058-1.631-.069-4.774-.069zm0 3.636a3.037 3.037 0 1 0 0 6.074 3.037 3.037 0 0 0 0-6.074zm0 5.009a1.971 1.971 0 1 1 0-3.943 1.971 1.971 0 0 1 0 3.943zm3.864-5.134a.71.71 0 1 0 0 1.419.71.71 0 0 0 0-1.419z"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="text-gray-600 text-sm hover:text-gray-900">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React from "react";

function Footer() {
  const today = new Date();
  return (
    <footer className="text-black w-full bg-slate-50 mt-12">
      <div className="md:mx-16 lg:mx-32 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <p className="text-sm tracking-wider">
              &copy; {today.getFullYear()} [Company Name]
            </p>
            <ul className="flex">
              <li>
                <a className="text-sm tracking-wider px-2" href="#">
                  About
                </a>
              </li>
              <li>
                <a className="text-sm tracking-wider px-2" href="#">
                  Careers
                </a>
              </li>
              <li>
                <a className="text-sm tracking-wider px-2" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

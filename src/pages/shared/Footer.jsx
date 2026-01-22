import React from "react";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Logo and description */}
        <div>
          <div className="flex  items-end">
            <img className=" " src="/src/assets/logo.png" alt="" />
            <h2 className="text-2xl -ml-2 font-bold ">ProFast</h2>
          </div>
          <p className="text-sm mt-3">
            Empowering web experiences with clean fast and scalable
            solutions.....
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="link link-hover">Home</a>
            </li>
            <li>
              <a className="link link-hover">About Us</a>
            </li>
            <li>
              <a className="link link-hover">Services</a>
            </li>
            <li>
              <a className="link link-hover">Contact</a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="font-semibold mb-2">Legal</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a className="link link-hover">Privacy Policy</a>
            </li>
            <li>
              <a className="link link-hover">Terms of Use</a>
            </li>
            <li>
              <a className="link link-hover">Cookie Policy</a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-2">Newsletter</h3>
          <p className="text-sm mb-2">Stay updated with our latest news</p>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Enter your email"
              className="input input-sm w-full max-w-xs"
            />
            <button className="btn btn-sm btn-primary">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-300 mt-6 py-4 text-center text-sm">
        © 2025 YourCompany — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;

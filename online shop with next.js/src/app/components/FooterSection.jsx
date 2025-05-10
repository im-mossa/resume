// src/components/FooterSection.jsx
"use client";

import React from "react";
import Link from "next/link";

export default function FooterSection() {
  const footerLinks = [
    {
      title: "About Us",
      links: [
        { label: "Job positions", href: "/" },
        { label: "Contact us", href: "/" },
        { label: "Cooperate with us", href: "/" },
      ],
    },
    {
      title: "Guide",
      links: [
        { label: "Site map", href: "/sitemap" },
        { label: "Frequently questions", href: "/faq" },
        { label: "Privacy", href: "/privacy" },
      ],
    },
    {
      title: "Social networks",
      links: [
        { label: "Instagram", href: "https://www.instagram.com/" },
        { label: "Twitter", href: "https://www.x.com/" },
        { label: "LinkedIn", href: "https://www.linkedin.com/" },
      ],
    },
  ];

  return (
    <>
      {/* Map Section */}
      <section className="bg-[#eee] pt-5 text-center">
        <h4 className="text-black">Our Address</h4>
        <br />
        <iframe
          title="Company Location"
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d330.4487474617009!2d51.455177466451595!3d35.80249477081845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfa!2s!4v1729416604001!5m2!1sfa!2s"
          width="100%"
          height="250px"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {/* Footer Links */}
      <footer className="bg-[#eee] py-5">
        <div className="container mx-auto grid grid-cols-1 justify-items-center sm:grid-cols-2 sm:justify-items-start md:grid-cols-3 md:justify-items-start gap-6">
          {footerLinks.map((section, idx) => (
            <div key={idx} className="text-justify">
              <h4 className="mt-1 mb-4 text-black">{section.title}</h4>
              <nav>
                <ul className="flex flex-col space-y-2">
                  {section.links.map((link, index) => (
                    <li key={index}>
                      {section.title === "Social networks" ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block hover:scale-110 transition-transform"
                        >
                          <i
                            className={`fa-brands fa-${link.label.toLowerCase()} fa-2xl text-black`}
                          />
                        </a>
                      ) : link.href.startsWith("http") ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[13px] block text-black hover:font-bold"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-[13px] block text-black hover:font-bold"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </div>
      </footer>
    </>
  );
}

import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className=" text-white py-10 px-10  ">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <p className="text-center md:text-left text-lg">© {new Date().getFullYear()} Built by Aswin </p>
       
        <div className="flex gap-4 mt-4 md:mt-0">
           
          <a
            href="https://github.com/AswinM1 "
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com/in/aswinfullstack"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

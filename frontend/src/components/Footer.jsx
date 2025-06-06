import React from 'react';
import { Github, Linkedin } from 'lucide-react';

function Footer() {
  return (
    <footer className=" text-neutral-300 w-full flex font-sans tracking-tighter font-medium   mx-auto justify-center absolite bottom-0 ">
      <div className="max-w-5xl mx-auto flex w-full justify-betweem items-center  gap-2  align-middle">
        <p className="text-center md:text-left text-lg">© {new Date().getFullYear()} Built by Aswin </p>
       
        <div className=" gap-4 mt-4 md:mt-0 justify-center items-center flex mx-auto">
           
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

import logo from '../../../public/logo.png';
import { PiFacebookLogo, PiInstagramLogoDuotone, PiLinkedinLogoDuotone, PiYoutubeLogo } from 'react-icons/pi';

const Footer = () => {
  return (
    <>
      <div className="container mx-auto py-10 lg:flex md:flex justify-center items-center gap-20">
        <div className="flex gap-5">
          <PiInstagramLogoDuotone />
          <PiLinkedinLogoDuotone />
          <PiFacebookLogo />
          <PiYoutubeLogo />
        </div>
        <div>
          <img src={logo} />
        </div>
        <div>
          <p className="font-semibold text-[#4b4b4b] text-sm">
            Copyright ©2024 All rights reserved          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;

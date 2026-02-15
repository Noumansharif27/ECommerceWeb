import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="w-full h-[100vh] mb-5">
      <div className="absolute top-6 w-full aspect-video bg-black overflow-hidden shadow-2xl">
        {/* <video
          className="w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={assets.hero_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
        <img
          src={assets.HomeBanner}
          alt="HomeBanner"
          className="w-full h-full object-fit"
        />
      </div>
    </div>
  );
};

export default Hero;

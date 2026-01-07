import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="w-full h-full">
      <div className="relative w-full aspect-video bg-black overflow-hidden shadow-2xl">
        <video
          className="w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={assets.hero_video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default Hero;

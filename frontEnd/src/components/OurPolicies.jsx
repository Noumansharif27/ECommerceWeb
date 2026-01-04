import React from "react";
import { RefreshCcw, PackageCheck, Headset } from "lucide-react";

const OurPolicies = () => {
  return (
    <div className="flex felx-col sm:flex-row justify-center gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <RefreshCcw size={40} className="m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassle free exchange policy</p>
      </div>

      <div>
        <PackageCheck size={40} className="m-auto mb-5" />
        <p className="font-semibold">7 Days Return Policy</p>
        <p className="text-gray-400">We provide 7 days free return policy</p>
      </div>

      <div>
        <Headset size={40} className="m-auto mb-5" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 customer support</p>
      </div>
    </div>
  );
};

export default OurPolicies;

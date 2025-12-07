import React from "react";
import { assets } from "../assets/assets.js";

const Add = () => {
  return (
    <form>
      <div className="flex flex-col w-full items-start gap-3">
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt="UploadAreaIcon"
            />
            <input type="file" id="image1" hidden />
          </label>

          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt="UploadAreaIcon"
            />
            <input type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt="UploadAreaIcon"
            />
            <input type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={assets.upload_area}
              alt="UploadAreaIcon"
            />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>
    </form>
  );
};

export default Add;

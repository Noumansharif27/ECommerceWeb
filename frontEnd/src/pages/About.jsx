import React from "react";
import Tittle from "../components/Tittle";
import { assets } from "../assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";

const About = () => {
  return (
    <div className="px-5">
      <div className="text-2xl text-center pt-8">
        <Tittle text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16 sm:pl-50">
        <img
          className="w-full md:max-w-[450px]"
          src={assets.about_img}
          alt="AboutUS_Image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas
            obcaecati sequi in porro quae similique blanditiis.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
            accusantium commodi inventore voluptas rem repellat laboriosam
            suscipit libero ipsum.
          </p>
          <b className="text-gray-600">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda,
            dolore.
          </p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Tittle text1={"WHY"} text2={"CHOSE US"} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            eveniet perferendis eaque dolores numquam provident dolorum
            reiciendis totam.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            eveniet perferendis eaque dolores numquam provident dolorum
            reiciendis totam.
          </p>
        </div>

        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Expectional Customer Service:</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            eveniet perferendis eaque dolores numquam provident dolorum
            reiciendis totam.
          </p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  );
};

export default About;

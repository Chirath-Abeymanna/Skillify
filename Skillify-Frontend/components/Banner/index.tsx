"use client";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="mx-auto -my-[4rem] max-w-7xl sm:py-10 px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-16">
        {/* COLUMN-1 */}

        <div className="mx-auto sm:mx-0">
          <div className="py-3 text-center lg:text-start">
            <button className="text-blue bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black">
              COURSES. SKILLS. JOBS. ALL IN ONE PLACE.
            </button>
          </div>
          <div className="py-3 text-center lg:text-start">
            <h1 className="text-6xl lg:text-80xl font-bold text-darkpurple">
              {" "}
              SKILLIFY: <br /> Unlock Your Potential, Master Skills.
            </h1>
          </div>
          <div className="my-7 text-center lg:text-start">
            <Link
              href={"#aboutus-section"}
              className="text-sm md:text-xl font-semibold hover:shadow-xl bg-blue text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* COLUMN-2 - Spline Element */}

        <div className="lg:-m-45 lg:pt-35 hidden lg:block bg-white p-7">
          <Spline scene="https://prod.spline.design/518hlprNqFPv3Q6h/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

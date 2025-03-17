"use client";
import Spline from "@splinetool/react-spline";
import Link from "next/link";

const Banner = () => {
  return (
    <div className="mx-auto -mt-[8rem] max-w-7xl sm:py-10 px-6 lg:px-8 h-[90vh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 my-8">
        {/* COLUMN-1 */}

        <div className="mx-auto sm:mx-0">
          <div className="py-3 text-center lg:text-start">
            <button className="mt-20 mb-10 text-blue-600 bg-lightblue hover:shadow-xl text-sm md:text-lg font-bold px-6 py-1 rounded-3xl tracking-wider hover:text-white hover:bg-black">
              COURSES. SKILLS. JOBS. ALL IN ONE PLACE.
            </button>
          </div>
          <div className="py-3 text-center lg:text-start">
            <h1 className="mb-10 text-6xl lg:text-[5rem] font-bold text-darkpurple">
              {" "}
              SKILLIFY: <br /> Unlock Your Potential, Master Skills.
            </h1>
          </div>
          <div className="my-3 text-center lg:text-start">
            <Link
              href={"#aboutus-section"}
              className="text-sm md:text-xl font-semibold hover:shadow-xl bg-blue-600 text-white py-3 px-6 md:py-5 md:px-14 rounded-full hover:bg-hoblue"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* COLUMN-2 - Spline Element */}

        <div className="relative top-[13vh] left-[5vw] hidden lg:block  p-7 h-[80vh] w-[40vw] ">
          <Spline scene="https://prod.spline.design/i-2zBouq-1c8R9gK/scene.splinecode" />{" "}
        </div>
      </div>
    </div>
  );
};

export default Banner;

import Image from "next/image";
import Spline from "@splinetool/react-spline";

const Dedicated = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-30xl px-4 my-2 lg:px-8">
        {/* Reduced section height */}
        <div className="grid grid-cols-1 md:grid-cols-2 my-1 items-center gap-10">
          {" "}
          {/* Added spacing between columns */}
          {/* COLUMN-1 */}
          <div className="h-[700px] w-[700px] flex items-center justify-center">
            {" "}
            {/* Reduced Spline size */}
            <Spline scene="https://prod.spline.design/i-2zBouq-1c8R9gK/scene.splinecode" />{" "}
          </div>
          {/* COLUMN-2 */}
          <div className="relative flex flex-col justify-center h-full space-y-6">
            {" "}
            {/* Added spacing between text elements */}
            <h2 className="text-4xl lg:text-5xl pt-4 font-bold sm:leading-tight mt-3 text-center lg:text-start">
              {" "}
              {/* Adjusted font size */}
              Dedicated to helping people achieve their career goals.
            </h2>
            <p className="font-medium text-lightblack text-xl text-center lg:text-start">
              {" "}
              {/* Adjusted font size */}
              Skillify is committed to supporting your growth, providing the
              tools and expertise needed to enhance your skills and unlock new
              opportunities in your career.
            </p>
            <p className="text-xl font-semibold lg:ml-20 text-center lg:text-start">
              {" "}
              {/* Reduced spacing */}
              Team SKILLIFY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dedicated;

import Image from "next/image";
import Spline from "@splinetool/react-spline";

const Dedicated = () => {
  return (
    <div className="relative">
      <div className="mx-auto max-w-30xl px-4 my-40 sm:py-20 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 my-16 items-center">
          {/* COLUMN-1 */}
          <div className="h-[900px] w-[900px] flex items-center justify-center">
            <Spline scene="https://prod.spline.design/tgixXc46IoHInTtF/scene.splinecode" />
          </div>

          {/* COLUMN-2 */}
          <div className="relative flex flex-col justify-center h-full">
            <h2 className="text-4xl lg:text-65xl pt-4 font-bold sm:leading-tight mt-5 text-center lg:text-start">
              Dedicated to helping people achieve their career goals.
            </h2>
            <p className="font-medium text-lightblack text-2xl mt-5 text-center lg:text-start">
              Skillify is committed to supporting your growth, providing the
              tools and expertise needed to enhance your skills and unlock new
              opportunities in your career.
            </p>
            <p className="text-2xl font-semibold mt-12 lg:ml-32 text-center lg:text-start">
              Team SKILLIFY
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dedicated;

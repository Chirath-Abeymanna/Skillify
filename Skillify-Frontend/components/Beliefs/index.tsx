import Link from "next/link";

const Beliefs = () => {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl sm:py-4 lg:px-8 rounded-3xl">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 my-16 mx-5 gap-5">
        {/* COLUMN-1 */}
        <div className="absolute bottom-[30%] left-[8%] text-center sm:text-start  ">
          <Link
            href="/CareerMap"
            className=" text-xl py-5 px-14 mt-5 font-semibold text-white rounded-full bg-blue-600  hover:bg-blue-800 "
          >
            Get Started
          </Link>
        </div>

        <div className="relative bg-darkblue bg-beliefs pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl  -z-30">
          <div className=" relative top-[85%] lg:top-[70%] right-[22vw]  lg:right-[11.5vw] m-0 p-0 w-[110vw] lg:w-[45.5rem] ">
            <img
              src="/images/beliefs/swirls.svg"
              alt="roadmap"
              className="absolute top-0 left-0 -z-10"
            />
          </div>
          <h2 className="text-lg font-normal text-white tracking-widest mb-5 text-center sm:text-start">
            A Career Map
          </h2>
          <h3 className="text-4xl sm:text-65xl font-bold text-white leading-snug mb-5 text-center sm:text-start">
            Generate{" "}
            <span className="text-grey">
              a custom dynamic roadmap as you prefer.
            </span>
          </h3>
          <h5 className="text-offwhite pt-2 mb-5 text-center sm:text-start z-[50]">
            Dynamic roadmap that adapts to evolving goals, ensuring seamless
            progress and continuous growth.
          </h5>
        </div>

        {/* COLUMN-2 */}

        <div className="relative  bg-green-100 pt-12 px-10 sm:px-24 pb-52 md:pb-70 rounded-3xl ">
          <div className="relative top-[98%] lg:top-[90%] left-32 lg:left-48  m-0 p-0 w-[15rem] lg:w-[20rem] ">
            <img
              src="/images/beliefs/Sally.svg"
              alt="roadmap"
              className="absolute top-0 left-0 "
            />
          </div>
          <h2 className="text-lg font-normal text-blue tracking-widest mb-5 text-center sm:text-start">
            Help Center
          </h2>
          <h3 className="text-4xl sm:text-65xl font-bold text-black leading-snug mb-5 text-center sm:text-start">
            <span className="text-blue">Sally,</span> a tailored AI assistant,
            designed to enhance experience.
          </h3>
          <h5 className="bluish pt-2 mb-14 text-center sm:text-start">
            Effortless conversations, driving engagement and providing instant
            support at every turn.
          </h5>
          <div className="text-center sm:text-start">
            <Link
              href="/HelpCenter"
              className="text-xl py-5 px-14 mt-10 font-semibold text-white rounded-full bg-blue-600 border border-blue hover:bg-blue-800"
            >
              Ask Sally
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beliefs;

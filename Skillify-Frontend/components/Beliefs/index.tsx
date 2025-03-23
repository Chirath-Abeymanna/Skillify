import Link from "next/link";

const Beliefs = () => {
  return (
    <div className="mx-auto max-w-2xl lg:max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
        {/* COLUMN-1 */}
        <div className="relative lg:absolute lg:bottom-[30%] lg:left-[8%] text-center sm:text-start mb-6 lg:mb-0">
          <Link
            href="/CareerMap"
            className="inline-block text-base sm:text-lg lg:text-xl py-3 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-14 font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-800 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Career Map Card */}
        <div className="relative bg-darkblue bg-beliefs p-6 sm:p-10 lg:p-12 rounded-3xl overflow-hidden">
          <div className="hidden lg:block absolute top-[60%] right-[-10%] w-full max-w-[50rem] transform rotate-[-5deg]">
            <img
              src="/images/beliefs/swirls.svg"
              alt="roadmap"
              className="w-full h-auto object-contain"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-base sm:text-lg font-normal text-white tracking-widest mb-3 sm:mb-5 text-center sm:text-start">
              A Career Map
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight sm:leading-snug mb-4 sm:mb-5 text-center sm:text-start">
              Generate{" "}
              <span className="text-grey">
                a custom dynamic roadmap as you prefer.
              </span>
            </h3>
            <h5 className="text-offwhite text-sm sm:text-base lg:text-lg pt-2 mb-5 text-center sm:text-start">
              Dynamic roadmap that adapts to evolving goals, ensuring seamless
              progress and continuous growth.
            </h5>
          </div>
        </div>

        {/* Sally Card */}
        <div className="relative bg-green-100 p-6 sm:p-10 lg:p-12 rounded-3xl overflow-hidden">
          <div className="relative lg:absolute bottom-[-40px] left-1/2 transform -translate-x-1/2 lg:translate-x-0 lg:left-[60%] w-[200px] sm:w-[240px] lg:w-[280px] transition-all duration-300">
            <img
              src="/images/beliefs/Sally.svg"
              alt="Sally"
              className="w-full h-auto object-contain drop-shadow-xl"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-base sm:text-lg font-normal text-blue tracking-widest mb-3 sm:mb-5 text-center sm:text-start">
              Help Center
            </h2>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black leading-tight sm:leading-snug mb-4 sm:mb-5 text-center sm:text-start">
              <span className="text-blue">Sally,</span> a tailored AI assistant,
              designed to enhance experience.
            </h3>
            <h5 className="bluish text-sm sm:text-base lg:text-lg pt-2 mb-8 sm:mb-14 text-center sm:text-start">
              Effortless conversations, driving engagement and providing instant
              support at every turn.
            </h5>
            <div className="text-center sm:text-start">
              <Link
                href="/HelpCenter"
                className="inline-block text-base sm:text-lg lg:text-xl py-3 sm:py-4 lg:py-5 px-8 sm:px-10 lg:px-14 font-semibold text-white rounded-full bg-blue-600 border border-blue hover:bg-blue-800 transition-colors"
              >
                Ask Sally
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beliefs;

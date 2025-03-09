import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "@/components/Chatbot/Chat";
import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <Page className="z-0 flex flex-col gap-12 bg-white text-gray-900 min-h-screen min-w-full px-6 items-center relative overflow-hidden pt-20">
      {/* 3D Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/HU6dOwZbh2xM7Rr2/scene.splinecode" />
      </div>

      {/* Header Section - Fixed Overlapping Issue */}
      <section className="flex flex-col gap-6 lg:w-1/2 z-20  text-center mt-10">
        <div className="w-full flex justify-center">
          <Text
            variant="h1"
            className="relative z-30 text-5xl lg:text-6xl font-extrabold text-gray-700 drop-shadow-2xl leading-tight"
          >
            Help Center
          </Text>
        </div>
      </section>

      {/* Chat Section - Increased Width for Desktop */}
      <section className="flex flex-col w-full lg:w-3/4 xl:w-2/3 gap-6 z-20">
        <div className="p-8 rounded-3xl bg-white bg-opacity-70 backdrop-blur-2xl border border-white shadow-3xl transition-all duration-500 ease-in-out transform hover:shadow-4xl hover:scale-105">
          {/* Chat Messages with Proper Spacing */}
          <div className="space-y-4">
            <Chat />
          </div>
        </div>
      </section>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;

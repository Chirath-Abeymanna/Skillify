import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "@/components/Chatbot/Chat";
import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <Page className="z-0 flex flex-col gap-12 bg-white text-gray-900 min-h-screen min-w-full px-6 items-center relative overflow-hidden pt-20">
      {/* 3D Background Spline Scene */}
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/HToH8MH93m9NGCBl/scene.splinecode" />
      </div>

      {/* Header Section - Fixed Overlapping Issue */}
      <section className="flex flex-col gap-6 lg:w-1/2 z-20 text-center mt-10">
        <div className="w-full flex justify-center">
          <Text
            variant="h1"
            className="relative z-30 text-5xl lg:text-6xl font-extrabold text-gray-700 drop-shadow-2xl leading-tight"
          >
            Help Center
          </Text>
        </div>
      </section>

      {/* Chat Section - Full Width */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-7xl bg-transparent border-2 border-gray-200 rounded-lg p-6">
          <Chat />
        </div>
      </div>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;

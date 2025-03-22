import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "@/components/Chatbot/Chat";
import Spline from "@splinetool/react-spline";

function Home() {
  return (
    <Page className="flex flex-col md:flex-row min-h-screen min-w-full relative overflow-hidden">
      {/* Left Side - Chat Section */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative z-20 p-4 md:p-6">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <Text
            variant="h1"
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-700 drop-shadow-2xl leading-tight"
          >
            Help Center
          </Text>
        </div>

        {/* Chat Container */}
        <div className="h-[calc(100%-80px)] md:h-[calc(100%-100px)]">
          <div className="w-full h-full bg-transparent border-2 border-gray-200 rounded-lg">
            <Chat />
          </div>
        </div>
      </div>

      {/* Right Side - Spline Scene */}
      <div className="w-full md:w-1/2 h-[40vh] md:h-screen relative">
        <div className="absolute inset-0">
          <Spline scene="https://prod.spline.design/HToH8MH93m9NGCBl/scene.splinecode" />
        </div>
      </div>
    </Page>
  );
}

Home.Layout = Layout;

export default Home;

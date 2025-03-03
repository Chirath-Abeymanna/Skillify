import { Layout, Text, Page } from "@vercel/examples-ui";
import { Chat } from "@/components/Chatbot/Chat";

function Home() {
  return (
    <Page className="flex flex-col gap-12 bg-white text-gray-900 min-h-screen min-w-full px-6 items-center relative overflow-hidden">
      {/* Enhanced Glassmorphism Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white to-white opacity-90 backdrop-blur-3xl" />

      {/* Floating 3D Elements */}
      <div className="absolute -top-32 left-10 w-96 h-96 bg-white opacity-40 rounded-full blur-[80px] shadow-2xl" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-white opacity-50 rounded-full blur-[80px] shadow-2xl" />

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

      {/* Chat Section - Fixed Chat Spacing */}
      <section className="flex flex-col lg:w-1/2 gap-6 z-20">
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

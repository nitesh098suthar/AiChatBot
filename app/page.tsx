import Chatbot from './components/Chatbot';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold mb-8">Welcome to My Chatbot App</h1>
      <Chatbot />
    </div>
  );
}

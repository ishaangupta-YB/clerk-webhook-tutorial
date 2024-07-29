import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href="/dashboard" passHref>
        <button className="bg-white text-black py-2 px-4 rounded hover:bg-gray-400 transition-colors duration-300">
          Go To Dashboard
        </button>
      </Link>
    </div>
  );
}

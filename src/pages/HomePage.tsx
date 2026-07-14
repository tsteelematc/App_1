import emptyStates from '@/assets/empty-states.svg';
import { useAuth } from '@/hooks/AuthContext';

const FirstComponent = () => <h1>Tom was here ! ! !</h1>;

export function HomePage() {
  const { signOut } = useAuth();

  return (
    <div className="relative bg-white min-h-screen flex flex-col items-center justify-center">
      <img src={emptyStates} alt="" className="mb-8 w-48 h-48" />
      <h1 className="text-6xl font-bold text-gray-950 tracking-tight">
        Hello, World123.
      </h1>
      <p className="mt-4 text-lg text-gray-400 font-light">I am a Blank App.</p>
      <FirstComponent />
      <button className="btn w-64 rounded-full mt-3">
        DaisyUI Button
      </button>
      <button
        onClick={() => void signOut()}
        className="absolute top-5 right-8 text-gray-300 hover:text-gray-500 transition-colors text-xs"
        aria-label="Sign out"
      >
        Sign out
      </button>
    </div>
  );
}

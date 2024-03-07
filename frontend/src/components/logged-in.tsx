import axios, { AxiosError } from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useAuth } from '@/providers/auth-provider';

export default function LoggedIn() {
  const { user, logout } = useAuth();
  const [secretData, setSecretData] = useState<string | null>(null);

  const getData = async () => {
    try {
      const resp = await axios.get<{
        secret: string;
      }>('http://localhost:8000/secretdata');
      setSecretData(resp.data.secret);
    } catch (err) {
      if (err instanceof AxiosError && err.response?.status === 401) {
        setSecretData('Error fetching data. Not authorized');
        toast('Not authorized', { icon: '🔒' });
      }
      console.error(err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-400 gap-6">
      <h1 className="text-gray-800 text-xl">
        Welcome to this FastAPI and React starter
      </h1>
      <h6>
        You are logged in as <strong>{user?.username}</strong>
      </h6>
      <button onClick={logout} className="btn btn-info">
        Log out
      </button>

      <section className="flex flex-col gap-4 items-center border-t w-full border-t-blue-600 pt-4">
        <div className="flex flex-col items-center">
          <h2 className="text-sm">
            Get protected data from the FastAPI backend
          </h2>
          <h6 className="text-xs text-gray-700">
            <i>Refresh</i> to get new data
          </h6>
        </div>
        <button onClick={getData} className="btn btn-secondary">
          Get
        </button>
        {secretData && <p>{secretData}</p>}
      </section>
    </main>
  );
}

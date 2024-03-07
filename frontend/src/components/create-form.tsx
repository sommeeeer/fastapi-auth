import toast from 'react-hot-toast';
import axios, { AxiosError, type AxiosResponse } from 'axios';
import { useState } from 'react';

export default function CreateForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) {
      return toast('Username and password are required', { icon: '🚫' });
    }
    if (username.length < 3 || username.length > 20) {
      return toast('Username must be atleast 3 characters long', {
        icon: '🚫',
      });
    }
    if (password.length < 6 || password.length > 25) {
      return toast('Password must be atleast 6 characters long', {
        icon: '🚫',
      });
    }
    try {
      const resp = await axios.post<AxiosResponse>(
        'http://localhost:8000/users',
        {
          username: username,
          password: password,
        }
      );
      if (resp.status === 201) {
        setUsername('');
        setPassword('');
        return toast('User created. You can now login.', { icon: '🎉' });
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          setUsername('');
          setPassword('');
          return toast('Username already exists', { icon: '🚫' });
        }
      }
    }
  };

  return (
    <form className="flex flex-col gap-1 animate-fadeIn" onSubmit={handleSubmit}>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
      </label>
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          placeholder="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button className="btn btn-active btn-primary">Create</button>
    </form>
  );
}

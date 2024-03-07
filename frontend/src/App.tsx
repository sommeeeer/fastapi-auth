import { useState } from 'react';

import LoginForm from '@/components/login-form';
import LoggedIn from '@/components/logged-in';
import CreateForm from '@/components/create-form';
import { cn } from '@/utils';
import { useAuth } from '@/providers/auth-provider';
import ThemeButton from '@/components/theme-button';

function App() {
  const { loggedIn } = useAuth();
  const [createUser, setCreateUser] = useState(false);
  if (loggedIn) {
    return <LoggedIn />;
  }
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-base-300 gap-6">
      <ThemeButton />
      <h1 className="text-xl">
        Welcome to this FastAPI and React starter
      </h1>
      <h6>
        <button
          disabled={!createUser}
          className={cn(createUser && 'link')}
          onClick={() => {
            setCreateUser(false);
          }}
        >
          Login
        </button>{' '}
        or{' '}
        <button
          disabled={createUser}
          className={cn(!createUser && 'link')}
          onClick={() => {
            setCreateUser(true);
          }}
        >
          create a user
        </button>{' '}
        to proceed
      </h6>
      <div>{createUser ? <CreateForm /> : <LoginForm />}</div>
    </main>
  );
}

export default App;

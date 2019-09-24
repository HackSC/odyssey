import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const getMessage = async () => {
      const req = await fetch('/api/random');
      const data  = await req.json();
      setMessage(data.message);
    };

    getMessage();
  }, []);

  return (
    <div>
      {message ? message : 'Loading...'}
    </div>
  );
}

export default App;

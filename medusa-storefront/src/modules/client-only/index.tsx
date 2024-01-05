import { useEffect, useState } from 'react';

const ClientOnly = ({ children }: { children?: JSX.Element }) => {
  const [clientReady, setClientReady] = useState<boolean>(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  return clientReady ? <>{children}</> : null;
};

export default ClientOnly;

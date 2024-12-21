import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';



const withAuth = (WrappedComponent) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
      if (status === 'loading') return;
    
      if (status === 'authenticated') {
        fetch('/api/profile')
          .then((response) => response.json())
          .then((data) => {
            console.log('withAuth data is:', data);
            if (data.admin) {
              setIsAdmin(true);
            } else {
              router.push('/profile');
            }
          })
          .catch((error) => {
            console.error('Error fetching profile:', error);
            router.push('/profile');
          });
      } else {
        router.push('/login');
      }
    }, [status, router]);
    


    if (!session || !session.user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

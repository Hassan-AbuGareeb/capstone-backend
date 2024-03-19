import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SignOut() {
  const router = useRouter();

  useEffect(() => {
    const handleSignOut = async () => {
      try {
        const response = await fetch('http://localhost:3001/restaurants/signout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          // Clear the token from the local storage
          localStorage.removeItem("token");
          // Redirect the user to the sign-in page
          router.push('/restaurants/signin');
        } else {
          const errorMessage = await response.text();
          console.error(errorMessage);
        }
      } catch (error) {
        console.error('An error occurred while signing out. Please try again.');
      }
    };

    handleSignOut();
  }, []);

  return (
    <div>
      <p>Signing out...</p>
    </div>
  );
}
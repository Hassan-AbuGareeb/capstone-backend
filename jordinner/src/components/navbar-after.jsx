import Link from 'next/link';

export default function NavbarAfter() {

  async function handleSignOut() {
      const collection = localStorage.getItem('collection');
      const newCollection = JSON.parse(collection)
      const email = newCollection.email
      console.log(email)

        try { 
          const response = await fetch('http://localhost:3001/restaurants/signout', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'email': email
            },
          });
          
          
          if (response.status === 200) {
            localStorage.removeItem('collection')
            window.location.href = `/restaurants/signin`;
          } else {
            const errorMessage = await response.text();
            console.error(errorMessage);
          }
        } catch (error) {
          console.error('An error occurred while signing out. Please try again.');
        }
  }

  return (
    <div style={styles.navbar}> {/* Apply styles directly */}
      <Link href='/profile' style={styles.navlink}>Profile</Link>
      <p></p>
      <Link href='/menu' style={styles.navlink}>Menu</Link>
      <p></p>
      <button onClick={handleSignOut}  style={styles.navlink}>Sign Out</button>
      <p></p>
    </div>
  );
}
const styles = {
    navbar: {
        backgroundColor: '#68ca99',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: '60px',
        padding: '0 20px',
    },
    navlink: {
        color: 'black', 
        textDecoration: 'none',
        padding: '5px 10px',
        marginInline: '20px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
};
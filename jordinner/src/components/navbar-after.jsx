import Link from 'next/link';

export default function NavbarAfter() {
  return (
    <div style={styles.navbar}> {/* Apply styles directly */}
      <Link href='/profile' style={styles.navlink}>Profile</Link>
      <p></p>
      <Link href='/menu' style={styles.navlink}>Menu</Link>
      <p></p>
      <Link href='restaurants/signout' style={styles.navlink}>Sign Out</Link>
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
    },
};
import Link from 'next/link';

export default function NavbarBefore() {
    return (
        <div style={styles.navbar}> {/* Apply styles directly */}
            <Link href='/restaurants/signin' style={styles.navbutton}>Sign In</Link>
            <p></p>
            <Link href='/restaurants/signup' style={styles.navbutton}>Sign Up</Link>
            <p></p>
            <Link href='/customer' style={styles.navbutton}>Switch to customer</Link>
            <p></p>
            <Link href='/restaurants' style={styles.navbutton}>Home</Link>
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
    navbutton: {
        backgroundColor: 'rgb(0, 0, 0)',
        color: 'azure',
        textDecoration: 'none',
        padding: '5px 10px',
        marginInline: '20px',
        borderRadius: '5px',
    },
    signup: {
        backgroundColor: '#68ca99',
    }
};

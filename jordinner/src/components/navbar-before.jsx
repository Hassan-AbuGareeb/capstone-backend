import Link from 'next/link'

export default function NavbarBefore() {
    return (
        <div>
        <Link href='/restaurants/signin'>Sign In</Link>
        <p></p>
        <Link href='/restaurants/signup'>Sign Up</Link>
        <p></p>
        <Link href='/customer'>Switch to customer</Link>
        <p></p>
        <Link href='/restaurants'>Home</Link>
        <p></p>
        </div>
    )
}
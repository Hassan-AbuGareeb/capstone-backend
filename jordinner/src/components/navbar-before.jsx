import Link from 'next/link'

export default function NavbarBefore() {
    return (
        <div>
        <Link href='/restaurant/signin'>Sign In</Link>
        <p></p>
        <Link href='/restaurant/signup'>Sign Up</Link>
        <p></p>
        <Link href='/customer'>Switch to customer</Link>
        <p></p>
        <Link href='/restaurant'>Home</Link>
        <p></p>
        <Link href='/SingleRestaurant/restaurentId'>menu</Link>
        </div>
    )
}
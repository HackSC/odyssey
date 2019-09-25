import Link from 'next/link'
import { A, Header } from '../styles';

export default function HeaderComponent() {
    return (
        <Header>
            <Link href="/" as="">
                <A>Home</A>
            </Link>
            <Link href="/about">
                <A>About</A>
            </Link>
            <Link href="/dashboard">
                <A>Dashboard</A>
            </Link>
            <Link href="/login" as="/login">
                <A>Login</A>
            </Link>
        </Header>
    )
}
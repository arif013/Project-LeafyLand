import { Nav, NavLink } from "@/components/Nav";

export const dynamic = "force-dynamic"  //ignoring the cache

export default function Layout({
    children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
        <>
        <Nav>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">Products</NavLink>
            <NavLink href="/orders">My Orders</NavLink>
            <NavLink href="/orders">Services</NavLink>
        </Nav>
        <div className="container my-6">{children}</div>
        </>
    );
}
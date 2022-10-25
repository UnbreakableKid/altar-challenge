import React from 'react'
import Navbar from './Navbar';

interface LayoutProps {

}

const Layout = ({ children }) => {
    return (<>
        <Navbar />
        <main>
            {children}
        </main>
    </>);
}
export default Layout;
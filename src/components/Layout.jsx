import { Outlet, Link } from 'react-router-dom';

function Layout() {
    return (
        <>
        <header>
            <nav className='black'>
                <div className='nav-wrapper'>
                    <Link to='/' className='brand-logo logo'>[ H@cker_News ]</Link>
                    <ul id='nav-mobile' className='right hide-on-med-and-down'>
                        <li><Link to='https://github.com/AlexAven/' target='_blank' rel='noreferrer'>[ My Repository ]</Link></li>
                    </ul>
                </div>
            </nav>
        </header>

        <main className='container content'>
            <Outlet />
        </main>

        <footer className='page-footer blue-grey darken-3 lighten-4'>
            <div className='footer-copyright'>
                <div className='container'>
                    © {new Date().getFullYear()} All rights reserved 
                    <Link className='grey-text text-lighten-4 right' to='https://github.com/AlexAven/' target='_blank' rel='noreferrer'>[ My Repository ]</Link>
                </div>
            </div>
        </footer>
        </>
    );
};

export { Layout };
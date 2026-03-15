const { Link, useLocation } = window.ReactRouterDOM;

window.components = window.components || {};

window.components.Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'Admission', path: '/admission' },
        { name: 'Openings', path: '/openings' },
        { name: 'Contact Us', path: '/contact' }
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white shadow-md sticky top-0 z-[100] relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 shadow-sm border-b border-gray-100">
                    <div className="flex items-center z-50">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3">
                            <img
                                src="https://raw.githubusercontent.com/abhiraj6/icon/refs/heads/main/Copy%20of%201771699124529.png"
                                alt="ZayinUp Logo"
                                className="h-10 w-auto object-contain drop-shadow-sm"
                            />
                            <span className="font-serif font-bold text-2xl tracking-tight text-primary">ZayinUp <span className="text-accent text-sm font-sans uppercase tracking-widest ml-1">LLP</span></span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center space-x-8 z-50">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.path}`}
                                className={`text-sm font-medium px-1 py-2 transition-colors duration-200 border-b-2 cursor-pointer ${isActive(link.path)
                                    ? 'border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:text-primary hover:border-primary/50'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#/employee"
                            className="ml-4 text-sm font-medium text-primary bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                        >
                            <i className="fa-solid fa-user-tie mr-2 text-xs"></i> Employee
                        </a>
                        <a
                            href="#/admin"
                            className="ml-4 text-sm font-medium text-white bg-primary hover:bg-opacity-90 px-4 py-2 rounded-md shadow-sm transition-all duration-200 hover:-translate-y-0.5 cursor-pointer"
                        >
                            <i className="fa-solid fa-lock mr-2 text-xs"></i> Admin
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                        >
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-b border-gray-200 shadow-inner">
                    <div className="pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.path}`}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 text-base font-medium border-l-4 ${isActive(link.path)
                                    ? 'bg-primary/5 border-primary text-primary'
                                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-900'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#/employee"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-base font-medium text-primary hover:bg-gray-50"
                        >
                            <i className="fa-solid fa-user-tie mr-2 text-xs"></i> Employee Login
                        </a>
                        <a
                            href="#/admin"
                            onClick={() => setIsOpen(false)}
                            className="block px-4 py-3 text-base font-medium text-accent hover:bg-gray-50"
                        >
                            <i className="fa-solid fa-lock mr-2 text-xs"></i> Admin Login
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
};

window.components.Footer = () => {
    return (
        <footer className="bg-primary text-white mt-auto">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-white rounded-md p-1">
                                <img
                                    src="https://raw.githubusercontent.com/abhiraj6/icon/refs/heads/main/Copy%20of%201771699124529.png"
                                    alt="ZayinUp Logo"
                                    className="h-8 w-auto object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold text-2xl tracking-tight text-white">ZayinUp</span>
                        </div>
                        <p className="text-sm text-gray-300 max-w-xs mt-2 leading-relaxed">
                            Your premier partner for strategic recruitment, resume building, and extensive manpower solutions tailored to your needs.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider text-sm">Quick Links</h3>
                        <ul className="space-y-3">
                            <li><Link to="/services" className="text-sm text-gray-300 hover:text-white transition-colors"><i className="fa-solid fa-chevron-right text-xs mr-2 opacity-50"></i> Our Services</Link></li>
                            <li><Link to="/admission" className="text-sm text-gray-300 hover:text-white transition-colors"><i className="fa-solid fa-chevron-right text-xs mr-2 opacity-50"></i> Admissions</Link></li>
                            <li><Link to="/openings" className="text-sm text-gray-300 hover:text-white transition-colors"><i className="fa-solid fa-chevron-right text-xs mr-2 opacity-50"></i> View Openings</Link></li>
                            <li><Link to="/contact" className="text-sm text-gray-300 hover:text-white transition-colors"><i className="fa-solid fa-chevron-right text-xs mr-2 opacity-50"></i> Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white uppercase tracking-wider text-sm">Connect With Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <i className="fa-solid fa-envelope mt-1 text-accent mr-3"></i>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Email</p>
                                    <a href="mailto:Recruitment@zayinup.com" className="text-sm text-gray-200 hover:text-white transition-colors">Recruitment@zayinup.com</a>
                                </div>
                            </li>
                            <li className="flex items-start">
                                <i className="fa-solid fa-phone mt-1 text-accent mr-3"></i>
                                <div>
                                    <p className="text-xs text-gray-400 mb-0.5 uppercase tracking-wide">Contact</p>
                                    <a href="tel:7306257637" className="text-sm text-gray-200 hover:text-white transition-colors">7306257637</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400 text-center md:text-left">
                        &copy; {new Date().getFullYear()} ZayinUp LLP. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-gray-400">
                        <a href="#" className="hover:text-white transition-colors"><span className="sr-only">LinkedIn</span><i className="fa-brands fa-linkedin text-xl"></i></a>
                        <a href="#" className="hover:text-white transition-colors"><span className="sr-only">Twitter</span><i className="fa-brands fa-twitter text-xl"></i></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

window.components.Layout = ({ children }) => {
    return (
        <React.Fragment>
            <window.components.Navbar />
            <main className="flex-grow w-full flex flex-col selection:bg-accent selection:text-white">
                {children}
            </main>
            <window.components.Footer />
        </React.Fragment>
    );
};

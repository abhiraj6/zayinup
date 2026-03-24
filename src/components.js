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
        <nav className="fixed w-full top-0 z-[100] bg-slate-900/70 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center z-50">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
                            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-shadow">
                                <img
                                    src="https://raw.githubusercontent.com/abhiraj6/icon/refs/heads/main/Copy%20of%201771699124529.png"
                                    alt="ZayinUp Logo"
                                    className="h-8 w-auto object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold text-3xl tracking-tight text-white group-hover:text-accent transition-colors">ZayinUp <span className="text-accent-glow text-sm font-sans uppercase tracking-widest ml-1 font-semibold">LLP</span></span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:ml-6 md:flex md:items-center space-x-8 z-50">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={`#${link.path}`}
                                className={`text-sm font-medium px-1 py-1.5 transition-all duration-300 border-b-2 cursor-pointer ${isActive(link.path)
                                    ? 'border-accent text-white drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]'
                                    : 'border-transparent text-slate-300 hover:text-white hover:border-white/30 hover:-translate-y-0.5'
                                    }`}
                            >
                                {link.name}
                            </a>
                        ))}
                        <a
                            href="#/admin"
                            className="ml-4 text-sm font-semibold text-white bg-gradient-to-r from-accent to-accent-glow hover:from-blue-400 hover:to-purple-500 px-5 py-2.5 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(139,92,246,0.6)] transition-all duration-300 hover:-translate-y-1 transform cursor-pointer border border-white/10"
                        >
                            <i className="fa-solid fa-lock mr-2 text-xs opacity-80"></i> Admin
                        </a>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden z-50">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
                        >
                            <i className={`fa-solid ${isOpen ? 'fa-xmark' : 'fa-bars'} text-xl drop-shadow-md`}></i>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={`md:hidden absolute w-full bg-slate-900/95 backdrop-blur-xl border-b border-white/10 transition-all duration-300 origin-top ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'} overflow-hidden`}>
                <div className="pt-2 pb-6 space-y-1 sm:px-3">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={`#${link.path}`}
                            onClick={() => setIsOpen(false)}
                            className={`block px-6 py-4 text-base font-medium border-l-4 transition-all duration-200 ${isActive(link.path)
                                ? 'bg-accent/10 border-accent text-white'
                                : 'border-transparent text-slate-300 hover:bg-white/5 hover:border-white/30 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="px-6 pt-4 pb-2">
                        <a
                            href="#/admin"
                            onClick={() => setIsOpen(false)}
                            className="flex justify-center items-center w-full px-4 py-3 text-base font-bold text-white bg-gradient-to-r from-accent to-accent-glow rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        >
                            <i className="fa-solid fa-lock mr-2 text-xs"></i> Admin Access
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
};

window.components.Footer = () => {
    return (
        <footer className="bg-slate-900 border-t border-white/10 text-slate-300 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">

                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/10 p-1.5 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                <img
                                    src="https://raw.githubusercontent.com/abhiraj6/icon/refs/heads/main/Copy%20of%201771699124529.png"
                                    alt="ZayinUp Logo"
                                    className="h-8 w-auto object-contain"
                                />
                            </div>
                            <span className="font-serif font-bold text-3xl tracking-tight text-white">ZayinUp</span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-xs leading-relaxed font-medium">
                            Your premier partner for strategic recruitment, resume building, and extensive manpower solutions tailored to your future.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-white uppercase tracking-widest text-sm border-b border-white/10 pb-2 inline-block">Quick Links</h3>
                        <ul className="space-y-4">
                            <li><Link to="/services" className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group"><i className="fa-solid fa-chevron-right text-[10px] mr-3 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-accent"></i> Our Services</Link></li>
                            <li><Link to="/admission" className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group"><i className="fa-solid fa-chevron-right text-[10px] mr-3 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-accent"></i> Admissions</Link></li>
                            <li><Link to="/openings" className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group"><i className="fa-solid fa-chevron-right text-[10px] mr-3 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-accent"></i> View Openings</Link></li>
                            <li><Link to="/contact" className="text-sm text-slate-400 hover:text-accent transition-colors flex items-center group"><i className="fa-solid fa-chevron-right text-[10px] mr-3 opacity-50 group-hover:translate-x-1 group-hover:opacity-100 transition-all text-accent"></i> Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-serif font-semibold mb-6 text-white uppercase tracking-widest text-sm border-b border-white/10 pb-2 inline-block">Connect With Us</h3>
                        <ul className="space-y-5">
                            <li className="flex items-start group hover:-translate-y-1 transition-transform">
                                <div className="bg-white/5 p-2 rounded-lg mr-4 border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors">
                                    <i className="fa-solid fa-envelope text-accent group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"></i>
                                </div>
                                <div className="mt-1">
                                    <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Email</p>
                                    <a href="mailto:Recruitment@zayinup.com" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Recruitment@zayinup.com</a>
                                </div>
                            </li>
                            <li className="flex items-start group hover:-translate-y-1 transition-transform">
                                <div className="bg-white/5 p-2 rounded-lg mr-4 border border-white/10 group-hover:bg-accent/20 group-hover:border-accent/50 transition-colors">
                                    <i className="fa-solid fa-phone text-accent group-hover:drop-shadow-[0_0_5px_rgba(59,130,246,0.8)]"></i>
                                </div>
                                <div className="mt-1">
                                    <p className="text-[10px] text-slate-500 mb-1 uppercase tracking-widest font-bold">Contact</p>
                                    <a href="tel:7306257637" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">7306257637</a>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-sm text-slate-500 font-medium text-center md:text-left">
                        &copy; {new Date().getFullYear()} ZayinUp LLP. All rights reserved.
                    </p>
                    <div className="flex space-x-5">
                        <a href="https://www.instagram.com/zayinupllp?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-gradient-to-tr hover:from-purple-600 hover:to-orange-500 p-2.5 rounded-full border border-white/10 hover:border-transparent transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)] hover:-translate-y-1">
                            <span className="sr-only">Instagram</span>
                            <i className="fa-brands fa-instagram text-lg w-5 text-center text-slate-400 hover:text-white transition-colors"></i>
                        </a>
                        <a href="https://chat.whatsapp.com/LDxWXNJHzVe3fBJ1adBsZO" target="_blank" rel="noopener noreferrer" className="bg-white/5 hover:bg-gradient-to-tr hover:from-green-400 hover:to-emerald-600 p-2.5 rounded-full border border-white/10 hover:border-transparent transition-all duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] hover:-translate-y-1">
                            <span className="sr-only">WhatsApp</span>
                            <i className="fa-brands fa-whatsapp text-lg w-5 text-center text-slate-400 hover:text-white transition-colors"></i>
                        </a>
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
            {/* Added pt-20 to account for fixed navbar */}
            <main className="flex-grow w-full flex flex-col z-10 pt-20 relative">
                {children}
            </main>
            <window.components.Footer />
        </React.Fragment>
    );
};

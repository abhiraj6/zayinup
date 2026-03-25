const { Link } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Home = () => {
    return (
        <div className="flex flex-col flex-grow">
            {/* Hero Section */}
            <section className="relative bg-primary text-white overflow-hidden py-32 lg:py-48 flex-grow flex items-center">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-10"></div>
                    <img
                        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
                        alt="Office workers collaborating"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div className="max-w-3xl">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6">
                                Redefining <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-blue-300">Talent Strategy.</span>
                            </h1>
                            <p className="text-xl md:text-2xl font-light mb-10 text-blue-50 leading-relaxed max-w-2xl">
                                ZayinUp connects elite professionals with world-class opportunities. Build your team, or start your next big career chapter today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/openings" className="inline-flex justify-center items-center px-8 py-4 bg-accent hover:bg-blue-600 text-white font-medium rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1 text-lg">
                                    Explore Openings <i className="fa-solid fa-arrow-right ml-2 text-sm"></i>
                                </Link>
                                <Link to="/services" className="inline-flex justify-center items-center px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-medium rounded-md shadow-lg transition-all duration-300 backdrop-blur-sm text-lg">
                                    Our Services
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-accent/30 to-blue-400/30 blur-2xl rounded-full opacity-60"></div>
                            <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
                                <div className="space-y-6">
                                    {/* Stat Card */}
                                    <div className="bg-white/5 rounded-xl p-4 flex items-center border border-white/10">
                                        <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center text-accent mr-4">
                                            <i className="fa-solid fa-briefcase text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold font-serif text-white">500+</p>
                                            <p className="text-sm text-blue-200">Placements This Year</p>
                                        </div>
                                    </div>
                                    {/* Stat Card */}
                                    <div className="bg-white/5 rounded-xl p-4 flex items-center border border-white/10">
                                        <div className="h-12 w-12 rounded-full bg-blue-400/20 flex items-center justify-center text-blue-300 mr-4">
                                            <i className="fa-solid fa-building text-xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-3xl font-bold font-serif text-white">120+</p>
                                            <p className="text-sm text-blue-200">Partner Companies</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Feature Highlight Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block px-3 py-1 bg-blue-50 text-accent font-medium text-sm rounded-full mb-4 border border-blue-100">Why choose us</div>
                    <h2 className="text-4xl font-serif font-bold text-gray-900 mb-16">The ZayinUp Advantage</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="flex flex-col items-center group cursor-default">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-2">
                                <i className="fa-solid fa-rocket"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Fast Placements</h3>
                            <p className="text-gray-500 max-w-xs leading-relaxed">We accelerate your hiring timeline without compromising on the quality of candidates.</p>
                        </div>

                        <div className="flex flex-col items-center group cursor-default">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-2">
                                <i className="fa-solid fa-magnifying-glass-chart"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Strategic Matching</h3>
                            <p className="text-gray-500 max-w-xs leading-relaxed">Our advanced screening ensures the perfect culture and skill fit for every role.</p>
                        </div>

                        <div className="flex flex-col items-center group cursor-default">
                            <div className="w-20 h-20 rounded-2xl bg-gray-50 flex items-center justify-center text-3xl text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:shadow-xl group-hover:-translate-y-2">
                                <i className="fa-regular fa-handshake"></i>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Holistic Support</h3>
                            <p className="text-gray-500 max-w-xs leading-relaxed">From resume building to interview prep, we support candidates all the way.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

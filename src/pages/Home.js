const { Link } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Home = () => {
    return (
        <div className="flex flex-col flex-grow relative overflow-hidden">
            {/* Hero Section */}
            <section className="relative text-white overflow-hidden py-32 lg:py-48 flex-grow flex items-center min-h-[90vh]">
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-accent/20 rounded-full blur-[100px] animate-blob"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] bg-accent-glow/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        <div className="max-w-3xl animate-float" style={{ animationDuration: '8s' }}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                                <span className="text-sm font-medium text-slate-300">Welcome to the future of recruitment</span>
                            </div>
                            
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight mb-6 leading-tight">
                                Redefining <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-blue-400 to-accent-glow animate-gradient-x">
                                    Talent Strategy.
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl font-medium mb-10 text-slate-400 leading-relaxed max-w-2xl">
                                ZayinUp connects elite professionals with world-class opportunities. Build your team, or start your next big career chapter today.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-5">
                                <Link to="/openings" className="group relative inline-flex justify-center items-center px-8 py-4 bg-transparent font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1 text-lg overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-glow opacity-90 group-hover:opacity-100 transition-opacity z-0"></div>
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] z-0 transition-opacity"></div>
                                    <span className="relative z-10 text-white flex items-center shadow-lg">
                                        Explore Openings <i className="fa-solid fa-arrow-right ml-3 text-sm group-hover:translate-x-1 transition-transform"></i>
                                    </span>
                                </Link>
                                <Link to="/services" className="inline-flex justify-center items-center px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white font-medium rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-all duration-300 backdrop-blur-md text-lg hover:-translate-y-1">
                                    Our Services
                                </Link>
                            </div>
                        </div>

                        <div className="hidden lg:block relative perspective-1000">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-accent/20 to-accent-glow/20 blur-3xl rounded-full opacity-60"></div>
                            
                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] transform transition-transform duration-500 hover:rotate-y-12 hover:scale-[1.02]">
                                <div className="space-y-6 relative z-10">
                                    {/* Glass Stat Card */}
                                    <div className="bg-white/5 rounded-2xl p-5 flex items-center border border-white/10 hover:bg-white/10 transition-colors group cursor-default shadow-lg">
                                        <div className="h-14 w-14 rounded-xl bg-accent/20 flex items-center justify-center text-accent mr-5 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                            <i className="fa-solid fa-briefcase text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-4xl font-bold font-serif text-white tracking-tight drop-shadow-md">500+</p>
                                            <p className="text-sm font-medium text-accent mt-1 uppercase tracking-wider">Placements This Year</p>
                                        </div>
                                    </div>
                                    
                                    {/* Glass Stat Card */}
                                    <div className="bg-white/5 rounded-2xl p-5 flex items-center border border-white/10 hover:bg-white/10 transition-colors group cursor-default shadow-lg">
                                        <div className="h-14 w-14 rounded-xl bg-accent-glow/20 flex items-center justify-center text-accent-glow mr-5 group-hover:scale-110 group-hover:bg-accent-glow group-hover:text-white transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                                            <i className="fa-solid fa-building text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-4xl font-bold font-serif text-white tracking-tight drop-shadow-md">120+</p>
                                            <p className="text-sm font-medium text-accent-glow mt-1 uppercase tracking-wider">Partner Companies</p>
                                        </div>
                                    </div>

                                    {/* Glass Stat Card */}
                                    <div className="bg-white/5 rounded-2xl p-5 flex items-center border border-white/10 hover:bg-white/10 transition-colors group cursor-default shadow-lg">
                                        <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-5 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                            <i className="fa-solid fa-users text-2xl"></i>
                                        </div>
                                        <div>
                                            <p className="text-4xl font-bold font-serif text-white tracking-tight drop-shadow-md">10k+</p>
                                            <p className="text-sm font-medium text-emerald-400 mt-1 uppercase tracking-wider">Active Candidates</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Decorative geometric elements */}
                                <div className="absolute top-0 right-0 -mt-6 -mr-6 w-24 h-24 bg-gradient-to-br from-accent to-transparent opacity-20 blur-xl rounded-full"></div>
                                <div className="absolute bottom-0 left-0 -mb-6 -ml-6 w-32 h-32 bg-gradient-to-tr from-accent-glow to-transparent opacity-20 blur-xl rounded-full"></div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Feature Highlight Section */}
            <section className="py-32 relative z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                        <i className="fa-solid fa-bolt text-accent text-sm"></i>
                        <span className="text-accent font-bold text-sm tracking-widest uppercase">Why choose us</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-20 drop-shadow-lg">The ZayinUp Advantage</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Glass Feature Card */}
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-blue-500/20 border border-accent/30 flex items-center justify-center text-3xl text-accent mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                <i className="fa-solid fa-rocket"></i>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-4">Fast Placements</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">We accelerate your hiring timeline without compromising on the quality of candidates, leveraging our massive talent pool.</p>
                            
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 blur-3xl rounded-full group-hover:bg-accent/20 transition-colors"></div>
                        </div>

                        {/* Glass Feature Card */}
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.2)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent-glow to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-glow/20 to-purple-500/20 border border-accent-glow/30 flex items-center justify-center text-3xl text-accent-glow mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all duration-300">
                                <i className="fa-solid fa-magnifying-glass-chart"></i>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-4">Strategic Matching</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">Our advanced screening algorithm ensures the perfect culture, skill, and behavioral fit for every critical role.</p>
                            
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent-glow/10 blur-3xl rounded-full group-hover:bg-accent-glow/20 transition-colors"></div>
                        </div>

                        {/* Glass Feature Card */}
                        <div className="relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.2)]">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 flex items-center justify-center text-3xl text-emerald-400 mb-6 mx-auto group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300">
                                <i className="fa-regular fa-handshake"></i>
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-white mb-4">Holistic Support</h3>
                            <p className="text-slate-400 leading-relaxed font-medium">From impactful resume building to intensive interview prep, we support candidates all the way to their dream offer.</p>
                            
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

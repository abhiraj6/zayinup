window.pages = window.pages || {};

window.pages.Admission = () => {
    const [colleges, setColleges] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Simulate network delay
        setTimeout(() => {
            setColleges(window.collegeService.getColleges());
            setLoading(false);
        }, 600);
    }, []);

    return (
        <div className="relative py-20 flex-grow">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[10%] left-[20%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[150px]"></div>
                <div className="absolute bottom-[20%] right-[10%] w-[30rem] h-[30rem] bg-indigo-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-20">
                    <div className="inline-block px-4 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.15)]">
                        <span className="text-purple-400 font-bold uppercase tracking-widest text-sm">Partner Institutions</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-lg">Our Affiliated Colleges</h1>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                        We have partnered with some of the finest educational establishments across the globe to help fast-track your admission process and set you up for success.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-purple-900 border-t-purple-400 animate-spin"></div>
                            <div className="w-16 h-16 rounded-full border-4 border-transparent border-b-indigo-400 animate-spin absolute inset-0 style={{ animationDirection: 'reverse' }}"></div>
                        </div>
                    </div>
                ) : colleges.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-purple-400 text-3xl shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">No partner institutions</h3>
                        <p className="text-slate-400 font-medium">Currently updating our exclusive affiliated colleges list. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
                        {colleges.map((college) => (
                            <div key={college.id} className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden flex flex-col group hover:-translate-y-2 transition-all duration-500 hover:border-purple-500/30 hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)]">
                                <div className="relative h-72 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-[#020617]/40 to-transparent z-10"></div>
                                    <img
                                        src={college.image}
                                        alt={college.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                                    />
                                    <div className="absolute bottom-6 left-8 z-20">
                                        <h3 className="text-3xl font-bold font-serif text-white mb-2 drop-shadow-md">{college.name}</h3>
                                        <p className="text-slate-300 text-sm flex items-center font-medium"><i className="fa-solid fa-location-dot mr-2 text-purple-400"></i> {college.location}</p>
                                    </div>
                                    <div className="absolute top-6 right-6 z-20 bg-black/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white border border-white/20 tracking-widest shadow-lg">
                                        {college.accreditation}
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col relative">
                                    <div className="absolute top-0 right-10 -mt-10 w-20 h-20 bg-purple-600/30 blur-2xl rounded-full z-0 pointer-events-none group-hover:bg-purple-500/40 transition-colors"></div>
                                    
                                    <p className="text-slate-400 leading-relaxed mb-8 relative z-10 font-medium">
                                        {college.description}
                                    </p>

                                    <div className="mb-8 grid grid-cols-2 gap-4 relative z-10">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:bg-white/10 transition-colors">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Top Programs</p>
                                            <p className="text-sm font-semibold text-slate-200">{college.programs ? (Array.isArray(college.programs) ? college.programs.join(', ') : college.programs) : 'N/A'}</p>
                                        </div>
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/5 group-hover:bg-white/10 transition-colors">
                                            <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-1 font-bold">Intake</p>
                                            <p className="text-sm font-semibold text-slate-200 flex items-center"><i className="fa-regular fa-calendar text-purple-400 mr-2"></i>{college.intake}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/10 relative z-10">
                                        <a
                                            href="/#/contact"
                                            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 text-white font-bold rounded-xl transition-all duration-300 border border-white/10 hover:border-transparent hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] relative overflow-hidden group/btn"
                                        >
                                            Enquire Now <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                                            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] group-hover/btn:animate-[slide-right_1s_ease-in-out_infinite]"></div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-32 relative rounded-[2.5rem] p-[2px] overflow-hidden group shadow-[0_0_50px_rgba(168,85,247,0.15)]">
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="relative bg-slate-900 rounded-[2.4rem] p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between overflow-hidden">
                        {/* Glows inside the box */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
                        
                        <div className="relative z-10 max-w-2xl mb-10 lg:mb-0 text-center lg:text-left">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-5 drop-shadow-md">Ready to start your journey?</h2>
                            <p className="text-slate-300 text-lg font-medium leading-relaxed">Our elite counselors will assist you in carefully selecting the perfect university, architecting an undeniable application profile, and securing your spot seamlessly.</p>
                        </div>
                        <div className="relative z-10 flex-shrink-0">
                            <a href="/#/contact" className="inline-flex items-center gap-2 px-8 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all transform hover:-translate-y-1 hover:scale-105">
                                Speak to a Counselor <i className="fa-solid fa-headset ml-1"></i>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

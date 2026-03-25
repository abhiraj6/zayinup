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
        <div className="bg-gray-50 min-h-screen py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-purple-600 font-semibold tracking-wide uppercase text-sm bg-purple-100 px-3 py-1 rounded-full">Partner Institutions</span>
                    <h1 className="mt-4 text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Affiliated Colleges</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        We have partnered with some of the finest educational establishments across the globe to help fast-track your admission process and set you up for success.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                    </div>
                ) : colleges.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-300 text-2xl">
                            <i className="fa-solid fa-building-columns"></i>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No partner institutions</h3>
                        <p className="mt-2 text-gray-500">Currently updating our affiliated colleges list. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {colleges.map((college) => (
                            <div key={college.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10"></div>
                                    <img
                                        src={college.image}
                                        alt={college.name}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" }}
                                    />
                                    <div className="absolute bottom-4 left-6 z-20">
                                        <h3 className="text-2xl font-bold font-serif text-white mb-1">{college.name}</h3>
                                        <p className="text-gray-200 text-sm flex items-center"><i className="fa-solid fa-location-dot mr-2 text-purple-400"></i> {college.location}</p>
                                    </div>
                                    <div className="absolute top-4 right-4 z-20 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/30 tracking-wide">
                                        {college.accreditation}
                                    </div>
                                </div>

                                <div className="p-8 flex-grow flex flex-col">
                                    <p className="text-gray-600 leading-relaxed mb-6">
                                        {college.description}
                                    </p>

                                    <div className="mb-6 grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Top Programs</p>
                                            <p className="text-sm font-medium text-gray-800">{college.programs ? (Array.isArray(college.programs) ? college.programs.join(', ') : college.programs) : 'N/A'}</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Intake</p>
                                            <p className="text-sm font-medium text-gray-800"><i className="fa-regular fa-calendar text-purple-600 mr-2"></i>{college.intake}</p>
                                        </div>
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-gray-100 flex justify-between items-center sm:flex-row flex-col gap-4">
                                        <a
                                            href="/#/contact"
                                            className="w-full sm:w-auto px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md shadow-purple-200"
                                        >
                                            Enquire Now <i className="fa-solid fa-arrow-right"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-20 bg-primary rounded-3xl p-10 md:p-14 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between border border-primary/20 shadow-2xl overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10 max-w-2xl mb-8 sm:mb-0">
                        <h2 className="text-3xl font-serif font-bold text-white mb-4">Ready to start your journey?</h2>
                        <p className="text-blue-100 text-lg">Our expert counselors will assist you in selecting the perfect university, building your application profile, and securing your spot.</p>
                    </div>
                    <div className="relative z-10 flex-shrink-0">
                        <a href="/#/contact" className="px-8 py-4 bg-white text-primary hover:bg-gray-50 font-bold rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 inline-block">
                            Speak to a Counselor
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

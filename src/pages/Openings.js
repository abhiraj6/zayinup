const { Link, useNavigate } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Openings = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [searchTerm, setSearchTerm] = React.useState("");

    React.useEffect(() => {
        const fetchJobs = async () => {
            try {
                const fetchedJobs = await window.jobService.getJobs();
                setJobs(fetchedJobs || []);
            } catch (err) {
                console.error("Failed to fetch jobs in Openings component:", err);
                setJobs([]);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);

    const handleApply = (jobId) => {
        navigate(`/register?jobId=${jobId}`);
    };

    const filteredJobs = (jobs || []).filter(job =>
        (job?.title || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
        (job?.location || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-24 relative overflow-hidden flex-grow">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-[20%] w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-16 md:flex md:items-end md:justify-between border-b border-white/10 pb-10">
                    <div className="max-w-2xl animate-float" style={{ animationDuration: '7s' }}>
                        <div className="inline-block px-4 py-1.5 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.15)]">
                            <span className="text-blue-400 font-bold uppercase tracking-widest text-sm">Careers</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-md">Current Openings</h1>
                        <p className="text-lg text-slate-400 font-medium leading-relaxed">Discover your next monumental career move. Browse our latest prime opportunities carefully curated from top-tier employers.</p>
                    </div>
                    <div className="mt-8 md:mt-0 md:w-96 flex-shrink-0 relative group z-20">
                        {/* Glow behind input on focus */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-30 transition duration-500"></div>
                        <div className="relative rounded-xl shadow-lg bg-[#0f172a]">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 sm:text-sm bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-md"
                                placeholder="Search by title or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-32">
                        <div className="relative">
                            <div className="w-16 h-16 rounded-full border-4 border-blue-900 border-t-accent animate-spin"></div>
                            <div className="w-16 h-16 rounded-full border-4 border-transparent border-b-purple-500 animate-spin absolute inset-0 style={{ animationDirection: 'reverse' }}"></div>
                        </div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-24 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl max-w-2xl mx-auto">
                        <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-400 text-3xl shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                            <i className="fa-regular fa-folder-open"></i>
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-white mb-2">No openings found</h3>
                        <p className="text-slate-400 font-medium">We couldn't find any elite jobs matching your search.</p>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="mt-6 px-6 py-2 border border-white/20 rounded-lg text-accent hover:text-white hover:bg-white/10 font-medium transition-all">Clear Search</button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 relative z-10">
                        {filteredJobs.map((job, idx) => (
                            <div key={job.id} 
                                className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-accent/30 hover:shadow-[0_10px_40px_rgba(59,130,246,0.15)] transition-all duration-500 flex flex-col group h-full transform hover:-translate-y-2 overflow-hidden"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                {/* Animated Top Gradient Bar */}
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-purple-500 opacity-50 group-hover:opacity-100 transition-opacity"></div>
                                
                                <div className="p-8 flex-grow relative">
                                    {/* Ambient glow inside card */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-colors pointer-events-none"></div>

                                    <div className="flex justify-between items-start mb-6 relative z-10">
                                        <div className="inline-flex px-3 py-1 rounded-lg bg-accent/10 text-accent border border-accent/20 text-xs font-bold uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                                            {job.jobType || 'Full-Time'}
                                        </div>
                                        <span className="text-sm font-semibold text-slate-400 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"><i className="fa-solid fa-clock-rotate-left mr-1.5 text-accent"></i>{job.experience || 'Entry'}</span>
                                    </div>

                                    <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all relative z-10">{job.title}</h3>
                                    
                                    <div className="flex flex-col gap-3 mt-6 mb-8 relative z-10">
                                        <div className="flex items-center text-sm font-medium text-slate-300">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center mr-3 text-accent"><i className="fa-solid fa-location-dot"></i></div>
                                            {job.location}
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-slate-300">
                                            <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center mr-3 text-green-400"><i className="fa-solid fa-money-bill-wave"></i></div>
                                            {job.salary}
                                        </div>
                                        {job.qualification && (
                                            <div className="flex items-center text-sm font-medium text-slate-300">
                                                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex flex-shrink-0 items-center justify-center mr-3 text-purple-400"><i className="fa-solid fa-graduation-cap"></i></div>
                                                {job.qualification}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 relative z-10">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="px-8 py-6 bg-slate-900/50 border-t border-white/5 flex justify-between items-center relative z-10">
                                    <button
                                        onClick={() => handleApply(job.id)}
                                        className="w-full bg-white/5 hover:bg-gradient-to-r hover:from-accent hover:to-purple-600 border border-white/10 hover:border-transparent text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                                    >
                                        Apply Now <i className="fa-solid fa-arrow-right group-hover/btn:translate-x-1 transition-transform"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};

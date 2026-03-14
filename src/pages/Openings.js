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
        <div className="py-12 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-12 md:flex md:items-end md:justify-between border-b border-gray-200 pb-8">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 tracking-tight">Current Openings</h1>
                        <p className="text-lg text-gray-600">Discover your next career move. Browse our latest opportunities carefully curated from top employers.</p>
                    </div>
                    <div className="mt-6 md:mt-0 md:w-80 flex-shrink-0">
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <i className="fa-solid fa-magnifying-glass text-gray-400"></i>
                            </div>
                            <input
                                type="text"
                                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3 border outline-none transition-shadow"
                                placeholder="Search by title or location..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredJobs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400 text-2xl">
                            <i className="fa-regular fa-folder-open"></i>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">No openings found</h3>
                        <p className="mt-2 text-gray-500">We couldn't find any jobs matching your search.</p>
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')} className="mt-4 text-primary hover:text-accent font-medium">Clear Search</button>
                        )}
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col group h-full">
                                <div className="p-6 flex-grow">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="inline-flex px-2.5 py-1 rounded-md bg-blue-50 text-accent text-xs font-semibold uppercase tracking-wide border border-blue-100">
                                            {job.jobType || 'Full-Time'}
                                        </div>
                                        <span className="text-sm font-medium text-gray-500"><i className="fa-solid fa-clock-rotate-left mr-1"></i> {job.experience || 'Entry'}</span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">{job.title}</h3>
                                    <div className="flex flex-col gap-2 mt-4 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <i className="fa-solid fa-location-dot w-5 text-gray-400"></i> {job.location}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <i className="fa-solid fa-money-bill-wave w-5 text-gray-400"></i> {job.salary}
                                        </div>
                                        {job.qualification && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <i className="fa-solid fa-graduation-cap w-5 text-gray-400"></i> {job.qualification}
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                                        {job.description}
                                    </p>
                                </div>

                                <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center rounded-b-xl mt-auto">
                                    <button
                                        onClick={() => handleApply(job.id)}
                                        className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-2.5 px-4 rounded-md shadow-sm transition-all duration-200"
                                    >
                                        Apply Now
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

const { useLocation, useNavigate } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const jobId = searchParams.get('jobId');

    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        resumeLink: '',
        message: ''
    });

    const [jobDetails, setJobDetails] = React.useState(null);
    const [submitting, setSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    React.useEffect(() => {
        if (jobId) {
            const jobs = window.jobService.getJobs();
            const job = jobs.find(j => j.id.toString() === jobId);
            if (job) setJobDetails(job);
        }
    }, [jobId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Save application locally and to Google Form
        await window.applicationService.addApplication({
            ...formData,
            jobId: jobId || 'General',
            jobTitle: jobDetails ? jobDetails.title : 'General Application'
        });

        setSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
            navigate('/openings');
        }, 3000);
    };

    if (submitted) {
        return (
            <div className="min-h-screen relative flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0f172a] to-black z-0"></div>
                <div className="max-w-md w-full bg-[#0f172a]/80 backdrop-blur-xl shadow-[0_0_50px_rgba(16,185,129,0.15)] rounded-3xl p-10 text-center border border-green-500/20 relative z-10 animate-in fade-in zoom-in duration-500">
                    <div className="absolute inset-0 bg-green-500/5 rounded-3xl z-0"></div>
                    <div className="relative z-10">
                        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-green-600 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
                            <i className="fa-solid fa-check text-4xl text-white"></i>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-white mb-4 drop-shadow-md">Application Sent</h2>
                        <p className="text-slate-400 mb-8 text-lg leading-relaxed">
                            Thank you for applying{jobDetails ? ` for the ${jobDetails.title} position` : ''}. Our elite acquisition team will review your profile.
                        </p>
                        <div className="flex space-x-3 items-center justify-center text-sm font-medium text-green-400 bg-green-500/10 py-3 px-6 rounded-full border border-green-500/20 inline-flex">
                            <i className="fa-solid fa-circle-notch fa-spin"></i> <span>Redirecting to openings...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-24 relative flex-grow flex items-center justify-center overflow-hidden">
            {/* Ambient Animated Background */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[10%] left-[20%] w-[30rem] h-[30rem] bg-accent/15 rounded-full blur-[120px] animate-blob"></div>
                <div className="absolute bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-purple-600/15 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-3xl w-full mx-auto px-4 sm:px-6 relative z-10">
                <div className="relative rounded-3xl p-[1px] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-purple-500/50 to-transparent"></div>
                    
                    <div className="bg-[#0f172a] rounded-[23px] overflow-hidden relative z-10 h-full">

                        {/* Header Section */}
                        <div className="bg-gradient-to-br from-slate-900 to-black px-8 py-12 text-white relative overflow-hidden border-b border-white/10">
                            {/* Inner glow */}
                            <div className="absolute -right-10 -top-10 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <div className="relative z-10 text-center md:text-left">
                                <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400 font-bold uppercase tracking-widest text-sm">
                                        {jobDetails ? 'Targeted Application' : 'General Submission'}
                                    </span>
                                </div>
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-4 drop-shadow-md">
                                    {jobDetails ? 'Apply for Position' : 'General Registration'}
                                </h1>
                                <p className="text-slate-400 text-lg max-w-xl">
                                    {jobDetails ? jobDetails.title : 'Take the definitive next step in your monumental career journey with ZayinUp.'}
                                </p>
                                
                                {jobDetails && (
                                    <div className="mt-8 flex flex-wrap gap-4 text-sm font-medium">
                                        <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 backdrop-blur-sm">
                                            <i className="fa-solid fa-location-dot text-accent mr-3 text-lg"></i> {jobDetails.location}
                                        </div>
                                        <div className="flex items-center px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-300 backdrop-blur-sm">
                                            <i className="fa-solid fa-money-bill-wave text-green-400 mr-3 text-lg"></i> {jobDetails.salary}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Form Section */}
                        <div className="p-8 sm:p-12 bg-[#020617]/50 backdrop-blur-xl">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                    
                                    {/* Full Name */}
                                    <div className="col-span-1 sm:col-span-2 relative group">
                                        <label htmlFor="name" className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Full Name <span className="text-red-500">*</span></label>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                        <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="e.g. John Doe" />
                                    </div>

                                    {/* Email */}
                                    <div className="relative group">
                                        <label htmlFor="email" className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Email Address <span className="text-red-500">*</span></label>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                        <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="john@example.com" />
                                    </div>

                                    {/* Phone */}
                                    <div className="relative group">
                                        <label htmlFor="phone" className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                        <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="+1 (555) 000-0000" />
                                    </div>

                                    {/* Resume Link */}
                                    <div className="col-span-1 sm:col-span-2 relative group">
                                        <label htmlFor="resumeLink" className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Resume Link (Google Drive, Dropbox, etc.) <span className="text-red-500">*</span></label>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                        <div className="relative flex items-center">
                                            <div className="absolute left-4 text-slate-500 pointer-events-none">
                                                <i className="fa-solid fa-link"></i>
                                            </div>
                                            <input required type="url" id="resumeLink" name="resumeLink" value={formData.resumeLink} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl pl-12 pr-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="https://" />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-500"><i className="fa-solid fa-circle-info mr-1"></i> Ensure the link visibility is set to "Anyone with the link".</p>
                                    </div>

                                    {/* Cover Letter */}
                                    <div className="col-span-1 sm:col-span-2 relative group">
                                        <label htmlFor="message" className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Cover Letter / Message</label>
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                        <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm resize-y" placeholder="Optional details about why you're the perfect fit..."></textarea>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/10 flex items-center justify-end">
                                    <button disabled={submitting} type="submit" className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-accent to-accent-glow hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all transform hover:-translate-y-1 inline-flex justify-center items-center relative overflow-hidden group/btn">
                                        <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] group-hover/btn:animate-[slide-right_1s_ease-in-out_infinite]"></div>
                                        {submitting ? (
                                            <><i className="fa-solid fa-spinner fa-spin mr-3"></i> Submitting...</>
                                        ) : (
                                            <>Submit Application <i className="fa-solid fa-paper-plane ml-3 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform"></i></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

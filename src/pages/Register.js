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
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
                <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-10 text-center border border-gray-100">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                        <i className="fa-solid fa-check text-2xl text-green-600"></i>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Application Sent!</h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                        Thank you for applying{jobDetails ? ` for the ${jobDetails.title} position` : ''}. Our team will review your profile and contact you shortly.
                    </p>
                    <div className="animate-pulse flex space-x-2 items-center justify-center text-sm text-gray-500">
                        <i className="fa-solid fa-spinner fa-spin-pulse"></i> Redirecting to openings...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-16 bg-gray-50 flex-grow flex items-center justify-center">
            <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">

                    <div className="bg-primary px-8 py-10 text-white relative overflow-hidden">
                        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                        <h1 className="text-3xl font-serif font-bold relative z-10">
                            {jobDetails ? 'Apply for Position' : 'General Registration'}
                        </h1>
                        <p className="mt-2 text-blue-100 text-lg relative z-10">
                            {jobDetails ? jobDetails.title : 'Take the next step in your career with ZayinUp.'}
                        </p>
                        {jobDetails && (
                            <div className="mt-4 flex gap-4 text-sm font-medium text-blue-200 relative z-10">
                                <span><i className="fa-solid fa-location-dot mr-1"></i> {jobDetails.location}</span>
                                <span><i className="fa-solid fa-money-bill-wave mr-1"></i> {jobDetails.salary}</span>
                            </div>
                        )}
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name <span className="text-red-500">*</span></label>
                                <input required type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full rounded-md border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-gray-50 focus:bg-white" placeholder="John Doe" />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address <span className="text-red-500">*</span></label>
                                <input required type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full rounded-md border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-gray-50 focus:bg-white" placeholder="john@example.com" />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                                <input required type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full rounded-md border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-gray-50 focus:bg-white" placeholder="+1 (555) 000-0000" />
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700 mb-2">Resume Link (Google Drive, Dropbox, etc.) <span className="text-red-500">*</span></label>
                                <input required type="url" id="resumeLink" name="resumeLink" value={formData.resumeLink} onChange={handleChange} className="w-full rounded-md border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-gray-50 focus:bg-white" placeholder="https://" />
                            </div>

                            <div className="col-span-1 sm:col-span-2">
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Cover Letter / Message</label>
                                <textarea id="message" name="message" rows="4" value={formData.message} onChange={handleChange} className="w-full rounded-md border-gray-300 border px-4 py-3 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow bg-gray-50 focus:bg-white resize-y" placeholder="Optional details about why you're a good fit..."></textarea>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex items-center justify-end">
                            <button disabled={submitting} type="submit" className="w-full sm:w-auto px-8 py-3.5 bg-accent hover:bg-blue-600 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 inline-flex justify-center items-center disabled:opacity-75 disabled:cursor-not-allowed">
                                {submitting ? (
                                    <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...</>
                                ) : (
                                    <>Submit Application <i className="fa-solid fa-paper-plane ml-2"></i></>
                                )}
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    );
};

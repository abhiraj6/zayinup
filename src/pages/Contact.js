window.pages = window.pages || {};

window.pages.Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        domain: '',
        purpose: '',
        message: ''
    });

    const [domains, setDomains] = React.useState([]);
    const [purposes, setPurposes] = React.useState([]);

    React.useEffect(() => {
        setDomains(window.optionsService.getDomains());
        setPurposes(window.optionsService.getPurposes());
    }, []);

    const [submitting, setSubmitting] = React.useState(false);
    const [submitted, setSubmitted] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };
            // If domain changes, reset purpose
            if (name === 'domain') {
                newData.purpose = '';
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        // Simulate API request to save to Google Sheets
        await window.contactService.addContact(formData);

        setSubmitting(false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', phone: '', domain: '', purpose: '', message: '' });
        }, 4000);
    };

    const normalizedDomain = formData.domain ? formData.domain.toLowerCase().replace(/\s+/g, '') : '';
    const showPurpose = normalizedDomain.includes('jobseeker');

    return (
        <div className="py-20 bg-gray-50 flex-grow relative overflow-hidden">

            {/* Decorative Blob */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
                <div className="w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4">
                <div className="w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Let's Connect</h1>
                    <p className="text-lg text-gray-600">
                        Whether you're looking for your next career breakthrough or seeking exceptional talent to scale your business, we are here to help.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row">

                    <div className="md:w-2/5 md:flex-shrink-0 bg-primary p-10 text-white flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary to-accent opacity-50"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold font-serif mb-6">Contact Information</h3>
                            <p className="text-blue-100 mb-8 max-w-sm">Reach out directly if you have any questions or require immediate assistance from our team.</p>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <i className="fa-solid fa-envelope mt-1 text-accent shadow-sm"></i>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Email</p>
                                        <p className="text-xl">Recruitment@zayinup.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <i className="fa-solid fa-phone mt-1 text-accent shadow-sm"></i>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-1">Phone</p>
                                        <p className="text-xl">7306257637</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative z-10 mt-12 bg-white/10 p-6 rounded-xl backdrop-blur-sm border border-white/10">
                            <p className="text-sm italic font-light text-blue-50">"ZayinUp provided us with exceptional talent within days. Their process is smooth, fast, and highly reliable."</p>
                        </div>
                    </div>

                    <div className="md:w-3/5 p-10">

                        {submitted ? (
                            <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in duration-500">
                                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-6 shadow-sm">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <h3 className="text-3xl font-bold font-serif text-gray-900 mb-2">Message Received</h3>
                                <p className="text-gray-600 max-w-sm">We've received your information and will be in touch with you shortly. Thank you!</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Send us a message</h3>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                                        <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Jane Doe" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                        <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="jane@example.com" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                                        <input required type="number" name="phone" value={formData.phone} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors" placeholder="Phone Number" />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                                        <select required name="domain" value={formData.domain} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer appearance-none">
                                            <option value="" disabled>Select your domain</option>
                                            {domains.map(d => (
                                                <option key={d} value={d}>{d}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {showPurpose && (
                                        <div className="sm:col-span-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">How can we help you?</label>
                                            <select required name="purpose" value={formData.purpose} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-indigo-50/50 border-indigo-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors cursor-pointer appearance-none">
                                                <option value="" disabled>Select a purpose</option>
                                                {purposes.map(p => (
                                                    <option key={p} value={p}>{p}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                        <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none" placeholder="Your message here..."></textarea>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-end">
                                    <button
                                        disabled={submitting}
                                        type="submit"
                                        className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-opacity-90 disabled:opacity-75 disabled:cursor-not-allowed text-white font-medium rounded-lg shadow-md transition-all flex items-center justify-center transform hover:-translate-y-0.5"
                                    >
                                        {submitting ? (
                                            <><i className="fa-solid fa-spinner fa-spin mr-2"></i> Submitting...</>
                                        ) : (
                                            <>Submit Details <i className="fa-solid fa-arrow-right ml-2"></i></>
                                        )}
                                    </button>
                                </div>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

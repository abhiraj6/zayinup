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
            if (name === 'domain') {
                newData.purpose = '';
            }
            return newData;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await window.contactService.addContact(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setSubmitting(false);
            setSubmitted(true);
            setTimeout(() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', domain: '', purpose: '', message: '' });
            }, 4000);
        }
    };

    const normalizedDomain = formData.domain ? formData.domain.toLowerCase().replace(/\s+/g, '') : '';
    const showPurpose = normalizedDomain.includes('jobseeker');

    return (
        <div className="py-24 relative overflow-hidden flex-grow">
            {/* Ambient Animated Background */}
            <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 z-0 pointer-events-none">
                <div className="w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-[120px] animate-blob"></div>
            </div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 z-0 pointer-events-none">
                <div className="w-[40rem] h-[40rem] bg-accent-glow/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="text-center max-w-3xl mx-auto mb-16 animate-float" style={{ animationDuration: '6s' }}>
                    <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-glow font-bold uppercase tracking-widest text-sm">Get in touch</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-md">Let's Connect</h1>
                    <p className="text-lg text-slate-400 font-medium leading-relaxed">
                        Whether you're looking for your next monumental career breakthrough or seeking exceptional talent to scale your visionary business, we are here.
                    </p>
                </div>

                <div className="max-w-5xl mx-auto relative rounded-3xl p-[1px] overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)]">
                    {/* Glowing border effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/50 via-purple-500/50 to-transparent"></div>
                    
                    <div className="bg-[#0f172a] rounded-[23px] overflow-hidden flex flex-col md:flex-row relative z-10 h-full">
                        
                        {/* Contact Information Panel */}
                        <div className="md:w-2/5 md:flex-shrink-0 bg-gradient-to-br from-slate-900 to-black p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden border-r border-white/5">
                            {/* Inner glows */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-glow/20 rounded-full blur-3xl pointer-events-none"></div>
                            
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold font-serif mb-6 drop-shadow-md">Contact Info</h3>
                                <p className="text-slate-300 font-medium mb-12 leading-relaxed">Reach out directly to architect your future or require immediate strategic assistance from our elite team.</p>

                                <div className="space-y-8">
                                    <div className="flex items-center group">
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                            <i className="fa-solid fa-envelope text-xl"></i>
                                        </div>
                                        <div className="ml-5">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Email</p>
                                            <p className="text-lg font-medium text-white group-hover:text-accent transition-colors">Recruitment@zayinup.com</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center group">
                                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] transition-all duration-300">
                                            <i className="fa-solid fa-phone text-xl"></i>
                                        </div>
                                        <div className="ml-5">
                                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Direct Line</p>
                                            <p className="text-lg font-medium text-white group-hover:text-accent transition-colors">7306257637</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-16 bg-white/5 p-6 rounded-2xl backdrop-blur-md border border-white/10 shadow-lg">
                                <div className="absolute -top-3 -left-3 w-8 h-8 bg-gradient-to-br from-accent to-accent-glow rounded-full flex items-center justify-center shadow-lg">
                                    <i className="fa-solid fa-quote-left text-xs"></i>
                                </div>
                                <p className="text-sm italic font-medium text-slate-300 leading-relaxed mt-2">"ZayinUp architected our hiring strategy and delivered exceptional elite talent within days. Their process is remarkably refined."</p>
                            </div>
                        </div>

                        {/* Form Panel */}
                        <div className="md:w-3/5 p-10 lg:p-12 relative bg-[#020617]/50 backdrop-blur-xl">

                            {submitted ? (
                                <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-in fade-in zoom-in duration-500">
                                    <div className="relative mb-8">
                                        <div className="absolute inset-0 bg-green-500/20 rounded-full blur-2xl"></div>
                                        <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-green-600 rounded-2xl flex items-center justify-center text-4xl text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] relative z-10">
                                            <i className="fa-solid fa-check"></i>
                                        </div>
                                    </div>
                                    <h3 className="text-4xl font-bold font-serif text-white mb-4 drop-shadow-md">Message Secured</h3>
                                    <p className="text-slate-400 font-medium text-lg leading-relaxed max-w-md">Our elite representatives have received your trajectory information and will strategically connect with you momentarily.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-serif">Compose Dispatch</h3>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                        <div className="sm:col-span-2 relative group">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Full Name</label>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                            <input required type="text" name="name" value={formData.name} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="e.g. Jane Doe" />
                                        </div>

                                        <div className="relative group">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Email Address</label>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="jane@example.com" />
                                        </div>

                                        <div className="relative group">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Direct Phone</label>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                            <input required type="number" name="phone" value={formData.phone} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm" placeholder="+1 (555) 000-0000" />
                                        </div>

                                        <div className="sm:col-span-2 relative group">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Designation Domain</label>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                            <select required name="domain" value={formData.domain} onChange={handleChange} className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-slate-300 focus:bg-[#0f172a] focus:text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm appearance-none cursor-pointer">
                                                <option value="" disabled className="bg-slate-900 text-slate-500">Select your operational domain</option>
                                                {domains.map(d => (
                                                    <option key={d} value={d} className="bg-slate-900">{d}</option>
                                                ))}
                                            </select>
                                            <div className="absolute right-4 top-1/2 translate-y-[2px] pointer-events-none text-slate-400">
                                                <i className="fa-solid fa-chevron-down text-xs"></i>
                                            </div>
                                        </div>

                                        {showPurpose && (
                                            <div className="sm:col-span-2 animate-in fade-in slide-in-from-top-4 duration-500 relative group">
                                                <label className="block text-xs uppercase tracking-widest font-bold text-accent mb-2">Strategic Purpose</label>
                                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-20 group-focus-within:opacity-40 transition duration-500"></div>
                                                <select required name="purpose" value={formData.purpose} onChange={handleChange} className="relative w-full border border-accent/30 rounded-xl px-4 py-3.5 bg-accent/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm appearance-none cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                                                    <option value="" disabled className="bg-slate-900 text-slate-500">Select strategic objective</option>
                                                    {purposes.map(p => (
                                                        <option key={p} value={p} className="bg-slate-900">{p}</option>
                                                    ))}
                                                </select>
                                                <div className="absolute right-4 top-1/2 translate-y-[2px] pointer-events-none text-accent">
                                                    <i className="fa-solid fa-chevron-down text-xs"></i>
                                                </div>
                                            </div>
                                        )}

                                        <div className="sm:col-span-2 relative group">
                                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Message Payload</label>
                                            <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                            <textarea required name="message" value={formData.message} onChange={handleChange} rows="4" className="relative w-full border border-white/10 rounded-xl px-4 py-3.5 bg-white/5 text-white focus:bg-[#0f172a] focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all backdrop-blur-sm resize-none" placeholder="Elaborate on your inquiry..."></textarea>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
                                        <button
                                            disabled={submitting}
                                            type="submit"
                                            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-accent to-accent-glow hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center transform hover:-translate-y-1 relative overflow-hidden group/btn"
                                        >
                                            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] group-hover/btn:animate-[slide-right_1s_ease-in-out_infinite]"></div>
                                            {submitting ? (
                                                <><i className="fa-solid fa-spinner fa-spin mr-3"></i> Transmitting...</>
                                            ) : (
                                                <>Initiate Connection <i className="fa-solid fa-paper-plane ml-3 group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1 transition-transform"></i></>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

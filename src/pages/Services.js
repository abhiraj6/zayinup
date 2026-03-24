const { Link } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Services = () => {

    const services = [
        {
            id: "jobs",
            title: "Premium Opportunities",
            description: "Discover top-tier roles across diverse industries. We connect ambitious professionals with companies where they can truly make an impact. Our portal features exclusive listings from verified employers.",
            icon: "fa-solid fa-briefcase",
            color: "from-blue-500/20 to-blue-600/5",
            borderColor: "border-blue-500/30",
            iconColor: "text-blue-400",
            glowColor: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]",
            lineColor: "from-blue-400 to-blue-600",
            btnLink: "/openings",
            btnText: "View Jobs"
        },
        {
            id: "resume",
            title: "Resume Architecture",
            description: "Your resume is your first impression. Let our experts craft a compelling narrative that highlights your strengths, achievements, and potential to stand out to elite recruiters and ATS algorithms.",
            icon: "fa-solid fa-file-signature",
            color: "from-purple-500/20 to-purple-600/5",
            borderColor: "border-purple-500/30",
            iconColor: "text-purple-400",
            glowColor: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]",
            lineColor: "from-purple-400 to-purple-600",
            btnLink: "/contact",
            btnText: "Get Resume Help"
        },
        {
            id: "manpower",
            title: "Strategic Staffing",
            description: "Are you an employer scaling up? We provide end-to-end manpower solutions, sourcing high-quality candidates rapidly to fill your critical staffing needs on a permanent or contractual basis.",
            icon: "fa-solid fa-users-gear",
            color: "from-emerald-500/20 to-emerald-600/5",
            borderColor: "border-emerald-500/30",
            iconColor: "text-emerald-400",
            glowColor: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]",
            lineColor: "from-emerald-400 to-emerald-600",
            btnLink: "/contact",
            btnText: "Hire With Us"
        },
        {
            id: "admission",
            title: "Admissions Guidance",
            description: "Navigate your educational journey with absolute confidence. We offer expert counseling and streamlined admission assistance for top-tier universities globally to secure your radiant future.",
            icon: "fa-solid fa-graduation-cap",
            color: "from-rose-500/20 to-rose-600/5",
            borderColor: "border-rose-500/30",
            iconColor: "text-rose-400",
            glowColor: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.3)]",
            lineColor: "from-rose-400 to-rose-600",
            btnLink: "/admission",
            btnText: "View Colleges"
        }
    ];

    return (
        <div className="py-24 relative overflow-hidden flex-grow">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-[20%] right-[10%] w-[30rem] h-[30rem] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[10%] left-[10%] w-[40rem] h-[40rem] bg-purple-600/10 rounded-full blur-[150px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-20 animate-float" style={{ animationDuration: '6s' }}>
                    <div className="inline-block px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold uppercase tracking-widest text-sm">Our Expertise</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 drop-shadow-md">Core Specialties</h1>
                    <p className="text-lg text-slate-400 leading-relaxed font-medium">
                        Whether you're looking to elevate your career or build an unstoppable team, ZayinUp delivers comprehensive services to fuel your unprecedented success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            className={`bg-white/5 backdrop-blur-md rounded-2xl border ${service.borderColor} overflow-hidden group transition-all duration-500 hover:-translate-y-2 relative flex flex-col h-full ${service.glowColor}`}
                            style={{ animationDelay: `${idx * 150}ms` }}
                        >
                            {/* Animated Top Border Line */}
                            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.lineColor} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>

                            {/* subtle gradient fill on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-b ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                            <div className="p-8 flex-grow relative z-10">
                                <div className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg ${service.iconColor}`}>
                                    <i className={service.icon}></i>
                                </div>

                                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-400 transition-all">{service.title}</h3>
                                <p className="text-slate-400 leading-relaxed text-sm font-medium">
                                    {service.description}
                                </p>
                            </div>

                            <div className="px-8 pb-8 mt-auto relative z-10">
                                <Link
                                    to={service.btnLink}
                                    className={`inline-flex items-center font-bold px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ${service.iconColor}`}
                                >
                                    {service.btnText} <i className="fa-solid fa-arrow-right ml-2 text-sm transform group-hover:translate-x-1 transition-transform"></i>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

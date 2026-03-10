const { Link } = window.ReactRouterDOM;

window.pages = window.pages || {};

window.pages.Services = () => {

    const services = [
        {
            id: "jobs",
            title: "Jobs",
            description: "Discover top-tier opportunities across various industries. We connect ambitious professionals with companies where they can truly make an impact. Our portal features curated listings from verified employers.",
            icon: "fa-solid fa-briefcase",
            color: "bg-blue-50 text-blue-700",
            btnLink: "/openings",
            btnText: "View Jobs"
        },
        {
            id: "resume",
            title: "Resume Build",
            description: "Your resume is your first impression. Let our experts craft a compelling narrative that highlights your strengths, achievements, and potential to stand out to recruiters and ATS systems alike.",
            icon: "fa-solid fa-file-signature",
            color: "bg-indigo-50 text-indigo-700",
            btnLink: "/contact",
            btnText: "Get Resume Help"
        },
        {
            id: "manpower",
            title: "Manpower Provide",
            description: "Are you an employer scaling up? We provide end-to-end manpower solutions, sourcing high-quality candidates rapidly to fill your critical staffing needs on a permanent or contractual basis.",
            icon: "fa-solid fa-users-gear",
            color: "bg-emerald-50 text-emerald-700",
            btnLink: "/contact",
            btnText: "Hire With Us"
        },
        {
            id: "admission",
            title: "Admissions Guidance",
            description: "Navigate your educational journey with confidence. We offer expert counseling and streamlined admission assistance for top-tier universities and institutions to secure your future.",
            icon: "fa-solid fa-graduation-cap",
            color: "bg-purple-50 text-purple-700",
            btnLink: "/admission",
            btnText: "View Colleges"
        }
    ];

    return (
        <div className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">Our Core Specialties</h1>
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Whether you're looking to elevate your career or build an unstoppable team, ZayinUp delivers comprehensive services to fuel your success.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, idx) => (
                        <div
                            key={service.id}
                            className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 relative flex flex-col h-full"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                            <div className="p-8 flex-grow">
                                <div className={`w-16 h-16 rounded-xl ${service.color} flex items-center justify-center text-3xl mb-8 transform group-hover:scale-110 transition-transform duration-300`}>
                                    <i className={service.icon}></i>
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>

                            <div className="px-8 pb-8 mt-auto">
                                <Link
                                    to={service.btnLink}
                                    className="inline-flex items-center font-medium text-primary group-hover:text-accent transition-colors"
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

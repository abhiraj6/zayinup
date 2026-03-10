window.pages = window.pages || {};

window.pages.Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("jobs");

    // Job form state
    const [jobForm, setJobForm] = React.useState({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
    const [jobs, setJobs] = React.useState([]);

    // College form state
    const [collegeForm, setCollegeForm] = React.useState({ name: '', location: '', programs: '', image: '', description: '', accreditation: '', intake: '' });
    const [colleges, setColleges] = React.useState([]);

    const [apps, setApps] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (password === '123admin') {
            setIsAuthenticated(true);
            loadData();
        } else {
            setError("Incorrect password");
        }
    };

    const loadData = () => {
        setJobs(window.jobService.getJobs());
        setColleges(window.collegeService.getColleges());
        setApps(window.applicationService.getApplications());
        setContacts(window.contactService.getContacts());
    };

    const handleJobSubmit = (e) => {
        e.preventDefault();
        const newJob = window.jobService.addJob(jobForm);
        setJobs(prev => [...prev, newJob]);
        setJobForm({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
        alert("Job Added!");
    };

    const deleteJob = (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            window.jobService.deleteJob(id);
            setJobs(prev => prev.filter(j => String(j.id) !== String(id)));
        }
    };

    const handleCollegeSubmit = (e) => {
        e.preventDefault();
        const newCollege = window.collegeService.addCollege(collegeForm);
        setColleges(prev => [...prev, newCollege]);
        setCollegeForm({ name: '', location: '', programs: '', image: '', description: '', accreditation: '', intake: '' });
        alert("College Added!");
    };

    const deleteCollege = (id) => {
        if (window.confirm("Are you sure you want to delete this college?")) {
            window.collegeService.deleteCollege(id);
            setColleges(prev => prev.filter(c => String(c.id) !== String(id)));
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner ring-4 ring-red-50">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
                        <p className="text-gray-500 mt-2">Authentication Required</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-6 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Master Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-key text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                    placeholder="Enter password..."
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2 flex items-center"><i className="fa-solid fa-circle-exclamation mr-1"></i> {error}</p>}
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg shadow-md transition-all flex justify-center items-center group">
                            Access Control Panel <i className="fa-solid fa-arrow-right-to-bracket ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'jobs', label: 'Manage Jobs', icon: 'fa-briefcase' },
        { id: 'colleges', label: 'Manage Colleges', icon: 'fa-building-columns' },
        { id: 'apps', label: 'Applications', icon: 'fa-file-lines' },
        { id: 'contacts', label: 'Contact Requests', icon: 'fa-envelope-open-text' }
    ];

    return (
        <div className="bg-gray-100 min-h-screen py-10 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="bg-white rounded-3xl shadow-lg border border-gray-200 overflow-hidden">

                    <div className="bg-primary px-8 py-8 md:px-10 flex flex-col md:flex-row md:items-center justify-between text-white border-b-4 border-accent">
                        <div>
                            <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
                                <i className="fa-solid fa-gauge-high text-accent"></i> ZayinUp Admin Dashboard
                            </h1>
                            <p className="text-blue-200 mt-2">Manage your portal's content and view inbound requests.</p>
                        </div>

                        <div className="mt-6 md:mt-0">
                            <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-md text-sm font-medium backdrop-blur transition-all flex items-center shadow-sm">
                                <i className="fa-solid fa-right-from-bracket mr-2"></i> Log Out
                            </button>
                        </div>
                    </div>

                    <div className="border-b border-gray-200 bg-gray-50 px-8 flex overflow-x-auto space-x-2 scrollbar-hide">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-6 py-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id ? 'border-primary text-primary bg-white shadow-[0_-2px_0_0_inset_#003366]' : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}
                            >
                                <i className={`fa-solid ${tab.icon} mr-2`}></i> {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-10 bg-white min-h-[500px]">

                        {activeTab === 'jobs' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                {/* Add Job Form */}
                                <div className="bg-blue-50/50 rounded-2xl p-6 md:p-8 border border-blue-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><i className="fa-solid fa-circle-plus text-primary mr-2"></i> Add New Job</h3>
                                    <form onSubmit={handleJobSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none" placeholder="Job Title" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none" placeholder="Location" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none" placeholder="Salary Range" value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none" placeholder="Experience Required" value={jobForm.experience} onChange={e => setJobForm({ ...jobForm, experience: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none md:col-span-2" placeholder="Qualification" value={jobForm.qualification} onChange={e => setJobForm({ ...jobForm, qualification: e.target.value })} />

                                        <select className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none md:col-span-2" value={jobForm.jobType} onChange={e => setJobForm({ ...jobForm, jobType: e.target.value })}>
                                            <option>Full-Time</option>
                                            <option>Part-Time</option>
                                            <option>Contract</option>
                                        </select>

                                        <div className="md:col-span-2">
                                            <textarea required rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-primary focus:border-primary outline-none resize-none" placeholder="Job Description" value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>

                                        <div className="md:col-span-2 flex justify-end">
                                            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-opacity-90 text-white font-medium rounded-lg shadow-sm transition-all flex items-center">
                                                Publish Job <i className="fa-solid fa-paper-plane ml-2"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Job List */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Existing Jobs ({jobs.length})</h3>
                                    {jobs.length === 0 ? (
                                        <p className="text-gray-500 italic">No jobs found.</p>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {jobs.map(job => (
                                                <div key={job.id} className="bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group">
                                                    <div className="pr-10">
                                                        <h4 className="font-bold text-lg mb-1">{job.title}</h4>
                                                        <p className="text-sm text-gray-600 mb-1"><i className="fa-solid fa-location-dot w-4 text-primary"></i> {job.location}</p>
                                                        <p className="text-sm text-gray-600 mb-2"><i className="fa-solid fa-graduation-cap w-4 text-primary"></i> {job.qualification}</p>
                                                        <div className="inline-flex bg-gray-100 text-xs px-2 py-1 rounded font-medium text-gray-700">{job.jobType}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteJob(job.id)}
                                                        className="absolute top-4 right-4 w-8 h-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm bg-white border"
                                                        title="Delete Job"
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'colleges' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                {/* Add College Form */}
                                <div className="bg-purple-50/50 rounded-2xl p-6 md:p-8 border border-purple-100 shadow-sm">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center"><i className="fa-solid fa-building-columns text-purple-600 mr-2"></i> Add Affiliated College</h3>
                                    <form onSubmit={handleCollegeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Institution Name" value={collegeForm.name} onChange={e => setCollegeForm({ ...collegeForm, name: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Location (e.g., Paris, France)" value={collegeForm.location} onChange={e => setCollegeForm({ ...collegeForm, location: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Image URL" value={collegeForm.image} onChange={e => setCollegeForm({ ...collegeForm, image: e.target.value })} />
                                        <input required className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Accreditation (e.g., ABET)" value={collegeForm.accreditation} onChange={e => setCollegeForm({ ...collegeForm, accreditation: e.target.value })} />

                                        <div className="md:col-span-2">
                                            <input required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Top Programs (Comma separated, e.g., MBA, Finance, CS)" value={collegeForm.programs} onChange={e => setCollegeForm({ ...collegeForm, programs: e.target.value })} />
                                        </div>
                                        <div className="md:col-span-2">
                                            <input required className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none" placeholder="Intake (e.g., Fall, Spring)" value={collegeForm.intake} onChange={e => setCollegeForm({ ...collegeForm, intake: e.target.value })} />
                                        </div>

                                        <div className="md:col-span-2">
                                            <textarea required rows="3" className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-purple-600 focus:border-purple-600 outline-none resize-none" placeholder="Institution Description" value={collegeForm.description} onChange={e => setCollegeForm({ ...collegeForm, description: e.target.value })}></textarea>
                                        </div>

                                        <div className="md:col-span-2 flex justify-end">
                                            <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center">
                                                Add College <i className="fa-solid fa-paper-plane ml-2"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* College List */}
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-2">Existing Colleges ({colleges.length})</h3>
                                    {colleges.length === 0 ? (
                                        <p className="text-gray-500 italic">No colleges listed yet.</p>
                                    ) : (
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {colleges.map(college => (
                                                <div key={college.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group flex">
                                                    <div className="w-1/3 min-h-full bg-gray-100 flex-shrink-0">
                                                        <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="p-4 w-2/3 pr-10">
                                                        <h4 className="font-bold text-lg mb-1 leading-tight">{college.name}</h4>
                                                        <p className="text-sm text-gray-600 mb-2"><i className="fa-solid fa-location-dot w-4"></i> {college.location}</p>
                                                        <div className="inline-flex bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded font-medium">{college.accreditation}</div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteCollege(college.id)}
                                                        className="absolute top-4 right-4 w-8 h-8 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors shadow-sm bg-white border"
                                                        title="Remove College"
                                                    >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab === 'apps' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Candidate Applications</h3>
                                {apps.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed text-gray-500">
                                        <i className="fa-regular fa-folder-open text-3xl mb-3"></i>
                                        <p>No applications received yet.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto border rounded-xl rounded-t-lg shadow-sm">
                                        <table className="min-w-full divide-y divide-gray-200">
                                            <thead className="bg-gray-50">
                                                <tr>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position Applied</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {apps.map(app => (
                                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">{app.jobTitle}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div>{app.email}</div>
                                                            <div className="text-xs">{app.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                            <a href={app.resumeLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-3 py-1 bg-blue-50 text-accent rounded-full font-medium hover:bg-blue-100 transition-colors">
                                                                View <i className="fa-solid fa-arrow-up-right-from-square ml-1.5 text-[10px]"></i>
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'contacts' && (
                            <div className="animate-in fade-in duration-300">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Requests (Sheet Synchronized)</h3>
                                {contacts.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed text-gray-500">
                                        <i className="fa-regular fa-envelope-open text-3xl mb-3"></i>
                                        <p>No contact messages yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className="bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow border-l-4 border-l-primary">
                                                <div className="md:w-1/3">
                                                    <h4 className="font-bold text-lg mb-1">{contact.name}</h4>
                                                    <p className="text-gray-500 text-sm mb-4"><i className="fa-regular fa-clock w-4"></i> {contact.date}</p>
                                                    <div className="space-y-2 mt-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 border rounded"><i className="fa-solid fa-envelope w-4 text-gray-400"></i> {contact.email}</div>
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 border rounded"><i className="fa-solid fa-phone w-4 text-gray-400"></i> {contact.phone}</div>
                                                    </div>
                                                </div>

                                                <div className="md:w-2/3 md:pl-6 md:border-l flex flex-col justify-center">
                                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Intent</p>
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-lg font-medium text-gray-900 bg-blue-50 inline-block px-3 py-1 rounded w-max">Domain: {contact.domain}</span>
                                                        {contact.purpose && <span className="text-primary font-medium bg-primary/5 inline-block px-3 py-1 rounded w-max">Purpose: {contact.purpose}</span>}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

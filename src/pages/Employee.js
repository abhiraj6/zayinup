window.pages = window.pages || {};

window.pages.Employee = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [employeeId, setEmployeeId] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("jobs");
    const [loggedInEmployee, setLoggedInEmployee] = React.useState(null);

    // Job form state
    const [jobForm, setJobForm] = React.useState({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
    const [jobs, setJobs] = React.useState([]);
    const [editingJobId, setEditingJobId] = React.useState(null);

    const [apps, setApps] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        const employees = window.employeeService ? window.employeeService.getEmployees() : [];
        const emp = employees.find(e => e.id === employeeId);
        
        if (emp && emp.phone === password) {
            setIsAuthenticated(true);
            setLoggedInEmployee(emp);
            loadData();
        } else {
            setError("Incorrect Employee ID or Phone Number");
        }
    };

    const loadData = () => {
        setJobs(window.jobService.getJobs());
        setApps(window.applicationService.getApplications());
        setContacts(window.contactService.getContacts());
    };

    const handleJobSubmit = (e) => {
        e.preventDefault();
        if (editingJobId) {
            const updated = window.jobService.updateJob({ ...jobForm, id: editingJobId });
            setJobs(prev => prev.map(j => String(j.id) === String(editingJobId) ? updated : j));
            setEditingJobId(null);
            alert("Job Updated!");
        } else {
            const newJob = window.jobService.addJob(jobForm);
            setJobs(prev => [...prev, newJob]);
            alert("Job Added!");
        }
        setJobForm({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
    };

    const startEditJob = (job) => {
        setJobForm({
            title: job.title || '',
            salary: job.salary || '',
            location: job.location || '',
            jobType: job.jobType || 'Full-Time',
            experience: job.experience || '',
            qualification: job.qualification || '',
            description: job.description || ''
        });
        setEditingJobId(job.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditJob = () => {
        setEditingJobId(null);
        setJobForm({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
    };

    const deleteJob = (id) => {
        if (window.confirm("Are you sure you want to delete this job?")) {
            window.jobService.deleteJob(id);
            setJobs(prev => prev.filter(j => String(j.id) !== String(id)));
        }
    };

    const toggleAppStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Noted' : 'Pending';
        const updatedApps = window.applicationService.updateApplicationStatus(id, newStatus);
        setApps([...updatedApps]);
    };

    const toggleContactStatus = (id, currentStatus) => {
        const newStatus = currentStatus === 'Pending' ? 'Noted' : 'Pending';
        const updatedContacts = window.contactService.updateContactStatus(id, newStatus);
        setContacts([...updatedContacts]);
    };

    if (!isAuthenticated) {
        return (
            <div className="flex-grow flex items-center justify-center bg-gray-50 p-4 min-h-screen">
                <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-50 text-primary rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-inner ring-4 ring-blue-50">
                            <i className="fa-solid fa-user-tie"></i>
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900">Employee Portal</h2>
                        <p className="text-gray-500 mt-2">Log in to your workspace</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-id-badge text-gray-400"></i>
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={employeeId}
                                    onChange={(e) => { setEmployeeId(e.target.value); setError(""); }}
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                    placeholder="Enter your Employee ID..."
                                />
                            </div>
                        </div>
                        <div className="mb-6 relative">
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password (Phone Number)</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <i className="fa-solid fa-phone text-gray-400"></i>
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
                                    placeholder="Enter your phone number..."
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mt-2 flex items-center"><i className="fa-solid fa-circle-exclamation mr-1"></i> {error}</p>}
                        </div>
                        <button type="submit" className="w-full bg-primary hover:bg-opacity-90 text-white font-medium py-3 rounded-lg shadow-md transition-all flex justify-center items-center group">
                            Access Dashboard <i className="fa-solid fa-arrow-right-to-bracket ml-2 transform group-hover:translate-x-1 transition-transform"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'jobs', label: 'Manage Jobs', icon: 'fa-briefcase' },
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
                                <i className="fa-solid fa-user-tie text-accent"></i> Employee Dashboard
                            </h1>
                            <p className="text-blue-200 mt-2">Welcome back, {loggedInEmployee.name} ({loggedInEmployee.position})</p>
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
                                <div className={`bg-blue-50/50 rounded-2xl p-6 md:p-8 border border-blue-100 shadow-sm transition-all ${editingJobId ? 'ring-2 ring-primary bg-blue-100/30' : ''}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <i className={`fa-solid ${editingJobId ? 'fa-pen-to-square' : 'fa-circle-plus'} text-primary mr-2`}></i>
                                        {editingJobId ? 'Update Job Posting' : 'Add New Job'}
                                    </h3>
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

                                        <div className="md:col-span-2 flex justify-end gap-3">
                                            {editingJobId && (
                                                <button type="button" onClick={cancelEditJob} className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all">
                                                    Cancel Edit
                                                </button>
                                            )}
                                            <button type="submit" className="px-6 py-2.5 bg-primary hover:bg-opacity-90 text-white font-medium rounded-lg shadow-sm transition-all flex items-center">
                                                {editingJobId ? 'Save Changes' : 'Publish Job'} <i className={`fa-solid ${editingJobId ? 'fa-check' : 'fa-paper-plane'} ml-2`}></i>
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
                                                <div key={job.id} className={`bg-white border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative group ${editingJobId === job.id ? 'border-primary ring-1 ring-primary' : ''}`}>
                                                    <div className="pr-10">
                                                        <h4 className="font-bold text-lg mb-1">{job.title}</h4>
                                                        <p className="text-sm text-gray-600 mb-1"><i className="fa-solid fa-location-dot w-4 text-primary"></i> {job.location}</p>
                                                        <p className="text-sm text-gray-600 mb-2"><i className="fa-solid fa-graduation-cap w-4 text-primary"></i> {job.qualification}</p>
                                                        <div className="flex items-center gap-2 mt-2">
                                                            <div className="inline-flex bg-gray-100 text-xs px-2 py-1 rounded font-medium text-gray-700">{job.jobType}</div>
                                                            <button onClick={() => startEditJob(job)} className="text-xs text-primary hover:underline font-semibold flex items-center">
                                                                <i className="fa-solid fa-pen mr-1"></i> Edit
                                                            </button>
                                                        </div>
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
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {apps.map(app => (
                                                    <tr key={app.id} className={`hover:bg-gray-50/50 transition-colors ${app.status === 'Noted' ? 'bg-green-50/30' : ''}`}>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{app.name}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">{app.jobTitle}</td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                            <div>{app.email}</div>
                                                            <div className="text-xs">{app.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                            <button onClick={() => toggleAppStatus(app.id, app.status || 'Pending')} className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${app.status === 'Noted' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                                                                {app.status === 'Noted' ? <><i className="fa-solid fa-check"></i> Noted</> : <><i className="fa-regular fa-clock"></i> Pending</>}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap text-left text-sm">
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
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Requests</h3>
                                {contacts.length === 0 ? (
                                    <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed text-gray-500">
                                        <i className="fa-regular fa-envelope-open text-3xl mb-3"></i>
                                        <p>No contact messages yet.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className={`bg-white border rounded-xl p-6 shadow-sm flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow relative ${contact.status === 'Noted' ? 'border-l-4 border-l-green-500 bg-green-50/10' : 'border-l-4 border-l-primary'}`}>
                                                <div className="md:w-1/3">
                                                    <h4 className="font-bold text-lg mb-1">{contact.name}</h4>
                                                    <p className="text-gray-500 text-sm mb-4"><i className="fa-regular fa-clock w-4"></i> {contact.date}</p>
                                                    <div className="space-y-2 mt-4 text-sm text-gray-600">
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 border rounded"><i className="fa-solid fa-envelope w-4 text-gray-400"></i> {contact.email}</div>
                                                        <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 border rounded"><i className="fa-solid fa-phone w-4 text-gray-400"></i> {contact.phone}</div>
                                                    </div>
                                                </div>

                                                <div className="md:w-2/3 md:pl-6 md:border-l flex flex-col justify-center relative">
                                                    <div className="absolute top-0 right-0 flex gap-2">
                                                         <button onClick={() => toggleContactStatus(contact.id, contact.status || 'Pending')} className={`px-3 py-1 rounded-md text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${contact.status === 'Noted' ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}>
                                                            {contact.status === 'Noted' ? <><i className="fa-solid fa-check"></i> Noted</> : <><i className="fa-regular fa-clock"></i> Pending</>}
                                                        </button>
                                                    </div>
                                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2 mt-6 md:mt-0">Intent</p>
                                                    <div className="flex flex-col gap-2">
                                                        <span className="text-lg font-medium text-gray-900 bg-blue-50 inline-block px-3 py-1 rounded w-max">Domain: {contact.domain}</span>
                                                        {contact.purpose && <span className="text-primary font-medium bg-primary/5 inline-block px-3 py-1 rounded w-max">Purpose: {contact.purpose}</span>}
                                                    </div>
                                                    {contact.message && (
                                                        <div className="mt-4 p-4 bg-gray-50 rounded border text-sm text-gray-700 italic">
                                                            "{contact.message}"
                                                        </div>
                                                    )}
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

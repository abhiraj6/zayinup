window.pages = window.pages || {};

window.pages.Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const [activeTab, setActiveTab] = React.useState("jobs");

    // Job form state
    const [jobForm, setJobForm] = React.useState({ title: '', salary: '', location: '', jobType: 'Full-Time', experience: '', qualification: '', description: '' });
    const [jobs, setJobs] = React.useState([]);
    const [editingJobId, setEditingJobId] = React.useState(null);

    // College form state
    const [collegeForm, setCollegeForm] = React.useState({ name: '', location: '', programs: '', image: '', description: '', accreditation: '', intake: '' });
    const [colleges, setColleges] = React.useState([]);
    const [editingCollegeId, setEditingCollegeId] = React.useState(null);

    const [apps, setApps] = React.useState([]);
    const [contacts, setContacts] = React.useState([]);

    // Options Management
    const [domains, setDomains] = React.useState([]);
    const [purposes, setPurposes] = React.useState([]);
    const [newDomain, setNewDomain] = React.useState("");
    const [newPurpose, setNewPurpose] = React.useState("");

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
        setDomains(window.optionsService.getDomains());
        setPurposes(window.optionsService.getPurposes());
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

    const handleCollegeSubmit = (e) => {
        e.preventDefault();
        if (editingCollegeId) {
            const updated = window.collegeService.updateCollege({ ...collegeForm, id: editingCollegeId });
            setColleges(prev => prev.map(c => String(c.id) === String(editingCollegeId) ? updated : c));
            setEditingCollegeId(null);
            alert("College Updated!");
        } else {
            const newCollege = window.collegeService.addCollege(collegeForm);
            setColleges(prev => [...prev, newCollege]);
            alert("College Added!");
        }
        setCollegeForm({ name: '', location: '', programs: '', image: '', description: '', accreditation: '', intake: '' });
    };

    const startEditCollege = (college) => {
        setCollegeForm({
            name: college.name || '',
            location: college.location || '',
            programs: Array.isArray(college.programs) ? college.programs.join(', ') : (college.programs || ''),
            image: college.image || '',
            description: college.description || '',
            accreditation: college.accreditation || '',
            intake: college.intake || ''
        });
        setEditingCollegeId(college.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditCollege = () => {
        setEditingCollegeId(null);
        setCollegeForm({ name: '', location: '', programs: '', image: '', description: '', accreditation: '', intake: '' });
    };

    const deleteCollege = (id) => {
        if (window.confirm("Are you sure you want to delete this college?")) {
            window.collegeService.deleteCollege(id);
            setColleges(prev => prev.filter(c => String(c.id) !== String(id)));
        }
    };

    const deleteApp = (id) => {
        if (window.confirm("Are you sure you want to delete this application?")) {
            window.applicationService.deleteApplication(id);
            setApps(prev => prev.filter(a => String(a.id) !== String(id)));
        }
    };

    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this contact request?")) {
            window.contactService.deleteContact(id);
            setContacts(prev => prev.filter(c => String(c.id) !== String(id)));
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

    const handleAddDomain = (e) => {
        e.preventDefault();
        if (!newDomain.trim()) return;
        const updated = window.optionsService.addDomain(newDomain.trim());
        setDomains(updated);
        setNewDomain("");
    };

    const handleDeleteDomain = (domain) => {
        if (window.confirm(`Delete domain "${domain}"?`)) {
            const updated = window.optionsService.deleteDomain(domain);
            setDomains(updated);
        }
    };

    const handleAddPurpose = (e) => {
        e.preventDefault();
        if (!newPurpose.trim()) return;
        const updated = window.optionsService.addPurpose(newPurpose.trim());
        setPurposes(updated);
        setNewPurpose("");
    };

    const handleDeletePurpose = (purpose) => {
        if (window.confirm(`Delete purpose "${purpose}"?`)) {
            const updated = window.optionsService.deletePurpose(purpose);
            setPurposes(updated);
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
        { id: 'options', label: 'Form Options', icon: 'fa-gears' },
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

                        {activeTab === 'options' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    {/* Domains Management */}
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                            <i className="fa-solid fa-user-tag text-blue-600 mr-2"></i> Contact Domains
                                        </h3>

                                        <form onSubmit={handleAddDomain} className="flex gap-2 mb-6">
                                            <input
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary outline-none"
                                                placeholder="e.g., Partner, Student"
                                                value={newDomain}
                                                onChange={e => setNewDomain(e.target.value)}
                                            />
                                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                                                Add
                                            </button>
                                        </form>

                                        <div className="space-y-2">
                                            {domains.map(d => (
                                                <div key={d} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-gray-100 group">
                                                    <span className="text-gray-700">{d}</span>
                                                    <button onClick={() => handleDeleteDomain(d)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Purposes Management */}
                                    <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                            <i className="fa-solid fa-bullseye text-green-600 mr-2"></i> Contact Purposes
                                        </h3>

                                        <form onSubmit={handleAddPurpose} className="flex gap-2 mb-6">
                                            <input
                                                className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:ring-primary outline-none"
                                                placeholder="e.g., Sponsorship, Career Guidance"
                                                value={newPurpose}
                                                onChange={e => setNewPurpose(e.target.value)}
                                            />
                                            <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90">
                                                Add
                                            </button>
                                        </form>

                                        <div className="space-y-2">
                                            {purposes.map(p => (
                                                <div key={p} className="flex items-center justify-between bg-white px-4 py-2 rounded-lg border border-gray-100 group">
                                                    <span className="text-gray-700">{p}</span>
                                                    <button onClick={() => handleDeletePurpose(p)} className="text-gray-400 hover:text-red-500 transition-colors">
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'colleges' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                {/* Add College Form */}
                                <div className={`bg-purple-50/50 rounded-2xl p-6 md:p-8 border border-purple-100 shadow-sm transition-all ${editingCollegeId ? 'ring-2 ring-purple-600 bg-purple-100/30' : ''}`}>
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                                        <i className={`fa-solid ${editingCollegeId ? 'fa-pen-to-square' : 'fa-building-columns'} text-purple-600 mr-2`}></i>
                                        {editingCollegeId ? 'Update College Details' : 'Add Affiliated College'}
                                    </h3>
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

                                        <div className="md:col-span-2 flex justify-end gap-3">
                                            {editingCollegeId && (
                                                <button type="button" onClick={cancelEditCollege} className="px-6 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium rounded-lg transition-all">
                                                    Cancel
                                                </button>
                                            )}
                                            <button type="submit" className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg shadow-sm transition-all flex items-center">
                                                {editingCollegeId ? 'Save Changes' : 'Add College'} <i className={`fa-solid ${editingCollegeId ? 'fa-check' : 'fa-paper-plane'} ml-2`}></i>
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
                                                <div key={college.id} className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group flex ${editingCollegeId === college.id ? 'border-purple-600 ring-1 ring-purple-600' : ''}`}>
                                                    <div className="w-1/3 min-h-full bg-gray-100 flex-shrink-0">
                                                        <img src={college.image} alt={college.name} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="p-4 w-2/3 pr-10">
                                                        <h4 className="font-bold text-lg mb-1 leading-tight">{college.name}</h4>
                                                        <p className="text-sm text-gray-600 mb-2"><i className="fa-solid fa-location-dot w-4"></i> {college.location}</p>
                                                        <div className="flex flex-wrap gap-2 items-center">
                                                            <div className="inline-flex bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded font-medium">{college.accreditation}</div>
                                                            <button onClick={() => startEditCollege(college)} className="text-xs text-purple-600 hover:underline font-semibold flex items-center">
                                                                <i className="fa-solid fa-pen mr-1"></i> Edit
                                                            </button>
                                                        </div>
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
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
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
                                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                                            <button onClick={() => deleteApp(app.id)} className="text-gray-400 hover:text-red-500 transition-colors" title="Delete Application">
                                                                <i className="fa-solid fa-trash-can"></i>
                                                            </button>
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
                                                        <button onClick={() => deleteContact(contact.id)} className="text-gray-400 hover:text-red-500 hover:bg-red-50 w-8 h-8 rounded-full flex items-center justify-center transition-colors" title="Delete Request">
                                                            <i className="fa-solid fa-trash-can"></i>
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

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

    // Employee form state
    const [employeeForm, setEmployeeForm] = React.useState({ name: '', position: '', department: 'Admin', email: '', phone: '' });
    const [employees, setEmployees] = React.useState([]);
    const [editingEmployeeId, setEditingEmployeeId] = React.useState(null);

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
        setEmployees(window.employeeService ? window.employeeService.getEmployees() : []);
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

    const handleEmployeeSubmit = (e) => {
        e.preventDefault();
        if (editingEmployeeId) {
            const updated = window.employeeService.updateEmployee({ ...employeeForm, id: editingEmployeeId });
            setEmployees(prev => prev.map(emp => String(emp.id) === String(editingEmployeeId) ? updated : emp));
            setEditingEmployeeId(null);
            alert("Employee Updated!");
        } else {
            const newEmployee = window.employeeService.addEmployee(employeeForm);
            setEmployees(prev => [...prev, newEmployee]);
            alert("Employee Added!");
        }
        setEmployeeForm({ name: '', position: '', department: 'Admin', email: '', phone: '' });
    };

    const startEditEmployee = (employee) => {
        setEmployeeForm({
            name: employee.name || '',
            position: employee.position || '',
            department: employee.department || '',
            email: employee.email || '',
            phone: employee.phone || ''
        });
        setEditingEmployeeId(employee.id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEditEmployee = () => {
        setEditingEmployeeId(null);
        setEmployeeForm({ name: '', position: '', department: 'Admin', email: '', phone: '' });
    };

    const deleteEmployee = (id) => {
        if (window.confirm("Are you sure you want to delete this employee?")) {
            window.employeeService.deleteEmployee(id);
            setEmployees(prev => prev.filter(e => String(e.id) !== String(id)));
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
            <div className="flex-grow flex items-center justify-center bg-[#020617] p-4 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[20%] right-[20%] w-[30rem] h-[30rem] bg-accent/10 rounded-full blur-[120px] animate-blob"></div>
                    <div className="absolute bottom-[20%] left-[20%] w-[30rem] h-[30rem] bg-purple-600/10 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
                </div>
                <div className="max-w-md w-full bg-white/5 backdrop-blur-xl rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.1)] p-8 border border-white/10 relative z-10">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-[#0f172a] border border-red-500/20 text-red-400 rounded-2xl flex items-center justify-center mx-auto text-4xl mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
                            <i className="fa-solid fa-shield-halved"></i>
                        </div>
                        <h2 className="text-4xl font-serif font-bold text-white tracking-tight">Admin Portal</h2>
                        <p className="text-slate-400 mt-2 font-medium">Access Restricted Area</p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-8 relative group">
                            <label className="block text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">Master Code</label>
                            <div className="relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 to-purple-600 rounded-xl blur opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                                    <i className="fa-solid fa-key text-slate-500"></i>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value); setError(""); }}
                                    className="relative w-full border border-white/10 rounded-xl pl-12 pr-4 py-3.5 bg-[#0f172a] text-white focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition-all placeholder-slate-600"
                                    placeholder="Enter clearance code..."
                                />
                            </div>
                            {error && <p className="text-red-400 text-sm mt-3 flex items-center font-medium"><i className="fa-solid fa-circle-exclamation mr-2"></i> {error}</p>}
                        </div>
                        <button type="submit" className="w-full bg-gradient-to-r from-accent to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-4 rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all flex justify-center items-center group/btn relative overflow-hidden">
                            <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[-20deg] group-hover/btn:animate-[slide-right_1s_ease-in-out_infinite]"></div>
                            Authenticate <i className="fa-solid fa-fingerprint ml-3 text-lg transform group-hover/btn:scale-110 transition-transform"></i>
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: 'jobs', label: 'Manage Jobs', icon: 'fa-briefcase' },
        { id: 'colleges', label: 'Manage Colleges', icon: 'fa-building-columns' },
        { id: 'employees', label: 'Manage Employees', icon: 'fa-users' },
        { id: 'options', label: 'Form Options', icon: 'fa-gears' },
        { id: 'apps', label: 'Applications', icon: 'fa-file-lines' },
        { id: 'contacts', label: 'Contact Requests', icon: 'fa-envelope-open-text' }
    ];

    return (
        <div className="bg-[#020617] min-h-screen py-10 w-full relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <div className="bg-[#0f172a] rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.1)] border border-white/10 overflow-hidden">

                    <div className="bg-gradient-to-r from-slate-900 to-[#0f172a] px-8 py-8 md:px-10 flex flex-col md:flex-row md:items-center justify-between text-white border-b border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-full bg-gradient-to-l from-accent/10 to-transparent pointer-events-none"></div>
                        <div className="relative z-10">
                            <h1 className="text-3xl font-serif font-bold flex items-center gap-4 drop-shadow-md">
                                <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-accent shadow-[0_0_15px_rgba(59,130,246,0.3)]"><i className="fa-solid fa-server"></i></div> 
                                System Command
                            </h1>
                            <p className="text-slate-400 mt-2 ml-16 font-medium">Manage operational entities and inbound intelligence.</p>
                        </div>

                        <div className="mt-6 md:mt-0 relative z-10">
                            <button onClick={() => setIsAuthenticated(false)} className="px-5 py-2.5 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 hover:text-red-400 rounded-xl text-sm font-bold tracking-wide backdrop-blur transition-all flex items-center shadow-sm">
                                <i className="fa-solid fa-power-off mr-2"></i> Terminate Session
                            </button>
                        </div>
                    </div>

                    <div className="border-b border-white/5 bg-[#0a0f1c] px-4 sm:px-8 flex overflow-x-auto space-x-1 sm:space-x-4 scrollbar-hide py-2 sm:py-0">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 sm:px-6 py-4 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-all uppercase tracking-widest ${activeTab === tab.id ? 'border-accent text-accent bg-accent/5' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-white/5'}`}
                            >
                                <i className={`fa-solid ${tab.icon} mr-2.5`}></i> {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="p-8 md:p-10 bg-[#020617]/50 backdrop-blur-md min-h-[500px]">

                        {activeTab === 'jobs' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                {/* Add Job Form */}
                                <div className={`bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.05)] transition-all relative overflow-hidden ${editingJobId ? 'ring-2 ring-accent bg-accent/5' : ''}`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl pointer-events-none"></div>
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center relative z-10 font-serif">
                                        <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center mr-4 border border-accent/20"><i className={`fa-solid ${editingJobId ? 'fa-pen-to-square' : 'fa-circle-plus'} text-accent`}></i></div>
                                        {editingJobId ? 'Update Operational Post' : 'Initiate New Requisition'}
                                    </h3>
                                    <form onSubmit={handleJobSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        <input required className="bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none placeholder-slate-500 transition-all" placeholder="Classification Title" value={jobForm.title} onChange={e => setJobForm({ ...jobForm, title: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none placeholder-slate-500 transition-all" placeholder="Geographic Location" value={jobForm.location} onChange={e => setJobForm({ ...jobForm, location: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none placeholder-slate-500 transition-all" placeholder="Compensation Parameters" value={jobForm.salary} onChange={e => setJobForm({ ...jobForm, salary: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none placeholder-slate-500 transition-all" placeholder="Required Tenure" value={jobForm.experience} onChange={e => setJobForm({ ...jobForm, experience: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none placeholder-slate-500 transition-all md:col-span-2" placeholder="Educational Prerequisite" value={jobForm.qualification} onChange={e => setJobForm({ ...jobForm, qualification: e.target.value })} />

                                        <div className="md:col-span-2 relative">
                                            <select className="w-full bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none appearance-none transition-all cursor-pointer" value={jobForm.jobType} onChange={e => setJobForm({ ...jobForm, jobType: e.target.value })}>
                                                <option className="bg-slate-900 border-none">Full-Time Focus</option>
                                                <option className="bg-slate-900 border-none">Part-Time Support</option>
                                                <option className="bg-slate-900 border-none">Contractual Engagement</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 translate-y-[-50%] pointer-events-none text-slate-400">
                                                <i className="fa-solid fa-chevron-down text-sm"></i>
                                            </div>
                                        </div>

                                        <div className="md:col-span-2">
                                            <textarea required rows="4" className="w-full bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-accent focus:border-accent outline-none resize-none placeholder-slate-500 transition-all" placeholder="Comprehensive Strategic Description" value={jobForm.description} onChange={e => setJobForm({ ...jobForm, description: e.target.value })}></textarea>
                                        </div>

                                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                                            {editingJobId && (
                                                <button type="button" onClick={cancelEditJob} className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 font-bold tracking-wide rounded-xl transition-all">
                                                    Abort Edit
                                                </button>
                                            )}
                                            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-accent to-accent-glow hover:from-blue-500 hover:to-purple-500 text-white font-bold tracking-wide rounded-xl shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] transition-all flex items-center transform hover:-translate-y-1">
                                                {editingJobId ? 'Commit Changes' : 'Execute Submittal'} <i className={`fa-solid ${editingJobId ? 'fa-check-double' : 'fa-satellite-dish'} ml-3`}></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Job List */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 font-serif">Active Directives <span className="text-accent text-sm ml-2 bg-accent/20 px-3 py-1 rounded-full">{jobs.length}</span></h3>
                                    {jobs.length === 0 ? (
                                        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 text-slate-500">
                                            <i className="fa-solid fa-ghost text-4xl mb-4 text-slate-600"></i>
                                            <p className="font-medium text-lg">No requisitions currently tracked.</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {jobs.map(job => (
                                                <div key={job.id} className={`bg-[#0f172a] border rounded-2xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] hover:-translate-y-1 transition-all relative group overflow-hidden ${editingJobId === job.id ? 'border-accent ring-1 ring-accent bg-accent/5' : 'border-white/10'}`}>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none group-hover:bg-accent/10 transition-colors"></div>
                                                    <div className="pr-12 relative z-10">
                                                        <h4 className="font-bold text-xl mb-2 text-white">{job.title}</h4>
                                                        <p className="text-sm font-medium text-slate-400 mb-1.5"><i className="fa-solid fa-location-crosshairs w-5 text-accent"></i> {job.location}</p>
                                                        <p className="text-sm font-medium text-slate-400 mb-4"><i className="fa-solid fa-graduation-cap w-5 text-accent"></i> {job.qualification}</p>
                                                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                                            <div className="inline-flex bg-white/5 border border-white/10 text-[10px] uppercase tracking-widest px-2.5 py-1.5 rounded-md font-bold text-slate-300">{job.jobType || 'Full-Time'}</div>
                                                            <button onClick={() => startEditJob(job)} className="text-xs text-accent hover:text-white transition-colors font-bold uppercase tracking-widest flex items-center">
                                                                <i className="fa-solid fa-pen-nib mr-1.5"></i> Redact
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteJob(job.id)}
                                                        className="absolute top-4 right-4 w-9 h-9 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all shadow-sm border border-transparent hover:border-red-500/20 z-10"
                                                        title="Purge Entry"
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
                                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.05)] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none"></div>
                                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center font-serif relative z-10">
                                            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4 border border-blue-500/20"><i className="fa-solid fa-user-tag text-blue-400"></i></div> 
                                            Contact Domains
                                        </h3>

                                        <form onSubmit={handleAddDomain} className="flex gap-3 mb-8 relative z-10">
                                            <input
                                                className="flex-grow bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-slate-500 transition-all"
                                                placeholder="e.g., Partner, Student"
                                                value={newDomain}
                                                onChange={e => setNewDomain(e.target.value)}
                                            />
                                            <button type="submit" className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 font-bold px-6 py-3.5 rounded-xl border border-blue-500/30 transition-all flex items-center gap-2">
                                                <i className="fa-solid fa-plus"></i> Add
                                            </button>
                                        </form>

                                        <div className="space-y-3 relative z-10">
                                            {domains.map(d => (
                                                <div key={d} className="flex items-center justify-between bg-[#0f172a] px-5 py-3.5 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                                                    <span className="text-slate-300 font-medium">{d}</span>
                                                    <button onClick={() => handleDeleteDomain(d)} className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Purposes Management */}
                                    <div className="bg-white/5 p-8 rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.05)] relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>
                                        <h3 className="text-2xl font-bold text-white mb-8 flex items-center font-serif relative z-10">
                                            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-4 border border-emerald-500/20"><i className="fa-solid fa-bullseye text-emerald-400"></i></div> 
                                            Contact Purposes
                                        </h3>

                                        <form onSubmit={handleAddPurpose} className="flex gap-3 mb-8 relative z-10">
                                            <input
                                                className="flex-grow bg-[#0f172a] text-white border border-white/10 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-slate-500 transition-all"
                                                placeholder="e.g., Sponsorship, Career Guidance"
                                                value={newPurpose}
                                                onChange={e => setNewPurpose(e.target.value)}
                                            />
                                            <button type="submit" className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 font-bold px-6 py-3.5 rounded-xl border border-emerald-500/30 transition-all flex items-center gap-2">
                                                <i className="fa-solid fa-plus"></i> Add
                                            </button>
                                        </form>

                                        <div className="space-y-3 relative z-10">
                                            {purposes.map(p => (
                                                <div key={p} className="flex items-center justify-between bg-[#0f172a] px-5 py-3.5 rounded-xl border border-white/5 group hover:border-white/10 transition-colors">
                                                    <span className="text-slate-300 font-medium">{p}</span>
                                                    <button onClick={() => handleDeletePurpose(p)} className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-8 h-8 rounded-lg flex items-center justify-center transition-all">
                                                        <i className="fa-solid fa-xmark"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === 'employees' && (
                            <div className="space-y-12 animate-in fade-in duration-300">
                                <div className={`bg-emerald-500/5 rounded-3xl p-6 md:p-8 border border-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all relative overflow-hidden ${editingEmployeeId ? 'ring-2 ring-emerald-500 bg-emerald-500/10' : ''}`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center relative z-10 font-serif">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center mr-4 border border-emerald-500/20"><i className={`fa-solid ${editingEmployeeId ? 'fa-pen-to-square' : 'fa-user-plus'} text-emerald-400`}></i></div>
                                        {editingEmployeeId ? 'Update Operational Personnel Detailed Matrix' : 'Integrate New Network Operative'}
                                    </h3>
                                    <form onSubmit={handleEmployeeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        <input required className="bg-[#0f172a] text-white border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-slate-500 transition-all" placeholder="Operative Designation (Full Name)" value={employeeForm.name} onChange={e => setEmployeeForm({ ...employeeForm, name: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-slate-500 transition-all" placeholder="Strategic Position/Title" value={employeeForm.position} onChange={e => setEmployeeForm({ ...employeeForm, position: e.target.value })} />
                                        
                                        <div className="relative">
                                            <select required className="w-full bg-[#0f172a] text-emerald-100 border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none transition-all cursor-pointer" value={employeeForm.department} onChange={e => setEmployeeForm({ ...employeeForm, department: e.target.value })}>
                                                <option value="Admin" className="bg-slate-900 border-none">Admin Directory</option>
                                                <option value="Marketing" className="bg-slate-900 border-none">Marketing Node</option>
                                                <option value="Database" className="bg-slate-900 border-none">Database Nexus</option>
                                                <option value="Telecaller" className="bg-slate-900 border-none">Communications Relay</option>
                                            </select>
                                            <div className="absolute right-4 top-1/2 translate-y-[-50%] pointer-events-none text-emerald-500">
                                                <i className="fa-solid fa-chevron-down text-sm"></i>
                                            </div>
                                        </div>

                                        <input required type="email" className="bg-[#0f172a] text-white border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-slate-500 transition-all" placeholder="Encrypted Email Address" value={employeeForm.email} onChange={e => setEmployeeForm({ ...employeeForm, email: e.target.value })} />
                                        <input className="bg-[#0f172a] text-white border border-emerald-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 outline-none placeholder-slate-500 transition-all md:col-span-2" placeholder="Secure Comm Line (Phone Number)" value={employeeForm.phone} onChange={e => setEmployeeForm({ ...employeeForm, phone: e.target.value })} />

                                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                                            {editingEmployeeId && (
                                                <button type="button" onClick={cancelEditEmployee} className="px-8 py-3 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold tracking-wide rounded-xl transition-all">
                                                    Abort Sync
                                                </button>
                                            )}
                                            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold tracking-wide rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.4)] transition-all flex items-center transform hover:-translate-y-1">
                                                {editingEmployeeId ? 'Commit Update' : 'Initialize Operative'} <i className={`fa-solid ${editingEmployeeId ? 'fa-check-double' : 'fa-network-wired'} ml-3`}></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Employee List */}
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 font-serif">Active Operatives <span className="text-emerald-400 text-sm ml-2 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/20">{employees.length}</span></h3>
                                    {employees.length === 0 ? (
                                        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 text-slate-500">
                                            <i className="fa-solid fa-users-slash text-4xl mb-4 text-slate-600"></i>
                                            <p className="font-medium text-lg">No personnel data currently mapped to the grid.</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                            {employees.map(employee => (
                                                <div key={employee.id} className={`bg-[#0f172a] border rounded-2xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] hover:-translate-y-1 transition-all relative group overflow-hidden ${editingEmployeeId === employee.id ? 'border-emerald-500 ring-1 ring-emerald-500 bg-emerald-500/5' : 'border-emerald-500/20'}`}>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors"></div>
                                                    <div className="pr-12 relative z-10">
                                                        <h4 className="font-bold text-xl mb-1 flex flex-col items-start gap-1 text-white">
                                                            {employee.name}
                                                            <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 inline-block uppercase mt-1.5">ID: {employee.id}</span>
                                                        </h4>
                                                        <p className="text-sm text-slate-300 font-medium mt-3 mb-2">{employee.position}</p>
                                                        <p className="text-xs font-medium text-slate-400 mb-1.5 flex items-center"><div className="w-5 text-center mr-1 text-emerald-500"><i className="fa-solid fa-building"></i></div> {employee.department} Node</p>
                                                        <p className="text-xs font-medium text-slate-400 mb-1.5 flex items-center"><div className="w-5 text-center mr-1 text-emerald-500"><i className="fa-solid fa-envelope"></i></div> {employee.email}</p>
                                                        {employee.phone && <p className="text-xs font-medium text-slate-400 mb-4 flex items-center"><div className="w-5 text-center mr-1 text-emerald-500"><i className="fa-solid fa-phone"></i></div> {employee.phone}</p>}
                                                        <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                                                            <button onClick={() => startEditEmployee(employee)} className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-bold uppercase tracking-widest flex items-center">
                                                                <i className="fa-solid fa-pen-nib mr-1.5"></i> Intervene
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteEmployee(employee.id)}
                                                        className="absolute top-4 right-4 w-9 h-9 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all shadow-sm border border-transparent hover:border-red-500/20 z-10"
                                                        title="Sever Connection"
                                                    >
                                                        <i className="fa-solid fa-user-xmark"></i>
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
                                <div className={`bg-purple-500/5 rounded-3xl p-6 md:p-8 border border-purple-500/20 shadow-[0_0_30px_rgba(168,85,247,0.05)] transition-all relative overflow-hidden ${editingCollegeId ? 'ring-2 ring-purple-500 bg-purple-500/10' : ''}`}>
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
                                    <h3 className="text-2xl font-bold text-white mb-8 flex items-center relative z-10 font-serif">
                                        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mr-4 border border-purple-500/20"><i className={`fa-solid ${editingCollegeId ? 'fa-pen-to-square' : 'fa-building-columns'} text-purple-400`}></i></div>
                                        {editingCollegeId ? 'Update Academic Node Profile' : 'Register Academic Partner Node'}
                                    </h3>
                                    <form onSubmit={handleCollegeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                                        <input required className="bg-[#0f172a] text-white border border-purple-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-slate-500 transition-all md:col-span-2" placeholder="Institution Designation" value={collegeForm.name} onChange={e => setCollegeForm({ ...collegeForm, name: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-purple-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-slate-500 transition-all" placeholder="Geographic Sector" value={collegeForm.location} onChange={e => setCollegeForm({ ...collegeForm, location: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-purple-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-slate-500 transition-all" placeholder="Primary Liaison Point" value={collegeForm.contactPerson} onChange={e => setCollegeForm({ ...collegeForm, contactPerson: e.target.value })} />
                                        <input required type="email" className="bg-[#0f172a] text-white border border-purple-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-slate-500 transition-all" placeholder="Comm Link (Email)" value={collegeForm.email} onChange={e => setCollegeForm({ ...collegeForm, email: e.target.value })} />
                                        <input required className="bg-[#0f172a] text-white border border-purple-500/20 rounded-xl px-4 py-3.5 focus:ring-1 focus:ring-purple-500 focus:border-purple-500 outline-none placeholder-slate-500 transition-all" placeholder="Comm Link (Phone)" value={collegeForm.phone} onChange={e => setCollegeForm({ ...collegeForm, phone: e.target.value })} />

                                        <div className="md:col-span-2 flex justify-end gap-4 mt-2">
                                            {editingCollegeId && (
                                                <button type="button" onClick={cancelEditCollege} className="px-8 py-3 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-400 font-bold tracking-wide rounded-xl transition-all">
                                                    Abort Sync
                                                </button>
                                            )}
                                            <button type="submit" className="px-8 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-400 hover:to-indigo-500 text-white font-bold tracking-wide rounded-xl shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all flex items-center transform hover:-translate-y-1">
                                                {editingCollegeId ? 'Commit Update' : 'Initialize Partner'} <i className={`fa-solid ${editingCollegeId ? 'fa-check-double' : 'fa-link'} ml-3`}></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4 font-serif">Registered Academic Nodes <span className="text-purple-400 text-sm ml-2 bg-purple-500/20 px-3 py-1 rounded-full border border-purple-500/20">{colleges.length}</span></h3>
                                    {colleges.length === 0 ? (
                                        <div className="text-center py-16 bg-white/5 rounded-3xl border border-white/10 text-slate-500">
                                            <i className="fa-solid fa-building-columns text-4xl mb-4 text-slate-600 opacity-50"></i>
                                            <p className="font-medium text-lg">No academic partners registered on grid.</p>
                                        </div>
                                    ) : (
                                        <div className="grid gap-6 md:grid-cols-2">
                                            {colleges.map(college => (
                                                <div key={college.id} className={`bg-[#0f172a] border rounded-2xl p-6 shadow-lg hover:shadow-[0_0_30px_rgba(168,85,247,0.1)] hover:-translate-y-1 transition-all relative group overflow-hidden ${editingCollegeId === college.id ? 'border-purple-500 ring-1 ring-purple-500 bg-purple-500/5' : 'border-purple-500/20'}`}>
                                                    <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:bg-purple-500/10 transition-colors"></div>
                                                    <div className="pr-12 relative z-10">
                                                        <h4 className="font-bold text-xl mb-1 flex items-center gap-2 text-white">
                                                            {college.name}
                                                        </h4>
                                                        <p className="text-sm font-medium text-slate-400 mb-4 flex items-center mt-2"><div className="w-5 text-center mr-1 text-purple-500"><i className="fa-solid fa-location-dot"></i></div> {college.location}</p>
                                                        
                                                        <div className="bg-white/5 rounded-xl p-4 border border-white/5 mb-4">
                                                            <p className="text-xs uppercase tracking-widest font-bold text-slate-500 mb-2">Primary Liaison</p>
                                                            <p className="font-medium text-slate-200">{college.contactPerson}</p>
                                                            <div className="flex flex-col gap-1 mt-2">
                                                                <a href={`mailto:${college.email}`} className="text-sm text-purple-400 hover:text-purple-300 flex items-center"><i className="fa-solid fa-envelope w-5"></i> {college.email}</a>
                                                                <a href={`tel:${college.phone}`} className="text-sm text-purple-400 hover:text-purple-300 flex items-center"><i className="fa-solid fa-phone w-5"></i> {college.phone}</a>
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-3 border-t border-white/10 pt-3">
                                                            <button onClick={() => startEditCollege(college)} className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-bold uppercase tracking-widest flex items-center">
                                                                <i className="fa-solid fa-pen-nib mr-1.5"></i> Update Node
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => deleteCollege(college.id)}
                                                        className="absolute top-4 right-4 w-9 h-9 rounded-xl text-slate-500 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all shadow-sm border border-transparent hover:border-red-500/20 z-10"
                                                        title="Sever Partnership"
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
                                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-serif flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mr-4 border border-orange-500/30 text-orange-400"><i className="fa-solid fa-file-signature"></i></div>
                                    Inbound Candidate Transmissions <span className="text-orange-400 text-sm ml-3 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">{apps.length}</span>
                                </h3>
                                
                                {apps.length === 0 ? (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-slate-500 flex flex-col items-center">
                                        <div className="w-24 h-24 bg-[#0a0f1c] rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                                            <i className="fa-solid fa-inbox text-4xl text-slate-600"></i>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">Queue Empty</h4>
                                        <p className="font-medium">No candidate dossiers intercepted yet.</p>
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto rounded-2xl shadow-[0_0_30px_rgba(249,115,22,0.05)] border border-white/10">
                                        <table className="min-w-full divide-y divide-white/10">
                                            <thead className="bg-[#0a0f1c]">
                                                <tr>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Candidate Designation</th>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Target Role</th>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Date Intercepted</th>
                                                    <th className="px-6 py-5 text-left text-xs font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                                    <th className="px-6 py-5 text-right text-xs font-bold text-slate-400 uppercase tracking-widest">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-[#0f172a] divide-y divide-white/5">
                                                {apps.map(app => (
                                                    <tr key={app.id} className="hover:bg-white/5 transition-colors group border-b border-white/5">
                                                        <td className="px-6 py-5 whitespace-nowrap">
                                                            <div className="font-bold text-white">{app.name}</div>
                                                            <div className="text-sm text-slate-400 font-medium mt-1"><i className="fa-solid fa-envelope text-xs mr-1 opacity-70"></i> {app.email}</div>
                                                            <div className="text-sm text-slate-400 font-medium mt-0.5"><i className="fa-solid fa-phone text-xs mr-1 opacity-70"></i> {app.phone}</div>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap">
                                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">{app.jobTitle}</span>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-300 font-medium">
                                                            {app.date}
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap text-sm">
                                                            <button onClick={() => toggleAppStatus(app.id, app.status || 'Pending')} className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-colors ${app.status === 'Noted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                                                                {app.status === 'Noted' ? <><i className="fa-solid fa-check"></i> Processed</> : <><i className="fa-regular fa-clock"></i> Pending</>}
                                                            </button>
                                                        </td>
                                                        <td className="px-6 py-5 whitespace-nowrap text-right text-sm">
                                                            <button
                                                                onClick={() => window.open(app.resumeLink, '_blank')}
                                                                className="text-orange-400 hover:text-white bg-orange-500/10 hover:bg-orange-500/30 px-3 py-1.5 rounded-lg border border-orange-500/20 transition-all font-bold tracking-wide mr-2"
                                                            >
                                                                <i className="fa-solid fa-arrow-up-right-from-square mr-1 text-[10px]"></i> Dossier
                                                            </button>
                                                            <button
                                                                onClick={() => deleteApp(app.id)}
                                                                className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-8 h-8 rounded-lg flex items-center justify-center transition-all border border-transparent hover:border-red-500/20 inline-flex"
                                                                title="Purge Record"
                                                            >
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
                                <h3 className="text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 font-serif flex items-center">
                                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mr-4 border border-blue-500/30 text-blue-400"><i className="fa-solid fa-envelope-open-text"></i></div>
                                    Inbound Communications Grid <span className="text-blue-400 text-sm ml-3 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-500/30">{contacts.length}</span>
                                </h3>
                                {contacts.length === 0 ? (
                                    <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 text-slate-500 flex flex-col items-center">
                                        <div className="w-24 h-24 bg-[#0a0f1c] rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                                            <i className="fa-regular fa-envelope-open text-4xl text-slate-600"></i>
                                        </div>
                                        <h4 className="text-xl font-bold text-white mb-2">Comms Silence</h4>
                                        <p className="font-medium">No contact transmissions intercepted.</p>
                                    </div>
                                ) : (
                                    <div className="grid gap-6">
                                        {contacts.map(contact => (
                                            <div key={contact.id} className={`bg-[#0f172a] border rounded-2xl p-8 shadow-lg flex flex-col md:flex-row gap-8 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all relative overflow-hidden ${contact.status === 'Noted' ? 'border-l-4 border-l-green-500 border-white/10 bg-green-500/5' : 'border-l-4 border-l-accent border-white/10'}`}>
                                                
                                                <div className="md:w-1/3 relative z-10">
                                                    <h4 className="font-bold text-2xl mb-1 text-white">{contact.name}</h4>
                                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-6"><i className="fa-regular fa-clock mr-1.5"></i> {contact.date}</p>
                                                    <div className="space-y-3 mt-4 text-sm text-slate-300 font-medium">
                                                        <div className="flex items-center gap-3 bg-[#0a0f1c] px-4 py-3 border border-white/5 rounded-xl"><i className="fa-solid fa-envelope text-accent"></i> <a href={`mailto:${contact.email}`} className="hover:text-white transition-colors">{contact.email}</a></div>
                                                        <div className="flex items-center gap-3 bg-[#0a0f1c] px-4 py-3 border border-white/5 rounded-xl"><i className="fa-solid fa-phone text-accent"></i> <a href={`tel:${contact.phone}`} className="hover:text-white transition-colors">{contact.phone}</a></div>
                                                    </div>
                                                </div>

                                                <div className="md:w-2/3 md:pl-8 md:border-l md:border-white/10 flex flex-col justify-center relative z-10">
                                                    <div className="absolute top-0 right-0 flex gap-2">
                                                         <button onClick={() => toggleContactStatus(contact.id, contact.status || 'Pending')} className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest inline-flex items-center gap-2 transition-all border ${contact.status === 'Noted' ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20'}`}>
                                                            {contact.status === 'Noted' ? <><i className="fa-solid fa-check"></i> Evaluated</> : <><i className="fa-regular fa-clock"></i> Actionable</>}
                                                        </button>
                                                        <button onClick={() => deleteContact(contact.id)} className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 w-9 h-9 rounded-lg flex items-center justify-center transition-all border border-transparent hover:border-red-500/20" title="Sever Comm Matrix">
                                                            <i className="fa-solid fa-trash-can"></i>
                                                        </button>
                                                    </div>
                                                    
                                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3 mt-6 md:mt-0">Transmission Intent</p>
                                                    <div className="flex flex-col sm:flex-row gap-3">
                                                        <span className="text-sm font-bold text-accent bg-accent/10 border border-accent/20 inline-block px-4 py-2 rounded-xl w-max">Domain: {contact.domain}</span>
                                                        {contact.purpose && <span className="text-sm font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 inline-block px-4 py-2 rounded-xl w-max">Objective: {contact.purpose}</span>}
                                                    </div>
                                                    
                                                    {contact.message && (
                                                        <div className="mt-6 p-6 bg-[#0a0f1c] border border-white/10 rounded-2xl text-slate-300 leading-relaxed italic shadow-inner">
                                                            <span className="text-accent/50 text-xl leading-none mr-2 font-serif">"</span>{contact.message}<span className="text-accent/50 text-xl leading-none ml-2 font-serif">"</span>
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

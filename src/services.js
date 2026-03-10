// We use window to share state and methods across Babel standalone scripts
window.SYNC_URL = "https://script.google.com/macros/s/AKfycbxdgrU7rZLoO8fwx1z1XHKWl7dIiBYIwm0mD8ptbsBwbWi7DAyskCqphcmCpLOpKA8/exec";

window.syncService = {
    sync: async (type, data) => {
        if (!window.SYNC_URL) return;
        try {
            await fetch(window.SYNC_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: 'syncAll', type, data })
            });
        } catch (e) {
            console.error("Sync failed:", e);
        }
    },
    fetchAll: async () => {
        if (!window.SYNC_URL) return null;
        try {
            const res = await fetch(`${window.SYNC_URL}?action=getAll`);
            const data = await res.json();
            return data;
        } catch (e) {
            console.error("Fetch failed:", e);
            return null;
        }
    },
    init: async (callback) => {
        const cloudData = await window.syncService.fetchAll();
        if (cloudData) {
            if (cloudData.jobs) localStorage.setItem('zayin_jobs', JSON.stringify(cloudData.jobs));
            if (cloudData.colleges) localStorage.setItem('zayin_colleges', JSON.stringify(cloudData.colleges));
            if (cloudData.domains) localStorage.setItem('zayin_domains', JSON.stringify(cloudData.domains));
            if (cloudData.purposes) localStorage.setItem('zayin_purposes', JSON.stringify(cloudData.purposes));
            if (callback) callback();
        }
    }
};

window.initialJobs = [
    {
        id: 1,
        title: "React Developer",
        description: "Looking for an experienced React developer to build modern web applications. Must be proficient in hooks, context API, and Tailwind CSS.",
        location: "Remote",
        salary: "$80k - $120k",
        qualification: "Bachelor's in Computer Science or equivalent",
        jobType: "Full-Time",
        experience: "3+ Years"
    },
    {
        id: 2,
        title: "HR Executive",
        description: "Seeking an HR Executive to manage end-to-end recruitment cycle, onboarding, and employee relations.",
        location: "New York, NY / Hybrid",
        salary: "$60k - $80k",
        qualification: "MBA in HR or related field",
        jobType: "Full-Time",
        experience: "1-3 Years"
    },
    {
        id: 3,
        title: "Backend Engineer (Node.js)",
        description: "Join our backend team to build scalable microservices using Node.js, Express, and PostgreSQL.",
        location: "Remote",
        salary: "$90k - $130k",
        qualification: "B.Tech/M.Tech in CS/IT",
        jobType: "Contract",
        experience: "4+ Years"
    }
];

window.initialColleges = [
    {
        id: 1,
        name: "Global Tech University",
        location: "San Francisco, CA",
        programs: ["Computer Science", "Engineering", "Data Analytics"],
        image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "A premier institution known for its cutting-edge research facilities and strong industry ties in Silicon Valley.",
        accreditation: "ABET Accredited",
        intake: "Fall, Spring"
    },
    {
        id: 2,
        name: "Royal Business College",
        location: "London, UK",
        programs: ["MBA", "Finance", "International Business"],
        image: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Unlock your leadership potential at one of Europe's most prestigious business schools with top-tier corporate placements.",
        accreditation: "EQUIS & AACSB",
        intake: "Fall"
    },
    {
        id: 3,
        name: "Evergreen Medical Institute",
        location: "Melbourne, Australia",
        programs: ["Nursing", "Medicine", "Public Health"],
        image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "World-class medical training featuring state-of-the-art simulation labs and extensive clinical rotations.",
        accreditation: "AMDC Recognized",
        intake: "Spring, Summer"
    },
    {
        id: 4,
        name: "Creative Arts Academy",
        location: "Paris, France",
        programs: ["Graphic Design", "Fine Arts", "Architecture"],
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        description: "Immerse yourself in creativity. CAA provides an inspiring environment to master both traditional and digital arts.",
        accreditation: "EAAE Member",
        intake: "Fall"
    }
];

window.jobService = {
    getJobs: () => {
        const jobs = localStorage.getItem('zayin_jobs');
        if (!jobs) {
            localStorage.setItem('zayin_jobs', JSON.stringify(window.initialJobs));
            return window.initialJobs;
        }
        return JSON.parse(jobs);
    },
    addJob: (job) => {
        const jobs = window.jobService.getJobs();
        const newJob = { ...job, id: Date.now() };
        jobs.push(newJob);
        localStorage.setItem('zayin_jobs', JSON.stringify(jobs));
        window.syncService.sync('Jobs', jobs);
        return newJob;
    },
    deleteJob: (id) => {
        let jobs = window.jobService.getJobs();
        jobs = jobs.filter(j => String(j.id) !== String(id));
        localStorage.setItem('zayin_jobs', JSON.stringify(jobs));
        window.syncService.sync('Jobs', jobs);
    },
    updateJob: (updatedJob) => {
        let jobs = window.jobService.getJobs();
        const index = jobs.findIndex(j => String(j.id) === String(updatedJob.id));
        if (index !== -1) {
            jobs[index] = updatedJob;
            localStorage.setItem('zayin_jobs', JSON.stringify(jobs));
            window.syncService.sync('Jobs', jobs);
            return updatedJob;
        }
        return null;
    }
};

window.collegeService = {
    getColleges: () => {
        const colleges = localStorage.getItem('zayin_colleges');
        if (!colleges) {
            localStorage.setItem('zayin_colleges', JSON.stringify(window.initialColleges));
            return window.initialColleges;
        }
        return JSON.parse(colleges);
    },
    addCollege: (college) => {
        const colleges = window.collegeService.getColleges();
        const programsArray = typeof college.programs === 'string'
            ? college.programs.split(',').map(p => p.trim())
            : college.programs;

        const newCollege = {
            ...college,
            programs: programsArray,
            id: Date.now()
        };
        colleges.push(newCollege);
        localStorage.setItem('zayin_colleges', JSON.stringify(colleges));
        window.syncService.sync('Colleges', colleges);
        return newCollege;
    },
    deleteCollege: (id) => {
        let colleges = window.collegeService.getColleges();
        colleges = colleges.filter(c => String(c.id) !== String(id));
        localStorage.setItem('zayin_colleges', JSON.stringify(colleges));
        window.syncService.sync('Colleges', colleges);
    },
    updateCollege: (updatedCollege) => {
        let colleges = window.collegeService.getColleges();
        const index = colleges.findIndex(c => String(c.id) === String(updatedCollege.id));
        if (index !== -1) {
            const programsArray = typeof updatedCollege.programs === 'string'
                ? updatedCollege.programs.split(',').map(p => p.trim())
                : updatedCollege.programs;

            const processedCollege = { ...updatedCollege, programs: programsArray };
            colleges[index] = processedCollege;
            localStorage.setItem('zayin_colleges', JSON.stringify(colleges));
            window.syncService.sync('Colleges', colleges);
            return processedCollege;
        }
        return null;
    }
};

window.applicationService = {
    getApplications: () => {
        const apps = localStorage.getItem('zayin_apps');
        return apps ? JSON.parse(apps) : [];
    },
    addApplication: (app) => {
        const apps = window.applicationService.getApplications();
        apps.push({ ...app, id: Date.now(), date: new Date().toLocaleDateString() });
        localStorage.setItem('zayin_apps', JSON.stringify(apps));

        const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdHXfDIt4aFYxCdADMIO9HZ5t79TdBnFEziqOdypPbEdzEUpQ/formResponse';

        const now = new Date();
        const params = new URLSearchParams();
        params.append('entry.1816583469', app.jobTitle || 'General Application');
        params.append('entry.1598123357', app.name || '');
        params.append('entry.1353759820', app.phone || '');
        params.append('entry.535730515', app.email || '');
        params.append('entry.1688199301', app.resumeLink || '');

        // Date mapping
        params.append('entry.1014585827_year', now.getFullYear().toString());
        params.append('entry.1014585827_month', (now.getMonth() + 1).toString());
        params.append('entry.1014585827_day', now.getDate().toString());

        return fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
    },
    deleteApplication: (id) => {
        let apps = window.applicationService.getApplications();
        apps = apps.filter(a => String(a.id) !== String(id));
        localStorage.setItem('zayin_apps', JSON.stringify(apps));
    }
};

window.contactService = {
    getContacts: () => {
        const contacts = localStorage.getItem('zayin_contacts');
        return contacts ? JSON.parse(contacts) : [];
    },
    addContact: (contact) => {
        const contacts = window.contactService.getContacts();
        contacts.push({ ...contact, id: Date.now(), date: new Date().toLocaleDateString() });
        localStorage.setItem('zayin_contacts', JSON.stringify(contacts));

        const formUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeq_MVcCTGrYWK01vYeALcadPU_HBxsnGjSW01UpJ_jlqjzlg/formResponse';

        const params = new URLSearchParams();
        params.append('entry.931431007', contact.name || '');
        params.append('entry.1449185787', contact.email || '');
        params.append('entry.404475525', contact.phone || '');
        params.append('entry.605355254', contact.domain || '');
        if (contact.purpose) {
            params.append('entry.2037613741', contact.purpose);
        }
        if (contact.message) {
            params.append('entry.1796405512', contact.message);
        }

        return fetch(formUrl, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
    },
    deleteContact: (id) => {
        let contacts = window.contactService.getContacts();
        contacts = contacts.filter(c => String(c.id) !== String(id));
        localStorage.setItem('zayin_contacts', JSON.stringify(contacts));
    }
};

window.optionsService = {
    getDomains: () => {
        const domains = localStorage.getItem('zayin_domains');
        if (!domains) {
            const initial = ["Job seeker", "Company"];
            localStorage.setItem('zayin_domains', JSON.stringify(initial));
            return initial;
        }
        return JSON.parse(domains);
    },
    addDomain: (domain) => {
        const domains = window.optionsService.getDomains();
        if (!domains.includes(domain)) {
            domains.push(domain);
            localStorage.setItem('zayin_domains', JSON.stringify(domains));
            window.syncService.sync('Domains', domains.map(d => ({name: d})));
        }
        return domains;
    },
    deleteDomain: (domain) => {
        let domains = window.optionsService.getDomains();
        domains = domains.filter(d => d !== domain);
        localStorage.setItem('zayin_domains', JSON.stringify(domains));
        window.syncService.sync('Domains', domains.map(d => ({name: d})));
        return domains;
    },
    getPurposes: () => {
        const purposes = localStorage.getItem('zayin_purposes');
        if (!purposes) {
            const initial = ["Job seeking", "Resume building", "Both job and new resume"];
            localStorage.setItem('zayin_purposes', JSON.stringify(initial));
            return initial;
        }
        return JSON.parse(purposes);
    },
    addPurpose: (purpose) => {
        const purposes = window.optionsService.getPurposes();
        if (!purposes.includes(purpose)) {
            purposes.push(purpose);
            localStorage.setItem('zayin_purposes', JSON.stringify(purposes));
            window.syncService.sync('Purposes', purposes.map(p => ({name: p})));
        }
        return purposes;
    },
    deletePurpose: (purpose) => {
        let purposes = window.optionsService.getPurposes();
        purposes = purposes.filter(p => p !== purpose);
        localStorage.setItem('zayin_purposes', JSON.stringify(purposes));
        window.syncService.sync('Purposes', purposes.map(p => ({name: p})));
        return purposes;
    }
};

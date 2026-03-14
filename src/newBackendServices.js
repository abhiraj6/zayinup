// newBackendServices.js
// This file replaces your existing localStorage & Google Apps Script sync logic
// ONCE you have Node.js and MongoDB running.
// Usage: Update your index.html to load `<script src="src/newBackendServices.js"></script>`
// instead of `<script src="src/services.js"></script>`

window.API_BASE_URL = "http://127.0.0.1:5000/api";

window.jobService = {
    getJobs: async () => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/jobs`);
            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (e) {
            console.error("Failed to fetch jobs:", e);
            return [];
        }
    },
    addJob: async (job) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(job)
            });
            return await res.json();
        } catch (e) {
            console.error("Failed to add job:", e);
        }
    },
    deleteJob: async (id) => {
        try {
            await fetch(`${window.API_BASE_URL}/jobs/${id}`, { method: 'DELETE' });
        } catch (e) {
            console.error("Failed to delete job:", e);
        }
    },
    updateJob: async (updatedJob) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/jobs/${updatedJob._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedJob)
            });
            return await res.json();
        } catch (e) {
            console.error("Failed to update job:", e);
        }
    }
};

window.collegeService = {
    getColleges: async () => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/colleges`);
            return await res.json();
        } catch (e) {
            console.error("Failed to fetch colleges", e);
            return [];
        }
    },
    addCollege: async (college) => {
        const programsArray = typeof college.programs === 'string'
            ? college.programs.split(',').map(p => p.trim())
            : college.programs;
        try {
            const res = await fetch(`${window.API_BASE_URL}/colleges`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...college, programs: programsArray })
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    },
    deleteCollege: async (id) => {
        try { await fetch(`${window.API_BASE_URL}/colleges/${id}`, { method: 'DELETE' }); }
        catch (e) { console.error("Failed", e); }
    },
    updateCollege: async (updatedCollege) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/colleges/${updatedCollege._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedCollege)
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    }
};

window.applicationService = {
    getApplications: async () => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/applications`);
            return await res.json();
        } catch (e) { return []; }
    },
    addApplication: async (app) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/applications`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(app)
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    },
    deleteApplication: async (id) => {
        try { await fetch(`${window.API_BASE_URL}/applications/${id}`, { method: 'DELETE' }); }
        catch (e) { console.error("Failed", e); }
    },
    updateApplicationStatus: async (id, status) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/applications/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    }
};

window.contactService = {
    getContacts: async () => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/contacts`);
            return await res.json();
        } catch (e) { return []; }
    },
    addContact: async (contact) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contact)
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    },
    deleteContact: async (id) => {
        try { await fetch(`${window.API_BASE_URL}/contacts/${id}`, { method: 'DELETE' }); }
        catch (e) { console.error("Failed", e); }
    },
    updateContactStatus: async (id, status) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/contacts/${id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status })
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    }
};

window.employeeService = {
    getEmployees: async () => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/employees`);
            return await res.json();
        } catch (e) { return []; }
    },
    addEmployee: async (emp) => {
        // Generating employeeId locally like it was before, or you could do it inside the backend controller.
        let emps = await window.employeeService.getEmployees();
        let prefix = "GN";
        if (emp.department === "Admin") prefix = "AD";
        else if (emp.department === "Marketing") prefix = "MK";
        else if (emp.department === "Database") prefix = "DB";
        else if (emp.department === "Telecaller") prefix = "TC";

        let maxNum = 0;
        emps.forEach(e => {
            if (e.employeeId && e.employeeId.startsWith(prefix)) {
                const numPart = parseInt(e.employeeId.substring(2)) || 0;
                if (numPart > maxNum) maxNum = numPart;
            }
        });

        const newId = prefix + (maxNum + 1).toString().padStart(4, '0');
        const newEmp = { ...emp, employeeId: newId };
        
        try {
            const res = await fetch(`${window.API_BASE_URL}/employees`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEmp)
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    },
    deleteEmployee: async (id) => {
        try { await fetch(`${window.API_BASE_URL}/employees/${id}`, { method: 'DELETE' }); }
        catch (e) { console.error("Failed", e); }
    },
    updateEmployee: async (updatedEmp) => {
        try {
            const res = await fetch(`${window.API_BASE_URL}/employees/${updatedEmp._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedEmp)
            });
            return await res.json();
        } catch (e) { console.error("Failed", e); }
    }
};

window.optionsService = {
    getDomains: () => ["Job seeker", "Company"],
    addDomain: (domain) => {},
    deleteDomain: (domain) => {},
    getPurposes: () => ["Job seeking", "Resume building", "Both job and new resume"],
    addPurpose: (purpose) => {},
    deletePurpose: (purpose) => {}
};

const { HashRouter, Routes, Route } = window.ReactRouterDOM;

// Layout wrap
const Layout = window.components.Layout;

// Pages
const Home = window.pages.Home;
const Services = window.pages.Services;
const Openings = window.pages.Openings;
const Register = window.pages.Register;
const Contact = window.pages.Contact;
const Admin = window.pages.Admin;
const Admission = window.pages.Admission;
const Employee = window.pages.Employee;

const App = () => {
    const [isSyncing, setIsSyncing] = React.useState(!!window.SYNC_URL);

    React.useEffect(() => {
        if (window.SYNC_URL) {
            window.syncService.init(() => {
                setIsSyncing(false);
            });
        }
    }, []);

    if (isSyncing) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-primary font-medium">Synchronizing with Cloud...</p>
                </div>
            </div>
        );
    }

    return (
        <HashRouter>
            <Routes>
                {/* Public portal pages using Layout with Navbar and Footer */}
                <Route path="/" element={<Layout><Home /></Layout>} />
                <Route path="/services" element={<Layout><Services /></Layout>} />
                <Route path="/openings" element={<Layout><Openings /></Layout>} />
                <Route path="/admission" element={<Layout><Admission /></Layout>} />
                <Route path="/register" element={<Layout><Register /></Layout>} />
                <Route path="/contact" element={<Layout><Contact /></Layout>} />

                {/* Admin Dashboard Page (Standalone without public layout features) */}
                <Route path="/admin" element={<Admin />} />
                <Route path="/employee" element={<Employee />} />
            </Routes>
        </HashRouter>
    );
};

// Render React App to the DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

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

const App = () => {
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
            </Routes>
        </HashRouter>
    );
};

// Render React App to the DOM
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);

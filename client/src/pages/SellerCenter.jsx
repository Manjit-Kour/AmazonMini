import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", key: "dashboard" },
  { label: "Add Product", key: "add" },
  { label: "View Products", key: "view" },
];

const SellerCenter = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r p-6">
        <nav className="space-y-3">
          {navItems.map((item) => (
            <Link to={`/${item.key}`}>
            <button
              key={item.key}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 text-gray-700"
            >
              {item.label}
            </button>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Seller Center</h1>
        {/* Render appropriate component here based on selected nav (e.g. via useState or routing) */}
        <p className="text-gray-600">Choose an option from the sidebar to get started.</p>
      </main>
    </div>
  );
};

export default SellerCenter;

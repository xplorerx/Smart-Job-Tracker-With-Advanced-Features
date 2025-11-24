import "../styles/globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Job Tracker</h1>
            <nav className="text-sm space-x-4">
              <a href="/" className="hover:underline">Dashboard</a>
              <a href="/applications" className="hover:underline">Applications</a>
              <a href="/interviews" className="hover:underline">Interviews</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}

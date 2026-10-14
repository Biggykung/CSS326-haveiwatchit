import { useMemo, useState } from "react";
import {
  Bell,
  CircleUserRound,
  Menu,
  MessageSquareMore,
  Search,
  UserRound,
} from "lucide-react";

const tabs = ["User", "Show", "Platform", "People", "Submission"];

const Admin = ({ user }) => {
  const [activeTab, setActiveTab] = useState("User");
  const [search, setSearch] = useState("");

  const userDetails = useMemo(
    () => [
      ["Username", user?.username],
      ["Email", user?.email],
      ["Role", user?.role],
      ["Account ID", user?.id],
      ["Joined", user?.created_at],
    ].filter(([, value]) => value !== undefined && value !== null && value !== ""),
    [user],
  );

  const matchesSearch = [user?.username, user?.email, user?.role]
    .filter(Boolean)
    .some((value) => String(value).toLowerCase().includes(search.trim().toLowerCase()));

  return (
    <main className="min-h-screen bg-white px-4 pb-16 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <header className="flex min-h-16 items-center gap-3 border-b border-slate-200 py-3">
          <button
            type="button"
            aria-label="Open navigation"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Menu size={18} />
          </button>
          <span className="rounded-full bg-sky-200 px-3 py-1 text-xs font-semibold text-slate-800">
            HAVEiWATCHit?
          </span>
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-purple-50 px-3 py-2">
            <span className="sr-only">Search users</span>
            <span className="shrink-0 text-xs font-medium text-slate-600">ALL ▾</span>
            <span className="h-4 border-l border-purple-200" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search users"
              className="min-w-0 flex-1 bg-transparent text-center text-sm outline-none placeholder:text-slate-500"
            />
            <Search size={16} className="shrink-0 text-slate-600" />
          </label>
          <span className="hidden h-6 border-l border-slate-300 sm:block" />
          <button
            type="button"
            aria-label="Notifications"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <Bell size={17} />
          </button>
          <button
            type="button"
            aria-label="Messages"
            className="rounded-full p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <MessageSquareMore size={17} />
          </button>
        </header>

        <h1 className="mt-3 text-center font-serif text-3xl">Admin</h1>

        <nav aria-label="Admin sections" className="mt-4 flex flex-wrap justify-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              aria-current={activeTab === tab ? "page" : undefined}
              onClick={() => setActiveTab(tab)}
              className={`min-w-24 rounded-full px-5 py-2 text-sm font-medium transition ${
                activeTab === tab
                  ? "bg-fuchsia-100 text-slate-900"
                  : "bg-sky-200 text-slate-900 hover:bg-sky-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {activeTab === "User" ? (
          <section
            aria-label="User information"
            className="mx-auto mt-8 max-w-4xl rounded-2xl bg-fuchsia-50 p-5 sm:p-8"
          >
            {matchesSearch ? (
              <article className="overflow-hidden bg-fuchsia-200">
                <header className="flex items-center gap-3 rounded-full bg-fuchsia-300 px-4 py-2">
                  <UserRound aria-hidden="true" size={19} className="fill-slate-950" />
                  <h2 className="text-sm font-semibold">User</h2>
                </header>

                <div className="grid gap-5 p-4 sm:grid-cols-[minmax(0,1fr)_150px] sm:p-5">
                  <dl className="grid gap-x-6 gap-y-3 rounded-xl bg-fuchsia-300 p-4 sm:grid-cols-2">
                    {userDetails.map(([label, value]) => (
                      <div key={label} className="min-w-0">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-700">
                          {label}
                        </dt>
                        <dd className="mt-1 truncate text-sm font-medium text-slate-950">
                          {String(value)}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex flex-row gap-3 sm:flex-col sm:items-stretch">
                    <button
                      type="button"
                      disabled
                      title="User editing is not connected yet"
                      className="flex-1 rounded-full bg-amber-200 px-5 py-2 text-sm font-medium text-slate-800 opacity-80 disabled:cursor-not-allowed sm:flex-none"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      disabled
                      title="User removal is not connected yet"
                      className="flex-1 rounded-full bg-rose-400 px-5 py-2 text-sm font-medium text-slate-950 opacity-80 disabled:cursor-not-allowed sm:mt-auto sm:flex-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <p className="rounded-xl bg-white/70 p-6 text-center text-sm text-slate-600">
                No users match “{search}”.
              </p>
            )}
          </section>
        ) : (
          <section className="mx-auto mt-8 max-w-4xl rounded-2xl bg-fuchsia-50 p-8 text-center">
            <CircleUserRound className="mx-auto text-fuchsia-400" size={32} />
            <p className="mt-3 font-medium">{activeTab} management is not available yet.</p>
          </section>
        )}
      </div>
    </main>
  );
};

export default Admin;

import SidebarLayout from "../sidbar/Sidebar";

export default function BlogsLayout({
  children,
  arai_label,
}: Readonly<{
  children: React.ReactNode;
  arai_label?: string;
}>) {
  return (
    <section
      aria-label={arai_label}
      className="grid lg:grid-cols-4 grid-cols-1 gap-5 mx-auto my-5 relative"
    >
      <div className="md:col-span-3 col-span-3 w-full">{children}</div>
      <SidebarLayout classNames="lg:block hidden  sticky top-0 h-screen no-scrollbar overflow-y-scroll z-10 lg:col-span-1 col-span-3" />
    </section>
  );
}

import React from "react";

export default function BlogDetailLayout({
  children,
  classNames,
}: Readonly<{ children: React.ReactNode; classNames?: string }>) {
  return (
    <section
      aria-label="blog-detail-layout"
      className={`${classNames} grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-10`}
    >
      <div className="col-span-1 lg:order-1 order-3"></div>
      <div className="col-span-2 lg:order-2 order-1">{children}</div>
      <div className="col-span-1 lg:order-3 order-2"></div>
    </section>
  );
}

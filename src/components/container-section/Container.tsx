export default function Container({
  classNames,
  children,
}: Readonly<{
  children: React.ReactNode;
  classNames?: string;
}>) {
  return (
    <section className={`${classNames} container px-2 text-primary`}>
      {children}
    </sec
  );
}

export default function Container({
  classNames,
  children,
}: Readonly<{
  children: React.ReactNode;
  classNames?: string;
}>) {
  return <section className={`${classNames} container my-5`}>{children}</section>;
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>This is a blog layout</h1>
      {children}
    </>
  );
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <h1>This is a post layout</h1>
      {children}
    </>
  );
}

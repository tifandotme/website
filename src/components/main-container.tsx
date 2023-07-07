// You might be thinking, why would I need a separate component for a single main tag? I could've just put this directly in (nav)/layout. Well, it's because I need to have a different layout for the blog post page.

// Premature abstraction? Maybe. I want to have a single source for the class names, okay. Stop asking anymore questions, you are making this comment longer than the code itself.

export function MainContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className="mx-auto mb-20 max-w-screen-md px-3 animate-in fade-in-60 duration-75 sm:px-5">
      {children}
    </main>
  );
}

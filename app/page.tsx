type HomeProps = {
  children: React.ReactNode;
};

export default function Home(props: HomeProps) {
  const { children } = props;
  return (
    <main className="flex flex-1 items-center justify-center p-24">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
      {children}
    </main>
  );
}

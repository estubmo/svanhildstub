export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-muted-foreground container mx-auto mt-10 flex max-h-full w-full flex-col gap-6 md:mt-20">
      {children}
    </div>
  );
}

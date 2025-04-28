import ProtectedRoutesWrapper from "@/components/protectedRoutesWrapper";

export default function PrivateRoutesLayout ({ children }: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ProtectedRoutesWrapper>
      <main className="flex justify-center items-center h-dvh">
        {children}
      </main>
    </ProtectedRoutesWrapper>
  );
}
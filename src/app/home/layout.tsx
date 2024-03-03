export default function LoginLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
        {children}
      </div>
    );
  }
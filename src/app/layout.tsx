export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen">
          <main className="max-w-4xl mx-auto p-6">
            {children}
          </main>
      </body>
    </html>
  )
}
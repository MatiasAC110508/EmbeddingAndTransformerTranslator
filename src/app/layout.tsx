import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Embedding and Transformer Workspace",
  description:
    "A minimal Next.js workspace for authentication, transformer analysis, and vector inspection.",
  other: {
    google: "notranslate",
  },
};

// The root layout keeps the viewport fixed so each page can manage its own ergonomic shell.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      translate="no"
      suppressHydrationWarning
      className="notranslate"
    >
      <body suppressHydrationWarning className="notranslate">
        <div className="app-shell">
          <main className="flex min-h-0 flex-1 overflow-hidden px-4 py-4 sm:px-6 sm:py-5">
            <div className="container mx-auto flex min-h-0 flex-1">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}

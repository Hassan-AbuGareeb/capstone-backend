import "./globals.css";

export const metadata = {
  title: "Food ordering website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

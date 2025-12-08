export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full px-4 py-2 border-t text-center text-sm text-gray-500 h-12 items-center justify-center flex">
      <p>© {year} Central 504. Creado por Ángel Bolado Carletti</p>
    </footer>
  );
}

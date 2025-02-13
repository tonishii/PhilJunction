import logo from "@/public/logo.svg";
export default function Logo({ className }: { className: string }) {
  return (
    <img
      className={className ?? "header-logo"}
      src={logo}
      alt="PhilJunction Logo"
      role="img"
    />
  );
}

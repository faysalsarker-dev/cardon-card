import { Link } from "react-router";

type LogoProps = {
  size?: number;
  className?: string;
};

const Logo = ({ size = 200, className }: LogoProps) => {
  return (
    <Link to="/" className="inline-block">
      <img
        src="/carbon.png" 
        alt="Logo"
        width={size}
        height={size}
        className={className}
        style={{ objectFit: "contain" }}
      />
    </Link>
  );
};

export default Logo;
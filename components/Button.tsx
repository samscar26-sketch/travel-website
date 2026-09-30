import Image from "next/image";

type ButtonProps = {
  type: 'button' | 'submit';
  title: string;
  icon?: string;
  variant: string;
  full?: boolean;
  href?: string;
  onClick?: () => void;
}

const Button = ({ type, title, icon, variant, full, href, onClick }: ButtonProps) => {
  const className = `flexCenter gap-3 rounded-full border ${variant} ${full && 'w-full'}`
  const content = (
    <>
      {icon && <Image src={icon} alt={title} width={24} height={24} />}
      <span className="bold-16 whitespace-nowrap">{title}</span>
    </>
  )

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {content}
      </a>
    )
  }

  return (
    <button className={className} type={type} onClick={onClick}>
      {content}
    </button>
  )
}

export default Button
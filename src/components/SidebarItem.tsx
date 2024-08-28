import { Image } from "@nextui-org/react";

interface SidebarItemProps {
  text: string;
  active?: boolean;
  icon: string;
}

const SidebarItem = ({text, active, icon}: SidebarItemProps) => {
  const bgColor = active ? 'bg-gradient-to-l from-[#432a2b] border-r-4 border-r-[#da574c] text-[#b4483f]' : 'bg-inherit';
  return (
    <div className={`${bgColor} h-16 flex items-center gap-4 pl-6`}>
      <Image width={20} src={icon}/>
      {text}
    </div>
  )
}

export default SidebarItem;
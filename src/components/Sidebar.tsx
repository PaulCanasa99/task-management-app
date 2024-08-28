import { Image } from "@nextui-org/react";
import raven from '../assets/raven.svg'
import grid from '../assets/grid.svg'
import menu from '../assets/menu.svg'
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  return (
    <div className='bg-[#2c2f33] rounded-xl h-screen'>
      <Image
        width={400}
        alt="Raven logo"
        src={raven}
      />
      <SidebarItem icon={grid} text="Dashboard" active/>
      <SidebarItem icon={menu} text="My Task"/>
    </div>
  )
}

export default Sidebar;
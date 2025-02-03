import Image from "next/image";
import logo from '../../public/logo.svg';
import Menu from "./Menu";

const Sidebar = () => {
    return <section className="w-[240px] border-r flex flex-col h-[100vh] fixed ml-[-240px] lg:ml-[0]">
    <div className="ml-[auto] mr-[auto] mb-[4em] pl-[1em] pt-[2em] w-[93%]">
      <Image
        src={logo}
        width={110}
        height={40}
        alt="logo"
      />
    </div>
    <div>
      <Menu />
    </div>
  </section>
}

export default Sidebar;
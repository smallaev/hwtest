import Link from "next/link";
import { GlobeAltIcon, HomeIcon, TicketIcon } from "@heroicons/react/24/outline";

const Menu = () => {
    return <ul className="w-[93%] m-[auto] text-[98%]">
      <li>
        <Link href='/' className="flex items-center gap-2.5 p-[0.8em]">
          <GlobeAltIcon className="size-7 text-gray-300" /> Destinations
        </Link>
      </li>
      <li>
        <Link href='/' className="flex items-center gap-2.5 p-[0.8em]">
          <HomeIcon className="size-7 text-gray-300" /> Hotels
        </Link>
      </li>
      <li>
        <Link href='/' className="flex items-center gap-2.5 bg-[var(--hw-brand-color)] p-[0.8em] rounded-lg font-semibold">
          <TicketIcon className="size-7 text-black" />My Trips
        </Link>
      </li>
    </ul>
}

export default Menu;
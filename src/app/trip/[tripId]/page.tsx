import DestinationList from "@/components/DestinationList";
import { ArrowLeftIcon, MapPinIcon } from "@heroicons/react/24/outline";
import Link from "next/link";


export default async function Trip({ params }: 
  { 
    params: Promise<{ tripId: string }>
  }
) {

  const tripId = (await params).tripId;

  return (
    <main className="p-[2em]">
      <h1 className="text-3xl font-bold text-center sm:text-left mb-[1.5em] flex items-center justify-between border-b pb-[0.5em]">
        <span className="flex items-center">
          <Link href='/'>
            <ArrowLeftIcon 
              className="size-10 mr-[0.6em] border-[1px] border-gray-400 rounded-lg block p-[8px]" 
            />
          </Link>
          <span>Trip { tripId }</span>
        </span>
      </h1>
      <div className="text-xl mb-[2em] flex items-center gap-5">
        <MapPinIcon className="size-8" />
        <span>
          Invite your travel partners and vote for your next destination
        </span>
      </div>
      <DestinationList tripId={
        parseInt(tripId) 
      }/>
    </main>

  );
}

export const dynamic = 'force-dynamic';
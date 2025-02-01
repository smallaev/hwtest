import DestinationList from "@/components/DestinationList";
// import { cookies } from "next/headers";


export default async function Trip({ params }: 
  { 
    params: Promise<{ tripId: string }>
  }
) {

  // const cookieStore = await cookies();

  const tripId = (await params).tripId;

  return (
    <main className="p-[2em]">
      <h1 className="text-xl font-bold text-center m-[2em]">Trip { tripId }</h1>
      <DestinationList tripId={
        parseInt(tripId) 
      }/>
    </main>

  );
}

export const dynamic = 'force-dynamic';
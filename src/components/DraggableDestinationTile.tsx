import { Destination } from "@/data";
import { useDraggable } from '@dnd-kit/core';
import DestinationTile from "./DestinationTile";


const DraggableDestinationTile: React.FC<{
    destination: Destination,
}> = ({ destination }) => {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: destination.id,
    });
    const style = transform ? {
        transform: `rotate(3deg) translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 5,
        touchAction: 'none',
        boxShadow: '0 0 8px rgba(1,1,1,0.5)'
    } : { 
        touchAction: 'none'
    };

    return <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        className="rounded-xl"
        style={style}
    >
        <DestinationTile destination={destination} />
    </div>
}
export default DraggableDestinationTile;
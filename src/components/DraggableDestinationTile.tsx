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
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 5,
        touchAction: 'none'
    } : { 
        touchAction: 'none'
    };

    return <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
    >
        <DestinationTile destination={destination} />
    </div>
}
export default DraggableDestinationTile;
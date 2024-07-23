import { useEffect, useState } from 'react';

interface ResizeHelperProps {
    containerRef: React.RefObject<HTMLDivElement>;
    cardWidth: number;
    onResize: (itemsPerPage: number) => void;
    itemslength: number;
}

const ResizeHelper = ({ containerRef, cardWidth, onResize, itemslength}: ResizeHelperProps) => {
    const [] = useWindowSize();

    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useEffect(() => {
            function updateSize() {
                setSize([window.innerWidth, window.innerHeight]);
                calculateItemsPerPage();
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }

    const calculateItemsPerPage = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const maxItemsPerPage = Math.floor(containerWidth / cardWidth);
        const newItemsPerPage = Math.min(maxItemsPerPage, itemslength); // Assuming a maximum of 100 items

        onResize(newItemsPerPage);
    };

    return null; // No UI element needed, just handles resizing logic
};

export default ResizeHelper;

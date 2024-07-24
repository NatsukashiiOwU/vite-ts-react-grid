import { useEffect, useState } from 'react';

interface ResizeHelperProps {
    containerRef: React.RefObject<HTMLDivElement>;
    cardWidth: number;
    onResize: (itemsPerPage: number, currentPage: number) => void;
    itemslength: number;
    currentPage: number;
}

const ResizeHelper = ({ containerRef, cardWidth, onResize, itemslength, currentPage }: ResizeHelperProps) => {
    const [windowSize, setWindowSize] = useState([0, 0]);

    useEffect(() => {
        function updateSize() {
            setWindowSize([window.innerWidth, window.innerHeight]);
            calculateItemsPerPage();
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const calculateItemsPerPage = () => {
        const containerWidth = containerRef.current?.offsetWidth || 0;
        const maxItemsPerPage = Math.floor(containerWidth / cardWidth);
        const newItemsPerPage = Math.min(maxItemsPerPage, itemslength);

        const newCurrentPage = Math.min(currentPage, Math.ceil(itemslength / newItemsPerPage));

        onResize(newItemsPerPage, newCurrentPage);
    };

    return null;
};

export default ResizeHelper;

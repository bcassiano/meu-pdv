"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "../lib/utils";

interface ScrollAreaWithArrowsProps {
    children: React.ReactNode;
    className?: string;
    containerClassName?: string;
    arrowClassName?: string;
    gradientWidth?: number;
}

export const ScrollAreaWithArrows: React.FC<ScrollAreaWithArrowsProps> = ({
    children,
    className,
    containerClassName,
    arrowClassName,
    gradientWidth = 40,
}) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    const checkScroll = useCallback(() => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 5);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(checkScroll, 100); // Aguarda renderização inicial
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => {
            window.removeEventListener("resize", checkScroll);
            clearTimeout(timer);
        };
    }, [checkScroll, children]);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.clientWidth * 0.6;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className={cn("relative flex-1 min-w-0 overflow-hidden group/scroll-area flex items-center", containerClassName)}>
            {/* Seta Esquerda */}
            {showLeftArrow && (
                <button 
                    onClick={() => scroll("left")}
                    className={cn(
                        "absolute left-0 top-1/2 -translate-y-1/2 z-20 h-full w-10 flex items-center justify-start bg-gradient-to-r from-white dark:from-[#1a2332] to-transparent text-[#1152d4] hover:scale-110 transition-all pl-1",
                        arrowClassName
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">chevron_left</span>
                </button>
            )}
            
            <div 
                ref={scrollRef}
                onScroll={checkScroll}
                className={cn(
                    "flex items-center gap-1.5 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full scroll-smooth",
                    className
                )}
            >
                {children}
            </div>

            {/* Seta Direita */}
            {showRightArrow && (
                <button 
                    onClick={() => scroll("right")}
                    className={cn(
                        "absolute right-0 top-1/2 -translate-y-1/2 z-20 h-full w-10 flex items-center justify-end bg-gradient-to-l from-white dark:from-[#1a2332] to-transparent text-[#1152d4] hover:scale-110 transition-all pr-1",
                        arrowClassName
                    )}
                >
                    <span className="material-symbols-outlined text-[24px]">chevron_right</span>
                </button>
            )}
        </div>
    );
};

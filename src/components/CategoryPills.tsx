import React, { useRef, useState, useEffect, ElementRef } from 'react';
import Button from './Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CategoryPillProps = {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
};

const TRANSLATE_AMOUNT = 200;

export default function CategoryPills({
  categories,
  selectedCategory,
  onSelect,
}: CategoryPillProps) {
  const [isLeftVisible, setIsLeftVisible] = useState(true);
  const [isRightVisible, setIsRightVisible] = useState(true);
  const [translate, setTranslate] = useState(0);
  // const containerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<ElementRef<'div'>>(null);
  console.log(translate);

  useEffect(() => {
    if (containerRef.current == null) return;
    // const edge = containerRef.current.scrollWidth;
    // const width = containerRef.current.clientWidth;
    // // const newTranslate = translate + TRANSLATE_AMOUNT;
    // console.log(edge, width);
    // if (translate + width >= edge) {
    //   setIsRightVisible(false);
    // } else {
    //   setIsRightVisible(true);
    // }
    // if (translate <= 0) {
    //   setIsLeftVisible(false);
    // } else {
    //   setIsLeftVisible(true);
    // }

    const observer = new ResizeObserver((entries) => {
      console.log(entries);
      const container = entries[0]?.target;
      if (!container) return;
      setIsLeftVisible(translate > 0);
      setIsRightVisible(
        translate + container.clientWidth < container.scrollWidth
      );
    });
    observer.observe(containerRef.current);
  }, [categories, translate]);

  return (
    <div className="overflow-x-hidden relative" ref={containerRef}>
      <div
        className="flex whitespace-nowrap gap-3 transition-transform w-[max-content]"
        style={{ transform: `translateX(-${translate}px)` }}
      >
        {categories.map((category) => (
          <Button
            onClick={() => onSelect(category)}
            variant={category === selectedCategory ? 'dark' : 'default'}
            key={category}
            className="py-1 px-3 rounded-lg whitespace-nowrap"
          >
            {category}
          </Button>
        ))}
      </div>

      {isLeftVisible && (
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2
      bg-gradient-to-r from-white from-50% to-transparent w-24 h-full"
        >
          <Button
            onClick={() =>
              setTranslate((translate) => {
                const newTranslate = translate - TRANSLATE_AMOUNT;
                if (newTranslate <= 0) return 0;
                return newTranslate;
              })
            }
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto p-1.5"
          >
            <ChevronLeft />
          </Button>
        </div>
      )}
      {isRightVisible && (
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2
      bg-gradient-to-l from-white from-50% to-transparent w-24 h-full"
        >
          <Button
            variant="ghost"
            size="icon"
            className="h-full aspect-square w-auto ml-auto p-1.5"
            onClick={() => {
              setTranslate((translate) => {
                if (containerRef.current == null) return translate;
                const edge = containerRef.current.scrollWidth;
                const width = containerRef.current.clientWidth;
                const newTranslate = translate + TRANSLATE_AMOUNT;
                if (newTranslate + width >= edge) return edge - width;
                return newTranslate;
              });
            }}
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}

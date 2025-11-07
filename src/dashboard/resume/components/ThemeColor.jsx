import React, { useContext, useCallback, useMemo, useRef, useEffect } from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from '@/components/ui/button';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

// Memoize the colors array to prevent recreation on every render
const COLORS = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
];

// Memoize the color item component to prevent unnecessary re-renders
const ColorItem = React.memo(({ color, isSelected, onSelect }) => (
    <div 
        onClick={() => onSelect(color)}
        className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border ${
            isSelected ? 'border-black' : ''
        }`}
        style={{ backgroundColor: color }}
    />
));

function ThemeColor() {
    const { state: resumeInfo, setState: setResumeInfo } = useContext(ResumeInfoContext);
    const { resumeId } = useParams();
    const selectedColor = resumeInfo?.themeColor || COLORS[0];
    
    const onColorSelect = useCallback(async (color) => {
        if (color === selectedColor) return;
        
        const previousColor = selectedColor;
        
        try {
            // Optimistic update
            setResumeInfo(prev => ({
                ...prev,
                themeColor: color
            }));
            
            await GlobalApi.UpdateResumeDetail(resumeId, {
                data: { themeColor: color }
            });
            
            toast.success('Theme Color Updated');
        } catch (error) {
            console.error('Error updating theme color:', error);
            toast.error('Failed to update theme color');
            // Revert on error
            setResumeInfo(prev => ({
                ...prev,
                themeColor: previousColor
            }));
        }
    }, [resumeId, selectedColor, setResumeInfo]);

    // Memoize the color items to prevent recreation on every render
    const colorItems = useMemo(() => (
        COLORS.map((color, index) => (
            <ColorItem 
                key={index}
                color={color}
                isSelected={color === selectedColor}
                onSelect={onColorSelect}
            />
        ))
    ), [selectedColor, onColorSelect]);

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="flex gap-2">
                    <LayoutGrid size={16} /> Theme
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60">
                <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
                <div className="grid grid-cols-5 gap-3">
                    {colorItems}
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default ThemeColor
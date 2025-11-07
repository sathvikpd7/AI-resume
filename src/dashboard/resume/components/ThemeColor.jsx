import React, { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from '@service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext);
    const {resumeId} = useParams();
    const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || colors[0]);

    // Initialize selectedColor from resumeInfo.themeColor on mount
    React.useEffect(() => {
        if (resumeInfo?.themeColor) {
            setSelectedColor(resumeInfo.themeColor);
        }
    }, [resumeInfo?.themeColor]);

    const onColorSelect = React.useCallback(async (color) => {
        if (color === selectedColor) return; // Prevent unnecessary updates
        
        try {
            // Optimistic UI update
            setSelectedColor(color);
            
            const updatedResumeInfo = {
                ...resumeInfo,
                themeColor: color
            };
            
            setResumeInfo(updatedResumeInfo);
            
            const data = {
                data: {
                    themeColor: color
                }
            };
            
            await GlobalApi.UpdateResumeDetail(resumeId, data);
            toast('Theme Color Updated');
        } catch (error) {
            console.error('Error updating theme color:', error);
            toast.error('Failed to update theme color');
            // Revert on error
            setSelectedColor(resumeInfo?.themeColor);
        }
    }, [resumeInfo, resumeId, selectedColor, setResumeInfo]);

  return (
    <Popover>
  <PopoverTrigger asChild>
  <Button variant="outline" size="sm" 
          className="flex gap-2" > <LayoutGrid/> Theme</Button>
  </PopoverTrigger>
  <PopoverContent>
    <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-3'>
        {colors.map((item,index)=>(
            <div 
            key={`color-${index}`}
            onClick={()=>onColorSelect(item)}
            className={`h-5 w-5 rounded-full cursor-pointer
             hover:border-black border
             ${selectedColor==item&&'border border-black'}
             `}
            style={{
                background:item
            }}>

            </div>
        ))}
    </div>
  </PopoverContent>
</Popover>
  )
}

export default ThemeColor
import { memo, useCallback, useContext, useMemo } from 'react';
import { LayoutGrid } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';

const COLORS = [
  '#FF5733', '#33FF57', '#3357FF', '#FF33A1', '#A133FF',
  '#33FFA1', '#FF7133', '#71FF33', '#7133FF', '#FF3371',
  '#33FF71', '#3371FF', '#A1FF33', '#33A1FF', '#FF5733',
  '#5733FF', '#33FF5A', '#5A33FF', '#FF335A', '#335AFF',
];

const ColorItem = memo(function ColorItem({ color, isSelected, onSelect }) {
  return (
    <button
      type='button'
      onClick={() => onSelect(color)}
      className={`h-5 w-5 rounded-full border transition hover:border-black ${isSelected ? 'border-black' : 'border-transparent'}`}
      style={{ backgroundColor: color }}
      aria-label={`Select ${color} theme`}
    />
  );
});

function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();
  const selectedColor = resumeInfo?.themeColor || COLORS[0];

  const onColorSelect = useCallback(async (color) => {
    if (!resumeId || color === selectedColor) return;

    const previousColor = selectedColor;
    setResumeInfo((prev) => ({
      ...prev,
      themeColor: color,
    }));

    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: { themeColor: color },
      });
      toast.success('Theme color updated');
    } catch (error) {
      console.error('Error updating theme color:', error);
      toast.error('Failed to update theme color');
      setResumeInfo((prev) => ({
        ...prev,
        themeColor: previousColor,
      }));
    }
  }, [resumeId, selectedColor, setResumeInfo]);

  const colorItems = useMemo(
    () =>
      COLORS.map((color) => (
        <ColorItem
          key={color}
          color={color}
          isSelected={color === selectedColor}
          onSelect={onColorSelect}
        />
      )),
    [selectedColor, onColorSelect]
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='flex gap-2'>
          <LayoutGrid size={16} /> Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-60'>
        <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
        <div className='grid grid-cols-5 gap-3'>{colorItems}</div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
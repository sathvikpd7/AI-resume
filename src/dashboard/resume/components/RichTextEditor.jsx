import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AIModal';
import { toast } from 'sonner';

const PROMPT =
  'position title: {positionTitle}. Based on the position title, give me 5-7 concise bullet points that describe professional experience for a resume. Use clean HTML without mentioning experience level and without JSON.';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAI = async () => {
    const positionTitle = resumeInfo?.experience?.[index]?.title;
    if (!positionTitle) {
      toast('Please add a position title first');
      return;
    }

    try {
      setLoading(true);
      const prompt = PROMPT.replace('{positionTitle}', positionTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response?.text?.() ?? '';
      if (responseText) {
        setValue(responseText.replace('[', '').replace(']', ''));
        onRichTextEditorChange({ target: { value: responseText } });
      }
    } catch (error) {
      toast.error('Unable to generate summary right now');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='my-2 flex justify-between'>
        <label className='text-xs'>Summary</label>
        <Button
          variant='outline'
          size='sm'
          onClick={generateSummaryFromAI}
          disabled={loading}
          className='flex gap-2 border-primary text-primary'
        >
          {loading ? <LoaderCircle className='animate-spin' /> : <><Brain className='h-4 w-4' /> Generate from AI</>}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
            onRichTextEditorChange(event);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { AIChatSession } from './../../../../../service/AIModal';

const PROMPT =
  'Job Title: {jobTitle}. Based on the job title, craft three concise resume summaries for junior, mid-level, and senior experience. Respond as JSON array with fields "summary" and "experience_level".';

function Summery({ enabledNext = () => {} }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState(resumeInfo?.summery || '');
  const [loading, setLoading] = useState(false);
  const [aiSummaries, setAiSummaries] = useState([]);

  useEffect(() => {
    setSummary(resumeInfo?.summery || '');
  }, [resumeInfo?.summery]);

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      summery: summary,
    }));
  }, [summary, setResumeInfo]);

  const generateSummaryFromAI = async () => {
    const jobTitle = resumeInfo?.jobTitle;
    if (!jobTitle) {
      toast('Please add a job title first');
      return;
    }

    try {
      setLoading(true);
      const prompt = PROMPT.replace('{jobTitle}', jobTitle);
      const result = await AIChatSession.sendMessage(prompt);
      const responseText = result.response?.text?.();
      if (!responseText) throw new Error('No AI response received');
      const parsed = JSON.parse(responseText);
      setAiSummaries(Array.isArray(parsed) ? parsed : []);
    } catch (error) {
      console.error('AI summary error:', error);
      toast.error('Unable to generate AI suggestions at the moment');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (!params?.resumeId) return;
    setLoading(true);
    try {
      await GlobalApi.UpdateResumeDetail(params.resumeId, {
        data: { summery: summary },
      });
      toast('Summary updated');
      enabledNext(true);
    } catch (error) {
      toast.error('Unable to save summary');
    } finally {
      setLoading(false);
    }
  };

  const handleSummaryChange = (event) => {
    enabledNext(false);
    setSummary(event.target.value);
  };

  return (
    <div>
      <div className='mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg'>
        <h2 className='text-lg font-bold'>Summary</h2>
        <p>Add a professional summary for your job title</p>

        <form className='mt-7' onSubmit={handleSave}>
          <div className='flex items-end justify-between'>
            <label htmlFor='summary'>Summary</label>
            <Button
              variant='outline'
              onClick={generateSummaryFromAI}
              type='button'
              size='sm'
              className='flex gap-2 border-primary text-primary'
              disabled={loading}
            >
              <Brain className='h-4 w-4' /> Generate from AI
            </Button>
          </div>
          <Textarea
            id='summary'
            className='mt-5'
            required
            rows={6}
            value={summary}
            onChange={handleSummaryChange}
          />
          <div className='mt-2 flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>

      {aiSummaries.length > 0 && (
        <div className='my-5'>
          <h2 className='text-lg font-bold'>Suggestions</h2>
          {aiSummaries.map((item, index) => (
            <div
              key={`summary-suggestion-${index}`}
              onClick={() => setSummary(item?.summary || '')}
              className='my-4 cursor-pointer rounded-lg p-5 shadow-lg'
            >
              <h3 className='my-1 font-bold text-primary'>Level: {item?.experience_level}</h3>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summery;
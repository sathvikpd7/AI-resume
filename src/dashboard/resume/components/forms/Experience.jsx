import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import RichTextEditor from '../RichTextEditor';

const EMPTY_EXPERIENCE = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummary: '',
};

const normaliseExperience = (list = []) =>
  list.length
    ? list.map((item) => ({
        ...EMPTY_EXPERIENCE,
        ...item,
        workSummary: item.workSummary ?? item.workSummery ?? '',
      }))
    : [{ ...EMPTY_EXPERIENCE }];

function Experience() {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState(() =>
    normaliseExperience(resumeInfo?.experience)
  );
  const [loading, setLoading] = useState(false);

  const updateExperienceList = useCallback(
    (updater) => {
      setExperienceList((prev) => {
        const next = updater(prev);
        setResumeInfo((prevInfo) => {
          if (!prevInfo) {
            return { experience: next };
          }

          if (prevInfo.experience === next) {
            return prevInfo;
          }

          return {
            ...prevInfo,
            experience: next,
          };
        });
        return next;
      });
    },
    [setResumeInfo]
  );

  useEffect(() => {
    if (resumeInfo?.experience) {
      setExperienceList(normaliseExperience(resumeInfo.experience));
    }
  }, [resumeInfo?.experience]);

  const handleChange = useCallback((index, event) => {
    const { name, value } = event.target;
    updateExperienceList((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [name]: value,
      };
      return next;
    });
  }, [updateExperienceList]);

  const handleSummaryChange = useCallback((index, event) => {
    const { value } = event.target;
    updateExperienceList((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        workSummary: value,
      };
      return next;
    });
  }, [updateExperienceList]);

  const addExperience = useCallback(() => {
    updateExperienceList((prev) => [...prev, { ...EMPTY_EXPERIENCE }]);
  }, [updateExperienceList]);

  const removeExperience = useCallback(() => {
    updateExperienceList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, [updateExperienceList]);

  const onSave = async () => {
    if (!params?.resumeId) return;
    setLoading(true);
    try {
      await GlobalApi.UpdateResumeDetail(params.resumeId, {
        data: { experience: experienceList },
      });
      toast('Experience updated');
    } catch (error) {
      toast.error('Unable to save experience');
    } finally {
      setLoading(false);
    }
  };

  const fields = useMemo(
    () => [
      { name: 'title', label: 'Position Title' },
      { name: 'companyName', label: 'Company Name' },
      { name: 'city', label: 'City' },
      { name: 'state', label: 'State' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
    ],
    []
  );

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg'>
      <h2 className='text-lg font-bold'>Professional Experience</h2>
      <p>Add your previous job experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={`experience-${index}`} className='my-5 rounded-lg border p-3'>
            <div className='grid grid-cols-2 gap-3'>
              {fields.map(({ name, label, type = 'text' }) => (
                <div key={name}>
                  <label className='text-xs'>{label}</label>
                  <Input
                    name={name}
                    type={type}
                    value={item[name] ?? ''}
                    onChange={(event) => handleChange(index, event)}
                  />
                </div>
              ))}
              <div className='col-span-2'>
                <RichTextEditor
                  index={index}
                  defaultValue={item.workSummary}
                  onRichTextEditorChange={(event) => handleSummaryChange(index, event)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={addExperience} className='text-primary'>
            + Add More Experience
          </Button>
          <Button variant='outline' onClick={removeExperience} className='text-primary'>
            - Remove
          </Button>
        </div>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  );
}

export default Experience;
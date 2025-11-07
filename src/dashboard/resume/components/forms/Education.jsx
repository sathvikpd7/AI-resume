import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EMPTY_EDUCATION = {
  universityName: '',
  degree: '',
  major: '',
  startDate: '',
  endDate: '',
  description: '',
};

function Education() {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [educationalList, setEducationalList] = useState(() =>
    resumeInfo?.education?.length ? resumeInfo.education : [EMPTY_EDUCATION]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.education?.length) {
      setEducationalList(resumeInfo.education);
    }
  }, [resumeInfo?.education]);

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      education: educationalList,
    }));
  }, [educationalList, setResumeInfo]);

  const handleChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setEducationalList((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [name]: value,
      };
      return next;
    });
  }, []);

  const addEducation = useCallback(() => {
    setEducationalList((prev) => [...prev, { ...EMPTY_EDUCATION }]);
  }, []);

  const removeEducation = useCallback(() => {
    setEducationalList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const onSave = async () => {
    if (!params?.resumeId) return;
    setLoading(true);
    try {
      await GlobalApi.UpdateResumeDetail(params.resumeId, {
        data: { education: educationalList },
      });
      toast('Education updated');
    } catch (error) {
      toast.error('Unable to save education details');
    } finally {
      setLoading(false);
    }
  };

  const fields = useMemo(
    () => [
      { name: 'universityName', label: 'University Name', colSpan: 2 },
      { name: 'degree', label: 'Degree' },
      { name: 'major', label: 'Major' },
      { name: 'startDate', label: 'Start Date', type: 'date' },
      { name: 'endDate', label: 'End Date', type: 'date' },
      { name: 'description', label: 'Description', colSpan: 2, isTextarea: true },
    ],
    []
  );

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg'>
      <h2 className='text-lg font-bold'>Education</h2>
      <p>Add your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={`education-${index}`} className='my-5 rounded-lg border p-3'>
            <div className='grid grid-cols-2 gap-3'>
              {fields.map(({ name, label, colSpan, type = 'text', isTextarea }) => (
                <div key={name} className={colSpan === 2 ? 'col-span-2' : undefined}>
                  <label className='text-sm'>{label}</label>
                  {isTextarea ? (
                    <Textarea
                      name={name}
                      value={item[name] ?? ''}
                      onChange={(event) => handleChange(index, event)}
                      rows={4}
                    />
                  ) : (
                    <Input
                      name={name}
                      type={type}
                      value={item[name] ?? ''}
                      onChange={(event) => handleChange(index, event)}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={addEducation} className='text-primary'>
            + Add More Education
          </Button>
          <Button variant='outline' onClick={removeEducation} className='text-primary'>
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

export default Education;
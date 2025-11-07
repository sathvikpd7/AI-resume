import '@smastrom/react-rating/style.css';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { Rating } from '@smastrom/react-rating';
import { LoaderCircle } from 'lucide-react';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EMPTY_SKILL = { name: '', rating: 0 };

function Skills() {
  const { resumeId } = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [skillsList, setSkillsList] = useState(() =>
    resumeInfo?.skills?.length ? resumeInfo.skills : [{ ...EMPTY_SKILL }]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (resumeInfo?.skills) {
      setSkillsList(
        resumeInfo.skills.length ? resumeInfo.skills : [{ ...EMPTY_SKILL }]
      );
    }
  }, [resumeInfo?.skills]);

  useEffect(() => {
    setResumeInfo((prev) => ({
      ...prev,
      skills: skillsList,
    }));
  }, [skillsList, setResumeInfo]);

  const handleChange = useCallback((index, key, value) => {
    setSkillsList((prev) => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [key]: value,
      };
      return next;
    });
  }, []);

  const addSkill = useCallback(() => {
    setSkillsList((prev) => [...prev, { ...EMPTY_SKILL }]);
  }, []);

  const removeSkill = useCallback(() => {
    setSkillsList((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  }, []);

  const onSave = async () => {
    if (!resumeId) return;
    setLoading(true);
    try {
      await GlobalApi.UpdateResumeDetail(resumeId, {
        data: { skills: skillsList },
      });
      toast('Skills updated');
    } catch (error) {
      toast.error('Unable to save skills');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg'>
      <h2 className='text-lg font-bold'>Skills</h2>
      <p>Add your top professional key skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div key={`skill-${index}`} className='mb-2 flex items-center justify-between rounded-lg border p-3'>
            <div className='flex-1 pr-4'>
              <label className='text-xs'>Name</label>
              <Input
                className='w-full'
                value={item.name}
                onChange={(event) => handleChange(index, 'name', event.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 140 }}
              value={item.rating}
              onChange={(value) => handleChange(index, 'rating', value)}
            />
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <div className='flex gap-2'>
          <Button variant='outline' onClick={addSkill} className='text-primary'>
            + Add Skill
          </Button>
          <Button variant='outline' onClick={removeSkill} className='text-primary'>
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

export default Skills;
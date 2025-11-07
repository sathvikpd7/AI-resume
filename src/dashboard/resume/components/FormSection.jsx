import { useEffect, useMemo, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Education from './forms/Education';
import Experience from './forms/Experience';
import PersonalDetail from './forms/PersonalDetail';
import Skills from './forms/Skills';
import Summery from './forms/Summery';
import ThemeColor from './ThemeColor';

function FormSection() {
  const { resumeId } = useParams();
  const [activeFormIndex, setActiveFormIndex] = useState(0);
  const [enableNext, setEnableNext] = useState(true);

  const steps = useMemo(
    () => [
      {
        key: 'personal',
        component: <PersonalDetail enabledNext={setEnableNext} />,
      },
      {
        key: 'summary',
        component: <Summery enabledNext={setEnableNext} />,
      },
      { key: 'experience', component: <Experience /> },
      { key: 'education', component: <Education /> },
      { key: 'skills', component: <Skills /> },
    ],
    []
  );

  useEffect(() => {
    setEnableNext(true);
  }, [activeFormIndex]);

  const handleNext = () => {
    if (activeFormIndex < steps.length) {
      setActiveFormIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    setActiveFormIndex((prev) => Math.max(prev - 1, 0));
  };

  const isLastStep = activeFormIndex >= steps.length;

  return (
    <div>
      <div className='flex items-center justify-between'>
        <div className='flex gap-5'>
          <Link to='/dashboard'>
            <Button>
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>
        <div className='flex gap-2'>
          {activeFormIndex > 0 && (
            <Button size='sm' onClick={handlePrev}>
              <ArrowLeft />
            </Button>
          )}
          {!isLastStep && (
            <Button
              disabled={!enableNext}
              className='flex gap-2'
              size='sm'
              onClick={handleNext}
            >
              Next
              <ArrowRight />
            </Button>
          )}
        </div>
      </div>

      {isLastStep ? (
        <Navigate to={`/my-resume/${resumeId}/view`} />
      ) : (
        steps[activeFormIndex]?.component ?? null
      )}
    </div>
  );
}

export default FormSection;
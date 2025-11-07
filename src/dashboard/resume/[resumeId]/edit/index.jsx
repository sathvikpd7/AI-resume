import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';

function EditResume() {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const [resumeInfo, setResumeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchResumeInfo = useCallback(async () => {
    if (!resumeId) {
      setError(new Error('Missing resume identifier'));
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await GlobalApi.GetResumeById(resumeId);
      setResumeInfo(response.data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [resumeId]);

  useEffect(() => {
    fetchResumeInfo();
  }, [fetchResumeInfo]);

  useEffect(() => {
    if (error?.message === 'Resume not found') {
      navigate('/dashboard');
    }
  }, [error, navigate]);

  const contextValue = useMemo(() => ({
    resumeInfo,
    setResumeInfo,
  }), [resumeInfo, setResumeInfo]);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <span className="text-muted-foreground">Loading resume...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-xl font-semibold">Unable to load resume</h2>
        <p className="text-muted-foreground">{error.message}</p>
      </div>
    );
  }

  return (
    <ResumeInfoContext.Provider value={contextValue}>
      <div className='grid grid-cols-1 gap-10 p-10 md:grid-cols-2'>
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
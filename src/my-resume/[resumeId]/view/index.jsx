import { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import GlobalApi from '@/service/GlobalApi';
import { RWebShare } from 'react-web-share';

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState(null);

  const fetchResumeInfo = useCallback(async () => {
    if (!resumeId) return;
    try {
      const response = await GlobalApi.GetResumeById(resumeId);
      setResumeInfo(response.data);
    } catch (error) {
      console.error('Unable to load resume', error);
    }
  }, [resumeId]);

  useEffect(() => {
    fetchResumeInfo();
  }, [fetchResumeInfo]);

  const shareData = useMemo(
    () => ({
      text: 'Hello Everyone, this is my resume. Please open the link to view it.',
      url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
      title: `${resumeInfo?.firstName || ''} ${resumeInfo?.lastName || ''} resume`,
    }),
    [resumeId, resumeInfo?.firstName, resumeInfo?.lastName]
  );

  const handleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className='mx-10 my-10 md:mx-20 lg:mx-36'>
        <div id='no-print'>
          <h2 className='text-center text-2xl font-medium'>
            Congrats! Your AI-generated resume is ready!
          </h2>
          <p className='text-center text-gray-400'>
            Download your resume or share your unique link with recruiters, friends, and family.
          </p>
          <div className='my-10 flex justify-between px-10 sm:px-24 md:px-32 lg:px-44'>
            <Button onClick={handleDownload}>Download</Button>
            <RWebShare data={shareData}>
              <Button>Share</Button>
            </RWebShare>
          </div>
        </div>

        <div id='print-area'>
          <ResumePreview />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
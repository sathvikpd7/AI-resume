import { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import EducationalPreview from './preview/EducationalPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SkillsPreview from './preview/SkillsPreview';
import SummeryPreview from './preview/SummeryPreview';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div
      className='h-full border-t-[20px] p-14 shadow-lg'
      style={{ borderColor: resumeInfo?.themeColor }}
    >
      <PersonalDetailPreview resumeInfo={resumeInfo} />
      <SummeryPreview resumeInfo={resumeInfo} />
      {resumeInfo?.experience?.length > 0 && <ExperiencePreview resumeInfo={resumeInfo} />}
      {resumeInfo?.education?.length > 0 && <EducationalPreview resumeInfo={resumeInfo} />}
      {resumeInfo?.skills?.length > 0 && <SkillsPreview resumeInfo={resumeInfo} />}
    </div>
  );
}

export default ResumePreview;
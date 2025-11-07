function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='mb-2 text-center text-sm font-bold'
        style={{ color: resumeInfo?.themeColor }}
      >
        Professional Experience
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.experience?.map((experience, index) => (
        <div key={`experience-preview-${index}`} className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {experience?.title}
          </h2>
          <h3 className='flex justify-between text-xs'>
            <span>
              {experience?.companyName}
              {experience?.city ? `, ${experience.city}` : ''}
              {experience?.state ? `, ${experience.state}` : ''}
            </span>
            <span>
              {experience?.startDate} – {experience?.currentlyWorking ? 'Present' : experience?.endDate}
            </span>
          </h3>
          <div
            className='my-2 text-xs'
            dangerouslySetInnerHTML={{
              __html: experience?.workSummary || experience?.workSummery || '',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
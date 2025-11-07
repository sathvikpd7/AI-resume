function EducationalPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='mb-2 text-center text-sm font-bold'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.education?.map((education, index) => (
        <div key={`education-preview-${index}`} className='my-5'>
          <h3
            className='text-sm font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {education.universityName}
          </h3>
          <p className='flex justify-between text-xs'>
            <span>
              {education?.degree} {education?.major ? `in ${education.major}` : ''}
            </span>
            <span>
              {education?.startDate} – {education?.endDate}
            </span>
          </p>
          <p className='my-2 text-xs'>{education?.description}</p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
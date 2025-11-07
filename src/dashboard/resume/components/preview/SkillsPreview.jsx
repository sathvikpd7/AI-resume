function SkillsPreview({ resumeInfo }) {
  return (
    <div className='my-6'>
      <h2
        className='mb-2 text-center text-sm font-bold'
        style={{ color: resumeInfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className='my-4 grid grid-cols-2 gap-3'>
        {resumeInfo?.skills?.map((skill, index) => (
          <div key={`skill-preview-${index}`} className='flex items-center justify-between'>
            <span className='text-xs'>{skill.name}</span>
            <div className='h-2 w-[120px] overflow-hidden rounded bg-gray-200'>
              <div
                className='h-2'
                style={{
                  backgroundColor: resumeInfo?.themeColor,
                  width: `${Math.min(skill?.rating * 20, 100)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
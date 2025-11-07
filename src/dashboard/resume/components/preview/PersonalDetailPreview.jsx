function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        className='text-center text-xl font-bold'
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>
      <h3 className='text-center text-sm font-medium'>{resumeInfo?.jobTitle}</h3>
      <p
        className='text-center text-xs font-normal'
        style={{ color: resumeInfo?.themeColor }}
      >
        {resumeInfo?.address}
      </p>

      <div className='flex justify-between'>
        <span
          className='text-xs font-normal'
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.phone}
        </span>
        <span
          className='text-xs font-normal'
          style={{ color: resumeInfo?.themeColor }}
        >
          {resumeInfo?.email}
        </span>
      </div>
      <hr
        className='my-2 border-[1.5px]'
        style={{ borderColor: resumeInfo?.themeColor }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
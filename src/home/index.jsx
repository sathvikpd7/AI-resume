import { Atom, Edit, Share2 } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Atom className='h-8 w-8' />,
      title: 'Write prompt for your form',
      description: 'Use AI to generate the perfect resume content based on your experience and career goals.',
    },
    {
      icon: <Edit className='h-8 w-8' />,
      title: 'Edit Your form',
      description: 'Fine-tune and customize your resume with our intuitive editing tools and professional templates.',
    },
    {
      icon: <Share2 className='h-8 w-8' />,
      title: 'Share & Start Accepting Responses',
      description: 'Export and share your professional resume with employers and start receiving interview invitations.',
    },
  ];

  return (
    <div className='min-h-screen'>
      <section className='relative z-50'>
        <div className='mx-auto max-w-screen-xl px-4 py-8 text-center lg:py-16 lg:px-12'>
          <div className='mb-7 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-4 text-sm text-gray-700 transition-colors hover:bg-gray-200'>
            <span className='mr-3 rounded-full bg-primary px-4 py-1.5 text-xs text-white'>New</span>
            <span className='text-sm font-medium'>AI-Powered Resume Builder Now Available!</span>
            <svg className='ml-2 h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z' clipRule='evenodd'></path>
            </svg>
          </div>

          <h1 className='mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl'>
            Build Your Resume <span className='text-primary'>With AI</span>
          </h1>

          <p className='mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48'>
            Effortlessly craft a standout resume with our AI-powered builder.
          </p>

          <div className='mb-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 lg:mb-16'>
            <a
              href='/dashboard'
              className='inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-base font-medium text-white transition-colors hover:bg-primary/90 focus:ring-4 focus:ring-primary-300'
            >
              Get Started
              <svg className='ml-2 -mr-1 h-5 w-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z' clipRule='evenodd'></path>
              </svg>
            </a>
          </div>

          <div className='mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36'>
            <div className='mt-8 flex flex-wrap items-center justify-center text-gray-500 sm:justify-between'>
              <div className='w-full text-sm text-gray-500'>Trusted by thousands of job seekers worldwide</div>
            </div>
          </div>
        </div>
      </section>

      <section className='z-50 mx-auto max-w-screen-xl bg-white px-4 py-8 text-center lg:py-16 lg:px-12'>
        <h2 className='mb-2 text-3xl font-bold'>How it Works?</h2>
        <p className='mb-8 text-gray-500'>Create your perfect resume in just 3 simple steps</p>

        <div className='mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature, index) => (
            <div
              key={`feature-${index}`}
              className='block transform rounded-xl border border-gray-200 bg-white p-8 shadow-xl transition hover:-translate-y-1 hover:border-primary/10 hover:shadow-primary/10'
            >
              <div className='text-primary'>{feature.icon}</div>
              <h3 className='mt-4 text-xl font-bold text-black'>{feature.title}</h3>
              <p className='mt-1 text-sm text-gray-600'>{feature.description}</p>
            </div>
          ))}
        </div>

        <div className='mt-12 text-center'>
          <a
            href='/dashboard'
            className='inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  );
}

export default Home;
import Header from '@/components/custom/Header'
import { Edit, Share2, Atom } from 'lucide-react'
import React from 'react'

function Home() {
  const features = [
    {
      icon: <Atom className="h-8 w-8" />,
      title: "Write prompt for your form",
      description: "Use AI to generate the perfect resume content based on your experience and career goals."
    },
    {
      icon: <Edit className="h-8 w-8" />,
      title: "Edit Your form",
      description: "Fine-tune and customize your resume with our intuitive editing tools and professional templates."
    },
    {
      icon: <Share2 className="h-8 w-8" />,
      title: "Share & Start Accepting Responses",
      description: "Export and share your professional resume with employers and start receiving interview invitations."
    }
  ]

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative z-50">
        <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
          <div className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <span className="text-xs bg-primary rounded-full text-white px-4 py-1.5 mr-3">New</span>
            <span className="text-sm font-medium">AI-Powered Resume Builder Now Available!</span>
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </div>
          
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Build Your Resume <span className="text-primary">With AI</span>
          </h1>
          
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Effortlessly Craft a Standout Resume with Our AI-Powered Builder
          </p>
          
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
            <a 
              href="/dashboard" 
              className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary/90 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 transition-colors"
            >
              Get Started
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </a>
          </div>

          {/* Trusted By Section */}
          <div className="px-4 mx-auto text-center md:max-w-screen-md lg:max-w-screen-lg lg:px-36">
            <div className="flex flex-wrap justify-center items-center mt-8 text-gray-500 sm:justify-between">
              {/* Add your company logos here */}
              <div className="text-sm text-gray-500 mb-4 w-full">
                Trusted by thousands of job seekers worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
        <h2 className="font-bold text-3xl mb-2">How it Works?</h2>
        <p className="text-md text-gray-500 mb-8">Create your perfect resume in just 3 simple steps</p>

        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-primary/10 hover:shadow-primary/10 hover:transform hover:-translate-y-1"
            >
              <div className="text-primary">
                {feature.icon}
              </div>
              <h2 className="mt-4 text-xl font-bold text-black">{feature.title}</h2>
              <p className="mt-1 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/sign-in"
            className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Get Started Today
          </a>
        </div>
      </section>
    </div>
  )
}

export default Home
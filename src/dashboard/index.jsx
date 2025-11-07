import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import AddResume from './components/AddResume';
import GlobalApi from '@/service/GlobalApi';
import ResumeCardItem from './components/ResumeCardItem';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

function Dashboard() {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    GetResumesList();
  }, []);

  const GetResumesList = async () => {
    try {
      setLoading(true);
      setError(null);
      // Replace with actual API call
      // const response = await GlobalApi.getResumes();
      // setResumeList(response.data);
      
      // Mock data for now
      setTimeout(() => {
        setResumeList([]);
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError('Failed to load resumes. Please try again.');
      toast.error('Failed to load resumes');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading your resumes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
        <div className="bg-red-50 p-4 rounded-lg max-w-md">
          <h3 className="text-red-600 font-medium mb-2">Error Loading Resumes</h3>
          <p className="text-sm text-gray-600 mb-4">{error}</p>
          <Button 
            onClick={GetResumesList}
            variant="outline"
            className="text-sm"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='p-6 md:px-10 lg:px-20 max-w-7xl mx-auto'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Resumes</h1>
        <p className='text-gray-600'>Create and manage your professional resumes</p>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        <AddResume />
        
        {resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem 
              resume={resume} 
              key={resume.id || index} 
              refreshData={GetResumesList} 
              onClick={() => navigate(`/dashboard/resume/${resume.id}/edit`)}
            />
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-500 mb-4'>No resumes found</p>
            <p className='text-sm text-gray-400'>Click the + button to create your first resume</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
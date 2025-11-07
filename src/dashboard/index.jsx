import { useCallback, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import GlobalApi from '@/service/GlobalApi';
import AddResume from './components/AddResume';
import ResumeCardItem from './components/ResumeCardItem';

function Dashboard() {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getResumesList = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await GlobalApi.GetUserResumes();
      setResumeList(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      console.error('Error fetching resumes:', err);
      setError('Failed to load resumes. Please try again.');
      toast.error('Failed to load resumes');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getResumesList();
  }, [getResumesList]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading your resumes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center p-4 text-center">
        <div className="max-w-md rounded-lg bg-red-50 p-4">
          <h3 className="mb-2 font-medium text-red-600">Error Loading Resumes</h3>
          <p className="mb-4 text-sm text-gray-600">{error}</p>
          <Button onClick={getResumesList} variant="outline" className="text-sm">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-7xl p-6 md:px-10 lg:px-20'>
      <div className='mb-8'>
        <h1 className='mb-2 text-3xl font-bold text-gray-900'>My Resumes</h1>
        <p className='text-gray-600'>Create and manage your professional resumes</p>
      </div>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        <AddResume />

        {resumeList.length > 0 ? (
          resumeList.map((resume) => (
            <ResumeCardItem
              resume={resume}
              key={resume.id}
              refreshData={getResumesList}
            />
          ))
        ) : (
          <div className='col-span-full py-12 text-center'>
            <p className='mb-4 text-gray-500'>No resumes found</p>
            <p className='text-sm text-gray-400'>Click the + button to create your first resume</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
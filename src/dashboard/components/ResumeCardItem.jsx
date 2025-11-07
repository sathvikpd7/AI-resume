import { Loader2Icon, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu.jsx';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import GlobalApi from '@/service/GlobalApi';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigate = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const onDelete = async () => {
    if (!resume?.id) return;
    setLoading(true);
    try {
      await GlobalApi.DeleteResumeById(resume.id);
      toast('Resume deleted');
      refreshData?.();
      setOpenAlert(false);
    } catch (error) {
      toast.error('Unable to delete resume');
    } finally {
      setLoading(false);
    }
  };

  const resumeId = resume?.id;

  return (
    <div>
      <Link to={`/dashboard/resume/${resumeId}/edit`}>
        <div
          className='h-[280px] rounded-t-lg border-t-4 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 p-14'
          style={{ borderColor: resume?.themeColor }}
        >
          <div className='flex h-[180px] items-center justify-center'>
            <img src="/cv.png" width={80} height={80} alt='Resume preview' />
          </div>
        </div>
      </Link>
      <div
        className='flex justify-between rounded-b-lg border p-3 text-white shadow-lg'
        style={{ background: resume?.themeColor }}
      >
        <h2 className='text-sm font-semibold'>{resume?.title || 'Untitled resume'}</h2>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreVertical className='h-4 w-4 cursor-pointer' />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/resume/${resumeId}/edit`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resumeId}/view`)}>
              View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate(`/my-resume/${resumeId}/view`)}>
              Download PDF
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenAlert(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. The resume will be removed from this device.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onDelete} disabled={loading} className='bg-destructive hover:bg-destructive/90'>
                {loading ? <Loader2Icon className='animate-spin' /> : 'Delete'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default ResumeCardItem;
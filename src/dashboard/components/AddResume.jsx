import { Loader2, PlusSquare } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog.jsx';
import { Button } from '../../components/ui/button.jsx';
import { Input } from '../../components/ui/input.jsx';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import GlobalApi from '@/service/GlobalApi';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    if (!resumeTitle.trim()) return;

    setLoading(true);
    const uuid = uuidv4();

    try {
      await GlobalApi.CreateNewResume({
        data: {
          id: uuid,
          title: resumeTitle.trim(),
          personalInfo: {},
          education: [],
          experience: [],
          skills: [],
          projects: [],
          themeColor: '#9f5bff',
        },
      });
      setOpenDialog(false);
      navigation(`/dashboard/resume/${uuid}/edit`);
    } catch (error) {
      console.error('Error creating resume:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className='flex h-[280px] cursor-pointer items-center justify-center rounded-lg border border-dashed bg-secondary p-14 py-24 transition-all hover:scale-105 hover:shadow-md'
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add a title for your new resume
              <Input
                className="my-2 mt-2"
                placeholder="Ex. Full Stack resume"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className='flex justify-end gap-5'>
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle.trim() || loading} onClick={onCreate}>
                {loading ? <Loader2 className='animate-spin' /> : 'Create'}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
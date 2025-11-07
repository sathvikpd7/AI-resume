import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import GlobalApi from '@/service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const EMPTY_FORM = {
  firstName: '',
  lastName: '',
  jobTitle: '',
  address: '',
  phone: '',
  email: '',
};

function PersonalDetail({ enabledNext = () => {} }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState(() => ({ ...EMPTY_FORM, ...resumeInfo }));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ...resumeInfo }));
  }, [resumeInfo]);

  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setResumeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await GlobalApi.UpdateResumeDetail(params?.resumeId, {
        data: formData,
      });
      toast('Details updated');
      enabledNext(true);
    } catch (error) {
      toast.error('Unable to save personal details');
    } finally {
      setLoading(false);
    }
  };

  const fields = useMemo(() => ([
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'jobTitle', label: 'Job Title', colSpan: 2 },
    { name: 'address', label: 'Address', colSpan: 2 },
    { name: 'phone', label: 'Phone' },
    { name: 'email', label: 'Email' },
  ]), []);

  return (
    <div className='mt-10 rounded-lg border-t-4 border-t-primary p-5 shadow-lg'>
      <h2 className='text-lg font-bold'>Personal Detail</h2>
      <p>Get started with the basic information</p>

      <form onSubmit={onSave}>
        <div className='mt-5 grid grid-cols-2 gap-3'>
          {fields.map(({ name, label, colSpan }) => (
            <div key={name} className={colSpan === 2 ? 'col-span-2' : undefined}>
              <label className='text-sm'>{label}</label>
              <Input
                name={name}
                value={formData[name] ?? ''}
                required
                onChange={handleInputChange}
                type={name.includes('email') ? 'email' : name.includes('phone') ? 'tel' : 'text'}
              />
            </div>
          ))}
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
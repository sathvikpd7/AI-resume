// Local storage implementation for resume data
const STORAGE_KEY = 'resume-builder-data';

// Get all resumes from local storage
const getAllResumes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save all resumes to local storage
const saveAllResumes = (resumes) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

const CreateNewResume = (data) => {
  const resumes = getAllResumes();
  const newResume = {
    id: data.data.id || Date.now().toString(),
    ...data.data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  resumes.push(newResume);
  saveAllResumes(resumes);
  return Promise.resolve({ data: newResume });
};

const GetUserResumes = () => {
  const resumes = getAllResumes();
  return Promise.resolve({ data: resumes });
};

const UpdateResumeDetail = (id, data) => {
  const resumes = getAllResumes();
  const index = resumes.findIndex(r => r.id === id);
  if (index !== -1) {
    resumes[index] = {
      ...resumes[index],
      ...data.data,
      updatedAt: new Date().toISOString()
    };
    saveAllResumes(resumes);
    return Promise.resolve({ data: resumes[index] });
  }
  return Promise.reject(new Error('Resume not found'));
};

const GetResumeById = (id) => {
  const resumes = getAllResumes();
  const resume = resumes.find(r => r.id === id);
  return resume 
    ? Promise.resolve({ data: resume }) 
    : Promise.reject(new Error('Resume not found'));
};

const DeleteResumeById = (id) => {
  const resumes = getAllResumes();
  const filtered = resumes.filter(r => r.id !== id);
  saveAllResumes(filtered);
  return Promise.resolve({ success: true });
};

export default {
  CreateNewResume,
  GetUserResumes,
  UpdateResumeDetail,
  GetResumeById,
  DeleteResumeById
};

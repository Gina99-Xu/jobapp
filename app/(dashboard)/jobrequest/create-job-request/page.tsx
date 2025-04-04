import CreateJobRequestForm from '@/components/CreateJobRequestForm';
import PaginationComponent from '@/components/PaginationComponent';
import SearchComponent from '@/components/SearchComponent';

function CreateJobRequestPage() {
  return (
    <>
      <SearchComponent />
      <PaginationComponent totalPages={3} currentPage={1} />
      <CreateJobRequestForm />
    </>
  );
}

export default CreateJobRequestPage;

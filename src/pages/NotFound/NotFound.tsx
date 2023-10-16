import EmptyPage from 'shared/EmptyPage';
import Header from '../../components/Header/Header';

const NotFound = () => {
  return (
    <>
      <Header title={'NOTFOUND_PAGE'} back={true} icon={''} />
      <EmptyPage content="NOTFOUND_PAGE" subContent="NOTFOUND_PAGE_SUB" alt="OT마스코트" />
    </>
  );
};

export default NotFound;

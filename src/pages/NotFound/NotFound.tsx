import Header from '../../components/Header/Header';
const NotFound = () => {
  return (
    <>
      <Header title={'NOTFOUND_PAGE'} back={true} icon={''} />
      <div className="flex flex-col items-center justify-center gap-9 absolute centerPosition w-full">
        <img src="/assets/MyWriteImg.svg" alt="OT마스코트" />
        <div>
          <p className="text-xl">잘못된 페이지입니다.</p>
        </div>
      </div>
    </>
  );
};

export default NotFound;

import React from 'react';

interface EmptyTypes {
  alt: string;
  content: string;
  subContent: string;
}
const EmptyPage = ({ alt, content, subContent }: EmptyTypes) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 absolute centerPosition w-full">
      <img src="/assets/MyWriteImg.svg" alt={alt} />
      <div>
        <p className="text-xl">{content}</p>
        <p className="mt-3 text-gray-500">{subContent}</p>
      </div>
    </div>
  );
};

export default EmptyPage;

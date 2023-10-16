import { langConvert } from 'Atom/atom';
import useMultilingual from 'hooks/useMultilingual';
import React from 'react';
import { useRecoilValue } from 'recoil';

interface EmptyTypes {
  alt: string;
  content: string;
  subContent: string;
}
const EmptyPage = ({ alt, content, subContent }: EmptyTypes) => {
  const lang = useRecoilValue(langConvert);
  const m = useMultilingual(lang);

  return (
    <div className="flex flex-col items-center justify-center gap-4 absolute centerPosition w-full">
      <img src="/assets/MyWriteImg.svg" alt={alt} />
      <div>
        <p className="text-xl">{m(content)}</p>
        <p className="mt-3 text-gray-500">{m(subContent)}</p>
      </div>
    </div>
  );
};

export default EmptyPage;

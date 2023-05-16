interface inputEmail {
  title: string;
  id: string;
  type: string;
  page: boolean;
  text: string;
}

export function Email({ title, id, type, page, text }: inputEmail) {
  return (
    <div className="inputForm">
      <label htmlFor={id} className="text-left text-gray-500">
        {title}
      </label>
      <div className="flex flex-row justify-between">
        <input type={type} name={id} id={id} placeholder={text} className={page ? 'inputStyle' : 'signUpInput'} />
        {!page ? (
          <button type="button" className="w-24 h-12 text-gray-600 border border-gray-600 rounded">
            중복확인
          </button>
        ) : (
          ''
        )}
      </div>
      {/* <span className="errorText">이메일 주소를 다시 확인해주세요.</span> */}
    </div>
  );
}

interface inputPW {
  title: string;
  id: string;
}

export function Password({ title, id }: inputPW) {
  return (
    <div className="inputForm">
      <label htmlFor={id} className="text-left text-gray-500">
        {title}
      </label>
      <input type="password" name={id} id={id} placeholder="영문, 숫자 포함 8자 이상" className="inputStyle" />
      {/* <span className="errorText">비밀번호를 다시 확인해주세요.</span> */}
    </div>
  );
}

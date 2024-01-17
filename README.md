# ✨광광데이터활용 공모전✨


# 🚀 배포
https://ourtravel.netlify.app/
현재 백엔드 서버를 내려 기능이 정상적으로 작동되지 않습니다.


# 🗣 팀 구성

__이주형,조윤호, 장재우,김수민__

# 📝 진행 과정

1. 기획 / 디자인 설계
2. 백엔드(Spring)과 Api설계
3. 컨벤션 구출 및 디렉토리 구조설계
4. 공통 컴포넌트 구축


# 🔧 기술 스택

- Typescript
- Recoil
- Axios
- Stomp

## 폴더 구조

```sh
📦Front-End
 ┣ 📂.git
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜applypatch-msg.sample
 ┃ ┃ ┣ 📜commit-msg.sample
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample
 ┃ ┃ ┣ 📜post-update.sample
 ┃ ┃ ┣ 📜pre-applypatch.sample
 ┃ ┃ ┣ 📜pre-commit.sample
 ┃ ┃ ┣ 📜pre-merge-commit.sample
 ┃ ┃ ┣ 📜pre-push.sample
 ┃ ┃ ┣ 📜pre-rebase.sample
 ┃ ┃ ┣ 📜pre-receive.sample
 ┃ ┃ ┣ 📜prepare-commit-msg.sample
 ┃ ┃ ┣ 📜push-to-checkout.sample
 ┃ ┃ ┣ 📜sendemail-validate.sample
 ┃ ┃ ┗ 📜update.sample
 ┃ ┣ 📂info
 ┃ ┃ ┗ 📜exclude
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂refs
 ┃ ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┃ ┗ 📂remotes
 ┃ ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┃ ┗ 📜HEAD
 ┃ ┃ ┗ 📜HEAD
 ┃ ┣ 📂objects
 ┃ ┃ ┣ 📂info
 ┃ ┃ ┗ 📂pack
 ┃ ┃ ┃ ┣ 📜pack-0ccdd8c04e7aa19ab358c9b1aa789b9dc8d90635.idx
 ┃ ┃ ┃ ┣ 📜pack-0ccdd8c04e7aa19ab358c9b1aa789b9dc8d90635.pack
 ┃ ┃ ┃ ┗ 📜pack-0ccdd8c04e7aa19ab358c9b1aa789b9dc8d90635.rev
 ┃ ┣ 📂refs
 ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┣ 📂remotes
 ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┗ 📜HEAD
 ┃ ┃ ┗ 📂tags
 ┃ ┣ 📜config
 ┃ ┣ 📜description
 ┃ ┣ 📜HEAD
 ┃ ┣ 📜index
 ┃ ┗ 📜packed-refs
 ┣ 📂.github
 ┃ ┗ 📂ISSUE_TEMPLATE
 ┃ ┃ ┣ 📜✍additional-feature-description.md
 ┃ ┃ ┣ 📜🐞bug-report.md
 ┃ ┃ ┗ 📜📃-feature-request.md
 ┣ 📂.vscode
 ┃ ┗ 📜settings.json
 ┣ 📂ISSUE_TEMPLATE
 ┃ ┣ 📜✍additional-feature-description.md
 ┃ ┣ 📜🐞bug-report.md
 ┃ ┗ 📜📃-feature-request.md
 ┣ 📂public
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜banner1.png
 ┃ ┃ ┣ 📜banner2.png
 ┃ ┃ ┣ 📜banner3.png
 ┃ ┃ ┣ 📜bridge.JPG
 ┃ ┃ ┣ 📜bridge2.JPG
 ┃ ┃ ┣ 📜character.svg
 ┃ ┃ ┣ 📜character2.svg
 ┃ ┃ ┣ 📜chattingProfile.svg
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜homeicon.png
 ┃ ┃ ┣ 📜house.JPG
 ┃ ┃ ┣ 📜loc.png
 ┃ ┃ ┣ 📜marker12.png
 ┃ ┃ ┣ 📜marker14.png
 ┃ ┃ ┣ 📜marker15.png
 ┃ ┃ ┣ 📜marker25.png
 ┃ ┃ ┣ 📜marker28.png
 ┃ ┃ ┣ 📜marker32.png
 ┃ ┃ ┣ 📜MyWriteImg.svg
 ┃ ┃ ┣ 📜otBackground.png
 ┃ ┃ ┣ 📜ourtravel.png
 ┃ ┃ ┣ 📜profile.svg
 ┃ ┃ ┣ 📜sendButton.svg
 ┃ ┃ ┣ 📜square1.png
 ┃ ┃ ┣ 📜square2.png
 ┃ ┃ ┗ 📜square3.png
 ┃ ┣ 📜index.html
 ┃ ┣ 📜manifest.json
 ┃ ┗ 📜robots.txt
 ┣ 📂src
 ┃ ┣ 📂Atom
 ┃ ┃ ┣ 📜atom.ts
 ┃ ┃ ┗ 📜userAtom.ts
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂Board
 ┃ ┃ ┃ ┣ 📜BoardItem.tsx
 ┃ ┃ ┃ ┣ 📜BoardList.tsx
 ┃ ┃ ┃ ┣ 📜BoardModal.tsx
 ┃ ┃ ┃ ┗ 📜PostForm.tsx
 ┃ ┃ ┣ 📂Button
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┗ 📜TranslationButton.tsx
 ┃ ┃ ┣ 📂Chatting
 ┃ ┃ ┃ ┣ 📜ChattingComponent.tsx
 ┃ ┃ ┃ ┣ 📜ChattingEmpty.tsx
 ┃ ┃ ┃ ┣ 📜ChattingItem.tsx
 ┃ ┃ ┃ ┣ 📜FriendChat.tsx
 ┃ ┃ ┃ ┗ 📜MeChat.tsx
 ┃ ┃ ┣ 📂EmailPassword
 ┃ ┃ ┃ ┗ 📜EmailPassword.tsx
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┗ 📜Header.tsx
 ┃ ┃ ┣ 📂KakaoMap
 ┃ ┃ ┃ ┣ 📜KakaoMap.tsx
 ┃ ┃ ┃ ┣ 📜KakaoMapMarker.tsx
 ┃ ┃ ┃ ┗ 📜KakaoMapModal.tsx
 ┃ ┃ ┣ 📂Logo
 ┃ ┃ ┃ ┗ 📜Logo.tsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┃ ┣ 📜GraphComponent.tsx
 ┃ ┃ ┃ ┣ 📜KoreaMap.tsx
 ┃ ┃ ┃ ┣ 📜KoreaMapChart.tsx
 ┃ ┃ ┃ ┣ 📜mapData.tsx
 ┃ ┃ ┃ ┣ 📜mapText.tsx
 ┃ ┃ ┃ ┗ 📜SelectArea.tsx
 ┃ ┃ ┣ 📂Modal
 ┃ ┃ ┃ ┣ 📜ModalButton.tsx
 ┃ ┃ ┃ ┗ 📜UploadProfile.tsx
 ┃ ┃ ┣ 📂MypageInfo
 ┃ ┃ ┃ ┣ 📜MypageInfo.tsx
 ┃ ┃ ┃ ┗ 📜ProfileEdit.tsx
 ┃ ┃ ┣ 📂Navigation
 ┃ ┃ ┃ ┗ 📜Navigation.tsx
 ┃ ┃ ┣ 📂SignIn
 ┃ ┃ ┃ ┣ 📜ChoiceTab.tsx
 ┃ ┃ ┃ ┗ 📜Feedback.tsx
 ┃ ┃ ┣ 📂TouristList
 ┃ ┃ ┃ ┣ 📜TouristList.tsx
 ┃ ┃ ┃ ┗ 📜TourModal.tsx
 ┃ ┃ ┗ 📂utilCss
 ┃ ┃ ┃ ┗ 📜landingSwiper.css
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜addressGetter.tsx
 ┃ ┃ ┣ 📜useDebounce.tsx
 ┃ ┃ ┣ 📜useFetch.tsx
 ┃ ┃ ┣ 📜useGeolocation.tsx
 ┃ ┃ ┣ 📜useInput.tsx
 ┃ ┃ ┣ 📜useLoginCheck.tsx
 ┃ ┃ ┗ 📜useMultilingual.tsx
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂Board
 ┃ ┃ ┃ ┣ 📜Board.tsx
 ┃ ┃ ┃ ┗ 📜WriteBoard.tsx
 ┃ ┃ ┣ 📂Chatting
 ┃ ┃ ┃ ┣ 📜Chatting.tsx
 ┃ ┃ ┃ ┗ 📜ChattingList.tsx
 ┃ ┃ ┣ 📂Landing
 ┃ ┃ ┃ ┗ 📜Landing.tsx
 ┃ ┃ ┣ 📂Main
 ┃ ┃ ┃ ┣ 📜HostList.tsx
 ┃ ┃ ┃ ┣ 📜Main.tsx
 ┃ ┃ ┃ ┗ 📜SelectLocation.tsx
 ┃ ┃ ┣ 📂Map
 ┃ ┃ ┃ ┗ 📜Map.tsx
 ┃ ┃ ┣ 📂MyPage
 ┃ ┃ ┃ ┣ 📜EditBoard.tsx
 ┃ ┃ ┃ ┣ 📜Favorite.tsx
 ┃ ┃ ┃ ┣ 📜Host.tsx
 ┃ ┃ ┃ ┣ 📜MyPage.tsx
 ┃ ┃ ┃ ┣ 📜MyWrite.tsx
 ┃ ┃ ┃ ┗ 📜Notice.tsx
 ┃ ┃ ┣ 📂NotFound
 ┃ ┃ ┃ ┗ 📜NotFound.tsx
 ┃ ┃ ┣ 📂SignIn
 ┃ ┃ ┃ ┣ 📜GoogleRedirect.tsx
 ┃ ┃ ┃ ┣ 📜KakaoRedirect.tsx
 ┃ ┃ ┃ ┗ 📜SignIn.tsx
 ┃ ┃ ┗ 📂SignUp
 ┃ ┃ ┃ ┗ 📜SignUp.tsx
 ┃ ┣ 📂shared
 ┃ ┃ ┣ 📜EmptyPage.tsx
 ┃ ┃ ┗ 📜Spinner.tsx
 ┃ ┣ 📂util
 ┃ ┃ ┣ 📜contentType.tsx
 ┃ ┃ ┣ 📜lang.tsx
 ┃ ┃ ┣ 📜region.tsx
 ┃ ┃ ┣ 📜status.tsx
 ┃ ┃ ┣ 📜util.tsx
 ┃ ┃ ┗ 📜visitor.tsx
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.tsx
 ┃ ┣ 📜react-app-env.d.ts
 ┃ ┗ 📜reportWebVitals.ts
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierrc.json
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜README.md
 ┣ 📜tailwind.config.js
 ┗ 📜tsconfig.json

```
# 아키텍쳐

![Desktop - 1](https://github.com/Our-Travel/Front-End/assets/91236732/5a8acd2c-bd0d-4cfd-b161-1f389a0c5870)

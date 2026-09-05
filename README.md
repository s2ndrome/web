# SYNDROME & LIA

정적 HTML/CSS/JS로 만든 개인 홈페이지입니다. 빌드 과정이 없어 Vercel에서 바로 배포됩니다.

## 로컬에서 보기

`index.html`을 브라우저로 열거나, 아래처럼 간단한 서버로 실행하세요.

```
npx serve .
```

## 콘텐츠 채우기

- **이미지 슬라이드**: `script.js` 상단의 `slides` 배열에 이미지 경로를 추가하세요. (예: `img/photo1.jpg`)
- **배경음악**: 저장소에 `audio/bgm.mp3` 파일을 추가하면 하단의 `bgm` 버튼으로 재생/정지할 수 있습니다.
- **메뉴(SEOL/GALLERY/LOG/SHARE)**: 현재는 클릭 시 "준비 중입니다" 안내만 뜨는 자리표시자입니다. `script.js`의 `openMenu` 함수와 `index.html`의 `#menuOverlay` 영역을 채워서 실제 콘텐츠로 바꿀 수 있습니다.

## Vercel 배포

1. [vercel.com](https://vercel.com)에 로그인 후 **Add New → Project**를 선택합니다.
2. **Import Git Repository**에서 `s2ndrome/web` 저장소를 선택합니다.
3. Framework Preset은 **Other**(정적 사이트)로 두고, Build Command/Output Directory는 비워둔 채 그대로 Deploy 합니다.
4. 이후로는 이 저장소의 기본 브랜치에 push할 때마다 자동으로 재배포됩니다.

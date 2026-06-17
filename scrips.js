let uploadedImage = '';

const $ = (id) => document.getElementById(id);

const ids = [
  'quote',
  'character',
  'creator',
  'bgColor',
  'textColor',
  'bgOpacity',
  'fontSelect',
  'ratioSelect'
];

ids.forEach(id => {
  const el = $(id);

  if (el) {
    el.addEventListener('input', updateCard);
    el.addEventListener('change', updateCard);
  }
});

const bgImageInput = $('bgImage');

if (bgImageInput) {

  bgImageInput.addEventListener('change', (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {

      uploadedImage = event.target.result;

      updateCard();
    };

    reader.readAsDataURL(file);

  });

}

function updateCard() {

  const quote = $('quote');
  const character = $('character');
  const creator = $('creator');

  const bgColor = $('bgColor');
  const textColor = $('textColor');

  const bgOpacity = $('bgOpacity');

  const fontSelect = $('fontSelect');
  const ratioSelect = $('ratioSelect');

  const previewQuote = $('previewQuote');
  const previewInfo = $('previewInfo');

  const card = $('card');
  const bgLayer = $('bgLayer');

  if (!previewQuote || !previewInfo || !card) return;

  // 텍스트
  previewQuote.innerText =
    quote ? quote.value : '';

  previewInfo.innerText =
    `${character ? character.value : ''} │ ${creator ? creator.value : ''}`;

  // 색상
  if (bgColor) {
    card.style.backgroundColor = bgColor.value;
  }

  if (textColor) {
    card.style.color = textColor.value;
  }

  // 폰트
  if (fontSelect) {

    previewQuote.style.fontFamily =
      fontSelect.value;

    previewInfo.style.fontFamily =
      fontSelect.value;

  }

  // 배경 이미지
  if (bgLayer && bgOpacity) {

    bgLayer.style.opacity =
      bgOpacity.value / 100;

  }

  if (bgLayer) {

    if (uploadedImage) {

      bgLayer.style.backgroundImage =
        `url(${uploadedImage})`;

    } else {

      bgLayer.style.backgroundImage = 'none';

    }

  }

  // 비율
  if (ratioSelect) {

    if (ratioSelect.value === 'portrait') {

      card.classList.add('portrait');

    } else {

      card.classList.remove('portrait');

    }

  }

}

const saveBtn.addEventListener('click', async () => {

    try {

        const canvas = await html2canvas(
            document.getElementById('card'),
            {
                scale: 2,
                useCORS: true,
                logging: true
            }
        );

        const link = document.createElement('a');

        link.download = 'quote.png';

        link.href = canvas.toDataURL('image/png');

        link.click();

    } catch (e) {

        console.error(e);

        alert('저장 실패 - F12 콘솔 확인');

    }


  });

}

updateCard();

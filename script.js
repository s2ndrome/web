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

  previewQuote.innerText =
    quote ? quote.value : '';

  previewInfo.innerText =
    `${character ? character.value : ''} │ ${creator ? creator.value : ''}`;

  if (bgColor) {
    card.style.backgroundColor = bgColor.value;
  }

  if (textColor) {
    card.style.color = textColor.value;
  }

  if (fontSelect) {

    previewQuote.style.fontFamily =
      fontSelect.value;

    previewInfo.style.fontFamily =
      fontSelect.value;

  }

  if (bgLayer && bgOpacity) {

    bgLayer.style.opacity =
      bgOpacity.value / 100;

  }

  if (bgLayer && uploadedImage) {

    bgLayer.style.backgroundImage =
      `url(${uploadedImage})`;

  }

  if (ratioSelect) {

    if (ratioSelect.value === 'portrait') {

      card.style.width = '541px';
      card.style.height = '676px';

    } else {

      card.style.width = '541px';
      card.style.height = '541px';

    }

  }

}

const saveBtn = $('saveBtn');

if (saveBtn) {

  saveBtn.addEventListener('click', () => {

    const card = $('card');

    html2canvas(card, {
      scale: 3,
      useCORS: true
    }).then((canvas) => {

      const link =
        document.createElement('a');

      link.download =
        'quote.png';

      link.href =
        canvas.toDataURL('image/png');

      link.click();

    });

  });

}

updateCard();
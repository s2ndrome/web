function updatePreview() {

  const quote =
    document.getElementById("quote").value;

  const character =
    document.getElementById("character").value;

  const creator =
    document.getElementById("creator").value;

  document.getElementById("previewQuote").innerText =
    quote;

  document.getElementById("previewInfo").innerText =
    `${character} │ ${creator}`;
}

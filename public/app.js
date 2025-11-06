const form = document.querySelector('form');
const input = document.querySelector('input');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const word = input.value.trim();
    if (!word) return;

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        if (!response.ok) throw new Error('Error: Word not found');
        const data = await response.json();
        const wordData = data[0];

        let resultHTML = `<h2 class='word'>${wordData.word}</h2>`;
        resultHTML += `<p class='phonetic'>${wordData.phonetic || wordData.phonetics[1].text || ''}</p>`;
        wordData.meanings.forEach(meaning => {
            resultHTML += `<h3 class='part-of-speech'>${meaning.partOfSpeech}</h3>`;
            resultHTML += '<ol>';
            meaning.definitions.forEach(definition => {
                resultHTML += `<li class='definition'>${definition.definition}`;
            })
            resultHTML += '</ol>';
        });

        resultDiv.innerHTML = resultHTML;

    } catch (err) {
        resultDiv.textContent = err.message;
    }
});
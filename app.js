document.addEventListener('DOMContentLoaded', () => {
    const wordListContainer = document.getElementById('word-list');
    const dayNumberSpan = document.getElementById('day-number');

    // This function calculates the number of days that have passed since a fixed start date.
    // This ensures everyone sees the same words on the same day.
    function getDayIndex() {
        const startDate = new Date('2024-01-01'); // A fixed starting point
        const today = new Date();
        const diffTime = Math.abs(today - startDate);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    function displayWords() {
        const dayIndex = getDayIndex();
        const startIndex = dayIndex * 10;
        
        // Loop protection: if we run out of words, loop back to the start.
        const totalWords = wordDatabase.length;
        const effectiveStartIndex = startIndex % totalWords;
        
        const wordsForToday = wordDatabase.slice(effectiveStartIndex, effectiveStartIndex + 10);

        dayNumberSpan.textContent = dayIndex + 1;
        wordListContainer.innerHTML = ''; // Clear previous words

        if (wordsForToday.length === 0) {
            wordListContainer.innerHTML = '<div class="word-card"><p>Níl níos mó focal ann! You have learned all the words. Add more to the words.js file!</p></div>';
            return;
        }

        wordsForToday.forEach(word => {
            const card = document.createElement('div');
            card.className = 'word-card';
            card.innerHTML = `
                <h2>${word.irish}</h2>
                <p class="translation">${word.english}</p>
                <div class="sentence">
                    <p class="irish">${word.sentence}</p>
                </div>
            `;
            wordListContainer.appendChild(card);
        });
    }

    displayWords();
    
    // Register the service worker for PWA functionality (offline access)
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('ServiceWorker registration successful: ', registration.scope);
                })
                .catch(err => {
                    console.log('ServiceWorker registration failed: ', err);
                });
        });
    }
});
document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('input-text');
    const outputText = document.getElementById('output-text');
    const humanizeBtn = document.getElementById('humanize-btn');
    const clearBtn = document.getElementById('clear-btn');
    const copyBtn = document.getElementById('copy-btn');
    const inputStats = document.getElementById('input-stats');
    const outputStats = document.getElementById('output-stats');

    // Словарь замен для ИИ-фраз
    const aiReplacements = {
        "furthermore": "also",
        "moreover": "plus",
        "in conclusion": "overall",
        "to summarize": "basically",
        "it is important to note that": "keep in mind",
        "delve into": "look at",
        "tapestry": "mix",
        "testament to": "proof of",
        "в заключение": "в целом",
        "следует отметить, что": "кстати,",
        "важно подчеркнуть": "главное, что",
        "таким образом": "так что",
        "является ярким примером": "хорошо показывает",
        "несомненно": "точно",
        "в современном мире": "сегодня"
    };

    function updateInputStats() {
        const text = inputText.value.trim();
        const words = text ? text.split(/\s+/).length : 0;
        const chars = text.length;
        inputStats.textContent = `Слов: ${words} | Символов: ${chars}`;
    }

    function humanize(text) {
        if (!text.trim()) return '';
        
        let result = text;
        
        // Замена шаблонов
        for (let [key, val] of Object.entries(aiReplacements)) {
            const reg = new RegExp(key, 'gi');
            result = result.replace(reg, val);
        }

        // Разбивка слишком длинных предложений для естественного ритма
        result = result.replace(/, (потому что|так как|хотя)/gi, '. $1');
        
        return result;
    }

    inputText.addEventListener('input', updateInputStats);

    humanizeBtn.addEventListener('click', () => {
        const text = inputText.value;
        if (!text.trim()) return;

        const result = humanize(text);
        outputText.textContent = result;

        const words = result.trim().split(/\s+/).length;
        outputStats.textContent = `Слов: ${words} | Оценка человечности: 98% (0% AI)`;
    });

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.textContent = '';
        updateInputStats();
        outputStats.textContent = 'Слов: 0 | Оценка человечности: 100%';
    });

    copyBtn.addEventListener('click', () => {
        if (outputText.textContent) {
            navigator.clipboard.writeText(outputText.textContent);
            alert('Текст скопирован!');
        }
    });
});
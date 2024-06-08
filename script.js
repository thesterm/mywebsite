document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quizForm');
    const questionElement = document.getElementById('question');
    const resultElement = document.getElementById('result');
    const yesButton = document.getElementById('yesBtn');
    const noButton = document.getElementById('noBtn');
    const characterContainer = document.getElementById('characterContainer');

    const characters = [
        { name: 'Albert Einstein', answers: [true, true, true, false, true, true, false, true, true, false, false, true, false, true, true, false, true, true, false, false] },
        { name: 'Marie Curie', answers: [true, true, true, true, false, true, true, false, true, false, true, true, false, true, false, true, false, true, false, false] },
        { name: 'Leonardo da Vinci', answers: [true, false, true, false, true, false, false, false, true, false, false, false, true, true, true, true, false, true, false, false] },
        { name: 'Isaac Newton', answers: [true, false, true, false, true, true, false, false, true, true, true, false, false, false, true, true, true, true, false, true] },
        { name: 'Nikola Tesla', answers: [true, false, true, true, true, false, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Ada Lovelace', answers: [true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, false, true, true, false, true] },
        { name: 'Galileo Galilei', answers: [true, false, true, false, true, false, false, false, true, false, false, false, true, true, true, false, true, true, false, false] },
        { name: 'Thomas Edison', answers: [true, false, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Stephen Hawking', answers: [true, false, true, false, true, true, false, false, true, true, false, false, false, false, true, true, true, true, false, false] },
        { name: 'Alexander Graham Bell', answers: [true, false, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Alan Turing', answers: [true, false, true, false, true, false, true, false, true, false, true, false, false, false, true, false, true, true, false, true] },
        { name: 'Grace Hopper', answers: [true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, false, true, true, false, true] },
        { name: 'Hedy Lamarr', answers: [true, false, true, false, true, false, true, false, true, false, true, false, false, true, false, false, true, true, false, true] },
        { name: 'Carl Sagan', answers: [true, false, true, false, true, false, false, false, true, false, false, false, true, true, true, false, true, true, false, false] },
        { name: 'Jane Goodall', answers: [true, true, true, false, true, false, false, false, true, false, false, false, true, true, false, false, true, true, false, false] },
        { name: 'Elon Musk', answers: [true, true, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Mark Zuckerberg', answers: [true, true, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Bill Gates', answers: [true, true, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Steve Jobs', answers: [true, false, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] },
        { name: 'Sundar Pichai', answers: [true, true, true, true, true, true, false, true, true, false, false, false, true, false, true, false, true, false, false, false] }
    ];

    let currentQuestionIndex = 0;
    let userAnswers = [];

    function displayQuestion() {
        questionElement.textContent = questions[currentQuestionIndex];
    }

    function submitAnswer(answer) {
        userAnswers.push(answer === 'sì');
        currentQuestionIndex++;

        if (currentQuestionIndex === questions.length) {
            yesButton.style.display = 'none';
            noButton.style.display = 'none';
            displayResult();
        } else {
            displayQuestion();
        }
    }

    function displayResult() {
        let minDifference = questions.length;
        let closestCharacter;

        characters.forEach(character => {
            let difference = 0;
            character.answers.forEach((answer, index) => {
                if (answer !== userAnswers[index]) {
                    difference++;
                }
            });
            if (difference < minDifference) {
                minDifference = difference;
                closestCharacter = character;
            }
        });

        resultElement.textContent = `Il personaggio a cui stai pensando è ${closestCharacter.name}.`;
        resultElement.insertAdjacentHTML('afterend', '<p>Risposta corretta?</p>');
        resultElement.insertAdjacentHTML('afterend', '<button id="correctBtn">Sì</button>');
        resultElement.insertAdjacentHTML('afterend', '<button id="incorrectBtn">No</button>');

        document.getElementById('correctBtn').addEventListener('click', () => {
            location.reload();
        });

        document.getElementById('incorrectBtn').addEventListener('click', () => {
            characters.splice(characters.indexOf(closestCharacter), 1);
            const newClosestCharacter = findClosestCharacter();
            if (newClosestCharacter) {
                resultElement.textContent = `Il personaggio a cui stai pensando è ${newClosestCharacter.name}.`;
            } else {
                resultElement.textContent = "Nessun personaggio trovato.";
            }
        });
    }

    function findClosestCharacter() {
        let minDifference = questions.length;
        let closestCharacter;

        characters.forEach(character => {
            let difference = 0;
            character.answers.forEach((answer, index) => {
                if (answer !== userAnswers[index]) {
                    difference++;
                }
            });
            if (difference < minDifference) {
                minDifference = difference;
                closestCharacter = character;
            }
        });

        return closestCharacter;
    }

    const questions = [
        "Il personaggio a cui stai pensando è una persona?",
        "Il personaggio a cui stai pensando è vivo?",
        "Il personaggio a cui stai pensando ha contribuito a una scoperta scientifica importante?",
        "Il personaggio a cui stai pensando è noto per le sue opere artistiche?",
        "Il personaggio a cui stai pensando ha inventato qualcosa di rivoluzionario?",
        "Il personaggio a cui stai pensando ha fondato un'azienda di successo?",
        "Il personaggio a cui stai pensando è conosciuto per i suoi contributi nel campo della programmazione?",
        "Il personaggio a cui stai pensando ha vinto un premio prestigioso?",
        "Il personaggio a cui stai pensando ha scritto un libro famoso?",
        "Il personaggio a cui stai pensando è noto per le sue teorie scientifiche?",
        "Il personaggio a cui stai pensando è un'icona nel mondo della tecnologia?",
        "Il personaggio a cui stai pensando è stato un pioniere nel campo della medicina?",
        "Il personaggio a cui stai pensando è noto per le sue opere letterarie?",
        "Il personaggio a cui stai pensando è stato coinvolto in un famoso processo legale?",
        "Il personaggio a cui stai pensando è famoso per le sue scoperte astronomiche?",
        "Il personaggio a cui stai pensando è stato coinvolto in un famoso incidente tecnologico?",
        "Il personaggio a cui stai pensando è noto per i suoi contributi nell'ambiente?",
        "Il personaggio a cui stai pensando ha vinto un Premio Nobel?",
        "Il personaggio a cui stai pensando ha rivoluzionato un campo scientifico o tecnologico?"
    ];

    function populateCharacterList() {
        characters.forEach(character => {
            const characterItem = document.createElement('div');
            characterItem.className = 'character-item';
            characterItem.textContent = character.name;
            characterContainer.appendChild(characterItem);
        });
    }

    displayQuestion();
    yesButton.addEventListener('click', () => submitAnswer('sì'));
    noButton.addEventListener('click', () => submitAnswer('no'));
    populateCharacterList();
});

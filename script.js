let category = null
let maxQuestions = 5
let correctedAnswer = 0

function ChangeCategory(el, name) {
    const buttons = document.querySelectorAll('.doj-questions-option')
    buttons.forEach((e) => {
        e.classList.remove('active')
    })

    el.classList.add('active')
    category = name
}

function updateCount() {
    $('.doj-questions-answered').html(`Obywatel odpowiedział poprawnie na <strong>${correctedAnswer}</strong> pytań z ${maxQuestions}`)
}

$('.generate-btn').on('click', function () {
    if (!category) {
        alert('Wybierz kategorię')
        return
    }

    correctedAnswer = 0
    updateCount()
    
    const questions = Config[category]

    if (!questions || questions.length === 0) {
        return
    }

    if (maxQuestions < 1) {
        alert('Musisz mieć powyżej 1 pytania')
        return
    }

    const shuffled = [...questions]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const los = Math.floor(Math.random() * (i + 1))
            ;[shuffled[i], shuffled[los]] = [shuffled[los], shuffled[i]]
    }

    const selected = shuffled.slice(0, Math.min(maxQuestions, shuffled.length))

    $('.doj-list-of-questions').html(``)
    selected.forEach((data, index) => {
        let $container = $(`<div class="doj-quest-container">
                    <div class="doj-quest-container-wrap">
                        <div class="point">${index + 1}</div>
                        <span>${data.question}</span>
                    </div>
                    <div class="line"></div>
                    <div class="doj-quest-container-answer">${data.subpoint}</div>
                    <div class="line"></div>
                    <div class="doj-quest-ans-buttons">
                        <i class="fa-solid fa-check correct" id="ans-correct"></i>
                        <i class="fa-solid fa-xmark incorrect" id="ans-incorrect"></i>
                    </div>
                </div>`)

        $container.find('#ans-correct').on('click', function () {
            let $btnCorrect = $(this)
            let $btnIncorrect = $container.find('#ans-incorrect')
            if (!$btnCorrect.hasClass('anscheck')) {
                correctedAnswer++
                $btnCorrect.addClass('anscheck')
                $btnIncorrect.removeClass('anscheck')
            }
            updateCount()
        })

        $container.find('#ans-incorrect').on('click', function () {
            let $btnCorrect = $container.find('#ans-correct')
            let $btnIncorrect = $(this)

            if ($btnCorrect.hasClass('anscheck')) {
                correctedAnswer--
            }

            $btnCorrect.removeClass('anscheck')
            $btnIncorrect.addClass('anscheck')
            updateCount()
        })
        $('.doj-list-of-questions').append($container)
    })
})

const slider = document.getElementById('quest-count')

slider.oninput = function () {
    $('#questions-count').text(this.value)
    maxQuestions = parseInt(this.value)
}
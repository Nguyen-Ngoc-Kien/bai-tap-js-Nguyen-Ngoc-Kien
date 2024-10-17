fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    console.log("data >>>", data);
    let questionIndex = 0; 
    let score = 0; 
    let suggestions = 6;
    document.getElementsByClassName('suggest')[0].innerText = suggestions;
    console.log(document.getElementsByClassName('p.suggest'))
    function displayQuestion(questionData) {
      document.querySelector('.text-question').innerText = questionData.content; 
      document.querySelector('.img-question img').src = questionData.image; 

      if (questionData.image === "") {
        document.querySelector('.img-question').style.display = 'none';
      } else {
        document.querySelector('.img-question').style.display = 'block';
      }

      const answerBox = document.querySelector('.answer');
      answerBox.innerHTML = ''; 

      const correctAnswer = questionData.correctAnswer.replace(/\s/g, ''); 
      for (let i = 0; i < correctAnswer.length; i++) {
        let letterBox = document.createElement('div');
        letterBox.classList.add('letter-box');
        letterBox.innerHTML = `<p class="letter">_</p>`; 
        letterBox.setAttribute('data-index', i); 
        answerBox.appendChild(letterBox);

        letterBox.addEventListener('click', () => {
          if (suggestions > 0) {
            letterBox.querySelector('.letter').innerText = correctAnswer[i].toUpperCase(); 
            suggestions--; 
            document.querySelector('.suggest').innerText = `${suggestions}`; 
          } else {
            alert('Bạn đã hết gợi ý!');
          }
        });
      }
    }

    displayQuestion(data[questionIndex]);

    document.querySelector('button').addEventListener('click', () => {
      const userAnswer = document.querySelector('input').value;

      if (userAnswer.replace(/\s/g, '').toLowerCase() === data[questionIndex].correctAnswer.replace(/\s/g, '').toLowerCase()) {
        alert('Đúng rồi!');
        score++; 
      } else {
        alert('Sai, câu trả lời đúng là: ' + data[questionIndex].correctAnswer);
      }

      questionIndex++;
      if (questionIndex < data.length) {
        displayQuestion(data[questionIndex]);
      } else {
        alert('Bạn đã hoàn thành tất cả câu hỏi!');
      }

      document.querySelector('input').value = '';
    });
  })
  .catch(error => console.error('Error loading questions:', error));
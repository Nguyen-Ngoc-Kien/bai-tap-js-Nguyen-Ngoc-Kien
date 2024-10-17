fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    let questionIndex = 0; 
    let score = 0; 
    console.log(data)
    function displayQuestion(questionData) {
      document.querySelector('.question').innerText = questionData.content; 
      document.getElementById('answer1').innerText = questionData.answers[0];
      document.getElementById('answer2').innerText = questionData.answers[1];
      document.getElementById('answer3').innerText = questionData.answers[2];
      document.getElementById('answer4').innerText = questionData.answers[3];

      document.querySelectorAll('.answer').forEach((element) => {
        element.style.backgroundColor = ''; 
        element.style.pointerEvents = 'auto'; 
      });
    }

    displayQuestion(data[questionIndex]);

    document.querySelectorAll('.answer').forEach((element, index) => {
      element.addEventListener('click', () => {
        const selectedAnswerIndex = index; 
        const correctAnswerIndex = data[questionIndex].correctAnswer; 

        if (selectedAnswerIndex === correctAnswerIndex) {
          score = score + 10; 
        }

        document.querySelector('.score span').innerText = score;

        document.querySelectorAll('.answer')[selectedAnswerIndex].style.backgroundColor = 'red';

        document.querySelectorAll('.answer')[correctAnswerIndex].style.backgroundColor = 'green';

        document.querySelectorAll('.answer').forEach((element) => {
          element.style.pointerEvents = 'none'; 
        });

        setTimeout(() => {
          questionIndex++;
          if (questionIndex < data.length) {
            displayQuestion(data[questionIndex]);
          } else {
            document.querySelector('.question').innerText = "Bạn đã hoàn thành quiz!";
            document.querySelector('.answers').innerHTML = `Điểm của bạn: ${score}/100`;
            if(score < 50){
              alert('Bạn đã trượt')
            }else{
              alert('Bạn đã qua bài kiểm tra')
            }
          }
        }, 1000); 
      });
    });
  })
  .catch(error => console.error('Error loading questions:', error));
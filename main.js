fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    const questionsContainer = document.getElementById('questions-container');
    document.querySelectorAll('input.answer').forEach(input => {
      input.addEventListener('input', (event) => {
        const valueLength = event.target.value.length;
        event.target.style.width = `${Math.max(50, valueLength * 10)}px`; // Điều chỉnh độ rộng theo số ký tự
      });
    });
    
    data.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.classList.add('text-question'); 
      questionDiv.setAttribute('data-answer', question.answer); 
      questionDiv.setAttribute('data-id', question.id); 
      
      questionDiv.innerHTML = `
        <p class="question">${question.question}</p>
        <div class="icon">
            <p class="circle">${question.id}</p>
        </div>
        <input type="text" class="answer" placeholder="________">
      `;
      questionsContainer.appendChild(questionDiv); 
    });

    document.querySelectorAll('input.answer').forEach(input => {
      input.addEventListener('input', (event) => {
        const textLength = event.target.value.length;
        
        // Đặt width của input dựa trên độ dài văn bản, cộng thêm một giá trị để tránh quá nhỏ
        event.target.style.width = `${Math.max(50, textLength * 10)}px`; 
      });
    });
    console.log("log")
    document.querySelector('.submit').addEventListener('click', () => {
      const questionElements = document.querySelectorAll('.text-question');

      questionElements.forEach(questionElement => {
        const userAnswer = questionElement.querySelector('.answer').value.trim();
        const correctAnswer = questionElement.getAttribute('data-answer'); 
        const iconElement = questionElement.querySelector('.icon'); 

        if (userAnswer === correctAnswer) {
          iconElement.style.backgroundColor = 'lightgreen'; 
        } else {
          iconElement.style.backgroundColor = 'red';
        }
      });
    });

    document.querySelector('.reset').addEventListener('click', () => {
      const questionElements = document.querySelectorAll('.text-question');
      questionElements.forEach(questionElement => {
        questionElement.querySelector('.icon').style.backgroundColor = ''; 
        questionElement.querySelector('.answer').value = ''; 
      });
    });
  })
  .catch(error => console.error('Error loading questions:', error)); 
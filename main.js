function getResult(operation){
    const n1 = document.getElementsByClassName('num-1')[0].value;
    const n2 = document.getElementsByClassName('num-2')[0].value;
    let result = 0;

    if(n1 == '' || n2 == ''){
        alert('Yeu cau nhap day du cac so')
    }
    else{
        if(operation === 'plus'){
            result = parseFloat(n1) + parseFloat(n2);
        }else if(operation === 'sub'){
            result = parseFloat(n1) - parseFloat(n2);
        }else if(operation === 'multiple'){
            result = parseFloat(n1) * parseFloat(n2);
        }else if(operation === 'divide'){
            if(n2 == 0){
                alert("Không thể chia cho 0");
                return;
            }else{
                result = parseFloat(n1) / parseFloat(n2);
            }
        }
    
        document.getElementById('result').innerText = result;
    }

}
function calculaImc(peso, altura){
           
            return (peso / Math.pow(altura,2)).toFixed(2);
        }

        function classificarImc(imc){
          
            let classificacao = 'Obesidade Grau III (Mórbida)';

            if(imc < 18.5){

                classificacao = 'Abaixo do peso';
            }

            if(imc >= 18.5 && imc <= 24.9){

                classificacao = 'Peso Normal';
            }

            if(imc >= 25 && imc <= 29.9){

                classificacao = 'Sobrepeso';
            }

            if(imc >= 30 && imc <= 34.9){

                classificacao = 'Obesidade Grau I';
            }

            if(imc >= 35 && imc <= 39.9){

                classificacao = 'Obesidade Grau II';
            }

            return classificacao;
        }

        function destaque(classificacao){

            let arr = [];
            
            arr['Abaixo do peso'] = 'text-danger';
            arr['Peso Normal'] = 'text-success';
            arr['Sobrepeso'] = 'text-success';
            arr['Obesidade Grau I'] = 'text-warning';
            arr['Obesidade Grau II'] = 'text-danger';
            arr['Obesidade Grau III (Mórbida)'] = 'text-danger';

            return arr[classificacao]; 
        }
        
        function formatDate(date){

            let dateFormat = new Intl.DateTimeFormat('pt-BR', {dateStyle: 'short'}).format(date);
            
            let timeFormat = new Intl.DateTimeFormat('pt-BR', {timeStyle: 'short'}).format(date);

            return `${dateFormat} - ${timeFormat.replace(':','h')}`;
        }

        function handleForm(event){

            event.preventDefault();

            let nome = form.nome.value;
            let altura = parseFloat(form.altura.value.replace(',','.'));
            let peso = parseFloat(form.peso.value.replace(',','.'));

            let imc = calculaImc(peso,altura);           

            let linha = document.createElement('tr');

            let colunaId = document.createElement('th');
            let colunaData = document.createElement('td');
            let colunaNome = document.createElement('td');
            let colunaAltura = document.createElement('td');
            let colunaPeso = document.createElement('td');
            let colunaImc = document.createElement('td');
            let colunaClassificacao = document.createElement('td');

            colunaId.innerText = count;
            colunaId.setAttribute('scope', 'row');

            colunaData.innerText = formatDate(new Date());

            colunaNome.innerText = nome;
            colunaAltura.innerText = altura;
            colunaPeso.innerText = peso;
            colunaImc.innerText = imc;

            let classificacao = classificarImc(imc);               
           
            colunaClassificacao.innerText = classificacao;   

            colunaClassificacao.classList.add(destaque(classificacao));    

            linha.appendChild(colunaId);
            linha.appendChild(colunaData);
            linha.appendChild(colunaNome);
            linha.appendChild(colunaAltura);
            linha.appendChild(colunaPeso);
            linha.appendChild(colunaImc);            
            linha.appendChild(colunaClassificacao);     
           
            tabela.prepend(linha);

            let linhas = document.querySelectorAll('table tr');

            console.log(linhas);

            form.nome.value = '';
            form.altura.value = '';
            form.peso.value = '';

            count++;
        }

        let form = document.querySelector('form');

        let btn = form.querySelector('button');

        let tabela = document.querySelector('table tbody');   
       
        btn.addEventListener('click', handleForm);

        let count = 1;
        

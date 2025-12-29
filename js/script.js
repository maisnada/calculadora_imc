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

            let dateFormat = new Intl.DateTimeFormat('pt-BR', {day: '2-digit', month: '2-digit', year: "2-digit"}).format(date);
            
            let timeFormat = new Intl.DateTimeFormat('pt-BR', {timeStyle: 'medium'}).format(date);

            return `${dateFormat} - ${timeFormat}`;
        }

        function criarLinhaTabela(registro){

            let linha = document.createElement('tr');

            let colunaId = document.createElement('th');
            let colunaData = document.createElement('td');
            let colunaNome = document.createElement('td');
            let colunaAltura = document.createElement('td');
            let colunaPeso = document.createElement('td');
            let colunaImc = document.createElement('td');
            let colunaClassificacao = document.createElement('td');

            colunaId.innerText = registro.id;
            colunaId.setAttribute('scope', 'row');

            colunaData.innerText = formatDate(registro.data);

            colunaNome.innerText = registro.nome;
            colunaAltura.innerText = registro.altura;
            colunaPeso.innerText = registro.peso;
            colunaImc.innerText = registro.imc;

            let classificacao = classificarImc(registro.imc);               
           
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
        }

        function getCount(){

            if(localStorage.getItem("dados")){

                let dados = JSON.parse(localStorage.getItem("dados"));

                return dados.length + 1;                
            }

            return 1;
        }

        function handleForm(event){            

            event.preventDefault();

            let nome = form.nome.value;
            let altura = parseFloat(form.altura.value.replace(',','.'));
            let peso = parseFloat(form.peso.value.replace(',','.'));

            let imc = calculaImc(peso,altura);
            let classificacao = classificarImc(imc);   

            let registro = {
                id: getCount(),
                data: new Date(),
                nome:nome,
                altura:altura,
                peso:peso,
                imc:imc, 
                classificacao:classificacao
            }

            criarLinhaTabela(registro);   

            if(localStorage.getItem("dados")){

                let dados = JSON.parse(localStorage.getItem("dados"));

                dados.push(registro);  
                
                localStorage.setItem("dados", JSON.stringify(dados));

            }else{                          

                localStorage.setItem("dados", JSON.stringify(new Array(registro)));
            }            

           if(localStorage.getItem("dados")){

                let dados = JSON.parse(localStorage.getItem("dados"));             
                               
            }

            form.nome.value = '';
            form.altura.value = '';
            form.peso.value = '';    
            
            form.nome.focus();
            
        }

        let form = document.querySelector('form');  
        
        form.nome.focus();

        let btn = form.querySelector('button');

        let tabela = document.querySelector('table tbody');   
       
        btn.addEventListener('click', handleForm);        
        
        if(localStorage.getItem("dados")){

            let dados = JSON.parse(localStorage.getItem("dados"));

            dados.forEach((d) => {

                d.data = new Date(d.data);               

                criarLinhaTabela(d);  
            });           
             
        }
       

        

// Variavel Global contendo o HTML da pagina conforme solicitado.
var _html = `<html>
<head>
    <title>Gulliver Traveller - Roteiros</title>
</head>
<body>
    <b>->1 - Roteiros para *São Paulo*</b>
    <br>
    A Terra da Garoa!
    <br>
    Fundada em 25 de janeiro de 1554 a cidade tem hoje cerca de 12 milhões de habitantes e é considerada o centro
    financeiro do Brasil e aqui vão 3 dicas de roteiros obrigatórios para aqueles que passam pela capital paulista
    <br>
    #Roteiro A | Região: Avenida Paulista
    <br>
    MASP; Parque Trianon; Rua Augusta
    <br>
    #Roteiro B | Região: Centro
    <br>
    Catedral da Sé; Pátio do Colégio; Rua Augusta
    <br>
    #Roteiro C | Região: Vila Madalena
    <br>
    Beco do Batman; Feirinha da Benedito Calixto; Livraria da Vila
    <br>
    <b>->2 - Roteiros para *Las Vegas*</b>
    <br>
    Viva Las Vegas!
    <br>
    A cidade mais populosa e mais densamente povoada do estado de Nevada, Las Vegas foi fundada em 1905 e é considerada
    uma cidade, oficialmente, desde 1911 e conta com mais de meio milhão de habitantes. Venha conhecer a capital dos
    jogos de azar!
    <br>
    #Roteiro A | Região: Las Vegas Boulevard South
    <br>
    Fonte do Bellagio; Principais Cassinos; Madame Tussauds
    <br>
    #Roteiro B | Região: Downtown;
    <br>
    Fremont; Las Vegas Art Museum; Museu nacional do Crime Organizado;
    <br>
    #Roteiro C | Região: Las Vegas Boulevard North
    <br>
    Outlet Premium North; Stratosphere; Apple Fashion Sho
    <br>
    <b>->3 - Roteiros para *Moscou*</b>
    <br>
    Privet!
    <br>
    A capital Russa fica situada às margens do Rio Moscou e apesar de ser a cidade mais cosmopolita da Rússia, conta com
    grande resguardo de sua história soviética
    <br>
    #Roteiro A | Região: Praça Vermelha
    <br>
    Museu Histórico do Estado; Catedral de São Basílico; Mausoléu de Lênin
    <br>
    #Roteiro B | Região: Centro
    <br>
    Teatro Bolshoi; Monumento a Karl Marx; Rio Moscou
    <br>
    #Roteiro C | Região: Obras pela cidade
    <br>
    Metrô de Moscou; As Sete Irmãs; Moscow Leningradsky Railway Station
    <br>
</body>
</html>`;

//Função responsavel por extrair dados da variavel global
function extrai_dados() {

    //Cria uma variavel para armazenar os roteiros
    var roteiros = [];

    // limpa o html zuado do Gulliver para trabalhar apenas com texto
    _html = _html.replace(/<title([\s\S]*?)<\/title>/gi, ' ').replace(/<br>/gi, "/n")
        .replace(/<script([\s\S]*?)<\/script>/gi, ' ')
        .replace(/(<(?:.|\n)*?>)/gm, ' ')
        .replace(/\s+/gm, ' ').trim();
    
    //Quebra os 3 roteiros para facilitar a localização
    var _split = _html.split('->');
    
    //Varre os 3 roteiros
    _split.forEach(roteiro => {

        //Variavel para armazenar as cidades extraidas.
        var cidade = {};
    
        var atributos = roteiro.split('/n');
        if (atributos[0].length > 0) {
    
            cidade.codigo = atributos[0].split('-')[0].trim();
            cidade.cidade = atributos[0].split('-')[1].replace("Roteiros para ", "").replace("*", "").replace("*", "").trim();
            cidade.titulo = atributos[1].trim();
            cidade.descricao = atributos[2].trim();
    
            //Variavel para armazenar cada roteiro de uma cidade
            var _roteiros = [];
    
            //Varrendo roteiros para localizar os locais
            for (let index = 3; index < atributos.length; index++) {
    
                if (atributos[index].indexOf("#") > 0) {


                    const roteiro = {};
                    roteiro.rota = atributos[index].split("|")[0].replace(" #Roteiro ", "").trim();
                    roteiro.regiao = atributos[index].split("|")[1].replace(" Região: ", "").replace(";", "").trim();
                    roteiro.locais = [];
                    
                    //extraindo locais separados por ;
                    atributos[index + 1].split(";").forEach(local => {
                        if(local.trim().length> 0)
                        roteiro.locais.push(local.trim());
                    })

                    //criando variavel para informar o numero de locais
                    roteiro.qnt_locais = roteiro.locais.length;
                    
                    //Armazenando roteiros 
                    _roteiros.push(roteiro);
                }
            }
            cidade.roteiros = _roteiros;
        //Armazenando cidades
        roteiros.push(cidade);  
        }  
    });

    //retornando valores extraidos.
    return roteiros;

}


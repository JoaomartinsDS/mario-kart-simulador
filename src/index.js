const player1 = {
    NOME : "Mario",
    VELOCIDADE : 4,
    MANOBRABILIDADE : 3,
    PODER : 3,
    PONTOS : 0 ,
};

const player2 = {
    NOME : "Luigi",
    VELOCIDADE : 3,
    MANOBRABILIDADE : 4,
    PODER : 4,
    PONTOS : 0 ,
};

async function rollDice(){
   return Math.floor( Math.random() * 6) + 1;
}
async function logRollResult(characterName, block, diceResult, attribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
    
}
async function playRaceEngine(character1, character2) {

    for(let round = 1; round <= 5;round++){
        console.log(`🏁 Rodada ${round}`)

        //sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`)

        //rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if(block === "RETA"){
            totalTestSkill1 = diceResult1 + player1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + player2.VELOCIDADE

            await logRollResult(
                character1.NOME,
                "Velocidade",
                diceResult1,
                character1.VELOCIDADE
            )

            await logRollResult(
                character2.NOME,
                "Velocidade",
                diceResult2,
                character2.VELOCIDADE
            )
            if(totalTestSkill1 > totalTestSkill2){
                console.log(`${character1.NOME} marcou um ponto!`)
                character1.PONTOS++;
            }
            else if(totalTestSkill2 > totalTestSkill1){
                console.log(`${character2.NOME} marcou um ponto!`)
                character2.PONTOS++;
            }
            else{
                console.log(`${character1.NOME} empatou com ${character2.NOME}! Nenhum ponto foi ganho.`)
            }

            
        }
        else if(block === "CURVA"){
            totalTestSkill1 = diceResult1 + player1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + player2.MANOBRABILIDADE
            await logRollResult(
                character1.NOME,
                "Manobrabilidade",
                diceResult1,
                character1.MANOBRABILIDADE
            )
            
            await logRollResult(
                character2.NOME,
                "Manobrabilidade",
                diceResult2,
                character2.MANOBRABILIDADE
            )
            if(totalTestSkill1 > totalTestSkill2){
                console.log(`${character1.NOME} marcou um ponto!`)
                character1.PONTOS++;
            }
            else if(totalTestSkill2 > totalTestSkill1){
                console.log(`${character2.NOME} marcou um ponto!`)
                character2.PONTOS++;
            }else{
                console.log(`${character1.NOME} empatou com ${character2.NOME}! Nenhum ponto foi ganho.`)
            }

            
        }
        else{
            totalTestSkill1 = diceResult1 + player1.PODER;
            totalTestSkill2 = diceResult2 + player2.PODER;
            console.log(`${character1.NOME} confrontou com ${character2.NOME} 🥊🥊`)

            await logRollResult(
                character1.NOME,
                "Poder",
                diceResult1,
                character1.PODER
            )
            
            await logRollResult(
                character2.NOME,
                "Poder",
                diceResult2,
                character2.PODER
            )
            if(totalTestSkill1 > totalTestSkill2){
                if(character2.PONTOS > 0){
                console.log(`${character1.NOME} perdeu um ponto!`)
                character1.PONTOS--;}
            }
            else if(totalTestSkill2 > totalTestSkill1){
                if(character1.PONTOS > 0){
                console.log(`${character2.NOME} perdeu um ponto!`)
                character2.PONTOS--;}
            }
            else{
                console.log("Confronto empatado! Nenhum ponto foi perdido")
            }

            
        }
        console.log("-----------------------------------------------")
    }
    
}
async function getRandomBlock() {
    let random = Math.random();
    let result 
    
    switch (true) {
        case random < 0.33:
            result = "RETA"            
            break;

        case random < 0.66:
            result = "CURVA"
            break;
    
        default:
            result = "CONFRONTO";
            break;
    }

    return result;
}
(async function main() {
    console.log(`🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);

    await playRaceEngine(player1, player2);
})();
import { Component } from '@angular/core';
import { faFireAlt, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { Items } from './models/items'
import { Macros } from './models/macros';

export class MacrosNutrientes {
  public gordura: number;
  public proteina: number;
  public carbo: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {
  faFireAlt = faFireAlt;
  faUtensils = faUtensils;
  
  resultado = false;
  
  sexo = null;
  idade = null;
  peso = null;
  altura = null;
  nivelAtividadeFisica = null;

  tmb = 0;
  manutencao = 0;
  perderPeso = 0;
  ganharPeso = 0;
  macros: Items[];
  

  calcularResultado() {
    this.tmb = Math.round(
      this.sexo === 'feminino' 
      ? (655 + (9.6 * this.peso) + (1.8 * this.altura) - (4.7 * this.idade))
      : (66 + (13.7 * this.peso) + (5 * this.altura) - (6.8 * this.idade))
    );
    this.manutencao = Math.round(this.tmb * Number(this.nivelAtividadeFisica));
    this.perderPeso = this.manutencao - 450;
    this.ganharPeso = this.manutencao + 450;
    this.getMacros(this.manutencao, this.perderPeso, this.ganharPeso);
    
    this.resultado = true;

  }

  voltar() {
    this.resultado = false;
  }

  
  getMacros(manutencao, perderPeso, ganharPeso){

    var resultManutencaoModerado = this.getResult(manutencao, 35, 30, 35);
    var resultManutencaoBaixo = this.getResult(manutencao, 20, 40, 40);
    var resultManutencaoAlto = this.getResult(manutencao, 50, 30, 20);

    var resultPerdePesoModerado = this.getResult(perderPeso, 35, 30, 35);
    var resultPerdePesoBaixo = this.getResult(perderPeso, 20, 40, 40);
    var resultPerdePesoAlto = this.getResult(perderPeso, 50, 30, 20);
    
    var resultGanharPesoModerado = this.getResult(ganharPeso, 35, 30, 35);
    var resultGanharPesoBaixo = this.getResult(ganharPeso, 20, 40, 40);
    var resultGanharPesoAlto = this.getResult(ganharPeso, 50, 30, 20);



    return this.macros = [
      new Items('Manuteção', [
        new Macros(manutencao, resultManutencaoModerado.gordura, resultManutencaoModerado.carbo, resultManutencaoModerado.proteina, 'Carbos Moderados (30/35/35)'),
        new Macros(manutencao, resultManutencaoBaixo.gordura, resultManutencaoBaixo.carbo, resultManutencaoBaixo.proteina, 'Baixo Carbo (40/40/20)'),
        new Macros(manutencao, resultManutencaoAlto.gordura, resultManutencaoAlto.carbo, resultManutencaoAlto.proteina, 'Alto Carbo (30/20/50)')
      ]),
      new Items('Perda de Peso', [
        new Macros(perderPeso, resultPerdePesoModerado.gordura, resultPerdePesoModerado.carbo, resultPerdePesoModerado.proteina, 'Carbos Moderados (30/35/35)'),
        new Macros(perderPeso, resultPerdePesoBaixo.gordura, resultPerdePesoBaixo.carbo, resultPerdePesoBaixo.proteina, 'Baixo Carbo (40/40/20)'),
        new Macros(perderPeso, resultPerdePesoAlto.gordura, resultPerdePesoAlto.carbo, resultPerdePesoAlto.proteina, 'Alto Carbo (30/20/50)')
      ]),
      new Items('Ganhar Peso', [
        new Macros(ganharPeso, resultGanharPesoModerado.gordura, resultGanharPesoModerado.carbo, resultGanharPesoModerado.proteina, 'Carbos Moderados (30/35/35)'),
        new Macros(ganharPeso, resultGanharPesoBaixo.gordura, resultGanharPesoBaixo.carbo, resultGanharPesoBaixo.proteina, 'Baixo Carbo (40/40/20)'),
        new Macros(ganharPeso, resultGanharPesoAlto.gordura, resultGanharPesoAlto.carbo, resultGanharPesoAlto.proteina, 'Alto Carbo (30/20/50)')
      ]),

    ]
  }

  getResult(totalCalorias, porcentagemCarbo, porcentagemProteina, porcentagemGordura) {
    const resultado = new MacrosNutrientes();
    resultado.carbo = Math.round(((totalCalorias * porcentagemCarbo /100) / 4))
    resultado.proteina = Math.round(((totalCalorias * porcentagemProteina /100) / 4))
    resultado.gordura = Math.round(((totalCalorias * porcentagemGordura /100) / 9))

    return resultado;
  }

}

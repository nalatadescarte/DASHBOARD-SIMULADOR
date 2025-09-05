import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { RevenueChart } from "./charts/RevenueChart";
import { CostsChart } from "./charts/CostsChart";
import { BreakEvenChart } from "./charts/BreakEvenChart";
import { PaybackChart } from "./charts/PaybackChart";
import { ProfitabilityChart } from "./charts/ProfitabilityChart";
import { Calculator, TrendingUp, PieChart, BarChart3, DollarSign, Settings } from "lucide-react";
import { calculateMonthlyCanProjection } from "@/lib/projection-utils";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
  investimentoInicial: number;
  etapaCrescimento: "primeira" | "expansao";
}

export function Dashboard() {
  const [periodoProjecao, setPeriodoProjecao] = useState<"12" | "24" | "36">("12");
  const [dados, setDados] = useState<DashboardData>({
    vendaLatasPrimeiroMes: 60,
    valorLocacaoLata: 80.00,
    precoGasolina: 6.00,
    distanciaDescarte: 20,
    taxaCrescimentoMensal: 15,
    salariosEncargos: 3200,
    aluguelPonto: 1400,
    investimentoInicial: 95000,
    etapaCrescimento: "primeira",
  });

  const handleInputChange = (field: keyof DashboardData, value: number | string) => {
    setDados(prev => ({ ...prev, [field]: value }));
  };

  // Calcular multiplicador baseado na projeção
  let multiplicador = 1;
  if (dados.etapaCrescimento === "expansao") {
    // Encontrar o primeiro mês que ultrapassa 320 latas nos próximos 12 meses
    let primeiroMesAcima320 = null;
    for (let m = 1; m <= 12; m++) {
      const latasDoMes = calculateMonthlyCanProjection(dados.vendaLatasPrimeiroMes, dados.taxaCrescimentoMensal, m, 640);
      if (latasDoMes > 320) {
        primeiroMesAcima320 = m;
        break;
      }
    }
    // Se há projeção acima de 320 latas, usar multiplicador para os custos
    if (primeiroMesAcima320) {
      multiplicador = 2;
    }
  }
  const limiteLatas = dados.etapaCrescimento === "expansao" ? 640 : 320;

  // Cálculos detalhados baseados nas fórmulas da planilha
  const custosVariaveis = {
    combustivel: (dados.vendaLatasPrimeiroMes / 2) * dados.precoGasolina,
    botaForaLicenciado: ((dados.precoGasolina * dados.distanciaDescarte * 2) / 10) + (dados.vendaLatasPrimeiroMes * 3.50),
    manutencaoVeiculo: 0.20 * (((dados.vendaLatasPrimeiroMes * dados.valorLocacaoLata) / dados.valorLocacaoLata) / 4) * dados.distanciaDescarte * 2,
    energiaAguaImpostos: 800, // Valor fixo mensal estimado
  };

  // Função para calcular salário baseado no mês
  const getSalarioPorMes = (mes: number): number => {
    // Se selecionou 1 colaborador (3200), usar esse valor até o 4º mês
    if (dados.salariosEncargos === 3200) {
      return mes <= 4 ? 3200 : 6400;
    }
    // Se selecionou 2 colaboradores (6400), usar sempre esse valor
    return dados.salariosEncargos;
  };

  const custosFixos = {
    aluguelPonto: dados.aluguelPonto,
    salariosEncargos: dados.salariosEncargos, // Valor base para cálculos gerais
    contabilidade: 500,
    seguroVeiculo: 250,
    marketingPublicidade: 300,
    franquiaRoyalties: 1500,
    planoCelular: 100,
  };

  const totalCustosVariaveis = Object.values(custosVariaveis).reduce((a, b) => a + b, 0) * multiplicador;
  const totalCustosFixos = Object.values(custosFixos).reduce((a, b) => a + b, 0) * multiplicador;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/lovable-uploads/733fe496-d79b-4548-b7b5-85c79c31a8fd.png" 
              alt="NaLata Logo" 
              className="h-12"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard NaLata</h1>
              <p className="text-muted-foreground">PAINEL SIMULAÇÃO FINANCEIRA - FRANQUIA</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Controles - Divididos em dois painéis */}
        <div className="grid gap-6 mb-8 lg:grid-cols-2">
          <TooltipProvider>
            {/* Primeiro Painel - Parâmetros Principais */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Parâmetros de Configuração
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="vendaLatas">Venda de Latas 1º Mês</Label>
                          <Input
                            id="vendaLatas"
                            type="number"
                            value={dados.vendaLatasPrimeiroMes}
                            onChange={(e) => handleInputChange('vendaLatasPrimeiroMes', Number(e.target.value))}
                            className="mt-2"
                          />
                        </div>
                      </TooltipTrigger>
                       <TooltipContent>
                         <p>Inserir o número de latas<br />vendidas no 1º mês</p>
                       </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="taxaCrescimento">Taxa Crescimento Mensal (%)</Label>
                          <Input
                            id="taxaCrescimento"
                            type="number"
                            value={dados.taxaCrescimentoMensal}
                            onChange={(e) => handleInputChange('taxaCrescimentoMensal', Number(e.target.value))}
                            className="mt-2"
                          />
                        </div>
                      </TooltipTrigger>
                       <TooltipContent>
                         <p>Indicado a escolha de uma taxa de<br />crescimento acima de 15% para o primeiro ano</p>
                       </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="investimento">Investimento Inicial (R$)</Label>
                          <Input
                            id="investimento"
                            type="number"
                            value={dados.investimentoInicial}
                            onChange={(e) => handleInputChange('investimentoInicial', Number(e.target.value))}
                            className="mt-2"
                          />
                        </div>
                      </TooltipTrigger>
                       <TooltipContent>
                         <p>O valor de R$ 95.000,00 refere-se a<br />- R$ 25.000,00 de taxa de franquia,<br />- R$ 35.000,00 equipamentos, uniformes,<br />Trade Dress e abertura empresa,<br />-R$ 35.000,00 valor sugerido para aquisição do veículo</p>
                       </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Label htmlFor="valorLocacao">Valor Locação Lata</Label>
                    <Select 
                      value={dados.valorLocacaoLata.toString()} 
                      onValueChange={(value) => handleInputChange('valorLocacaoLata', Number(value))}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="80">R$ 80,00</SelectItem>
                        <SelectItem value="90">R$ 90,00</SelectItem>
                        <SelectItem value="100">R$ 100,00</SelectItem>
                        <SelectItem value="120">R$ 120,00</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="distanciaDescarte">Distância Descarte (Km)</Label>
                    <Input
                      id="distanciaDescarte"
                      type="number"
                      value={dados.distanciaDescarte}
                      onChange={(e) => handleInputChange('distanciaDescarte', Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="etapaCrescimento">Etapa de Crescimento</Label>
                          <Select 
                            value={dados.etapaCrescimento} 
                            onValueChange={(value) => handleInputChange('etapaCrescimento', value)}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="primeira">1. Primeira unidade</SelectItem>
                              <SelectItem value="expansao">2. Expansão (segunda unidade)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Simule o ponto de partida do seu<br />negócio e projete sua expansão com<br />a abertura da segunda unidade</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Segundo Painel - Custos Iniciais */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Custos Iniciais
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="precoGasolina">Preço Gasolina (R$)</Label>
                    <Input
                      id="precoGasolina"
                      type="number"
                      step="0.01"
                      value={dados.precoGasolina}
                      onChange={(e) => handleInputChange('precoGasolina', Number(e.target.value))}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="salarios">Salários e Encargos</Label>
                          <Select 
                            value={dados.salariosEncargos.toString()} 
                            onValueChange={(value) => handleInputChange('salariosEncargos', Number(value))}
                          >
                            <SelectTrigger className="mt-2">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3200">01 colaborador - R$ 3.200,00</SelectItem>
                              <SelectItem value="6400">02 colaboradores - R$ 6.400,00</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TooltipTrigger>
                       <TooltipContent>
                         <p>Indicado nos 4 primeiros meses<br />a contratação de 01 colaborador</p>
                       </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <Label htmlFor="aluguel">Aluguel Ponto Comercial (R$)</Label>
                          <Input
                            id="aluguel"
                            type="number"
                            value={dados.aluguelPonto}
                            onChange={(e) => handleInputChange('aluguelPonto', Number(e.target.value))}
                            className="mt-2"
                          />
                        </div>
                      </TooltipTrigger>
                       <TooltipContent>
                         <p>Considerar o valor de um espaço<br />mínimo de 50m²</p>
                       </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Label>Total Custos Variáveis</Label>
                    <div className="mt-2 p-3 bg-muted rounded-md text-sm font-semibold text-muted-foreground">
                      R$ {totalCustosVariaveis.toFixed(2)}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <Label>Total Custos Fixos</Label>
                    <div className="mt-2 p-3 bg-muted rounded-md text-sm font-semibold text-muted-foreground">
                      R$ {totalCustosFixos.toFixed(2)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TooltipProvider>
        </div>

        {/* Gráficos */}
        <div className="grid gap-6">
          {/* Gráfico de Receitas */}
          <Card className="border-nalata-orange/20 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Projeção de Faturamento Bruto
                </CardTitle>
                <Select value={periodoProjecao} onValueChange={(value: "12" | "24" | "36") => setPeriodoProjecao(value)}>
                  <SelectTrigger className="w-32 bg-white text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 Meses</SelectItem>
                    <SelectItem value="24">24 Meses</SelectItem>
                    <SelectItem value="36">36 Meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <RevenueChart dados={dados} periodo={periodoProjecao} limiteLatas={limiteLatas} />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Custos */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  Análise de Custos e Lucro
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <CostsChart dados={dados} custosVariaveis={totalCustosVariaveis} custosFixos={totalCustosFixos} limiteLatas={limiteLatas} etapaCrescimento={dados.etapaCrescimento} getSalarioPorMes={getSalarioPorMes} />
              </CardContent>
            </Card>

            {/* Gráfico Break-Even */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Break-Even Financeiro
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <BreakEvenChart dados={dados} totalCustosVariaveis={totalCustosVariaveis} totalCustosFixos={totalCustosFixos} limiteLatas={limiteLatas} etapaCrescimento={dados.etapaCrescimento} getSalarioPorMes={getSalarioPorMes} />
              </CardContent>
            </Card>
          </div>

          {/* Novos Gráficos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Gráfico de Lucratividade Média */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Lucratividade Média Mensal
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ProfitabilityChart 
                  dados={dados} 
                  periodo={periodoProjecao}
                  totalCustosVariaveis={totalCustosVariaveis}
                  totalCustosFixos={totalCustosFixos}
                  limiteLatas={limiteLatas}
                  etapaCrescimento={dados.etapaCrescimento}
                  getSalarioPorMes={getSalarioPorMes}
                />
              </CardContent>
            </Card>

            {/* Gráfico de Payback */}
            <Card className="border-nalata-orange/20 shadow-elegant">
              <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Análise de Payback
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <PaybackChart
                  dados={dados}
                  totalCustosVariaveis={totalCustosVariaveis}
                  totalCustosFixos={totalCustosFixos}
                  limiteLatas={limiteLatas}
                  etapaCrescimento={dados.etapaCrescimento}
                  getSalarioPorMes={getSalarioPorMes}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
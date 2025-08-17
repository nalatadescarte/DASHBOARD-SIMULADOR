import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RevenueChart } from "./charts/RevenueChart";
import { CostsChart } from "./charts/CostsChart";
import { BreakEvenChart } from "./charts/BreakEvenChart";
import { Calculator, TrendingUp, PieChart, BarChart3 } from "lucide-react";

interface DashboardData {
  vendaLatasPrimeiroMes: number;
  valorLocacaoLata: number;
  precoGasolina: number;
  distanciaDescarte: number;
  taxaCrescimentoMensal: number;
  salariosEncargos: number;
  aluguelPonto: number;
}

export function Dashboard() {
  const [periodoProjecao, setPeriodoProjecao] = useState<"12" | "24" | "36">("12");
  const [dados, setDados] = useState<DashboardData>({
    vendaLatasPrimeiroMes: 100,
    valorLocacaoLata: 15.00,
    precoGasolina: 5.50,
    distanciaDescarte: 20,
    taxaCrescimentoMensal: 5,
    salariosEncargos: 3000,
    aluguelPonto: 2000,
  });

  const handleInputChange = (field: keyof DashboardData, value: number) => {
    setDados(prev => ({ ...prev, [field]: value }));
  };

  // Cálculo do "Bota-fora licenciado" baseado na fórmula da planilha
  const botaForaLicenciado = (dados.precoGasolina * dados.distanciaDescarte * 2) / 10;

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
              <p className="text-muted-foreground">Painel de Controle da Franquia</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Controles */}
        <div className="grid gap-6 mb-8">
          <Card className="border-nalata-orange/20 shadow-elegant">
            <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Parâmetros de Configuração
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <div>
                  <Label htmlFor="valorLocacao">Valor Locação Lata (R$)</Label>
                  <Input
                    id="valorLocacao"
                    type="number"
                    step="0.01"
                    value={dados.valorLocacaoLata}
                    onChange={(e) => handleInputChange('valorLocacaoLata', Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
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
                  <Label htmlFor="taxaCrescimento">Taxa Crescimento Mensal (%)</Label>
                  <Input
                    id="taxaCrescimento"
                    type="number"
                    value={dados.taxaCrescimentoMensal}
                    onChange={(e) => handleInputChange('taxaCrescimentoMensal', Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="salarios">Salários e Encargos (R$)</Label>
                  <Input
                    id="salarios"
                    type="number"
                    value={dados.salariosEncargos}
                    onChange={(e) => handleInputChange('salariosEncargos', Number(e.target.value))}
                    className="mt-2"
                  />
                </div>
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
                <div>
                  <Label>Bota-fora Licenciado (R$)</Label>
                  <div className="mt-2 p-3 bg-muted rounded-md text-sm font-semibold text-muted-foreground">
                    R$ {botaForaLicenciado.toFixed(2)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <RevenueChart dados={dados} periodo={periodoProjecao} />
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
                <CostsChart dados={dados} botaForaLicenciado={botaForaLicenciado} />
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
                <BreakEvenChart dados={dados} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
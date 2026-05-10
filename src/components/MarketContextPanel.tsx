import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe } from "lucide-react";

const MARKET_DATA = [
  { indicador: "Resíduos de construção gerados/ano no Brasil", dado: "+70 milhões de toneladas", fonte: "ABRECON/SINDUSCON" },
  { indicador: "Volume corretamente reciclado ou destinado", dado: "apenas 20% a 30%", fonte: "ABRECON" },
  { indicador: "Edificações residenciais e comerciais no Brasil", dado: "~5,5 milhões", fonte: "SINDUSCON" },
  { indicador: "Reformas realizadas por ano (estimativa)", dado: "1,5 a 2 milhões", fonte: "SINDUSCON" },
  { indicador: "Risco de multa para empresas sem destinação correta", dado: "ALTO — legislação municipal crescente", fonte: "CONAMA" },
  { indicador: "Mercado estimado de gestão de resíduos/ano", dado: "+R$ 7 bilhões", fonte: "ABRELPE" },
];

export function MarketContextPanel() {
  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Contexto de Mercado Nacional — O Problema é Grande (FASE 1)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Indicador</th>
                <th className="text-right py-2 px-3 font-semibold">Dado</th>
                <th className="text-right py-2 pl-3 text-muted-foreground font-medium">Fonte</th>
              </tr>
            </thead>
            <tbody>
              {MARKET_DATA.map((row) => (
                <tr key={row.indicador} className="border-b border-border/40">
                  <td className="py-2 pr-4">{row.indicador}</td>
                  <td className="text-right py-2 px-3 font-semibold text-primary">{row.dado}</td>
                  <td className="text-right py-2 pl-3 text-xs text-muted-foreground whitespace-nowrap">{row.fonte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground italic border-l-4 border-primary/40 pl-3">
          "Você já reparou que toda obra do seu bairro tem uma caçamba na calçada? O mercado que você está prestes a ver não é sobre construção — é sobre o que sobra dela."
        </p>
      </CardContent>
    </Card>
  );
}

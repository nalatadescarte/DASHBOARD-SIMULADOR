import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const COMPARATIVO = [
  { criterio: "Espaço físico necessário", cacamba: "Grande (ocupa calçada/rua)", nalata: "Mínimo (tambor 200L)" },
  { criterio: "Velocidade de instalação", cacamba: "Horas / autorização prefeitura", nalata: "Imediata" },
  { criterio: "Acesso em condomínios verticais", cacamba: "Impossível", nalata: "Projetado para isso" },
  { criterio: "Certificação ambiental ao cliente", cacamba: "Não oferece", nalata: "Inclusa no serviço" },
  { criterio: "Fidelização do cliente", cacamba: "Baixa", nalata: "Alta (contrato recorrente)" },
  { criterio: "Receita para o operador", cacamba: "Por evento (esporádica)", nalata: "Mensal (recorrente)" },
  { criterio: "Conformidade legal (CONAMA/Municipal)", cacamba: "Parcial", nalata: "Documentação completa" },
];

export function CompetitiveTable() {
  return (
    <Card className="border-nalata-orange/20 shadow-elegant mb-6">
      <CardHeader className="bg-gradient-to-r from-primary to-nalata-orange-light text-primary-foreground rounded-t-lg">
        <CardTitle className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5" />
          Diferenciais Competitivos — Nalata vs Caçamba Tradicional (FASE 7)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 pr-4 text-muted-foreground font-medium">Critério</th>
                <th className="text-right py-2 px-3 text-muted-foreground font-medium">Caçamba Tradicional</th>
                <th className="text-right py-2 pl-3 text-primary font-semibold">🟢 Nalata Descarte Inteligente</th>
              </tr>
            </thead>
            <tbody>
              {COMPARATIVO.map((row) => (
                <tr key={row.criterio} className="border-b border-border/40">
                  <td className="py-2 pr-4 font-medium">{row.criterio}</td>
                  <td className="text-right py-2 px-3 text-muted-foreground">{row.cacamba}</td>
                  <td className="text-right py-2 pl-3 text-chart-profit font-semibold">{row.nalata}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-muted-foreground italic border-l-4 border-primary/40 pl-3">
          "A caçamba não é concorrente da Nalata. Ela é o problema que a Nalata resolve. A Nalata entra onde a caçamba não pode entrar."
        </p>
      </CardContent>
    </Card>
  );
}

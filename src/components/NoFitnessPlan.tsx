import Link from "next/link";
import CornerElements from "./CornerElements";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";

const NoFitnessPlan = () => {
  return (
    <div className="relative backdrop-blur-sm border border-border rounded-lg p-10 text-center">
      <CornerElements />

      <h2 className="text-2xl font-bold mb-4 font-mono">
        <span className="text-primary">Não</span> há treinos ou dietas ainda
      </h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Comece criando um plano de treinamento e dieta personalizados e
        adaptados aos seus objetivos e necessidades específicas.
      </p>
      <Button
        size="lg"
        asChild
        className="relative overflow-hidden bg-primary text-primary-foreground px-8 py-6 text-lg font-medium"
      >
        <Link href="/generate-program">
          <span className="relative flex items-center">
            Crie seu primeiro plano <ArrowRightIcon className="ml-2 h-5 w-5" />
          </span>
        </Link>
      </Button>
    </div>
  );
};
export default NoFitnessPlan;

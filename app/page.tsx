import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardHeader} from "@/src/components/ui/card";

export default function Home() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardContent>
            <p className="font-script text-4xl">Notre Histoire</p>
            <p className="font-script text-4xl">Évènements</p>
            <p className="font-script text-4xl">Collectif Felr</p>
            <p className="font-script text-4xl">Osez Felr</p>
          </CardContent>
        </CardHeader>
      </Card>
      <Button>Bonsoir !</Button>
    </div>
  );
}

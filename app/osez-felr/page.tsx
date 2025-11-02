import { Button } from "@/src/components/ui/button";
import { Card, CardTitle } from "@/src/components/ui/card";

export default function page() {
    return (
        <Card>
            <CardTitle className="font-script text-4xl">Devenez</CardTitle>
            <Button>Partenaire</Button>
            <Button>Membre</Button>
        </Card>
    );
}
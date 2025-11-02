import { Card, CardHeader, CardTitle } from "./ui/card";

export function Header() {
    return (<Card>
        <CardHeader className="p-4">
            <CardTitle className="font-script text-4xl">Titre</CardTitle>
        </CardHeader>
    </Card>
    );
}
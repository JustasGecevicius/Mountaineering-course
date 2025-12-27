import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";
import Link from "next/link";

type CardBottomImageType = {
  src: string;
  title: string;
  description?: string;
  redirectUrl?: string;
};

export default function CardBottomImage(props: CardBottomImageType) {
  return (
    <Link href={props.redirectUrl || ""}>
      <Card className="max-w-md pb-0">
        <CardHeader>
          <CardTitle>{props.title}</CardTitle>
          <CardDescription>{props.description}</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <img src={props.src} alt="Knot image" className="aspect-square h-70 object-contain" />
        </CardContent>
      </Card>
    </Link>
  );
}

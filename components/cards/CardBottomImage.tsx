import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card";

type CardBottomImageType = {
  src: string;
  title: string;
  description?: string;
  onClick?: () => void;
};

export default function CardBottomImage(props: CardBottomImageType) {
  return (
    <Card className="max-w-md pb-0" onClick={props.onClick}>
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <img
          src={props.src}
          alt="Knot image"
          className="aspect-video h-70 rounded-b-xl object-cover"
        />
      </CardContent>
    </Card>
  );
}

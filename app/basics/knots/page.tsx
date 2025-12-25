import CardBottomImage from "@/components/cards/CardBottomImage";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

type AllKnotsPageProps = {};

async function BasicKnotsPage(props: AllKnotsPageProps) {
  const query = loadQuery("basicKnots");
  const knots = await fetchDato(query);

  return (
    <div>
      {knots.allKnots.map((knot) => {
        return (
          <CardBottomImage
            key={knot.name}
            src={knot.thumbnail.url}
            title={knot.name}
            description={knot.description}
            redirectUrl={`/knot/${knot.id}`}
          />
        );
      })}
    </div>
  );
}

export default BasicKnotsPage;

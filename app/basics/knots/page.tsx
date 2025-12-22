import CardBottomImage from "@/components/cards/CardBottomImage";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

type AllKnotsPageProps = {};

async function AllKnotsPage(props: AllKnotsPageProps) {
  const query = loadQuery("allKnots");
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
          />
        );
      })}
    </div>
  );
}

export default AllKnotsPage;

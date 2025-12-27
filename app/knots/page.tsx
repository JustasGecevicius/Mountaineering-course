import CardBottomImage from "@/components/cards/CardBottomImage";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

type AllKnotsPageProps = {};

async function AllKnotsPage(props: AllKnotsPageProps) {
  const query = loadQuery("allKnots");
  const knots = await fetchDato(query);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,250px)] grid-rows-[min-content] gap-4 p-4 w-full">
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

export default AllKnotsPage;

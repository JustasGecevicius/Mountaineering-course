import CardBottomImage from "@/components/cards/CardBottomImage";
import { fetchDato, loadQuery } from "@/lib/datocms/datocms";

type AllTechniquesPageProps = {};

export default async function AllTechniquesPage(props: AllTechniquesPageProps) {
  const query = loadQuery("allTechniques");
  const techniques = await fetchDato(query);

  return (
    <div className="grid grid-cols-[repeat(auto-fit,250px)] grid-rows-[min-content] gap-4 p-4 w-full">
      {techniques.allTechniques.map((technique) => {
        return (
          <CardBottomImage
            key={technique.name}
            src={technique.thumbnail.url}
            title={technique.name}
            description={technique.description}
            redirectUrl={`/technique/${technique.id}`}
          />
        );
      })}
    </div>
  );
}

import GifPlayer from "@/components/gif/player";
import { fetchDato } from "@/lib/datocms/datocms";

type KnotPageProps = {};

const BASIC_KNOTS_CONTENT_QUERY = `
  query allKnots {
    allKnots {
        name
        gif {
        url
        mimeType
        filename
        size
        }
    }
  }
`;

export default async function KnotPage(props: KnotPageProps) {
  const { params } = props;
  const datoPromise = fetchDato(BASIC_KNOTS_CONTENT_QUERY);
  const [{ id }, knotData] = await Promise.all([params, datoPromise]);

  return (
    <div>
      KNOT {id}
      <GifPlayer src={knotData?.allKnots?.[0]?.gif?.url || ""} autoPlay loop />
    </div>
  );
}

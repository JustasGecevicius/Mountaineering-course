"use client";
import GifPlayer from "@/components/gif/player";
import { performRequest } from "@/lib/datocms";
import { use, useCallback, useEffect, useState } from "react";

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

function KnotPage(props: KnotPageProps) {
  const { children, params } = props;
  const { id } = use(params);

  const [data, setData] = useState(null);

  const f = useCallback(async () => {
    try {
      const d = await performRequest(BASIC_KNOTS_CONTENT_QUERY);
      setData(d);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    f();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  useEffect(() => {
    console.log(id);
  }, [id]);

  return (
    <div>
      KNOT {id}
      <GifPlayer src={data?.allKnots?.[0]?.gif?.url || ""} autoPlay loop />
      {children}
    </div>
  );
}

export default KnotPage;

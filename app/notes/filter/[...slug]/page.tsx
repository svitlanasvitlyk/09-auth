
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";
import { Metadata } from "next";

type SlugProps = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({
  params,
}: SlugProps): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0];

  return {
    title: `${tag} notes`,
    description: `Notes filtered by tag "${tag}"`,
  };
}

const NotesPage = async ({ params }: SlugProps) => {
  const queryClient = new QueryClient();
  const { slug } = await params;

  const tag = slug[0] === "all" ? undefined : slug[0];

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag],
    queryFn: () => fetchNotes("", 1, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient slug={slug} />
    </HydrationBoundary>
  );
};

export default NotesPage;

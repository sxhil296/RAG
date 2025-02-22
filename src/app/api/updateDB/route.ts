import { NextRequest, NextResponse } from "next/server";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { Pinecone } from "@pinecone-database/pinecone";
import { updateVectorDB } from "@/utils";
import { NextApiResponse } from "next";
export async function POST(request: NextRequest, response: NextResponse) {
  const { indexname, namespace, data } = await request.json();

  const handleUploadDocuments = async (
    indexname: string,
    namespace: string,
    response: NextApiResponse
  ) => {
    const loader = new DirectoryLoader("src/documents", {
      ".pdf": (path: string) =>
        new PDFLoader(path, {
          splitPages: false,
        }),
      ".txt": (path: string) => new TextLoader(path),
    });

    const docs = await loader.load();
    const client = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
    await updateVectorDB(
      client,
      indexname,
      namespace,
      docs,
      (filename, totalChunks, chunksUpserted, isComplete) => {
        // console.log(`Processing ${filename} - ${chunksUpserted}/${totalChunks} chunks upserted ${isComplete ? "Completed" : "Incomplete"}`)
        if (!isComplete) {
          response.write(
            JSON.stringify({
              filename,
              totalChunks,
              chunksUpserted,
              isComplete,
            })
          );
        } else {
          response.end();
        }
      }
    );
  };
}

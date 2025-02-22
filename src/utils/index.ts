import { Document } from "@langchain/core/documents";
import { Pinecone } from "@pinecone-database/pinecone";

export async function updateVectorDB(
  client: Pinecone,
  indexname: string,
  namespace: string,
  docs: Document[],
  progressCallback: (filename:string, totalChunks:number, chunksUpserted:number, isComplete:boolean) => void
) {
    
}

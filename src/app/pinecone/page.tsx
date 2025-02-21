"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-label";
import { Database, LucideLoader2, MoveUp, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

export default function Pinecone() {
  const [isUploading, setisUploading] = useState<boolean>(false);
  const [indexname, setIndexname] = useState<string>("");
  const [namespace, setNamespace] = useState<string>("");

  const handleUpload = async () => {
    const response = await fetch("api/updateDB", {
      method: "POST",
      body: JSON.stringify({
        indexname,
        namespace,
      }),
    });
    console.log(response);
    // await processStreamProgress(response)
  };
  return (
    <main className="flex flex-col items-center p-24">
      <Card>
        <CardHeader>
          <CardTitle>Update Your Knowledge Base</CardTitle>
          <CardDescription>
            Add new documents to your vector database.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 grid gap-4 border rounded-lg p-6">
              <div className="gap-4 relative">
                <Button
                  className="absolute -right-4 -top-4"
                  variant={"ghost"}
                  size={"icon"}
                >
                  <RefreshCcw />
                </Button>
                <Label>Files List:</Label>
                <Textarea
                  readOnly
                  className="min-h-24 resize-none border p-3 shadow-none disabled:cursor-default focus-visible:ring-0 text-sm text-muted-foreground"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Index Name</Label>
                  <Input
                    value={indexname}
                    onChange={(e) => setIndexname(e.target.value)}
                    placeholder="Index Name"
                    disabled={isUploading}
                    className="disabled:cursor-default"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Namespace</Label>
                  <Input
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    placeholder="Namespace"
                    disabled={isUploading}
                    className="disabled:cursor-default"
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={handleUpload}
              variant={"outline"}
              className="w-full h-full"
              disabled={isUploading}
            >
              <span className="flex flex-row ">
                <Database size={50} className="stroke-[#D90013]" />
                <MoveUp className="stroke-[#D90013]" />
              </span>
            </Button>
          </div>
          {isUploading && (
            <div className="mt-4 ">
              <Label>File Name:</Label>
              <div className="flex items-center flex-row gap-4">
                <Progress value={80} />
                <LucideLoader2 className="stroke-[#D90013] animate-spin" />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

"use client";
import axios from "axios";
import { Button, Callout, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const submitForm = async (data: IssueForm) => {
    try {
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error) {
      setError('unexpected error occured');
    }
  };
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => submitForm(data))}
      >
        <TextField.Root>
          <TextField.Input placeholder="Title" {...register("title")} />
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE {...field} placeholder="description" />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
}

export default NewIssuePage;

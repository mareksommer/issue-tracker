"use client";
import axios from "axios";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

interface IssueForm {
  title: string;
  description: string;
}

function NewIssuePage() {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<IssueForm>();
  const submitForm = async (data: IssueForm) => {
    await axios.post("/api/issues", data);
    router.push("/issues");
  };
  return (
    <form
      className="max-w-xl space-y-3"
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
  );
}

export default NewIssuePage;

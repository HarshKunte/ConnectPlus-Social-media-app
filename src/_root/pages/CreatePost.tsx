import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/shared/Loader";
import ImagePostForm from "@/components/forms/ImagePostForm";
import MusicPostForm from "@/components/forms/MusicPostForm";

const OPENAI_API_KEY = "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";

const CreatePost = () => {
  const [postType, setPostType] = useState("image");
  const [captionGenerationDescription, setCaptionGenerationDescription] =
    useState("");
  const [aiCaptions, setAiCaptions] = useState([]);
  const [isCaptionLoading, setIsCaptionLoading] = useState(false);
  const [newCaption, setNewCaption] = useState("");

  const handleCaptionGenerationDescription = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setCaptionGenerationDescription(e.target.value);
  };
  async function generateCaption(e: FormEvent) {
    setIsCaptionLoading(true);

    e.preventDefault();
    const requestData = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content:
            "Give 5 suggestions for instagram captions for " +
            captionGenerationDescription,
        },
      ],
    };
    try {
      const suggestions = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      setAiCaptions(suggestions.data.choices[0].message.content.split("\n"));
    } catch (error) {
      toast({ title: "Generating caption failed" });
    } finally {
      setIsCaptionLoading(false);
    }
  }
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="max-w-5xl flex-start gap-3 justify-start w-full">
          <img
            src="/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>

        <div className="max-w-5xl w-full">
          <label className="shad-form_label block mb-2">
            Generate caption using AI ✨
          </label>
          <form className="flex items-center gap-4 w-full">
            <Input
              onChange={handleCaptionGenerationDescription}
              placeholder="Describe what you want to post and Click on generate to get interesting captions using AI"
              type="text"
              className="shad-input"
            />
            <Button
              type="submit"
              className="shad-button_primary whitespace-nowrap"
              onClick={generateCaption}
              disabled={isCaptionLoading}
            >
              Generate
            </Button>
          </form>

          {isCaptionLoading ? (
            <Loader />
          ) : (
            aiCaptions.length > 0 && (
              <div className="mb-16">
                <p className="mb-4 mt-10">
                  Generated Captions ✨{" "}
                  <span className="text-sm text-light-4">
                    Click on any one to use it as caption
                  </span>{" "}
                </p>
                <div className="flex flex-wrap gap-5">
                  {aiCaptions.map((caption, index) => (
                    <span
                      onClick={() => setNewCaption(caption)}
                      key={index}
                      className="p-3 rounded-lg border border-dark-4 text-white text-sm cursor-pointer"
                    >
                      {caption}
                    </span>
                  ))}
                </div>
              </div>
            )
          )}

          <div className="my-5">
            <Select onValueChange={(val) => setPostType(val)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Media type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">Image</SelectItem>
                <SelectItem value="music">Music</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {postType === "music" ? (
          <MusicPostForm action="Create" suggestedCaption={newCaption} />
        ) : (
          <ImagePostForm action="Create" suggestedCaption={newCaption} />
        )}
      </div>
    </div>
  );
};

export default CreatePost;

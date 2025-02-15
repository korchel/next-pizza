"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ReactStories from "react-insta-stories";
import Image from "next/image";

import { ArrowButton, Container } from "../ui";
import { cn } from "@/shared/lib/utils";
import { api } from "@/shared/services/apiClient";
import { IStory } from "@/shared/services/stories";
import { useHorizantalScroll } from "@/shared/hooks";

interface Props {
  className?: string;
}

export const Stories: React.FC<Props> = ({ className }) => {
  const [stories, setStories] = useState<IStory[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<IStory>();
  const { ref, handleScroll, scroll, right, left } = useHorizantalScroll();

  useEffect(() => {
    async function fetchStories() {
      const data = await api.stories.getAll();
      setStories(data);
    }
    fetchStories();
  }, []);

  const onClickStory = (story: IStory) => {
    setSelectedStory(story);
    if (story.items.length > 0) {
      setOpen(true);
    }
  };

  return (
    <>
      <Container className={cn("my-10 relative", className)}>
        {left && (
          <ArrowButton
            direction="left"
            className="absolute top-[105px]"
            onClick={() => scroll("left")}
          />
        )}
        <div
          ref={ref}
          className="overflow-auto no-scrollbar scroll-smooth flex items-center justify-between gap-2"
          onScroll={handleScroll}
        >
          {stories.length === 0 &&
            [...Array(6)].map((_, index) => (
              <div
                key={index}
                className="w-[200px] h-[250px] bg-gray-200 rounded-md animate-pulse"
              />
            ))}

          {stories.map((story) => (
            <Image
              key={story.id}
              alt={"story"}
              onClick={() => onClickStory(story)}
              className="rounded-md cursor-pointer"
              height={250}
              width={200}
              style={{
                width: "100%",
                height: "auto",
              }}
              src={story.previewImageUrl}
            />
          ))}
        </div>
        {right && (
          <ArrowButton
            direction="right"
            className="absolute right-0 top-[105px]"
            onClick={() => scroll("right")}
          />
        )}

        {open && (
          <div className="absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30">
            <div className="relative" style={{ width: 520 }}>
              <button
                className="absolute -right-10 -top-5 z-30"
                onClick={() => setOpen(false)}
              >
                <X className="absolute top-0 right-0 w-8 h-8 text-gray-300" />
              </button>

              <ReactStories
                onAllStoriesEnd={() => setOpen(false)}
                stories={
                  selectedStory?.items.map((item) => ({
                    url: item.sourceUrl,
                  })) || []
                }
                defaultInterval={3000}
                width={520}
                height={800}
              />
            </div>
          </div>
        )}
      </Container>
    </>
  );
};

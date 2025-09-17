"use client";

import { ALLOWED_MIME_TYPES, MAX_SIZE } from "@/src/lib/configs/app";
import { getCroppedImg } from "@/src/lib/utils/blob/getCroppedImage";
import ImageCropper from "@/src/ui/components/ImageCropper";
import { Button } from "@/src/ui/shadcn/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/src/ui/shadcn/components/ui/tooltip";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CircleQuestionMark,
  CloudUpload,
  RotateCcw,
  Image as ImageIcon,
  LoaderCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { Area } from "react-easy-crop";
import { useForm } from "react-hook-form";
import { mediaSchema } from "@/src/lib/zodSchema/mediaSchema";
import { SpecialInput } from "./components/SpecialInput";
import { useMutation } from "@tanstack/react-query";
import { mutateUploadMedia } from "@/src/lib/mutators/mutateUploadMedia";
import { useRouter } from "next/navigation";
import { MediaPostRequest } from "@/app/api/media/post";

const MediaNewPageIndex = () => {
  // Form
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm({
    resolver: zodResolver(mediaSchema),
    mode: "onChange",
    defaultValues: {
      mediaName: "",
      mediaSource: "",
      mediaAttribute: "",
      mediaAlt: "",
      mediaLocation: "",
      latitude: undefined,
      longitude: undefined,
      isAI: false,
      isNSFW: false,
      isPublic: false,
    },
  });

  // Watch
  const mediaAlt = watch("mediaAlt");
  const isPublic = watch("isPublic");
  const isAI = watch("isAI");
  const isNSFW = watch("isNSFW");

  // Preview & Blob State
  const [preview, setPreview] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);

  // Hidden Input Ref
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);

  // Crop States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error State
  const [_error, setError] = useState<string | null>(null);

  // Handle Reset
  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppingImage(null);
    setCroppedAreaPixels(null);
    setError(null);
  };

  // Handle File change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        setError(
          `Unsupported format. Allowed: ${ALLOWED_MIME_TYPES.join(", ")}`
        );
        e.target.value = "";
        return;
      }

      if (file.size > MAX_SIZE) {
        setError(`File too large. Max ${MAX_SIZE / (1024 * 1024)}MB`);
        e.target.value = "";
        return;
      }

      setError(null);
      const url = URL.createObjectURL(file);
      setFile(file);
      setCroppingImage(url);
    }

    e.target.value = "";
  };

  // Handle Save
  const handleSave = async () => {
    if (croppingImage && croppedAreaPixels) {
      setLoading(true);
      const { url, blob } = await getCroppedImg(
        croppingImage,
        croppedAreaPixels
      );
      setLoading(false);
      setPreview(url);
      setBlob(blob);
      setCroppingImage(null);
      handleReset();
    }
  };

  // Convert bits to bytes
  const bytes = file?.size ?? 0;

  // Convert to KB and MB
  const kilobytes = bytes / 1024;
  const megabytes = kilobytes / 1024;

  let displaySize;

  if (megabytes >= 1) {
    displaySize = `${megabytes.toFixed(2)} MB`;
  } else {
    displaySize = `${kilobytes.toFixed(2)} KB`;
  }

  const router = useRouter();

  const { mutate: upload } = useMutation({
    mutationFn: mutateUploadMedia,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      router.push("/media");
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-4xl font-header">Uploading New Media</h1>
        <p className="text-sm font-light mt-2">
          We respectfully request that you follow our{" "}
          <Link href="/" className="text-accent hover:underline">
            media upload guidelines
          </Link>
          . If your media fails to meet our standards, it will be removed by our
          moderator.
        </p>
      </header>

      {/* Form */}
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={handleSubmit((data) => {
          if (!data || !blob) return;
          const request: MediaPostRequest = {
            ...data,
            image: blob,
          };

          upload(request);
        })}
      >
        {/* Image Upload Preview */}
        {preview && (
          <section className="grid mt-6 grid-cols-1 md:grid-cols-2 gap-4">
            {/* Preview Image */}
            <figure>
              <Image
                width={500}
                height={500}
                src={preview}
                alt={mediaAlt}
                className="rounded-md shadow-2xl"
              />
            </figure>

            {/* Form */}
            <article>
              <h2 className="text-4xl font-header">Preview Information</h2>

              {/* Media Name */}
              <SpecialInput
                control={control}
                label="Media Name"
                name="mediaName"
                placeholder="Required"
                dropContent={
                  <div className="space-y-2">
                    {/* Rule */}
                    <p>Required, at least 20 characters.</p>

                    {/* Example */}
                    <p>Example: Crisis Monetary Riot Jakarta 1998</p>
                  </div>
                }
              />

              {/* Media Size */}
              <div className="mt-2 space-y-1">
                <h3 className="font-semibold">Media Size</h3>
                <span className="p-2 justify-between bg-primary text-primary-foreground text-xs flex items-center">
                  <span>{displaySize}</span>
                  <small>Maximum size is {MAX_SIZE / 1024 / 1024} MB</small>
                </span>
              </div>

              {/* Media Description */}
              <SpecialInput
                control={control}
                label="Media Description"
                name="mediaAlt"
                placeholder="Required"
                dropContent={
                  <div className="space-y-2">
                    {/* Rule */}
                    <p>Required, at least 20 characters.</p>

                    {/* Example */}
                    <p>
                      Example: Group of young college students laugh and walk
                      along a tree-lined pathway.
                    </p>
                  </div>
                }
              />

              {/* Media Source */}
              <SpecialInput
                control={control}
                label="Media Source"
                name="mediaSource"
                placeholder="Required"
                dropContent={
                  <div className="space-y-2">
                    {/* Rule */}
                    <p>Required & Important</p>

                    {/* Explanation */}
                    <p>
                      {` If you have taken the image yourself, you may indicate
                      your name here. If the image has been sourced from the
                      internet, please provide the source (e.g., edition.cnn.com
                      or CNN). If somehow you don't know the source, state "unknown"`}
                    </p>

                    <p>
                      If the image has been generated by AI, kindly specify
                      which model was utilized to create the image (for example,
                      Dall-E, MidJourney, etc.)
                    </p>

                    <p>Example: Midjourney, Dall-E, CNN, Jack Rackham</p>
                  </div>
                }
              />

              {/* Media Attribute */}
              <SpecialInput
                control={control}
                label="Media Attribute"
                name="mediaAttribute"
                placeholder="Required"
                dropContent={
                  <div className="space-y-2">
                    {/* Rule */}
                    <p>Required, at least 20 characters.</p>

                    <p>
                      If you have taken the image yourself, you may indicate
                      your name here. If this is not the case, kindly provide
                      sufficient details regarding the source of the image.
                    </p>

                    {/* Example */}
                    <p>Example: Photo by Jack Rackham</p>

                    <p>
                      Example: Photo by Magic K from Pexels:
                      https://www.pexels.com/photo/snow-covered-mountain-under-cloudy-sky-6732076/
                    </p>
                  </div>
                }
              />

              {/* Media Location */}
              <SpecialInput
                control={control}
                label="Media Location"
                name="mediaLocation"
                placeholder="Required"
                dropContent={
                  <div className="space-y-2">
                    {/* Rule */}
                    <p>Required, at least 7 characters.</p>

                    <p>{`If the exact location of the image is uncertain, but you are aware of the city, you may indicate "Somewhere in Berlin"`}</p>

                    <p>
                      {`If the location of the image is not known, you may indicate "Unknown".`}
                    </p>

                    <p>
                      {`If the image is an Illustraion, you may use "Unrelated"`}
                    </p>

                    {/* Example */}
                    <p>
                      Example: Al-Jabbar Mosque, Bandung, West Java, Indonesia
                    </p>

                    <p>Example: Somewhere in Berlin</p>

                    <p>Example: Unknown or Unrelated</p>
                  </div>
                }
              />

              <div className="grid grid-cols-2 gap-2">
                {/* Latitude */}
                <SpecialInput
                  control={control}
                  label="Latitude"
                  name="latitude"
                  placeholder="optional"
                  dropContent={
                    <div className="space-y-2">
                      {/* Rule */}
                      <p>
                        Optional, but encouraged. If you know exactly where the
                        image is taken, you can use google maps or tools like
                        https://www.gps-coordinates.net/
                      </p>
                    </div>
                  }
                />

                {/* Longitude */}
                <SpecialInput
                  control={control}
                  label="Longitude"
                  name="longitude"
                  placeholder="optional"
                  dropContent={
                    <div className="space-y-2">
                      {/* Rule */}
                      <p>
                        Optional, but encouraged. If you know exactly where the
                        image is taken, you can use google maps or tools like
                        https://www.gps-coordinates.net/
                      </p>
                    </div>
                  }
                />
              </div>

              {/* Checkboxes */}
              <div className="mt-4 grid grid-cols-2">
                {/* Publicity */}
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    id="publicity"
                    checked={isPublic}
                    onChange={() => {
                      setValue("isPublic", !isPublic);
                    }}
                  />
                  <label
                    htmlFor="publicity"
                    className="flex items-center gap-2"
                  >
                    <span>Public</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleQuestionMark className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        If set to public, other users can use your image in
                        their posts. If this is not yours or not taken by you,
                        we suggest allowing others to use it.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                </div>

                {/* AI Flag */}
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    id="aiFlag"
                    checked={isAI}
                    onChange={() => {
                      setValue("isAI", !isAI);
                    }}
                  />
                  <label htmlFor="aiFlag" className="flex items-center gap-2">
                    <span>AI Generated</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleQuestionMark className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        If this image was AI-generated, you must check this box.
                        Learn more in our guidelines.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                </div>

                {/* NSFW Flag */}
                <div className="flex gap-2 items-center text-sm">
                  <input
                    type="checkbox"
                    id="nsfw"
                    checked={isNSFW}
                    onChange={() => {
                      setValue("isNSFW", !isNSFW);
                    }}
                  />
                  <label htmlFor="nsfw" className="flex items-center gap-2">
                    <span>NSFW</span>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleQuestionMark className="w-4 h-4" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Please mark this box if your image is considered NSFW
                        and potentially unsettling for certain viewers.
                      </TooltipContent>
                    </Tooltip>
                  </label>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  onClick={() => hiddenInputRef?.current?.click()}
                  variant={"outline"}
                  disabled={loading}
                >
                  <RotateCcw /> Repick
                </Button>
                <Button disabled={!isValid || loading}>
                  {loading ? (
                    <>
                      <LoaderCircle className="animate-spin" /> Uploading
                    </>
                  ) : (
                    <>
                      <CloudUpload /> Upload
                    </>
                  )}
                </Button>
              </div>
            </article>
          </section>
        )}

        {!preview && (
          <button
            className="h-72 cursor-pointer hover:border-solid transition-all duration-300 hover:bg-secondary flex border-dashed border-2 rounded-md items-center justify-center"
            type="button"
            onClick={() => hiddenInputRef?.current?.click()}
          >
            <div className="flex flex-col justify-center items-center">
              <ImageIcon
                className="w-7 h-7 mb-4 opacity-70"
                absoluteStrokeWidth
              />
              <span className="font-semibold opacity-70 mb-6">
                Drop your image here, or{" "}
                <span className="text-accent">browse</span>
              </span>

              <span className="text-sm font-light">
                Supports : JPG, JPEG, PNG, WEBP
              </span>
            </div>
          </button>
        )}
      </form>

      {/* Cropping Modal */}
      {croppingImage && (
        <ImageCropper
          crop={crop}
          croppingImage={croppingImage}
          handleSave={handleSave}
          setCrop={setCrop}
          setCroppedAreaPixels={setCroppedAreaPixels}
          setZoom={setZoom}
          zoom={zoom}
          file={file}
          handleReset={handleReset}
          loading={loading}
          dynamicAspectRatio
        />
      )}

      {/* Hidden File Input */}
      <input
        type="file"
        ref={hiddenInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
      />
    </div>
  );
};

export default MediaNewPageIndex;

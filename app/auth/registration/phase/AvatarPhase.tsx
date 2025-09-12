import { Button } from "@/src/ui/shadcn/components/ui/button";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Area } from "react-easy-crop";
import { getCroppedImg } from "@/src/lib/utils/blob/getCroppedImage";
import ImageCropper from "@/src/ui/components/ImageCropper";
import { useMutation } from "@tanstack/react-query";
import { mutateUserAvatar } from "@/src/lib/mutators/mutateUserAvatar";
import { useProfile, useProfileMutate } from "@/src/lib/hooks/useProfile";
import { Loader } from "lucide-react";
import { ALLOWED_MIME_TYPES, MAX_SIZE } from "@/src/lib/configs/app";

const AvatarPhase = () => {
  // Image Preview
  const [preview, setPreview] = useState(
    "https://images.pexels.com/photos/1812634/pexels-photo-1812634.jpeg"
  );
  const [blob, setBlob] = useState<Blob | null>(null);

  // Hidden Input ref
  const hiddenInput = useRef<HTMLInputElement | null>(null);

  // Crop States
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppingImage, setCroppingImage] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [file, setFile] = useState<File | null>(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error State
  const [error, setError] = useState<string | null>(null);

  // Handle Reset
  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppingImage(null);
    setCroppedAreaPixels(null);
    setError(null);
    setFile(null);
  };

  // Handle File upload
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
      const { url, blob } = await getCroppedImg(
        croppingImage,
        croppedAreaPixels
      );
      setPreview(url);
      setBlob(blob);
      setCroppingImage(null);
      handleReset();
    }
  };

  const { data: profile } = useProfile();
  const { mutate: profileMutate } = useProfileMutate();

  // Mutation
  const { mutate } = useMutation({
    mutationFn: mutateUserAvatar,
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: () => {
      if (profile) {
        profileMutate({
          id: profile?.userId,
          newValues: {
            registrationPhase: "confirmation",
          },
        });
      }
    },
    onError: () => {
      setLoading(false);
    },
  });

  return (
    <div className="flex items-center my-8 gap-4">
      {/* Preview Container */}
      <div>
        <Image
          width={82}
          height={82}
          src={preview}
          alt="profile"
          className="max-w-24 max-h-24 min-w-24 min-h-24 rounded-full object-cover"
        />
      </div>

      {/* Controller */}
      <div>
        <h2 className="font-header text-xl opacity-70">IMPORTANT</h2>
        <p className="text-sm font-light">
          Make sure the image is not violating our policy, it should either be{" "}
          <span className="text-xs italic">JPEG, PNG, WEBP</span>
        </p>
        {loading ? (
          <div className="border rounded-md px-4 py-2 text-sm font-light gap-2 mt-4 flex items-center justify-center">
            Processing <Loader className="animate-spin w-4 h-4" />
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 mt-4">
            {blob ? (
              <Button
                className="text-xs hover:bg-destructive/10 hover:border-destructive/10 hover:text-destructive"
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                  setBlob(null);
                  setPreview(
                    "https://images.pexels.com/photos/1812634/pexels-photo-1812634.jpeg"
                  );
                }}
              >
                Delete
              </Button>
            ) : (
              <Button
                className="text-xs hover:bg-destructive/10 hover:border-destructive/10 hover:text-destructive"
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                  if (profile) {
                    profileMutate({
                      id: profile?.userId,
                      newValues: { registrationPhase: "confirmation" },
                    });
                  }
                }}
              >
                Skip
              </Button>
            )}
            {blob ? (
              <Button
                className="text-xs"
                size={"sm"}
                onClick={() => {
                  mutate(blob);
                }}
              >
                Save
              </Button>
            ) : (
              <Button
                className="text-xs"
                size={"sm"}
                onClick={() => {
                  handleReset();
                  hiddenInput?.current?.click();
                }}
              >
                Upload
              </Button>
            )}
          </div>
        )}
        {error && (
          <span className="text-destructive text-xs font-light">{error}</span>
        )}
      </div>

      {/* Hidden Input */}
      <input
        type="file"
        ref={hiddenInput}
        onChange={handleFileChange}
        className="hidden"
        accept="image/jpeg,image/png,image/webp"
      />

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
          aspect={1}
        />
      )}
    </div>
  );
};

export default AvatarPhase;

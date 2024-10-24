import { useDropzone } from "react-dropzone";
import { useState, useCallback } from "react";

interface LogoUploadProps {
  onLogoUpload: (file: File, url: string) => void;
}

const LogoUploadTheme: React.FC<LogoUploadProps> = ({ onLogoUpload }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const url = reader.result as string;
          setPreview(url);
        };
        reader.readAsDataURL(file);
        // const logoUrl = await uploadFile(file)
      }
    },
    [onLogoUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".svg"],
    },
    maxSize: 5242880,
    multiple: false,
  });

  return (
    <div className="upload">
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="preview">
            <img src={preview} alt="preview" />
          </div>
        ) : (
          <p>
            {isDragActive
              ? "Drop logo here"
              : "Drag & drop logo or click to select"}
          </p>
        )}
      </div>
    </div>
  );
};

export default LogoUploadTheme;

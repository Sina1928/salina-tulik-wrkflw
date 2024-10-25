import { useDropzone } from "react-dropzone";
import ColorThief from "colorthief";
import { useState, useCallback } from "react";
import "./LogoUploadTheme.scss";

interface LogoUploadProps {
  onLogoUpload: (file: File, url: string) => void;
  onColorExtracted: (colors: string[]) => void;
  onThemeColorSelect: (color: string) => void;
  selectedThemeColor?: string;
}

const LogoUploadTheme: React.FC<LogoUploadProps> = ({
  onLogoUpload,
  onColorExtracted,
  onThemeColorSelect,
  selectedThemeColor,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [colors, setColors] = useState<string[]>([]);
  const [customColor, setCustomColor] = useState("#ffffff");

  const extractColors = async (imageUrl: string) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    img.onload = () => {
      const colorThief = new ColorThief();
      const palette = colorThief.getPalette(img, 5);
      const hexColors = palette.map(
        (color: any) =>
          `#${color.map((c: any) => c.toString(16).padStart(2, "0")).join("")}`
      );
      setColors(hexColors);
      onColorExtracted(hexColors);
    };
  };

  const handleColorSelect = (color: string) => {
    onThemeColorSelect(color);
  };

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    setCustomColor(color);
    onThemeColorSelect(color);
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const url = reader.result as string;
          setPreview(url);
          extractColors(url);
          onLogoUpload(file, url);
        };
        reader.readAsDataURL(file);
      }
    },
    [onLogoUpload, extractColors]
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

      {colors.length > 0 && (
        <div className="color-thief-output">
          <div className="output-layout">
            <div className="palette">
              {" "}
              <p className="palette-colors__title">Select a Theme Colour</p>
              <div className="palette-output">
                <div className="palette-swatches">
                  {colors.map((color, index) => (
                    <button
                      type="button"
                      className={`palette-swatch ${
                        color === selectedThemeColor ? "selected" : ""
                      }`}
                      key={index}
                      onClick={() => handleColorSelect(color)}
                      style={{ backgroundColor: color }}
                    ></button>
                  ))}

                  <div className="custom-color-swatch">
                    <input
                      type="color"
                      className="color-picker"
                      value={customColor}
                      onChange={handleCustomColorChange}
                    />
                    <div
                      className={`color-display ${
                        customColor === selectedThemeColor ? "selected" : ""
                      }`}
                      style={{ backgroundColor: customColor }}
                    >
                      {customColor === selectedThemeColor ? "" : "+"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LogoUploadTheme;

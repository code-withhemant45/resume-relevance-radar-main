
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UploadSectionProps {
  onFileSelect: (file: File) => void;
}

const UploadSection = ({ onFileSelect }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
        onFileSelect(selectedFile);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
        onFileSelect(droppedFile);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="text-lg font-semibold mb-2">Upload Your Resume</div>
        <p className="text-sm text-muted-foreground mb-4">
          Upload your resume in PDF format to analyze against job descriptions
        </p>

        {!file ? (
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
              isDragging 
                ? "border-primary bg-primary/5" 
                : "border-gray-200 hover:border-primary hover:bg-primary/5"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('fileInput')?.click()}
          >
            <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
            <p className="text-sm text-gray-600 mb-1">
              Drag & drop your resume PDF here
            </p>
            <p className="text-xs text-gray-400">
              or click to select a file
            </p>
            <input
              type="file"
              id="fileInput"
              className="hidden"
              accept="application/pdf"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-primary" />
              <div>
                <p className="font-medium truncate max-w-[200px] sm:max-w-sm">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={removeFile}
              className="text-gray-500 hover:text-red-500"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Remove file</span>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UploadSection;

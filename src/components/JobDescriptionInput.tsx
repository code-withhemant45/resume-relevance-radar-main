
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface JobDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
}

const JobDescriptionInput = ({ value, onChange }: JobDescriptionInputProps) => {
  return (
    <Card className="mb-6 dark:bg-secondary/20 border-border/50 transition-colors duration-300">
      <CardContent className="pt-6">
        <div className="text-lg font-semibold mb-2">Job Description</div>
        <p className="text-sm text-muted-foreground mb-4 dark:text-muted-foreground/90 transition-colors duration-300">
          Paste the job description text here to compare with your resume
        </p>
        <Textarea
          placeholder="Paste job description here..."
          className="min-h-[200px] resize-none bg-background/50 dark:bg-background/20 transition-colors duration-300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </CardContent>
    </Card>
  );
};

export default JobDescriptionInput;

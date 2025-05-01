
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ExperienceMatchProps {
  relevantExperiences: string[];
}

const ExperienceMatch = ({ relevantExperiences }: ExperienceMatchProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4">Relevant Experience</h3>
      
      {relevantExperiences.length > 0 ? (
        <div className="space-y-4">
          {relevantExperiences.map((exp, index) => (
            <div 
              key={index} 
              className="p-3 bg-secondary/50 dark:bg-secondary/30 rounded-lg backdrop-blur-sm transition-colors duration-300"
            >
              <p className="text-sm text-foreground/80 dark:text-foreground/90">{exp}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          No highly relevant experience found. Try updating your resume with more job-specific details.
        </p>
      )}
    </div>
  );
};

export default ExperienceMatch;

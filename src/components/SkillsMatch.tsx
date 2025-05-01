
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Check, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SkillsMatchProps {
  matchingSkills: string[];
  missingSkills: string[];
  resumeOnlySkills: string[];
}

const SkillsMatch = ({ matchingSkills, missingSkills, resumeOnlySkills }: SkillsMatchProps) => {
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold mb-4">Skills Analysis</h3>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-500 mr-2" />
            <h4 className="font-medium">Matching Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {matchingSkills.length > 0 ? (
              matchingSkills.map((skill) => (
                <Badge key={skill} variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-950/50 dark:text-green-400 dark:hover:bg-green-900/70 transition-colors duration-300">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No matching skills found</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2">
            <X className="h-5 w-5 text-red-600 dark:text-red-500 mr-2" />
            <h4 className="font-medium">Missing Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {missingSkills.length > 0 ? (
              missingSkills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-red-300 text-red-800 dark:border-red-800/50 dark:text-red-400 transition-colors duration-300">
                  {skill}
                </Badge>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No missing skills found</p>
            )}
          </div>
        </div>

        {resumeOnlySkills.length > 0 && (
          <div>
            <div className="flex items-center mb-2">
              <h4 className="font-medium">Additional Skills on Resume</h4>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {resumeOnlySkills.map((skill) => (
                <Badge key={skill} variant="outline" className="border-gray-300 text-gray-600 dark:border-gray-700 dark:text-gray-400 transition-colors duration-300">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillsMatch;

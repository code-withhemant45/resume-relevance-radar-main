
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import MatchAnalysis from './MatchAnalysis';
import SkillsMatch from './SkillsMatch';
import ExperienceMatch from './ExperienceMatch';

interface ResultsCardProps {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  resumeOnlySkills: string[];
  relevantExperiences: string[];
}

const ResultsCard = ({ 
  score, 
  matchingSkills, 
  missingSkills,
  resumeOnlySkills,
  relevantExperiences
}: ResultsCardProps) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6">
        <Card className="overflow-hidden border border-border/50 shadow-lg backdrop-blur-sm dark:bg-secondary/20 dark:border-border/30 transition-colors duration-300">
          <div className="bg-gradient-to-br from-background/50 to-secondary/20 p-6 dark:from-background/10 dark:to-secondary/30 transition-colors duration-300">
            <MatchAnalysis score={score} />
          </div>
        </Card>
        <Card className="overflow-hidden border border-border/50 shadow-lg backdrop-blur-sm dark:bg-secondary/20 dark:border-border/30 transition-colors duration-300">
          <div className="bg-gradient-to-br from-background/50 to-secondary/20 p-6 dark:from-background/10 dark:to-secondary/30 transition-colors duration-300">
            <SkillsMatch 
              matchingSkills={matchingSkills} 
              missingSkills={missingSkills} 
              resumeOnlySkills={resumeOnlySkills}
            />
          </div>
        </Card>
      </div>
      <Card className="overflow-hidden border border-border/50 shadow-lg backdrop-blur-sm h-fit dark:bg-secondary/20 dark:border-border/30 transition-colors duration-300">
        <div className="bg-gradient-to-br from-background/50 to-secondary/20 p-6 dark:from-background/10 dark:to-secondary/30 transition-colors duration-300">
          <ExperienceMatch relevantExperiences={relevantExperiences} />
        </div>
      </Card>
    </div>
  );
};

export default ResultsCard;

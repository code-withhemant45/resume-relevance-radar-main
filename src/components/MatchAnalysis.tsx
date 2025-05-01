
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface MatchAnalysisProps {
  score: number;
}

const MatchAnalysis = ({ score }: MatchAnalysisProps) => {
  // Determine score category and styling
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getProgressColor = (score: number) => {
    if (score >= 80) return 'bg-green-600';
    if (score >= 60) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getMessage = (score: number) => {
    if (score >= 80) return "Great match! Your resume aligns well with this job.";
    if (score >= 60) return "Good match! With a few tweaks, your resume could be a great fit.";
    if (score >= 40) return "Moderate match. Consider adding missing keywords and skills.";
    return "Low match. Consider customizing your resume for this specific job.";
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-1">Resume Match Score</h3>
          <div className={cn("text-6xl font-bold animate-pulse-score", getScoreColor(score))}>
            {score}%
          </div>
          <p className="text-sm text-gray-600 mt-2">{getMessage(score)}</p>
        </div>

        <div className="mt-4">
          <div className="flex justify-between mb-1 text-sm">
            <span>Low Match</span>
            <span>High Match</span>
          </div>
          <Progress className="h-2" value={score} 
            style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}>
            <div className={cn("h-full", getProgressColor(score))}></div>
          </Progress>
        </div>
      </CardContent>
    </Card>
  );
};

export default MatchAnalysis;

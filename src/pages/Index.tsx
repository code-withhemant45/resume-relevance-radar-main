import React, { useState } from 'react';
import { useToast } from "@/hooks/use-toast";
import UploadSection from '@/components/UploadSection';
import JobDescriptionInput from '@/components/JobDescriptionInput';
import ScanButton from '@/components/ScanButton';
import ResultsCard from '@/components/ResultsCard';
import { ThemeToggle } from '@/components/ThemeToggle';
import { extractTextFromPdf, calculateMatchScore, analyzeSkillsMatch, findRelevantExcerpts } from '@/lib/pdf-parser';

const Index = () => {
  const { toast } = useToast();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [resumeText, setResumeText] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisResults, setAnalysisResults] = useState({
    score: 0,
    matchingSkills: [] as string[],
    missingSkills: [] as string[],
    resumeOnlySkills: [] as string[],
    relevantExperiences: [] as string[]
  });

  const handleFileSelect = (file: File) => {
    setResumeFile(file);
    setResumeText('');
    setShowResults(false);
  };

  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    setShowResults(false);
  };

  const handleAnalyze = async () => {
    if (!resumeFile) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume PDF first",
        variant: "destructive"
      });
      return;
    }

    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please enter a job description to compare against",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsScanning(true);
      setShowResults(false);

      // Extract text from resume PDF
      const extractedText = await extractTextFromPdf(resumeFile);
      setResumeText(extractedText);

      // Calculate match score
      const score = calculateMatchScore(extractedText, jobDescription);

      // Analyze skills match
      const { matching, missing, resumeOnly } = analyzeSkillsMatch(extractedText, jobDescription);

      // Find relevant experience excerpts
      const relevantExcerpts = findRelevantExcerpts(extractedText, jobDescription);

      // Set analysis results
      setAnalysisResults({
        score,
        matchingSkills: matching,
        missingSkills: missing,
        resumeOnlySkills: resumeOnly,
        relevantExperiences: relevantExcerpts
      });

      // Show results
      setShowResults(true);

      toast({
        title: "Analysis Complete",
        description: `Your resume match score is ${score}%`,
      });
    } catch (error) {
      console.error("Analysis error:", error);
      toast({
        title: "Analysis Failed",
        description: "There was an error analyzing your resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/50 to-secondary/20 dark:from-background dark:via-secondary/10 dark:to-background transition-colors duration-300">
      <div className="container py-8">
        <header className="text-center mb-8 relative">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 text-transparent bg-clip-text dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            Resume Relevance Radar
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto dark:text-muted-foreground/80">
            Upload your resume and compare it against a job description to see how well your qualifications match.
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-6">
          <div className="bg-card/50 dark:bg-card/10 rounded-lg shadow-lg border border-border/50 backdrop-blur-sm p-6 transition-colors duration-300">
            <UploadSection onFileSelect={handleFileSelect} />
            <JobDescriptionInput value={jobDescription} onChange={handleJobDescriptionChange} />
            <ScanButton 
              onClick={handleAnalyze} 
              disabled={!resumeFile || !jobDescription.trim()} 
              isScanning={isScanning} 
            />
          </div>

          {showResults && (
            <div className="mt-8 animate-fade-in">
              <h2 className="text-2xl font-semibold mb-4 text-center bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400">
                Analysis Results
              </h2>
              <ResultsCard 
                score={analysisResults.score}
                matchingSkills={analysisResults.matchingSkills}
                missingSkills={analysisResults.missingSkills}
                resumeOnlySkills={analysisResults.resumeOnlySkills}
                relevantExperiences={analysisResults.relevantExperiences}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;

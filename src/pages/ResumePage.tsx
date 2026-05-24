import { Link } from "react-router-dom";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_RESUME_URL,
  resumeDownloadName,
} from "@/lib/resume";

const RESUME_NAME = "Lalit Katheriya";

const ResumePage = () => {
  const downloadName = resumeDownloadName(RESUME_NAME);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to portfolio
          </Link>

          <p className="hidden truncate text-sm font-semibold text-white sm:block">
            {downloadName}
          </p>

          <div className="flex items-center gap-2">
            <a
              href={DEFAULT_RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex"
            >
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-white/15 bg-transparent text-white hover:bg-white/5"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in tab
              </Button>
            </a>
            <a href={DEFAULT_RESUME_URL} download={downloadName}>
              <Button
                type="button"
                size="sm"
                className="bg-gradient-to-r from-primary to-[hsl(262_83%_58%)] shadow-glow-primary hover:opacity-90"
              >
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </a>
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <div className="container mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-4 sm:py-6">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl">
            <div className="flex items-center gap-3 border-b border-white/10 bg-[#141414] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              </div>
              <span className="truncate font-jetbrains text-xs text-white/50">
                {downloadName}
              </span>
            </div>

            <div className="relative min-h-[70vh] flex-1 bg-[#1a1a1a] sm:min-h-[75vh]">
              <object
                data={DEFAULT_RESUME_URL}
                type="application/pdf"
                className="absolute inset-0 h-full w-full"
                aria-label="Resume PDF preview"
              >
                <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
                  <p className="text-sm text-white/60">
                    Your browser cannot display PDFs inline.
                  </p>
                  <a
                    href={DEFAULT_RESUME_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Open PDF in a new tab
                  </a>
                  <a href={DEFAULT_RESUME_URL} download={downloadName}>
                    <Button type="button" className="shadow-glow-primary">
                      <Download className="mr-2 h-4 w-4" />
                      Download CV
                    </Button>
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResumePage;

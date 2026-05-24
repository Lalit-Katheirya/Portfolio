import { cn } from "@/lib/utils";

export type JobData = {
  title: string;
  from: string;
  to: string;
  company: string;
};

type JobCodeWindowProps = {
  job: JobData;
  index: number;
  align?: "left" | "right";
  className?: string;
};

const JobCodeWindow = ({
  job,
  index,
  align = "left",
  className,
}: JobCodeWindowProps) => {
  const tabName = `job-${index + 1}.js`;
  const lines = [
    { n: 1, content: <>const job = {"{"}</> },
    {
      n: 2,
      content: (
        <>
          {"  "}
          <span className="text-white">title</span>
          <span className="text-white/60">: </span>
          <span className="text-[#9cdcfe]">&quot;{job.title}&quot;</span>,
        </>
      ),
    },
    {
      n: 3,
      content: (
        <>
          {"  "}
          <span className="text-white">from</span>
          <span className="text-white/60">: </span>
          <span className="text-[#9cdcfe]">&quot;{job.from}&quot;</span>,
        </>
      ),
    },
    {
      n: 4,
      content: (
        <>
          {"  "}
          <span className="text-white">to</span>
          <span className="text-white/60">: </span>
          <span className="text-[#9cdcfe]">&quot;{job.to}&quot;</span>,
        </>
      ),
    },
    {
      n: 5,
      content: (
        <>
          {"  "}
          <span className="text-white">company</span>
          <span className="text-white/60">: </span>
          <span className="text-[#9cdcfe]">&quot;{job.company}&quot;</span>
        </>
      ),
    },
    { n: 6, content: <>{"}"}</> },
  ];

  return (
    <div
      className={cn(
        "w-full max-w-md md:max-w-lg",
        align === "right" ? "md:ml-auto" : "md:mr-auto",
        className
      )}
    >
      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0d0d0d] shadow-xl">
        <div className="flex items-center gap-2 border-b border-white/10 bg-[#161616] px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          <div className="ml-2 flex items-center">
            <span className="rounded-t-md bg-[#1e1e1e] px-3 py-1 text-[11px] font-jetbrains text-white/90 border border-b-0 border-white/10">
              {tabName}
            </span>
          </div>
        </div>

        <div className="flex font-jetbrains text-[13px] leading-6">
          <div className="select-none border-r border-white/5 bg-[#0a0a0a] px-3 py-4 text-right text-white/25">
            {lines.map((line) => (
              <div key={line.n}>{line.n}</div>
            ))}
          </div>
          <pre className="flex-1 overflow-x-auto p-4 text-[#82aaff]">
            <code>
              {lines.map((line) => (
                <div key={line.n}>{line.content}</div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default JobCodeWindow;

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { FileText, ExternalLink, Copy, Check, Eye, Code } from "lucide-react";
import { GitHubReadme } from "@/types";
import LoadingSpinner from "@/common/loadingSpinner";
import { Element } from "hast";

// Import highlight.js CSS
import "highlight.js/styles/github-dark.css";
import { JSX } from "react/jsx-runtime";

interface ReadmeRendererProps {
  readme: GitHubReadme | undefined;
  isLoading: boolean;
  error: Error | null;
  repositoryUrl: string;
}

interface CodeBlockProps {
  node?: Element;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ImageProps {
  src?: string;
  alt?: string;
  title?: string;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
}

interface LinkProps {
  href?: string;
  children?: React.ReactNode;
  title?: string;
}

interface TableProps {
  children?: React.ReactNode;
}

interface TableCellProps {
  children?: React.ReactNode;
}

interface BlockquoteProps {
  children?: React.ReactNode;
}

interface HeadingProps {
  children?: React.ReactNode;
  level: 1 | 2 | 3 | 4 | 5 | 6;
}

interface ParagraphProps {
  children?: React.ReactNode;
  align?: string;
}

const ReadmeRenderer: React.FC<ReadmeRendererProps> = ({
  readme,
  isLoading,
  error,
  repositoryUrl,
}) => {
  const [copied, setCopied] = React.useState(false);
  const [viewMode, setViewMode] = React.useState<'rendered' | 'raw'>('rendered');

  const decodeBase64 = (encoded: string): string => {
    try {
      // Properly decode base64 with UTF-8 support for emojis
      const binary = atob(encoded.replace(/\s/g, ""));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
      }
      return new TextDecoder('utf-8').decode(bytes);
    } catch {
      return "Error decoding README content";
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading README..." />;
  }

  if (error || !readme) {
    return (
      <div className="text-center py-12">
        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {error ? "Failed to load README" : "No README found"}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error ? 
            "There was an error loading the README file." : 
            "This repository doesn't have a README file."
          }
        </p>
        <a
          href={`${repositoryUrl}#readme`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          View on GitHub
        </a>
      </div>
    );
  }

  const content = readme.encoding === "base64" 
    ? decodeBase64(readme.content) 
    : readme.content;

  // Custom components for better rendering
  const CustomCode: React.FC<CodeBlockProps> = ({ 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    node, 
    inline, 
    className, 
    children, 
    ...props 
  }) => {
    const match = /language-(\w+)/.exec(className || '');
    const codeContent = String(children).replace(/\n$/, '');
    
    if (!inline && match) {
      return (
        <div className="relative group my-4">
          <div className="flex items-center justify-between bg-gray-800 text-gray-300 px-4 py-2 text-sm border-b border-gray-700 rounded-t-lg">
            <span>{match[1]}</span>
            <button
              onClick={() => copyToClipboard(codeContent)}
              className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-700 rounded text-gray-300"
              title="Copy code"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <pre className="bg-gray-900 text-gray-100 p-4 overflow-x-auto rounded-b-lg m-0">
            <code className={className} {...props}>
              {children}
            </code>
          </pre>
        </div>
      );
    }

    return (
      <code 
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700" 
        {...props}
      >
        {children}
      </code>
    );
  };

  const CustomImage: React.FC<ImageProps> = ({ src, alt, title, width, height, style, ...props }) => {
    if (!src) return null;
    
    // Handle relative URLs by converting them to absolute GitHub URLs
    const imageSrc = src.startsWith('http') ? src : 
      `https://raw.githubusercontent.com${repositoryUrl.replace('https://github.com', '')}/HEAD/${src}`;
    
    // Check if it's a badge/shield or stat image
    const isBadge = src.includes('shields.io') || 
                   src.includes('badge') || 
                   src.includes('img.shields.io') ||
                   src.includes('github-readme-stats') ||
                   alt?.toLowerCase().includes('badge') ||
                   alt?.toLowerCase().includes('stat');
    
    return (
      <img 
        src={imageSrc} 
        alt={alt || ""} 
        title={title}
        width={width}
        height={height}
        style={{
          maxWidth: '100%',
          height: 'auto',
          ...style,
          ...(isBadge && { 
            display: 'inline-block', 
            margin: '2px 4px',
            verticalAlign: 'middle'
          })
        }}
        className={`${isBadge ? 'inline-block align-middle' : 'block my-4 rounded-lg border border-gray-200 dark:border-gray-700'}`}
        loading="lazy"
        {...props} 
      />
    );
  };

  const CustomLink: React.FC<LinkProps> = ({ href, children, title, ...props }) => {
    if (!href) return <span>{children}</span>;
    
    const isExternal = href.startsWith('http') && !href.includes(repositoryUrl);
    const isGitHubLink = href.startsWith('http') && href.includes('github.com');
    
    return (
      <a
        href={href}
        title={title}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 no-underline hover:underline transition-colors"
        {...props}
      >
        {children}
        {isExternal && !isGitHubLink && <ExternalLink className="inline h-3 w-3 ml-1" />}
      </a>
    );
  };

  const CustomTable: React.FC<TableProps> = ({ children, ...props }) => {
    return (
      <div className="overflow-x-auto my-6">
        <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg" {...props}>
          {children}
        </table>
      </div>
    );
  };

  const CustomTableHeader: React.FC<TableCellProps> = ({ children, ...props }) => {
    return (
      <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-left font-semibold text-gray-900 dark:text-white" {...props}>
        {children}
      </th>
    );
  };

  const CustomTableCell: React.FC<TableCellProps> = ({ children, ...props }) => {
    return (
      <td className="px-4 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300" {...props}>
        {children}
      </td>
    );
  };

  const CustomBlockquote: React.FC<BlockquoteProps> = ({ children, ...props }) => {
    return (
      <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-6 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300 rounded-r" {...props}>
        {children}
      </blockquote>
    );
  };

  const CustomHeading: React.FC<HeadingProps & { children: React.ReactNode }> = ({ level, children, ...props }) => {
    const id = String(children).toLowerCase().replace(/[^\w]+/g, '-');
    
    const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
    const headingClasses = {
      1: "text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-2",
      2: "text-2xl font-bold mt-6 mb-3 text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-1",
      3: "text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white",
      4: "text-lg font-bold mt-3 mb-2 text-gray-900 dark:text-white",
      5: "text-base font-bold mt-2 mb-1 text-gray-900 dark:text-white",
      6: "text-sm font-bold mt-2 mb-1 text-gray-900 dark:text-white",
    };

    return (
      <HeadingTag id={id} className={headingClasses[level]} {...props}>
        {children}
      </HeadingTag>
    );
  };

  // Custom paragraph component to handle alignment and badges
  const CustomParagraph: React.FC<ParagraphProps> = ({ children, align, ...props }) => {
    // Check if paragraph contains only images (badges/stats)
    const isImageOnly = React.Children.toArray(children).every(child => 
      typeof child === 'object' && child !== null && 'type' in child && child.type === 'img'
    );
    
    const alignClass = align === 'center' ? 'text-center' : '';
    const imageOnlyClass = isImageOnly ? 'flex flex-wrap justify-center gap-2 items-center' : '';
    
    return (
      <p className={`mb-4 text-gray-700 dark:text-gray-300 leading-relaxed ${alignClass} ${imageOnlyClass}`} {...props}>
        {children}
      </p>
    );
  };

  const components = {
    code: CustomCode,
    img: CustomImage,
    a: CustomLink,
    table: CustomTable,
    th: CustomTableHeader,
    td: CustomTableCell,
    blockquote: CustomBlockquote,
    h1: (props: { children: React.ReactNode }) => <CustomHeading level={1} {...props} />,
    h2: (props: { children: React.ReactNode }) => <CustomHeading level={2} {...props} />,
    h3: (props: { children: React.ReactNode }) => <CustomHeading level={3} {...props} />,
    h4: (props: { children: React.ReactNode; align?: string }) => {
      if (props.align === 'center') {
        return (
          <div className="text-center my-4">
            <CustomHeading level={4} {...props} />
          </div>
        );
      }
      return <CustomHeading level={4} {...props} />;
    },
    h5: (props: { children: React.ReactNode }) => <CustomHeading level={5} {...props} />,
    h6: (props: { children: React.ReactNode }) => <CustomHeading level={6} {...props} />,
    p: CustomParagraph,
    ul: ({ children, ...props }: { children: React.ReactNode }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300 pl-4" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }: { children: React.ReactNode }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700 dark:text-gray-300 pl-4" {...props}>
        {children}
      </ol>
    ),
    li: ({ children, ...props }: { children: React.ReactNode }) => (
      <li className="mb-1 leading-relaxed" {...props}>
        {children}
      </li>
    ),
    hr: ({ ...props }) => (
      <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />
    ),
    details: ({ children, ...props }: { children: React.ReactNode }) => (
      <details className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg" {...props}>
        {children}
      </details>
    ),
    summary: ({ children, ...props }: { children: React.ReactNode }) => (
      <summary className="px-4 py-3 bg-gray-50 dark:bg-gray-800 cursor-pointer font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" {...props}>
        {children}
      </summary>
    ),
    // Handle HTML elements that might come through rehype-raw
    div: ({ children, ...props }: { children: React.ReactNode; align?: string }) => (
      <div className={props.align === 'center' ? 'text-center' : ''} {...props}>
        {children}
      </div>
    ),
  };

  return (
    <div className="space-y-6">
      {/* README Controls */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            README.md
          </h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round(content.length / 1024)} KB
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* View Mode Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('rendered')}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'rendered'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Eye className="h-3 w-3 mr-1" />
              Preview
            </button>
            <button
              onClick={() => setViewMode('raw')}
              className={`flex items-center px-3 py-1 text-sm rounded-md transition-colors ${
                viewMode === 'raw'
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <Code className="h-3 w-3 mr-1" />
              Raw
            </button>
          </div>

          {/* External Link */}
          <a
            href={`${repositoryUrl}/blob/HEAD/README.md`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors border border-blue-200 dark:border-blue-700 rounded-md"
          >
            <ExternalLink className="h-3 w-3 mr-1" />
            GitHub
          </a>
        </div>
      </div>

      {/* README Content */}
      <div className="min-h-96">
        {viewMode === 'rendered' ? (
          <div className="github-readme-content prose prose-lg max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={components as never}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="relative">
            <div className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <span className="text-sm text-gray-600 dark:text-gray-400">Raw Markdown</span>
              <button
                onClick={() => copyToClipboard(content)}
                className="flex items-center px-2 py-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Copy raw content"
              >
                {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                Copy
              </button>
            </div>
            <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-6 overflow-auto max-h-96 border border-gray-200 dark:border-gray-700 rounded-b-lg">
              {content}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReadmeRenderer;
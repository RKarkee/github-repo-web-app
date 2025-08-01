import React from "react";
import { GitHubReadme } from "@/types";

interface ReadmeRendererProps {
  readme: GitHubReadme | undefined;
  isLoading: boolean;
  error: Error | null;
  repositoryUrl: string;
  username?: string;
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

export type {
    ReadmeRendererProps,
    CodeBlockProps,
    ImageProps,
    LinkProps,
    TableProps,
    TableCellProps,
    BlockquoteProps,
    HeadingProps,
    ParagraphProps
};

